import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{r as i,o as t,c,a as n,b as o,e as s,d as l}from"./app.c099355f.js";const p={},d=s(`<h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u547D\u4EE4</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> init <span class="token comment"># \u521D\u59CB\u5316\u65B0\u4ED3\u5E93</span>
<span class="token function">git</span> clone https://github.com/mic1on/xpath-helper-plus.git <span class="token comment"># \u514B\u9686\u4EE3\u7801 </span>
<span class="token function">git</span> clone -b dev https://github.com/mic1on/xpath-helper-plus.git <span class="token comment"># \u514B\u9686\u6307\u5B9A\u5206\u652F </span>
<span class="token function">git</span> status <span class="token comment"># \u67E5\u770B\u72B6\u6001 </span>
<span class="token function">git</span> <span class="token function">add</span> main.py <span class="token comment"># \u63D0\u4EA4\u5355\u4E2A\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> -A <span class="token comment"># \u63D0\u4EA4\u6240\u6709\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> *.py <span class="token comment"># \u4F7F\u7528\u901A\u914D\u7B26\u63D0\u4EA4</span>
<span class="token function">git</span> commit -m <span class="token string">&#39;first commit&#39;</span> <span class="token comment"># \u63D0\u4EA4\u5230\u4ED3\u5E93\u4E2D</span>
<span class="token function">add</span> <span class="token function">git</span> commit -a -m <span class="token string">&#39;first commit&#39;</span> <span class="token comment"># \u63D0\u4EA4\u5DF2\u7ECF\u8DDF\u8E2A\u8FC7\u7684\u6587\u4EF6\uFF0C\u4E0D\u9700\u8981\u6267\u884C </span>
<span class="token function">git</span> <span class="token function">rm</span> main.py <span class="token comment"># \u5220\u9664\u7248\u672C\u5E93\u4E0E\u9879\u76EE\u76EE\u5F55\u4E2D\u7684\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">rm</span> --cached main.py <span class="token comment"># \u53EA\u5220\u9664\u7248\u672C\u5E93\u4E2D\u6587\u4EF6\u4F46\u4FDD\u5B58\u9879\u76EE\u76EE\u5F55\u4E2D\u6587\u4EF6</span>
<span class="token function">git</span> commit --amend <span class="token comment"># \u4FEE\u6539\u6700\u540E\u4E00\u6B21\u63D0\u4EA4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5DE5\u4F5C\u533A" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u4F5C\u533A" aria-hidden="true">#</a> \u5DE5\u4F5C\u533A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clean <span class="token comment"># \u547D\u4EE4\u7528\u6765\u4ECE\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u5220\u9664\u6240\u6709\u6CA1\u6709\u8DDF\u8E2A\uFF08tracked\uFF09\u8FC7\u7684\u6587\u4EF6</span>
<span class="token function">git</span> clean -n <span class="token comment"># \u662F\u4E00\u6B21 clean \u7684\u6F14\u4E60, \u544A\u8BC9\u4F60\u54EA\u4E9B\u6587\u4EF6\u4F1A\u88AB\u5220\u9664</span>
<span class="token function">git</span> clean -f <span class="token comment"># \u5220\u9664\u5F53\u524D\u76EE\u5F55\u4E0B\u6CA1\u6709 tracked \u8FC7\u7684\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u5220\u9664.gitignore \u6307\u5B9A\u7684\u6587\u4EF6</span>
<span class="token function">git</span> clean -df <span class="token comment"># \u5220\u9664\u5F53\u524D\u76EE\u5F55\u4E0B\u6CA1\u6709\u88AB tracked \u8FC7\u7684\u6587\u4EF6\u548C\u6587\u4EF6\u5939</span>
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span> <span class="token comment"># \u5C06\u6CA1\u6709\u653E\u5165\u5230\u6682\u5B58\u533A\u7684\u6240\u6709\u6587\u4EF6\u6062\u590D</span>
<span class="token function">git</span> checkout main.py <span class="token comment"># \u653E\u5F03\u6307\u5B9A\u6587\u4EF6\u7684\u4FEE\u6539</span>
<span class="token function">git</span> checkout -- main.py <span class="token comment"># \u5C06\u6587\u4EF6\u4ECE\u6682\u5B58\u533A\u6062\u590D\uFF08\u5982\u679C\u6CA1\u6709\u63D0\u4EA4\u5230\u6682\u5B58\u533A\uFF0C\u5C06\u6062\u590D\u5230\u6700\u8FD1\u7248\u672C\uFF09</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6682\u5B58\u533A" tabindex="-1"><a class="header-anchor" href="#\u6682\u5B58\u533A" aria-hidden="true">#</a> \u6682\u5B58\u533A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token comment"># \u63D0\u4EA4\u6240\u6709\u4FEE\u6539\u548C\u65B0\u589E\u7684\u6587\u4EF6</span>
<span class="token function">git</span> <span class="token function">add</span> -u <span class="token comment"># \u53EA\u63D0\u4EA4\u4FEE\u6539\u6587\u4EF6\u4E0D\u63D0\u4EA4\u65B0\u6587\u4EF6</span>
<span class="token function">git</span> ls-files -s <span class="token comment"># \u67E5\u770B\u6682\u5B58\u533A\u6587\u4EF6\u5217\u8868</span>
<span class="token function">git</span> cat-file -p 33c98c <span class="token comment"># \u67E5\u770B\u6682\u5B58\u533A\u6587\u4EF6\u5185\u5BB9, id\u53EF\u4EE5\u662F\u524D\u516D\u4F4D\u6216\u5168\u90E8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5206\u652F\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u7BA1\u7406" aria-hidden="true">#</a> \u5206\u652F\u7BA1\u7406</h2><p>\u5206\u652F\u7528\u4E8E\u4E3A\u9879\u76EE\u589E\u52A0\u65B0\u529F\u80FD\u6216\u4FEE\u590D Bug \u65F6\u4F7F\u7528\u3002</p><h3 id="\u5206\u652F\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F\u6D41\u7A0B" aria-hidden="true">#</a> \u5206\u652F\u6D41\u7A0B</h3><p>\u5927\u90E8\u5206\u60C5\u51B5\u4E0B\u4E0D\u4F1A\u76F4\u63A5\u5728 <mark>main</mark> \u5206\u652F\u5DE5\u4F5C\uFF0C\u6211\u4EEC\u5E94\u8BE5\u4FDD\u62A4\u8FD9\u4E2A\u5206\u652F\u662F\u6700\u7EC8\u5F00\u53D1\u5B8C\u6210\u4EE3\u7801\u5065\u5EB7\u53EF\u4EA4\u4ED8\u8FD0\u884C\u7684\u3002</p><p>\u6240\u6709\u529F\u80FD\u548C\u7F3A\u9677(bug)\u4FEE\u590D\u90FD\u4F1A\u65B0\u5EFA\u5206\u652F\u5B8C\u6210\uFF0C\u9664\u4E86\u8FD9\u4E2A\u6982\u5FF5\u5916\u4E0E\u57FA\u672C\u6D41\u7A0B\u4F7F\u7528\u662F\u4E00\u6837\u7684\u3002</p><ol><li>\u65B0\u5EFA\u529F\u80FD\u5206\u652F</li></ol><blockquote><p>git branch feature-name</p></blockquote><ol start="2"><li>\u5207\u6362\u5230\u65B0\u5206\u652F</li></ol><blockquote><p>git checkout feature-name</p></blockquote><ol start="3"><li>\u5728\u65B0\u5206\u652F\u4E2D\u5B8C\u6210\u529F\u80FD</li></ol><blockquote><p>git commit -m &quot;complete feature&quot;</p></blockquote><ol start="4"><li>\u5207\u6362\u56DE\u4E3B\u5206\u652F,\u5E76\u628A\u65B0\u529F\u80FD\u5408\u5E76\u5230\u4E3B\u5206\u652F</li></ol><blockquote><p>git checkout main git merge feature-name</p></blockquote><ol start="5"><li>\u5220\u9664\u65B0\u5206\u652F</li></ol><blockquote><p>git branch -d feature-name</p></blockquote><ol start="6"><li>\u63D0\u4EA4\u672C\u5730\u4E3B\u5206\u652F\u5230\u8FDC\u7A0B\u5206\u652F</li></ol><blockquote><p>git push origin main</p></blockquote><h3 id="\u5386\u53F2\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#\u5386\u53F2\u7248\u672C" aria-hidden="true">#</a> \u5386\u53F2\u7248\u672C</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> log <span class="token comment"># \u67E5\u770B\u5386\u53F2\u7248\u672C</span>
<span class="token function">git</span> log -p <span class="token comment"># \u67E5\u770B\u5386\u53F2\u7248\u672C\u7684\u4FEE\u6539\u5185\u5BB9</span>
<span class="token function">git</span> checkout commit-id  <span class="token comment"># \u56DE\u9000\u5230\u6307\u5B9A\u7248\u672C</span>
<span class="token function">git</span> checkout commit-id -b \u65B0\u5206\u652F\u540D\u79F0 <span class="token comment"># \u56DE\u9000\u5230\u6307\u5B9A\u7248\u672C\u5E76\u521B\u5EFA\u65B0\u5206\u652F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u603B\u7ED3\u4E0B\u5E38\u7528\u5206\u652F\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3\u4E0B\u5E38\u7528\u5206\u652F\u547D\u4EE4" aria-hidden="true">#</a> \u603B\u7ED3\u4E0B\u5E38\u7528\u5206\u652F\u547D\u4EE4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> branch dev <span class="token comment"># \u521B\u5EFA\u5206\u652F</span>
<span class="token function">git</span> branch <span class="token comment"># \u67E5\u770B\u5206\u652F</span>
<span class="token function">git</span> checkout dev <span class="token comment"># \u5207\u6362\u5206\u652F</span>
<span class="token function">git</span> checkout -b feature/bbs <span class="token comment"># \u521B\u5EFA\u5E76\u5207\u6362\u5206\u652F</span>
<span class="token function">git</span> branch -m dev development <span class="token comment"># \u5C06\u5206\u652F dev \u66F4\u65B0\u4E3A development </span>

<span class="token comment"># \u5408\u5E76 dev \u5206\u652F\u5230 main</span>
<span class="token function">git</span> checkout main
<span class="token function">git</span> merge dev

<span class="token function">git</span> branch -d dev <span class="token comment"># \u5220\u9664\u5206\u652F</span>
<span class="token function">git</span> branch -D dev <span class="token comment"># \u5220\u9664\u6CA1\u6709\u5408\u5E76\u7684\u5206\u652F</span>
<span class="token function">git</span> push origin :dev <span class="token comment"># \u5220\u9664\u8FDC\u7A0B\u5206\u652F</span>
<span class="token function">git</span> branch --no-merged <span class="token comment"># \u67E5\u770B\u672A\u5408\u5E76\u7684\u5206\u652F(\u5207\u6362\u5230 main) </span>
<span class="token function">git</span> branch --merged <span class="token comment"># \u67E5\u770B\u5DF2\u7ECF\u5408\u5E76\u7684\u5206\u652F(\u5207\u6362\u5230 main) </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u8FDC\u7A0B\u4ED3\u5E93</h2><h3 id="\u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93" aria-hidden="true">#</a> \u521B\u5EFA\u8FDC\u7A0B\u4ED3\u5E93</h3>`,29),r={href:"https://github.com/new",target:"_blank",rel:"noopener noreferrer"},u=l("github"),m=s(`<h3 id="\u5173\u8054\u8FDC\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5173\u8054\u8FDC\u7A0B" aria-hidden="true">#</a> \u5173\u8054\u8FDC\u7A0B</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;# demo&quot;</span> <span class="token operator">&gt;&gt;</span> README.md
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token function">git</span> commit -m <span class="token string">&quot;first commit&quot;</span>
<span class="token function">git</span> branch -M main
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/mic1on/demo.git
<span class="token function">git</span> push -u origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h3><p>\u62C9\u53D6\u8FDC\u7A0B\u4E3B\u673A\u67D0\u4E2A\u5206\u652F\u7684\u66F4\u65B0\uFF0C\u518D\u4E0E\u672C\u5730\u7684\u6307\u5B9A\u5206\u652F\u5408\u5E76\u3002</p><ol><li>\u62C9\u53D6 <code>origin</code> \u4E3B\u673A\u7684 <code>dev</code> \u5206\u652F\u4E0E\u672C\u5730\u7684 main \u5206\u652F\u5408\u5E76 git pull origin dev:dev</li><li>\u62C9\u53D6 <code>origin</code> \u4E3B\u673A\u7684 <code>dev</code> \u5206\u652F\u4E0E\u5F53\u524D\u5206\u652F\u5408\u5E76 git pull origin dev</li><li>\u5982\u679C\u8FDC\u7A0B\u5206\u652F\u4E0E\u5F53\u524D\u672C\u5730\u5206\u652F\u540C\u540D\u76F4\u63A5\u6267\u884C git pull</li></ol><h3 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h3><p><code>git push</code>\u547D\u4EE4\u7528\u4E8E\u5C06\u672C\u5730\u5206\u652F\u7684\u66F4\u65B0\uFF0C\u63A8\u9001\u5230\u8FDC\u7A0B\u4E3B\u673A\u3002\u5B83\u7684\u683C\u5F0F\u4E0E<code>git pull</code>\u547D\u4EE4\u76F8\u4F3C\u3002</p><ol><li>\u5C06\u5F53\u524D\u5206\u652F\u63A8\u9001\u5230origin\u4E3B\u673A\u7684\u5BF9\u5E94\u5206\u652F(\u5982\u679C\u5F53\u524D\u5206\u652F\u53EA\u6709\u4E00\u4E2A\u8FFD\u8E2A\u5206\u652F \uFF0C\u53EF\u7701\u7565\u4E3B\u673A\u540D)</li></ol><blockquote><p>git push origin</p></blockquote><ol start="2"><li>\u4F7F\u7528-u\u9009\u9879\u6307\u5B9A\u4E00\u4E2A\u9ED8\u8BA4\u4E3B\u673A ,\u8FD9\u6837\u4EE5\u540E\u5C31\u53EF\u4EE5\u4E0D\u52A0\u4EFB\u4F55\u53C2\u6570\u76F4\u64AD\u4F7F\u7528git push\u3002</li></ol><blockquote><p>git push -u origin main</p></blockquote><ol start="3"><li><p>\u5220\u9664\u8FDC\u7A0Bdev\u5206\u652F git push origin --delete dev</p></li><li><p>\u672C\u5730 dev \u5206\u652F\u5173\u8054\u8FDC\u7A0B\u5206\u652F\u5E76\u63A8\u9001 git push --set-upstream origin dev</p></li></ol><h2 id="reset" tabindex="-1"><a class="header-anchor" href="#reset" aria-hidden="true">#</a> reset</h2><p>\u4F7F\u7528 reset \u6062\u590D\u5230\u5386\u53F2\u63D0\u4EA4\u70B9\uFF0C\u91CD\u7F6E\u6682\u5B58\u533A\u4E0E\u5DE5\u4F5C\u76EE\u5F55\u7684\u5185\u5BB9\u3002</p><h3 id="\u53EF\u9009\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u53EF\u9009\u53C2\u6570" aria-hidden="true">#</a> \u53EF\u9009\u53C2\u6570</h3><p>reset \u6709\u4E09\u4E2A\u9009\u9879\u53EF\u4F7F\u7528</p><ol><li><p><code>--hard</code> \u91CD\u7F6E\u4F4D\u7F6E\u7684\u540C\u65F6\uFF0C\u76F4\u63A5\u5C06 working Tree \u5DE5\u4F5C\u76EE\u5F55\u3001 index \u6682\u5B58\u533A\u53CA repository \u90FD\u91CD\u7F6E\u6210\u76EE\u6807Reset\u8282\u70B9\u7684\u5167\u5BB9</p></li><li><p><code>--soft</code> \u91CD\u7F6E\u4F4D\u7F6E\u7684\u540C\u65F6\uFF0C\u4FDD\u7559working Tree \u5DE5\u4F5C\u76EE\u5F55\u548Cindex \u6682\u5B58\u533A\u7684\u5185\u5BB9\uFF0C\u53EA\u8BA9repository\u4E2D\u7684\u5185\u5BB9\u548C reset \u76EE\u6807\u8282\u70B9\u4FDD\u6301\u4E00\u81F4</p></li><li><p><code>--mixed</code>\uFF08\u9ED8\u8BA4\uFF09 \u91CD\u7F6E\u4F4D\u7F6E\u7684\u540C\u65F6\uFF0C\u53EA\u4FDD\u7559Working Tree \u5DE5\u4F5C\u76EE\u5F55\u7684\u5167\u5BB9\uFF0C\u4F46\u4F1A\u5C06 Index \u6682\u5B58\u533A \u548C Repository \u4E2D\u7684\u5167\u5BB9\u66F4\u6539\u548C reset \u76EE\u6807\u8282\u70B9\u4E00\u81F4</p></li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> reset HEAD^\u3000\u3000<span class="token comment">#\u56DE\u9000\u6240\u6709\u5185\u5BB9\u5230\u4E0A\u4E00\u4E2A\u7248\u672C</span>
<span class="token function">git</span> reset HEAD^\u3000\u3000a.py\u3000<span class="token comment">#\u56DE\u9000a.py\u8FD9\u4E2A\u6587\u4EF6\u7684\u7248\u672C\u5230\u4E0A\u4E00\u4E2A\u7248\u672C</span>
<span class="token function">git</span> reset \u2013soft\u3000\u3000HEAD~3\u3000<span class="token comment">#\u5411\u524D\u56DE\u9000\u5230\u7B2C3\u4E2A\u7248\u672C</span>
<span class="token function">git</span> reset \u2013hard\u3000\u3000origin/master\u3000<span class="token comment">#\u5C06\u672C\u5730\u7684\u72B6\u6001\u56DE\u9000\u5230\u548C\u8FDC\u7A0B\u7684\u4E00\u6837</span>
<span class="token function">git</span> reset 057d\u3000\u3000<span class="token comment">#\u56DE\u9000\u5230\u67D0\u4E2A\u7248\u672C</span>
<span class="token function">git</span> revert HEAD\u3000<span class="token comment">#\u56DE\u9000\u5230\u4E0A\u4E00\u6B21\u63D0\u4EA4\u7684\u72B6\u6001\uFF0C\u6309\u7167\u67D0\u4E00\u6B21\u7684commit\u5B8C\u5168\u53CD\u5411\u7684\u8FDB\u884C\u4E00\u6B21commit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-reset\u548Cgit-revert\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#git-reset\u548Cgit-revert\u7684\u533A\u522B" aria-hidden="true">#</a> Git reset\u548Cgit revert\u7684\u533A\u522B</h4><ul><li>git reset \u662F\u56DE\u6EDA\u5230\u5BF9\u5E94\u7684commit-id\uFF0C\u76F8\u5F53\u4E8E\u662F\u5220\u9664\u4E86commit-id\u4EE5\u540E\u7684\u6240\u6709\u7684\u63D0\u4EA4\uFF0C\u5E76\u4E14\u4E0D\u4F1A\u4EA7\u751F\u65B0\u7684commit-id\u8BB0\u5F55\uFF0C\u5982\u679C\u8981\u63A8\u9001\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\u7684\u8BDD\uFF0C\u9700\u8981\u5F3A\u5236\u63A8\u9001-f</li><li>git revert \u662F\u53CD\u505A\u64A4\u9500\u5176\u4E2D\u7684commit-id\uFF0C\u7136\u540E\u91CD\u65B0\u751F\u6210\u4E00\u4E2Acommit-id\u3002\u672C\u8EAB\u4E0D\u4F1A\u5BF9\u5176\u4ED6\u7684\u63D0\u4EA4commit-id\u4EA7\u751F\u5F71\u54CD\uFF0C\u5982\u679C\u8981\u63A8\u9001\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\u7684\u8BDD\uFF0C\u5C31\u662F\u666E\u901A\u7684\u64CD\u4F5Cgit push\u5C31\u597D\u4E86</li></ul><h2 id="\u5176\u4ED6\u529F\u80FD" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u529F\u80FD" aria-hidden="true">#</a> \u5176\u4ED6\u529F\u80FD</h2><h3 id="gitignore" tabindex="-1"><a class="header-anchor" href="#gitignore" aria-hidden="true">#</a> .gitignore</h3><p>.gitignore \u7528\u4E8E\u5B9A\u4E49\u5FFD\u7565\u63D0\u4EA4\u7684\u6587\u4EF6</p><ul><li>\u6240\u6709\u7A7A\u884C\u6216\u8005\u4EE5\u6CE8\u91CA\u7B26\u53F7 \uFF03 \u5F00\u5934\u7684\u884C\u90FD\u4F1A\u88AB Git \u5FFD\u7565\u3002</li><li>\u5339\u914D\u6A21\u5F0F\u6700\u540E\u8DDF\u53CD\u659C\u6760\uFF08/\uFF09\u8BF4\u660E\u8981\u5FFD\u7565\u7684\u662F\u76EE\u5F55\u3002</li><li>\u53EF\u4EE5\u4F7F\u7528\u6807\u51C6\u7684 glob \u6A21\u5F0F\u5339\u914D\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.idea
/vendor
.env
/node_modules
/public/storage
*.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tag" tabindex="-1"><a class="header-anchor" href="#tag" aria-hidden="true">#</a> Tag</h3><p>Git \u4E5F\u53EF\u4EE5\u5BF9\u67D0\u4E00\u65F6\u95F4\u70B9\u4E0A\u7684\u7248\u672C\u6253\u4E0A\u6807\u7B7E \uFF0C\u7528\u4E8E\u53D1\u5E03\u8F6F\u4EF6\u7248\u672C\u5982 v1.0</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> tag v1.0 <span class="token comment"># \u6DFB\u52A0\u6807\u7B7E</span>
<span class="token function">git</span> tag <span class="token comment"># \u5217\u51FA\u6807\u7B7E</span>
<span class="token function">git</span> push --tags <span class="token comment"># \u63A8\u9001\u6807\u7B7E</span>
<span class="token function">git</span> tag -d v1.0.1 <span class="token comment"># \u5220\u9664\u6807\u7B7E</span>
<span class="token function">git</span> push origin :v1.0.1 <span class="token comment"># \u5220\u9664\u8FDC\u7A0B\u6807\u7B7E</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stashing" tabindex="-1"><a class="header-anchor" href="#stashing" aria-hidden="true">#</a> Stashing</h3><p>\u5F53\u4F60\u6B63\u5728\u8FDB\u884C\u9879\u76EE\u4E2D\u67D0\u4E00\u90E8\u5206\u7684\u5DE5\u4F5C\uFF0C\u91CC\u9762\u7684\u4E1C\u897F\u5904\u4E8E\u4E00\u4E2A\u6BD4\u8F83\u6742\u4E71\u7684\u72B6\u6001\uFF0C\u800C\u4F60\u60F3\u8F6C\u5230\u5176\u4ED6\u5206\u652F\u4E0A\u8FDB\u884C\u4E00\u4E9B\u5DE5\u4F5C\u3002\u95EE\u9898\u662F\uFF0C\u4F60\u4E0D\u60F3\u63D0\u4EA4\u8FDB\u884C\u4E86\u4E00\u534A\u7684\u5DE5\u4F5C\uFF0C\u5426\u5219\u4EE5\u540E\u4F60\u65E0\u6CD5\u56DE\u5230\u8FD9\u4E2A\u5DE5\u4F5C\u70B9\u3002</p><p>&quot;\u6682\u5B58&quot; \u53EF\u4EE5\u83B7\u53D6\u4F60\u5DE5\u4F5C\u76EE\u5F55\u7684\u4E2D\u95F4\u72B6\u6001\u2014\u2014\u4E5F\u5C31\u662F\u4F60\u4FEE\u6539\u8FC7\u7684\u88AB\u8FFD\u8E2A\u7684\u6587\u4EF6\u548C\u6682\u5B58\u7684\u53D8\u66F4\u2014\u2014\u5E76\u5C06\u5B83\u4FDD\u5B58\u5230\u4E00\u4E2A\u672A\u5B8C\u7ED3\u53D8\u66F4\u7684\u5806\u6808\u4E2D\uFF0C\u968F\u65F6\u53EF\u4EE5\u91CD\u65B0\u5E94\u7528\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> stash <span class="token comment"># \u50A8\u85CF\u5DE5\u4F5C</span>
<span class="token function">git</span> stash list <span class="token comment"># \u67E5\u770B\u50A8\u85CF\u5217\u8868</span>
<span class="token function">git</span> stash apply <span class="token comment"># \u5E94\u7528\u6700\u8FD1\u7684\u50A8\u85CF</span>
<span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span> <span class="token comment"># \u5E94\u7528\u66F4\u65E9\u7684\u50A8\u85CF</span>
<span class="token function">git</span> stash drop stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span> <span class="token comment"># \u5220\u9664\u50A8\u85CF</span>
<span class="token function">git</span> stash pop <span class="token comment"># \u5E94\u7528\u5E76\u5220\u9664\u50A8\u85CF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6253\u5305\u538B\u7F29" tabindex="-1"><a class="header-anchor" href="#\u6253\u5305\u538B\u7F29" aria-hidden="true">#</a> \u6253\u5305\u538B\u7F29</h3><p>git \u4E2D\u53EF\u4EE5\u4F7F\u7528 git archive \u8FDB\u884C\u6253\u5305\u64CD\u4F5C \u5C06\u9879\u76EE\u7684 main \u5206\u652F\u6253\u5305\u4E3A blog.zip</p><blockquote><p>git archive --format zip --output blog.zip main</p></blockquote><h3 id="\u591A\u5E93\u63D0\u4EA4" tabindex="-1"><a class="header-anchor" href="#\u591A\u5E93\u63D0\u4EA4" aria-hidden="true">#</a> \u591A\u5E93\u63D0\u4EA4</h3><p>\u5982\u679C\u9700\u8981\u4E00\u4EFD\u4EE3\u7801\u53D1\u5E03\u591A\u4E2A\u8FDC\u7A0B\u4ED3\u5E93\uFF0C\u6BD4\u5982github\u3001gitlab\u3001jetbrains space\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> <span class="token punctuation">{</span>NAME<span class="token punctuation">}</span> <span class="token punctuation">{</span>URL<span class="token punctuation">}</span>

<span class="token comment"># \u6DFB\u52A0\u591A\u4E2A\u8FDC\u7A0B\u4ED3\u5E93</span>
<span class="token function">git</span> remote <span class="token function">add</span> github git@github.com:mic1on/mic1on.github.io.git
<span class="token function">git</span> remote <span class="token function">add</span> space https://git.jetbrains.space/xxx/xxx.git
<span class="token comment"># \u4E00\u6B21\u6027\u63D0\u4EA4\u591A\u4E2A</span>
<span class="token function">git</span> push github <span class="token operator">&amp;</span> <span class="token function">git</span> push space
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u5B58\u50A8\u4E3A\u4E00\u4E2A\u5FEB\u6377\u6307\u4EE4\uFF1A</p><blockquote><p>alias gp=&quot;git push &amp; git push github &amp; git push space&quot;</p></blockquote><p>\u8FD9\u6837\u5C31\u53EF\u4EE5\u4F7F\u7528<code>gp</code>\u5373\u53EF\u5FEB\u6377\u64CD\u4F5C~</p>`,41);function h(v,g){const a=i("ExternalLinkIcon");return t(),c("div",null,[d,n("p",null,[n("a",r,[u,o(a)])]),m])}var f=e(p,[["render",h],["__file","study-git.html.vue"]]);export{f as default};