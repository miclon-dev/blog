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
        icon: "python",
        link: "python/"
      },
      {
        text: "Vue",
        icon: "vue",
        link: "vue/"
      }
    ],
  },
  {
    text: "阅读笔记",
    link: "/"
  }
]);
