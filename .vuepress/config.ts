import { defineUserConfig } from "vuepress";
const { path } = require('@vuepress/utils')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "MicLon's Blog",
  description: "米乐的个人博客",

  base: "/",

  theme,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ]
});
