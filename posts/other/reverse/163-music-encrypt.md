---
title: 网易云音乐加密
icon: lock
order: 2
author: MicLon
date: 2021-01-28
category:
- 逆向
tag:
- 网易云音乐
- 解密
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---

::: warning
**本文仅供学习交流，请勿用于非法用途，谢谢！**
:::
### 分析问题


在浏览网易云音乐网站时候发现，很多操作譬如听歌、查看评论等操作，提交参数均为params+encSecKey组合提交。encSecKey：一直是256位。

<!--more-->
### 分析加密字段


以常规方式，通过搜索看看能否定位到加密入口。
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608215422.png)
### 入口函数d及参数
```javascript
function d(d, e, f, g) {
  var h = {}
  , i = a(16);
  return h.encText = b(d, g),
    h.encText = b(h.encText, i),
    h.encSecKey = c(i, e, f),
    h
}
```
函数d有四个参数，内部调用了函数a、函数b、函数c。尝试逐一突破。


首先观察函数d的四个参数分别是什么，通过断点调试。

| 参数名称 | 参数内容 | 参数类型 |
| --- | --- | --- |
| d | "{"id":"1471802279","c":"[{\"id\":\"1471802279\"}]","csrf_token":"799f81df17fd9175b69bb9ff314ca3d8"}" | str
|
| e | "010001" | str
|
| f | "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7" | str
|
| g | "0CoJUm6Qyw8W8jud" | str
|

以上参数通过多次观察，只有参数d是变动的，其中变动的值为id，即歌曲id。

之后的调试结果均以以上参数为基础做调试。


### 函数a
函数a的入口为：i = a(16)
```javascript
function a(a) {
  var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
  for (d = 0; a > d; d += 1)
    e = Math.random() * b.length,
      e = Math.floor(e),
      c += b.charAt(e);
  return c
}
```
有点JavaScript基础的应该看出来，传入变量a，输出变量a个随机字符。
那入口函数a传入变量参数16，即生成16个随机字符。


### 函数b
h.encText = b(d, g),
h.encText = b(h.encText, i),


```javascript
function b(a, b) {
  var c = CryptoJS.enc.Utf8.parse(b)
  , d = CryptoJS.enc.Utf8.parse("0102030405060708")
  , e = CryptoJS.enc.Utf8.parse(a)
  , f = CryptoJS.AES.encrypt(e, c, {
    iv: d,
    mode: CryptoJS.mode.CBC
  });
  return f.toString()
}
```
函数b是一个典型的利用Crypto库进行AES加密。如果对某个加密库不了解不妨google一下
```javascript
// Custom Key and IV
var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });

// Block Modes and Padding
var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase", {
  mode: CryptoJS.mode.CFB,
  padding: CryptoJS.pad.AnsiX923
});
```
> 引用来源：[https://cryptojs.gitbook.io/docs/#ciphers](https://cryptojs.gitbook.io/docs/#ciphers)

对应的，我下载了Python的Crypto包，找到了里面的Cipher/AES.py源码观察了下
_For ``MODE_CBC``, ``MODE_CFB``, and ``MODE_OFB`` it must be 16 bytes long._
所加参数必须是16字节长。
_:Return: an AES object, of the applicable mode._
_返回是一个AES对象。_
_
进入这个AES对象方法encrypt
```python
def encrypt(self, plaintext, output=None):
    """
   	:Parameters:
          plaintext : bytes/bytearray/memoryview
            The piece of data to encrypt.
            Its lenght must be multiple of the cipher block size.
        :Keywords:
          output : bytearray/memoryview
            The location where the ciphertext must be written to.
            If ``None``, the ciphertext is returned.
        :Return:
          If ``output`` is ``None``, the ciphertext is returned as ``bytes``.
          Otherwise, ``None``.
        """
```
必须是block size的倍数，block size 默认是16
于是就有了以下方法，用来构建加密。
这里可能会疑问，key和iv不应该都要16字节吗？其实是因为网易云音乐传入的固定iv和key值都已经是16字节了，通过print(len(iv.encode()))，就观察到了。
```python
def encrypt(text, key, iv):
    # 将传入的文本进行block_size倍数填充
    clear_text = pad(data_to_pad=text.encode(), block_size=AES.block_size)
    # 创建AES cipher
    encryptor = AES.new(key.encode(), AES.MODE_CBC, iv=iv.encode())
    # 进行MODE_CBC加密
    ciphertext = encryptor.encrypt(clear_text)
    # 转码输出
    ciphertext = base64.b64encode(ciphertext).decode()
    return ciphertext
```
### 函数b的第二种方法
第一种是利用python的Crypto包实现了函数b的功能。
第二种方法我准备用现有的crypto加密js文件，直接进行加密。
在python中就很简单的利用execjs库直接调用JS文件
```python
import execjs


with open('cryptoJS.js', 'r', encoding='utf-8') as f:
    js_str = f.read()

js_obj = execjs.compile(js_str)
word = '{"id":"1476219294","c":"[{\\"id\\":\\"1476219294\\"}]","csrf_token":""}'
key = "0CoJUm6Qyw8W8jud"
print(js_obj.call('getpasss', word, key))
```
### 函数c
```javascript
function c(a, b, c) {
  var d, e;
  return setMaxDigits(131),
    d = new RSAKeyPair(b,"",c),
    e = encryptedString(d, a)
}
```
函数c就是一个RSA加密了，我同以上函数b的经验。找到了RSA的js文件，执行利用execjs调用，简单粗暴，哈哈哈。


![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608215506.png)
```python
with open('RSAKEY.js', 'r', encoding='utf-8') as f:
    js_str = f.read()

js_obj = execjs.compile(js_str)

p_a = "PsH7lXqqXnEZXpvF"
p_b = "010001"
p_c = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7"


print(js_obj.call('get_c', p_a, p_b, p_c))
```
### 总结


再次看函数d的时候就发现各个内部函数已经被逐一攻破
h.encText即**params**
h.encSecKey即**encSecKey**


**_验证正确性_**

![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608215523.png)
![](https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608215537.png)
