import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.c099355f.js";const p={},t=e(`<h2 id="\u5F02\u5E38\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#\u5F02\u5E38\u57FA\u7840" aria-hidden="true">#</a> \u5F02\u5E38\u57FA\u7840</h2><p>\u5728python\u4EE3\u7801\u4E2D\u6355\u83B7\u5F02\u5E38\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>try/except</code>\u8BED\u53E5\u3002\u5B83\u7684\u57FA\u672C\u5F62\u5F0F\u5982\u4E0B\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token comment"># \u9700\u8981\u68C0\u67E5\u7684\u4EE3\u7801</span>
<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406\u5F02\u5E38\u7684\u4EE3\u7801</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD8\u53EF\u4EE5\u4F7F\u7528finally\u5B50\u53E5\uFF0C\u5728\u5F02\u5E38\u53D1\u751F\u65F6\u6267\u884C\u4E00\u4E9B\u6E05\u7406\u5DE5\u4F5C\uFF0C\u4EE5\u53CA\u4E0D\u7BA1\u662F\u5426\u53D1\u751F\u5F02\u5E38\u90FD\u8981\u6267\u884C\u7684\u64CD\u4F5C\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token comment"># \u9700\u8981\u68C0\u67E5\u7684\u4EE3\u7801</span>
<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406\u5F02\u5E38\u7684\u4EE3\u7801</span>
<span class="token keyword">finally</span><span class="token punctuation">:</span>
    <span class="token comment"># \u4E0D\u7BA1\u662F\u5426\u53D1\u751F\u5F02\u5E38\u90FD\u8981\u6267\u884C\u7684\u4EE3\u7801</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u5916\uFF0C\u5728<code>except</code>\u5B50\u53E5\u4E2D\uFF0C\u53EF\u4EE5\u6839\u636E\u4E0D\u540C\u7684\u5F02\u5E38\u7C7B\u578B\u4F7F\u7528\u4E0D\u540C\u7684\u5904\u7406\u65B9\u5F0F\uFF0C\u4EE5\u4FBF\u66F4\u52A0\u7CBE\u786E\u5730\u5904\u7406\u5F02\u5E38\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token comment"># \u9700\u8981\u68C0\u67E5\u7684\u4EE3\u7801</span>
<span class="token keyword">except</span> ValueError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406ValueError\u5F02\u5E38\u7684\u4EE3\u7801</span>
<span class="token keyword">except</span> TypeError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406TypeError\u5F02\u5E38\u7684\u4EE3\u7801</span>
<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406\u5176\u4ED6\u5F02\u5E38\u7684\u4EE3\u7801</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C\u4E3A\u4E86\u7ED9\u4E00\u4E2A\u65B9\u6CD5\u6DFB\u52A0\u5F02\u5E38\u5904\u7406\uFF0C\u9700\u8981\u5728\u65B9\u6CD5\u4E2D\u6DFB\u52A0\u5927\u91CF\u7684<code>try/except</code>\u8BED\u53E5\uFF0C\u8FD9\u6837\u4F1A\u4F7F\u4EE3\u7801\u53D8\u5F97\u5F88\u5197\u957F\uFF0C\u4E0D\u6613\u9605\u8BFB\u3002\u56E0\u6B64\uFF0C\u7B14\u8005\u5C1D\u8BD5\u4E00\u79CD\u66F4\u52A0\u4F18\u96C5\u7684\u65B9\u5F0F\u6765\u5904\u7406\u5F02\u5E38\u3002</p><h2 id="\u5F02\u5E38\u5904\u7406\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u5F02\u5E38\u5904\u7406\u88C5\u9970\u5668" aria-hidden="true">#</a> \u5F02\u5E38\u5904\u7406\u88C5\u9970\u5668</h2><p>\u7B14\u8005\u7684\u521D\u6B65\u6784\u601D\u662F\u6211\u53EA\u9700\u8981\u7ED9\u9700\u8981\u6355\u6349\u5F02\u5E38\u7684\u51FD\u6570\u6DFB\u52A0\u4E00\u4E2A\u88C5\u9970\u5668\uFF0C\u968F\u540E\u6211\u4EEC\u53EF\u4EE5\u5C06\u8BE5\u51FD\u6570\u7684\u5404\u7C7B\u5F02\u5E38\u5206\u79BB\u51FA\u6765\uFF0C\u7EDF\u4E00\u5904\u7406\u3002\u8FD9\u6837\u5C31\u53EF\u4EE5\u907F\u514D\u5728\u51FD\u6570\u4E2D\u6DFB\u52A0\u5927\u91CF\u7684<code>try/except</code>\u8BED\u53E5\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># \u4F2A\u4EE3\u7801</span>

