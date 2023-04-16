import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.c099355f.js";const p={},o=e(`<p>\u771F\u6B63\u5F00\u53D1\u4E00\u4E2A\u5B8C\u6574\u9879\u76EE\u7684\u65F6\u5019\uFF0C\u5F80\u5F80\u4E0D\u540C\u7684\u73AF\u5883\u5B58\u5728\u4E0D\u540C\u7684\u9879\u76EE\u914D\u7F6E\u6587\u4EF6\u3002\u5F53\u4F60\u5728\u672C\u5730\u5F00\u53D1\u7684\u65F6\u5019\uFF0C\u914D\u7F6E\u6587\u4EF6\u4E3A<code>development.py</code>\uFF0C\u751F\u4EA7\u73AF\u5883\u65F6\u5019\u7684\u5219\u662F<code>production.py</code>\u3002</p><p>\u4F20\u7EDF\u65B9\u5F0F\uFF1A <code>settings.py</code></p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># \u5F00\u53D1\u73AF\u5883</span>
HOST <span class="token operator">=</span> <span class="token string">&#39;localhost&#39;</span>
PORT <span class="token operator">=</span> <span class="token number">3306</span>
USER <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span>
PASSWORD <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span>
NAME <span class="token operator">=</span> <span class="token string">&#39;db&#39;</span>

<span class="token comment"># \u7EBF\u4E0A\u73AF\u5883</span>
<span class="token comment"># HOST = &#39;112.11.23.89&#39;</span>
<span class="token comment"># PORT = 3306</span>
<span class="token comment"># USER = &#39;root&#39;</span>
<span class="token comment"># PASSWORD = &#39;DWDW@D@#$&#39;</span>
<span class="token comment"># NAME = &#39;db&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\u770B\u4F3C\u7528\u6CE8\u91CA\u7684\u65B9\u5F0F\u533A\u5206\u5F00\u5404\u4E2A\u73AF\u5883\u7684\u914D\u7F6E\u5185\u5BB9\uFF0C\u4F46\u662F\u6BCF\u6B21\u90E8\u7F72\u8FD8\u8981\u624B\u52A8\u5207\u6362\uFF0C\u4EBA\u4E3A\u64CD\u4F5C\u5F80\u5F80\u662F\u5931\u8BEF\u6700\u591A\u7684\u3002</p><p>\u6700\u4E3A\u901A\u4FD7\u7684\u6539\u5199\u65B9\u5F0F\uFF0C\u5E94\u8BE5\u662F\u901A\u8FC7\u8BFB\u53D6\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF\u6765\u533A\u5206\u5F53\u524D\u7684\u5E94\u8BE5\u54EA\u4E2A\u73AF\u5883\u4E0B\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p><p>\u6BD4\u5982\u5728\u5F00\u53D1\u73AF\u5883\u4E2D\uFF0C\u6211\u4EEC\u7684APP_ENV\u4E3Adefault\uFF0C\u800C\u5728\u751F\u4EA7\u5219\u4E3Aproduction\uFF0C\u901A\u8FC7\u8BFB\u53D6APP_ENV\u6765\u8BFB\u53D6\u4E0D\u540C\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p><ul><li>config <ul><li><code>__init__.py</code> # \u8BFB\u53D6\u73AF\u5883\u5F15\u5165\u4E0D\u540C\u7684\u73AF\u5883\u914D\u7F6E\u6587\u4EF6</li><li><code>production.py</code> # \u751F\u4EA7\u73AF\u5883</li><li><code>development.py</code> # \u5F00\u53D1\u73AF\u5883</li></ul></li></ul><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">import</span> os

<span class="token keyword">if</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;env&#39;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> config<span class="token punctuation">.</span>production <span class="token keyword">import</span> <span class="token operator">*</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> config<span class="token punctuation">.</span>development <span class="token keyword">import</span> <span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u7A0D\u5FAE\u6539\u5199\u4E00\u4E0B\uFF0C\u4F7F\u5176\u7528\u8D77\u6765\u66F4\u4F18\u96C5\u3002 <code>config.py</code></p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>
<span class="token keyword">import</span> os


<span class="token keyword">class</span> <span class="token class-name">Config</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__getattribute__<span class="token punctuation">(</span>item<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Production</span><span class="token punctuation">(</span>Config<span class="token punctuation">)</span><span class="token punctuation">:</span>
    HOST <span class="token operator">=</span> <span class="token string">&#39;112.11.23.89&#39;</span>
    PORT <span class="token operator">=</span> <span class="token number">3306</span>
    USER <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span>
    PASSWORD <span class="token operator">=</span> <span class="token string">&#39;DWDW@D@#$&#39;</span>
    NAME <span class="token operator">=</span> <span class="token string">&#39;db&#39;</span>


<span class="token keyword">class</span> <span class="token class-name">Development</span><span class="token punctuation">(</span>Config<span class="token punctuation">)</span><span class="token punctuation">:</span>
    HOST <span class="token operator">=</span> <span class="token string">&#39;localhost&#39;</span>
    PORT <span class="token operator">=</span> <span class="token number">3306</span>
    USER <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span>
    PASSWORD <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span>
    NAME <span class="token operator">=</span> <span class="token string">&#39;db&#39;</span>


mapping <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;development&#39;</span><span class="token punctuation">:</span> Development<span class="token punctuation">,</span>
    <span class="token string">&#39;production&#39;</span><span class="token punctuation">:</span> Production<span class="token punctuation">,</span>
    <span class="token string">&#39;default&#39;</span><span class="token punctuation">:</span> Development
<span class="token punctuation">}</span>

APP_ENV <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;APP_ENV&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span>
config <span class="token operator">=</span> mapping<span class="token punctuation">[</span>APP_ENV<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220608082931.png" alt="" loading="lazy"></p>`,11),t=[o];function i(l,c){return s(),a("div",null,t)}var u=n(p,[["render",i],["__file","python-settings1.html.vue"]]);export{u as default};
