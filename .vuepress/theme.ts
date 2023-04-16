import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "https://52caiji.com",

  author: {
    name: "MicLon",
    url: "https://52caiji.com",
  },

  iconAssets: "//at.alicdn.com/t/c/font_3490530_8yiazlksqs4.css",
  // iconAssets: "/iconfont.css",
  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",
  logoDark: "/logodark.svg",

  repo: "mic1on/person-doc",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "自律给我自由",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "一位编程爱好者",
    intro: "/",
    medias: {
      Github: "https://github.com/mic1on",
      Email: "jcnd@163.com"
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "mic1on/giscus-discussions",
      repoId: "R_kgDOHp93KQ",
      category: "Announcements",
      categoryId: "DIC_kwDOHp93Kc4CQNUY",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
