import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "MicLon's Blog",
  description: "米乐的个人博客",

  base: "/",

  theme
});