<span class="token decorator annotation punctuation">@tryme</span>
<span class="token keyword">def</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># \u9700\u8981\u68C0\u67E5\u7684\u4EE3\u7801</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@func<span class="token punctuation">.</span>exception</span><span class="token punctuation">(</span>ZeroDivisionError<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">handle_zero_division_error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># \u5904\u7406ZeroDivisionError\u5F02\u5E38\u7684\u4EE3\u7801</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\uFF0C\u5F53<code>func</code>\u51FD\u6570\u53D1\u751F<code>ZeroDivisionError</code>\u5F02\u5E38\u65F6\uFF0C\u5C31\u4F1A\u8C03\u7528<code>handle_zero_division_error</code>\u51FD\u6570\u6765\u5904\u7406\u5F02\u5E38\u3002</p><p>\u89C2\u5BDF\u4EE5\u4E0A\u4F2A\u4EE3\u7801\uFF0C\u9996\u5148\u6211\u4EEC\u5728<code>func</code>\u51FD\u6570\u4E0A\u6DFB\u52A0\u4E86\u4E00\u4E2A\u88C5\u9970\u5668<code>@tryme</code>\uFF0C\u8FD9\u70B9\u4E0D\u96BE\u7406\u89E3\uFF0C\u800C\u540E\u9762\u6211\u4EEC\u6DFB\u52A0\u5F02\u5E38\u88C5\u9970\u5668\u662F\u4F7F\u7528<code>@func.exception</code>\uFF0C\u4F46\u662F\u6211\u4EEC\u7684<code>func</code>\u51FD\u6570\u5E76\u6CA1\u6709<code>exception</code>\u5C5E\u6027\uFF0C\u8FD9\u662F\u600E\u4E48\u56DE\u4E8B\u5462\uFF1F\u5176\u5B9E\u8FD9\u4E5F\u4E0D\u96BE\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u5728<code>@tryme</code>\u7684\u88C5\u9970\u5668\u4E2D\uFF0C\u5C06<code>func</code>\u51FD\u6570\u7684<code>exception</code>\u5C5E\u6027<strong>\u6307\u5411\u4E00\u4E2A\u65B0\u7684\u51FD\u6570</strong>\uFF0C\u8FD9\u4E2A\u51FD\u6570\u7684\u4F5C\u7528\u5C31\u662F\u6DFB\u52A0\u5F02\u5E38\u5904\u7406\u51FD\u6570\u3002</p><h3 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Callable<span class="token punctuation">,</span> Dict<span class="token punctuation">,</span> Any


<span class="token keyword">def</span> <span class="token function">tryme</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    exception_<span class="token punctuation">:</span> Dict<span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Callable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            ret <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            <span class="token keyword">if</span> ret <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> ret
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            handler <span class="token operator">=</span> <span class="token boolean">None</span>
            <span class="token keyword">for</span> c <span class="token keyword">in</span> exception_<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">:</span>
                    handler <span class="token operator">=</span> c

            <span class="token keyword">if</span> handler <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">raise</span> e

            <span class="token keyword">return</span> exception_<span class="token punctuation">[</span>handler<span class="token punctuation">]</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">except_</span><span class="token punctuation">(</span><span class="token operator">*</span>exceptions<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> e <span class="token keyword">in</span> exceptions<span class="token punctuation">:</span>
                exception_<span class="token punctuation">[</span>e<span class="token punctuation">]</span> <span class="token operator">=</span> f
            <span class="token keyword">return</span> f

        <span class="token keyword">return</span> decorator
    <span class="token comment"># \u5C06exception\u5C5E\u6027\u6307\u5411except_\u51FD\u6570</span>
    <span class="token comment"># \u8FD9\u6837\u5C31\u53EF\u4EE5\u4F7F\u7528@func.exception\u6765\u6DFB\u52A0\u5F02\u5E38\u5904\u7406\u51FD\u6570</span>
    wrapper<span class="token punctuation">.</span>exception <span class="token operator">=</span> except_
    <span class="token keyword">return</span> wrapper


