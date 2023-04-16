import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import registerComponentsPlugin from '@vuepress/plugin-register-components';
import theme from "./theme";



export default defineUserConfig({
  lang: "zh-CN",
  title: "MicLon's Blog",
  description: "米乐的个人博客",

  base: "/",

  head: [
    [
      'script',
      {},
      `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?4845d5bae0cf1fabe802fdb0fe6dfc0b";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`
    ]
  ],
  alias: {
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/orInfo.vue"
    )
  },

  theme,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ]
});
