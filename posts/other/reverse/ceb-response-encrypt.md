---
title: 某招标平台加密响应
icon: lock
order: 2
author: MicLon
date: 2022-11-18
category:
- 逆向
tag:
- DES
- CryptoJS
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: false
isOriginal: true
---

## 寻找加密

页面搜索`公告`，发起get请求，发现请求参数和headers中并无加密。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118163038.png)


网页中虽出来了搜索结果，但请求的响应中是一长串字符串，显然这是对数据进行了加密。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118163302.png)

由于请求是`xhr`，所以只需在Chrome控制台，勾选`XHR断点`，随后继续发起新的请求。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118163503.png)

请求成功被拦截，右侧是整个请求调用堆栈。

在可疑调用栈中，下一个断点，继续发起新的请求以观察断点结果。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118163934.png)

在实际的请求中，其实可以拿到解密后的响应数据，但是这里真正的响应数据是经过加密的，所以我们需要找到解密的方法。（不解密前端怎么能渲染列表呢？）

既然实际的请求响应没问题，那对于前端来说，尤其是Vue项目的网站，它很大可能是在接收到`response`后，对数据进行了加密。一般在`request.js`这类公共的请求模块中。

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118171946.png)

左侧是熟悉的vue项目目录结构，右侧是熟悉的`axios`请求模块的`response`拦截器。

可以看到，拿到`response.data`后，对其进行了`decryptByDES`加密，而这个加密文件在`src/common/utils.js`中。

> import { encryptByDES, decryptByDES } from "@/common/utils.js";


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118172026.png)

良心开发者，还注释地很清楚，这个加密方法是`DES`加密，而且还给出了加密的密钥`1qaz@wsx3e`。


## JS算法

```js
var CryptoJS = require("crypto-js");

CryptoJS.mode.ECB = (function() {
  var ECB = CryptoJS.lib.BlockCipherMode.extend();
  ECB.Encryptor = ECB.extend({
    processBlock: function(words, offset) {
      this._cipher.encryptBlock(words, offset);
    },
  });

  ECB.Decryptor = ECB.extend({
    processBlock: function(words, offset) {
      this._cipher.decryptBlock(words, offset);
    },
  });
  return ECB;
})();

function encryptByDES(message) {
  var keyHex = CryptoJS.enc.Utf8.parse("1qaz@wsx3e");
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

function decryptByDES(ciphertext) {
  var keyHex = CryptoJS.enc.Utf8.parse("1qaz@wsx3e");
  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

```

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20221118171232.png)

## 总结

这个案例中，前端对数据进行了解密，后端对数据进行了加密，前端是需要展示给大家看的，那么它必然需要将加密的数据进行解密，根据前端vue的经验可以摸查到请求的公共调用模块，然后在这个模块中找到了加密的方法，最后通过`CryptoJS`这个库，将加密的数据进行解密，拿到了真实的数据。