<span class="token decorator annotation punctuation">@tryme</span>
<span class="token keyword">def</span> <span class="token function">my_function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@my_function<span class="token punctuation">.</span>exception</span><span class="token punctuation">(</span>ZeroDivisionError<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">handle_zero_division_error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;zero division error&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    my_function<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E00\u7248\u672C\u4E2D\u6709\u4E2A\u4E0D\u592A\u5408\u7406\u7684\u5730\u65B9\uFF0C\u5047\u8BBE\u6211\u670910\u4E2A\u51FD\u6570\u9700\u8981\u6355\u6349\u67D0\u4E2A\u6307\u5B9A\u5F02\u5E38\uFF0C\u5C82\u4E0D\u662F\u8981\u519910\u6B21<code>@my_function.exception(ZeroDivisionError)</code>\uFF1F\u8FD9\u6837\u7684\u4EE3\u7801\u663E\u7136\u4E0D\u591F\u4F18\u96C5\uFF0C\u56E0\u6B64\u6211\u4EEC\u9700\u8981\u6539\u8FDB\u4E00\u4E0B\u3002\u4F7F\u7528\u7C7B\u6765\u5C01\u88C5\u5F02\u5E38\u88C5\u9970\u5668\uFF0C\u540C\u4E00\u5B9E\u4F8B\u5316\u7684\u5BF9\u8C61\u53EF\u4EE5\u5171\u4EAB\u5F02\u5E38\u5904\u7406\u51FD\u6570\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Callable<span class="token punctuation">,</span> Dict<span class="token punctuation">,</span> Any


<span class="token keyword">class</span> <span class="token class-name">TryMe</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>exception_<span class="token punctuation">:</span> Dict<span class="token punctuation">[</span>Any<span class="token punctuation">,</span> Callable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">def</span> <span class="token function">try_</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
        <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">try</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                handler <span class="token operator">=</span> <span class="token boolean">None</span>
                <span class="token keyword">for</span> c <span class="token keyword">in</span> self<span class="token punctuation">.</span>exception_<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                    <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">:</span>
                        handler <span class="token operator">=</span> c

                <span class="token keyword">if</span> handler <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                    <span class="token keyword">raise</span> e
                <span class="token comment"># \u5C06\u5F02\u5E38\u53D1\u751F\u7684\u51FD\u6570\u548C\u5F02\u5E38\u5BF9\u8C61\u4F20\u5165\u5F02\u5E38\u5904\u7406\u51FD\u6570</span>
                <span class="token keyword">return</span> self<span class="token punctuation">.</span>exception_<span class="token punctuation">[</span>handler<span class="token punctuation">]</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> e<span class="token punctuation">)</span>

        <span class="token keyword">return</span> wrapper

    <span class="token keyword">def</span> <span class="token function">except_</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>exceptions<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> e <span class="token keyword">in</span> exceptions<span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>exception_<span class="token punctuation">[</span>e<span class="token punctuation">]</span> <span class="token operator">=</span> f
            <span class="token keyword">return</span> f

        <span class="token keyword">return</span> decorator


tryme <span class="token operator">=</span> TryMe<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@tryme<span class="token punctuation">.</span>try_</span>
<span class="token keyword">def</span> <span class="token function">my_function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@tryme<span class="token punctuation">.</span>try_</span>
<span class="token keyword">def</span> <span class="token function">my_function2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@tryme<span class="token punctuation">.</span>except_</span><span class="token punctuation">(</span>ZeroDivisionError<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">handle_zero_division_error</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    my_function<span class="token punctuation">(</span><span class="token punctuation">)</span>
    my_function2<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u8F93\u51FA\uFF1A
my_function division by zero
my_function2 division by zero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7EDF\u4E00\u5C01\u88C5\u5F02\u5E38\u51FD\u6570\uFF0C\u7531\u4E8E\u8C03\u7528\u5F02\u5E38\u51FD\u6570\u65F6\uFF0C\u4F1A\u4F20\u5165\u5F02\u5E38\u53D1\u751F\u7684\u51FD\u6570\u548C\u5F02\u5E38\u5BF9\u8C61\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u5728\u5F02\u5E38\u51FD\u6570\u4E2D\u83B7\u53D6\u5F02\u5E38\u53D1\u751F\u7684\u51FD\u6570\u7684\u4FE1\u606F\uFF0C\u6BD4\u5982\u51FD\u6570\u540D\u3001\u53C2\u6570\u7B49\u3002</p><h2 id="trytry" tabindex="-1"><a class="header-anchor" href="#trytry" aria-hidden="true">#</a> trytry</h2><p>\u7ED3\u5408\u672C\u6B21\u5B66\u4E60\uFF0C\u7B14\u8005\u5F00\u53D1\u4E86<code>trytry</code>\u6A21\u5757\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u4EE5\u4E0A\u5168\u90E8\u529F\u80FD\uFF0C\u5E76\u4E14\u652F\u6301\u81EA\u5B9A\u4E49\u51FD\u6570\u5F02\u5E38\u5904\u7406\u548Cfinally\uFF0C\u5168\u5C40\u5F02\u5E38\u5904\u7406\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>pip <span class="token function">install</span> trytry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> trytry <span class="token keyword">import</span> trytry


<span class="token decorator annotation punctuation">@trytry</span>
<span class="token keyword">def</span> <span class="token function">my_function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">raise</span> FileNotFoundError<span class="token punctuation">(</span><span class="token string">&#39;file not found&#39;</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@trytry</span>
<span class="token keyword">def</span> <span class="token function">my_function2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@trytry<span class="token punctuation">.</span>exception</span><span class="token punctuation">(</span>ZeroDivisionError<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">handle_zero_division_error</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@trytry<span class="token punctuation">.</span>exception</span><span class="token punctuation">(</span>FileNotFoundError<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">handle_file_not_found_error</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@my_function<span class="token punctuation">.</span>finally_</span>
<span class="token keyword">def</span> <span class="token function">my_function_finally</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>my_function<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> <span class="token string">&quot;finally&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    my_function<span class="token punctuation">(</span><span class="token punctuation">)</span>
    my_function2<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>my_function file not found
my_function finally
my_function2 division by zero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u672C\u6587\u4E0D\u4EC5\u4ECB\u7ECD\u4E86Python\u4E2D\u7684\u5F02\u5E38\u5904\u7406\u673A\u5236\uFF0C\u8FD8\u5B9E\u73B0\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u5F02\u5E38\u88C5\u9970\u5668\u3002\u9762\u5BF9\u591A\u4E2A\u5F02\u5E38\u9700\u8981\u5728\u51FD\u6570\u540E\u8FFD\u52A0\u5404\u79CD<code>except</code>\u8BED\u53E5\uFF0C\u663E\u5F97\u4EE3\u7801\u4E0D\u591F\u4F18\u96C5\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u88C5\u9970\u5668\u6765\u5B9E\u73B0\u5F02\u5E38\u5904\u7406\uFF0C\u8FD9\u6837\u53EF\u4EE5\u4F7F\u4EE3\u7801\u66F4\u52A0\u7B80\u6D01\u3002</p>`,26),o=[t];function c(i,l){return s(),a("div",null,o)}var d=n(p,[["render",c],["__file","python-error-handler.html.vue"]]);export{d as default};
