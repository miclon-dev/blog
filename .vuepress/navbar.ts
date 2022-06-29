import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    link: "/",
    icon: "home"
  },
  {
    text: "语言",
    icon: "code",
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
    icon: "frame",
    prefix: "/posts/framework/",
    children: [
      {
        text: "django",
        icon: "django",
        link: "django/"
      },
      {
        text: "scrapy",
        icon: "spider",
        link: "scrapy/"
      }
    ],
  },
  {
    text: "杂项",
    icon: "other",
    prefix: "/posts/other/",
    children: [
      {
        text: "逆向",
        icon: "recall",
        link: "reverse/"
      },
      {
        text: "阅读",
        icon: "read-fill",
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
      },
      {
        text: "开源",
        icon: "github",
        link: "opensource/"
      }
    ]
  }
  // {
  //   text: "阅读笔记",
  //   link: "/"
  // }
]);
