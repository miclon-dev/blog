import { sidebar } from "vuepress-theme-hope";

// export default sidebar([
//   "/",
//   {
//     text: "如何使用",
//     icon: "creative",
//     prefix: "/guide/",
//     link: "/guide/",
//     children: "structure",
//   },
//   {
//     text: "语言",
//     icon: "article",
//     prefix: "/posts/language/",
//     children: [
//       {
//         text: "python",
//         icon: "python",
//         collapsable: true,
//         prefix: "python/",
//         children: "structure"
//       },
//       {
//         text: "Vue",
//         icon: "vue",
//         collapsable: true,
//         prefix: "vue/",
//         children: "structure",
//       }
//     ],
//   },
// ]);

export default sidebar({
  "/posts/language/python/": "structure",
  "/posts/language/vue/": "structure",
  "/posts/framework/scrapy/": "structure",
  "/posts/framework/django/": "structure",
  "/posts/framework/apscheduler/": "structure",
  "/posts/other/reverse/": "structure",
  "/posts/other/read/": "structure",
  "/posts/other/git/": "structure",
  "/posts/other/docker/": "structure",
  "/posts/other/opensource/": "structure",
  "/posts/other/1loc/": "structure",
  "/posts/other/": "structure",
})
