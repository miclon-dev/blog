import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  {
    text: "如何使用",
    icon: "creative",
    prefix: "/guide/",
    link: "/guide/",
    children: "structure",
  },
  {
    text: "学习笔记",
    icon: "article",
    prefix: "/posts/",
    children: [
      {
        text: "python",
        icon: "python",
        collapsable: true,
        prefix: "python/",
        children: "structure",
      },
      {
        text: "Vue",
        icon: "vue",
        collapsable: true,
        prefix: "vue/",
        children: "structure",
      }
    ],
  },
]);
