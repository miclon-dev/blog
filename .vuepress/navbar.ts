import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    link: "/",
    icon: "home"
  },
  {
    text: "学习笔记",
    icon: "article",
    prefix: "/posts/",
    children: [
      {
        text: "Python",
        icon: "edit",
        prefix: "python/",
        children: [
          { text: "文章 1", icon: "edit", link: "article1" },
          { text: "文章 2", icon: "edit", link: "article2" },
          "article3",
          "article4",
        ],
      },
      { text: "文章 9", icon: "edit", link: "article9" },
      { text: "文章 10", icon: "edit", link: "article10" },
      "article11",
      "article12",
    ],
  },
  {
    text: "阅读笔记",
    children: [

    ]
  },
  {
    text: "主题文档",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/zh/",
  },
]);
