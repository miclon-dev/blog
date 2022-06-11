import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    link: "/",
    icon: "home"
  },
  {
    text: "语言",
    icon: "article",
    prefix: "/posts/language/",
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
    text: "框架",
    icon: "support",
    prefix: "/posts/framework/",
    children: [
      {
        text: "django",
        icon: "django",
        link: "django/"
      },
      {
        text: "scrapy",
        icon: "scrapy",
        link: "scrapy/"
      }
    ],
  },
  {
    text: "杂项",
    icon: "file",
    prefix: "/posts/other/",
    children: [
      {
        text: "逆向",
        icon: "lock",
        link: "reverse/"
      },
      {
        text: "阅读",
        icon: "read",
        link: "read/"
      },
      {
        text: "git",
        icon: "git",
        link: "git/"
      },
      {
        text: "docker",
        icon: "docker",
        link: "docker/"
      }
    ]
  }
  // {
  //   text: "阅读笔记",
  //   link: "/"
  // }
]);
