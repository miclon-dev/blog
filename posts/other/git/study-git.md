---
title: 重学一次git
icon: git
order: 1
date: 2022-07-16
category:
- git
tag:
- git
- study
# 此页面会出现在文章收藏中
star: true
isOriginal: true
---


## 常用命令

```bash
git init # 初始化新仓库
git clone https://github.com/mic1on/xpath-helper-plus.git # 克隆代码 
git clone -b dev https://github.com/mic1on/xpath-helper-plus.git # 克隆指定分支 
git status # 查看状态 
git add main.py # 提交单个文件
git add -A # 提交所有文件
git add *.py # 使用通配符提交
git commit -m 'first commit' # 提交到仓库中
add git commit -a -m 'first commit' # 提交已经跟踪过的文件，不需要执行 
git rm main.py # 删除版本库与项目目录中的文件
git rm --cached main.py # 只删除版本库中文件但保存项目目录中文件
git commit --amend # 修改最后一次提交
```
## 工作区

```bash
git clean # 命令用来从工作目录中删除所有没有跟踪（tracked）过的文件
git clean -n # 是一次 clean 的演习, 告诉你哪些文件会被删除
git clean -f # 删除当前目录下没有 tracked 过的文件，不会删除.gitignore 指定的文件
git clean -df # 删除当前目录下没有被 tracked 过的文件和文件夹
git checkout . # 将没有放入到暂存区的所有文件恢复
git checkout main.py # 放弃指定文件的修改
git checkout -- main.py # 将文件从暂存区恢复（如果没有提交到暂存区，将恢复到最近版本）
```
## 暂存区

```bash
git add . # 提交所有修改和新增的文件
git add -u # 只提交修改文件不提交新文件
git ls-files -s # 查看暂存区文件列表
git cat-file -p 33c98c # 查看暂存区文件内容, id可以是前六位或全部
```

## 分支管理
分支用于为项目增加新功能或修复 Bug 时使用。

### 分支流程
大部分情况下不会直接在 ==main== 分支工作，我们应该保护这个分支是最终开发完成代码健康可交付运行的。

所有功能和缺陷(bug)修复都会新建分支完成，除了这个概念外与基本流程使用是一样的。

1. 新建功能分支

> git branch feature-name

2. 切换到新分支

> git checkout feature-name

3. 在新分支中完成功能

> git commit -m "complete feature"

4. 切换回主分支,并把新功能合并到主分支

> git checkout main
> git merge feature-name

5. 删除新分支

> git branch -d feature-name

6. 提交本地主分支到远程分支

> git push origin main

### 历史版本

```bash
git log # 查看历史版本
git log -p # 查看历史版本的修改内容
git checkout commit-id  # 回退到指定版本
git checkout commit-id -b 新分支名称 # 回退到指定版本并创建新分支
```

### 总结下常用分支命令

```bash
git branch dev # 创建分支
git branch # 查看分支
git checkout dev # 切换分支
git checkout -b feature/bbs # 创建并切换分支
git branch -m dev development # 将分支 dev 更新为 development 

# 合并 dev 分支到 main
git checkout main
git merge dev

git branch -d dev # 删除分支
git branch -D dev # 删除没有合并的分支
git push origin :dev # 删除远程分支
git branch --no-merged # 查看未合并的分支(切换到 main) 
git branch --merged # 查看已经合并的分支(切换到 main) 
```

## 远程仓库

### 创建远程仓库

[github](https://github.com/new)

### 关联远程
```bash
echo "# demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mic1on/demo.git
git push -u origin main
```

### pull

拉取远程主机某个分支的更新，再与本地的指定分支合并。

1. 拉取 `origin` 主机的 `dev` 分支与本地的 main 分支合并 git pull origin dev:dev
2. 拉取 `origin` 主机的 `dev` 分支与当前分支合并 git pull origin dev
3. 如果远程分支与当前本地分支同名直接执行 git pull

### push
`git push`命令用于将本地分支的更新，推送到远程主机。它的格式与`git pull`命令相似。

1. 将当前分支推送到origin主机的对应分支(如果当前分支只有一个追踪分支 ，可省略主机名)

> git push origin
2. 使用-u选项指定一个默认主机 ,这样以后就可以不加任何参数直播使用git push。

> git push -u origin main
3. 删除远程dev分支 git push origin --delete dev

4. 本地 dev 分支关联远程分支并推送 git push --set-upstream origin dev

## reset

使用 reset 恢复到历史提交点，重置暂存区与工作目录的内容。

### 可选参数
reset 有三个选项可使用

1. `--hard` 重置位置的同时，直接将 working Tree 工作目录、 index 暂存区及 repository 都重置成目标Reset节点的內容

2. `--soft` 重置位置的同时，保留working Tree 工作目录和index 暂存区的内容，只让repository中的内容和 reset 目标节点保持一致

3. `--mixed`（默认） 重置位置的同时，只保留Working Tree 工作目录的內容，但会将 Index 暂存区 和 Repository 中的內容更改和 reset 目标节点一致

```bash
git reset HEAD^　　#回退所有内容到上一个版本
git reset HEAD^　　a.py　#回退a.py这个文件的版本到上一个版本
git reset –soft　　HEAD~3　#向前回退到第3个版本
git reset –hard　　origin/master　#将本地的状态回退到和远程的一样
git reset 057d　　#回退到某个版本
git revert HEAD　#回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit
```

#### Git reset和git revert的区别
- git reset 是回滚到对应的commit-id，相当于是删除了commit-id以后的所有的提交，并且不会产生新的commit-id记录，如果要推送到远程服务器的话，需要强制推送-f
- git revert 是反做撤销其中的commit-id，然后重新生成一个commit-id。本身不会对其他的提交commit-id产生影响，如果要推送到远程服务器的话，就是普通的操作git push就好了

## 其他功能

### .gitignore
.gitignore 用于定义忽略提交的文件

- 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
- 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
- 可以使用标准的 glob 模式匹配。
```text
.idea
/vendor
.env
/node_modules
/public/storage
*.txt
```

### Tag

Git 也可以对某一时间点上的版本打上标签 ，用于发布软件版本如 v1.0

```bash
git tag v1.0 # 添加标签
git tag # 列出标签
git push --tags # 推送标签
git tag -d v1.0.1 # 删除标签
git push origin :v1.0.1 # 删除远程标签
```

### Stashing

当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作。问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。

"暂存" 可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。

```bash
git stash # 储藏工作
git stash list # 查看储藏列表
git stash apply # 应用最近的储藏
git stash apply stash@{2} # 应用更早的储藏
git stash drop stash@{0} # 删除储藏
git stash pop # 应用并删除储藏
```

### 打包压缩

git 中可以使用 git archive 进行打包操作
将项目的 main 分支打包为 blog.zip

> git archive --format zip --output blog.zip main

### 多库提交

如果需要一份代码发布多个远程仓库，比如github、gitlab、jetbrains space。

```bash
git remote add {NAME} {URL}

# 添加多个远程仓库
git remote add github git@github.com:mic1on/mic1on.github.io.git
git remote add space https://git.jetbrains.space/xxx/xxx.git
# 一次性提交多个
git push github & git push space
```
当然你也可以存储为一个快捷指令：
> alias gp="git push & git push github & git push space"

这样就可以使用`gp`即可快捷操作~
