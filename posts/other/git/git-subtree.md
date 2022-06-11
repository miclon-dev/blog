---
title: Git Subtree 在多个 Git 项目间双向同步子项目
icon: git
order: 2
author: Delai
date: 2022-06-10
category:
- git
tag:
- subtree
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
---
::: tip
文章来源： https://tech.youzan.com/git-subtree/
:::
> 什么时候需要 Subtree ？  
> 1、当多个项目共用同一坨代码，而这坨代码跟着项目在快速更新的时候  
> 2、把一部分代码迁移出去独立为一个新的 git 仓库，但又希望能够保留这部分代码的历史提交记录。

## 背景

有赞微商城曾经是一个很大的前后端代码都包含在里面的 Git 项目，为了方便管理我们把前后端代码分离成 2 个 Git 仓库，进而再作分项目拆分成多个 Git 仓库。

于是，就需要有好的方式同步各个项目共用的 Css 库、JS 库、PHP 库（他们都是以独立的 Git 仓库的形式存在）。而且由于开发节奏极快，我们需要这些库是**可以在不同项目间双向同步的而不是单向同步**。**而且，最好能做到被迁移的这部分代码在新的 git 仓库里保留原有的历史提交记录。**

举个栗子：A 项目需要在给某个子项目 W 里添加一个文件，最方便的方式自然是直接在 A 项目里改 W 子项目对应的目录里的代码，然后测试通过后，把这个更改提交到 W 子项目的 Git 仓库里。如果这时候还要先单独更新 W 子项目的代码然后提交到 Git 服务器，再在 A 项目里把 W 子项目的代码更新过来，显然是很麻烦的，更麻烦的是如果发现代码有 bug，还得再走一遍这个流程。

### 有什么方案？

-   [Git Submodule](http://git-scm.com/docs/git-submodule)：这是 Git 官方以前的推荐方案
-   [Git Subtree](https://medium.com/@porteneuve/mastering-git-Subtrees-943d29a798ec)：从 [Git 1.5.2](http://lwn.net/Articles/235109/) 开始，Git 新增并推荐使用这个功能来管理子项目
-   [npm](https://www.npmjs.com/)：node package manager，实际上不仅仅是 node 的包管理工具
-   [composer](https://getcomposer.org/)：暂且认为他是 php 版 npm、php 版 Maven 吧
-   [bower](http://bower.io/)：针对浏览器前端的包管理工具（Web sites are made of lots of things — frameworks, libraries, assets, utilities, and rainbows. Bower manages all these things for you.），这东西很好用，我们在大量使用。

虽然 npm、composer、maven 等更侧重于包的依赖管理，以上几个方案都是能够做到在不同项目中同步同一块代码的，但没法双向同步，更适用于子项目代码比较稳定的情形。

Git Submodule 和 Git Subtree 都是官方支持的功能，不具有依赖管理的功能，但能满足我们的要求。Git Subtree 相对来说会[更好一些](http://somethingsinistral.net/blog/git-submodules-are-probably-not-the-answer/) 。

### Git Subtree 好在哪里

用一句话来描述 Git Subtree 的优势就是：

> 经由 Git Subtree 来维护的子项目代码，对于父项目来说是透明的，所有的开发人员**看到的就是一个普通的目录，原来怎么做现在依旧那么做**，只需要维护这个 Subtree 的人在合适的时候去做同步代码的操作。

它是怎么做到的呢？简单说下原理

### Git Subtree 的原理

首先，你有两个伟大的项目——我们叫他 P1 项目、P2 项目，还有一个牛逼的要被多个项目共用的项目——我们叫他 S 项目。我们通过简要讲解使用 Subtree 来同步代码的过程来解释 Subtree 的原理

#### 1、初始化子项目 Subtree

通过

```null
cd P1项目的路径  
git subtree add --prefix=用来放S项目的相对路径 S项目git地址 xxx分支  
```

这样的命令，把 S 项目（我们姑且叫他 S 项目）的代码下载到 --prefix 所指定的目录——我们姑且叫他 S 目录把，并在 P1 项目里自动产生一个 commit（就是把 S 目录的内容提交到 P1 项目里）。

_对于 P2 项目也做同样的操作_

#### 2、像往常一样更新代码

大家在 P1 项目里各种提交 commit，其中有些 commit 会涉及到 S 目录的更改，正如前面提到的，这是没任何关系的，大家也不会感受到有任何不一样。

#### 3、提交更改到子项目的 Git 服务器

**关键的地方来了：**  当维护这个 S 项目 Subtree 的人希望把最近这段时间对 S 目录的更改提交到 S 项目的 Git 服务器上时，他执行一段类似于这样的命令：

```null
cd P1项目的路径  
git subtree push --prefix=S项目的路径 S项目git地址 xxx分支  
```

Git 会遍历所有的 commit，从中找出针对 S 目录的更改，然后把这些更改记录提交到 S 项目的 Git 服务器上

#### 4、更新子项目新的代码到父项目

OK，现在 S 项目有大量的新代码了，P2 项目也想使用这些新代码，维护 P2 这个 Subtree 的人只要执行：

```null
git subtree pull --prefix=S项目的路径 S项目git地址 xxx分支  
```

这样就可以将 P2 项目里 S 项目目录里的内容更新为 S 项目 xxx 分支的最新代码了。

### 我们总结的 Git Subtree 简明使用手册

假设，你要在各个项目里的_components/zenjs_这个目录对 _[http://github.com/youzan/zenjs.git](http://github.com/youzan/zenjs.git)_ 这个项目做 Subtree

1\. 首先必须确保各个项目已经添加 zenjs 这个 remote（关于 remote 是什么可以看[这里](http://git-scm.com/docs/git-remote)）:

```null
git remote add zenjs http://github.com/youzan/zenjs.git  
```

2\. 将 zenjs 添加到各个项目里

```null
git subtree add --prefix=components/zenjs zenjs master  
```

3\. 各项目更新 zenjs 代码的方法:

```null
git subtree pull --prefix=components/zenjs zenjs master  
```

4\. 各项目提交 zenjs 代码的方法:

```null
git subtree push --prefix=components/zenjs zenjs hotfix/zenjs_xxxx  
```

这会在远程的 zenjs 的仓库里生成一个叫 hotfix/zenjs_xxxx 的的分支，包含了你过去对 components/zenjs 所有的更改记录

1.  把 hotfix/zenjs_xxx 分支更新并合并到 master 并提交

这样其他工程就可以更新到你提交的代码了。

> 有人可能会问，只用 master 分支，不管版本，太有风险了。
>
> 对的，正如我们前面说到的那样，subtree 的方案适用的场景是：各个项目共用一个库，而这个库正在快速迭代更新的过程中。如果追求稳定，只需要给库拉出一个如 v0.1.0 这样的版本号命名的稳定分支，subtree 只用这个分支即可。
>
> 我们现在使用的方式就是：A 项目经常会对 zenjs 做更新，所以 A 项目用 subtree 来双向同步；B 项目只是使用，所以用 bower 用来按版本来更新代码。

**高阶功能:** 重新 split 出一个新起点（这样，每次提交 subtree 的时候就不会从头遍历一遍了）

```null
git subtree split --rejoin --prefix=components/zenjs --branch new_zenjs  
git push zenjs new_zenjs:master  
```
