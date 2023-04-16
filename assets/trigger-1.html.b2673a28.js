import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{o as s,c as a,e}from"./app.c099355f.js";const t={},p=e(`<h2 id="\u89E6\u53D1\u5668trigger" tabindex="-1"><a class="header-anchor" href="#\u89E6\u53D1\u5668trigger" aria-hidden="true">#</a> \u89E6\u53D1\u5668Trigger</h2><blockquote><p>\u89E6\u53D1\u5668\u5305\u542B\u8C03\u5EA6\u903B\u8F91\u3002\u6BCF\u4E2AJob\u90FD\u6709\u81EA\u5DF1\u7684\u89E6\u53D1\u5668\uFF0C\u7528\u4E8E<strong>\u786E\u5B9A\u4E0B\u4E00\u6B21\u8FD0\u884C\u4F5C\u4E1A\u7684\u65F6\u95F4</strong>\u3002\u9664\u4E86\u521D\u59CB\u914D\u7F6E\u4E4B\u5916\uFF0C\u89E6\u53D1\u5668\u662F\u5B8C\u5168\u65E0\u72B6\u6001\u7684\u3002</p></blockquote><p>\u8A00\u7B80\u610F\u8D45\uFF0C\u89E6\u53D1\u5668\u7684\u4F5C\u7528\u5C31\u662F\u6839\u636E\u7528\u6237\u9884\u8BBE\u7684\u65F6\u95F4\uFF0C\u8BA1\u7B97\u51FA\u4E0B\u4E00\u6B21\u8FD0\u884C\u7684\u65F6\u95F4\u3002\u8FD9\u4E2A\u65F6\u95F4\u53EF\u80FD\u662F\u56FA\u5B9A\u7684\u4E00\u4E2A\u65F6\u95F4\u3001\u4E5F\u6709\u53EF\u80FD\u662F\u6BCF\u9694\u4E00\u6BB5\u65F6\u95F4\u3001\u4E5F\u6709\u53EF\u80FD\u662Fcron\u8868\u8FBE\u5F0F\u3002</p><h2 id="\u89E6\u53D1\u5668\u7684\u79CD\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u89E6\u53D1\u5668\u7684\u79CD\u7C7B" aria-hidden="true">#</a> \u89E6\u53D1\u5668\u7684\u79CD\u7C7B</h2><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804204113.png" alt="" loading="lazy"></p><p>\u56DB\u5927\u6838\u5FC3\u89E6\u53D1\u5668\uFF1A</p><ul><li><code>BaseCombiningTrigger</code> \u7EC4\u5408\u6A21\u5F0F\u89E6\u53D1\u5668 <ul><li><code>AndTrigger</code> \u7ED9\u5B9A\u6240\u6709\u89E6\u53D1\u5668\u4E2D<strong>\u540C\u65F6\u6EE1\u8DB3</strong>\u6700\u65E9\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\uFF0C\u5982\u679C\u4E00\u76F4\u4E0D\u6EE1\u8DB3\u4F1A\u6B7B\u5FAA\u73AF\u3002</li><li><code>OrTrigger</code> \u7ED9\u5B9A\u6240\u6709\u89E6\u53D1\u5668\u4E2D<strong>\u4EFB\u610F\u4E00\u4E2A</strong>\u6700\u65E9\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\u3002</li></ul></li><li><code>IntervalTrigger</code> \u5B9A\u65F6\u5468\u671F\u6027\u89E6\u53D1\u5668</li><li><code>CronTrigger</code> cron\u8868\u8FBE\u5F0F\u89E6\u53D1\u5668</li><li><code>DateTrigger</code> \u6307\u5B9A\u65E5\u671F\u89E6\u53D1\u5668</li></ul><p>\u8FD9\u56DB\u5927\u6838\u5FC3\u89E6\u53D1\u5668\u7684\u7236\u7C7B\u5747\u662F<code>BaseTrigger</code>\u3002</p><h2 id="basetrigger" tabindex="-1"><a class="header-anchor" href="#basetrigger" aria-hidden="true">#</a> BaseTrigger</h2><p>\u89E6\u53D1\u5668\u57FA\u7C7B\u662F\u4E00\u4E2A\u62BD\u8C61\u7C7B\uFF0C\u5B83\u6709\u4E00\u4E2A\u62BD\u8C61\u65B9\u6CD5\u548C\u4E00\u4E2A\u5185\u90E8\u65B9\u6CD5\u3002</p><h3 id="get-next-fire-time" tabindex="-1"><a class="header-anchor" href="#get-next-fire-time" aria-hidden="true">#</a> get_next_fire_time</h3><p>\u8BE5\u65B9\u6CD5\u65F6\u62BD\u8C61\u65B9\u6CD5\uFF0C\u6240\u6709\u57FA\u7840\u81EA<code>BaseTrigger</code>\u89E6\u53D1\u5668\u7684\u90FD\u5FC5\u987B\u5B9E\u73B0\u8BE5\u65B9\u6CD5\u3002 \u8BE5\u65B9\u6CD5\u662F\u6574\u4E2A\u89E6\u53D1\u5668\u7684\u6838\u5FC3\u65B9\u6CD5\uFF0C\u5B83\u6839\u636E\u89E6\u53D1\u5668\u7684\u914D\u7F6E\uFF0C\u8BA1\u7B97\u51FA\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\u3002</p><h3 id="apply-jitter" tabindex="-1"><a class="header-anchor" href="#apply-jitter" aria-hidden="true">#</a> _apply_jitter</h3><p>\u6240\u6709\u7EE7\u627F<code>BaseTrigger</code>\u7684\u5B50\u7C7B\u90FD\u62E5\u6709\u6B64\u65B9\u6CD5\u3002 \u8BE5\u65B9\u6CD5\u7528\u4E8E\u6D6E\u52A8\u4E0B\u4E00\u6B21\u8FD0\u884C\u65F6\u95F4\uFF0C\u503C\u5F97\u6CE8\u610F\u7684\u662F\uFF1A\u8FD9\u4E2A\u6A21\u5F0F\u5728DateTrigger(\u65E5\u671F\u89E6\u53D1\u5668)\u4E0B\u4E0D\u88AB\u4F7F\u7528\u3002</p><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804213637.png" alt="" loading="lazy"></p><h1 id="basecombiningtrigger" tabindex="-1"><a class="header-anchor" href="#basecombiningtrigger" aria-hidden="true">#</a> BaseCombiningTrigger</h1><p>\u8FD9\u662F\u7EC4\u5408\u6A21\u5F0F\u89E6\u53D1\u5668\u7684\u57FA\u7C7B\uFF0C\u4E3B\u8981\u4F5C\u7528\u5C31\u662F\u7EA6\u675F\u4E86\u89E6\u53D1\u5668\u7684\u5E8F\u5217\u5316\u4E0E\u53CD\u5E8F\u5217\u5316\u7684\u5BF9\u8C61\u5173\u7CFB\u3002</p><p>\u7C7B\u7684\u5E8F\u5217\u5316\u4E0E\u53CD\u5E8F\u5217\u5316\u540E\u671F\u4F1A\u4E13\u95E8\u5F00\u6587\u7AE0\u8BE6\u7EC6\u8BB2\u89E3\uFF0C\u4F46\u4E3A\u4E86\u5927\u5BB6\u6709\u4E2A\u521D\u6B65\u6982\u5FF5\uFF0C\u6211\u5199\u4E86\u4E00\u4E2Ademo\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>
<span class="token keyword">import</span> pickle


<span class="token keyword">class</span> <span class="token class-name">Demo</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name

    <span class="token keyword">def</span> <span class="token function">__getstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;getstate.\u5F00\u59CB\u5E8F\u5217\u5316&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>name<span class="token punctuation">}</span>

    <span class="token keyword">def</span> <span class="token function">__setstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;getstate.\u5F00\u59CB\u53CD\u5E8F\u5217\u5316&#39;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> state<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    d <span class="token operator">=</span> Demo<span class="token punctuation">(</span><span class="token string">&#39;miclon&#39;</span><span class="token punctuation">)</span>
    b_obj <span class="token operator">=</span> pickle<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>d<span class="token punctuation">)</span>
    new_d <span class="token operator">=</span> pickle<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>b_obj<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">(</span>new_d<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 140432814944208 140432815293104</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>new_d<span class="token punctuation">.</span>name<span class="token punctuation">)</span>  <span class="token comment"># miclon</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u5728\u7C7B\u4E2D\u901A\u8FC7<code>__getstate__</code>\u7EA6\u675F\u7C7B\u7684\u5E8F\u5217\u5316\u6A21\u578B\uFF0C\u901A\u8FC7<code>__setstate__</code>\u53D6\u51FA\u53CD\u5E8F\u5217\u5316\u7684\u5C5E\u6027\u3002 \u8FD9\u4E00\u5207\u90FD\u5F52\u529F\u4E8E<code>pickle</code>\u6A21\u5757\u3002</p><p>\u6709\u4E86\u521D\u6B65\u7684\u6982\u5FF5\uFF0C\u6211\u4EEC\u518D\u770B<code>BaseCombiningTrigger</code>\u4E2D\u7684\u8FD9\u4E24\u4E2A\u9B54\u672F\u65B9\u6CD5\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">__getstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;version&#39;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token string">&#39;triggers&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">(</span>obj_to_ref<span class="token punctuation">(</span>trigger<span class="token punctuation">.</span>__class__<span class="token punctuation">)</span><span class="token punctuation">,</span> trigger<span class="token punctuation">.</span>__getstate__<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                      <span class="token keyword">for</span> trigger <span class="token keyword">in</span> self<span class="token punctuation">.</span>triggers<span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string">&#39;jitter&#39;</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>jitter
    <span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">__setstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> state<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;version&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> ValueError<span class="token punctuation">(</span>
            <span class="token string">&#39;Got serialized data for version %s of %s, but only versions up to 1 can be &#39;</span>
            <span class="token string">&#39;handled&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>state<span class="token punctuation">[</span><span class="token string">&#39;version&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span><span class="token punctuation">)</span>

    self<span class="token punctuation">.</span>jitter <span class="token operator">=</span> state<span class="token punctuation">[</span><span class="token string">&#39;jitter&#39;</span><span class="token punctuation">]</span>
    self<span class="token punctuation">.</span>triggers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> clsref<span class="token punctuation">,</span> state <span class="token keyword">in</span> state<span class="token punctuation">[</span><span class="token string">&#39;triggers&#39;</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        cls <span class="token operator">=</span> ref_to_obj<span class="token punctuation">(</span>clsref<span class="token punctuation">)</span>
        trigger <span class="token operator">=</span> cls<span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
        trigger<span class="token punctuation">.</span>__setstate__<span class="token punctuation">(</span>state<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>triggers<span class="token punctuation">.</span>append<span class="token punctuation">(</span>trigger<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u5B9E\u5B83\u5C31\u662F\u4E3A\u63A5\u4E0B\u6765\u7684\u5B50\u7C7B<code>OrTrigger</code>\u548C<code>AndTrigger</code>\u63D0\u4F9B\u4E86\u4E00\u4E2A\u5E8F\u5217\u5316\u6A21\u677F\u3002</p><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\u8FD8\u6709\u4E24\u4E2A\u6709\u610F\u601D\u7684\u51FD\u6570\uFF1A<code>obj_to_ref</code>\u548C<code>ref_to_obj</code>\u3002\u6211\u4EEC\u4F9D\u7136\u4F7F\u7528\u6700\u5C0F\u5355\u5143\u6D4B\u8BD5\u6765\u9610\u8FF0\u8FD9\u4E24\u4E2A\u51FD\u6570\u7684\u4F5C\u7528\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">from</span> apscheduler<span class="token punctuation">.</span>triggers<span class="token punctuation">.</span>interval <span class="token keyword">import</span> IntervalTrigger
<span class="token keyword">from</span> apscheduler<span class="token punctuation">.</span>util <span class="token keyword">import</span> obj_to_ref<span class="token punctuation">,</span> ref_to_obj

trigger <span class="token operator">=</span> IntervalTrigger<span class="token punctuation">(</span>seconds<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment"># \u5BF9\u8C61\u8F6C\u6362\u4E3A\u5F15\u7528</span>
ref <span class="token operator">=</span> obj_to_ref<span class="token punctuation">(</span>trigger<span class="token punctuation">.</span>__class__<span class="token punctuation">)</span>
<span class="token comment"># \u5F15\u7528\u8F6C\u6362\u4E3A\u5BF9\u8C61</span>
obj <span class="token operator">=</span> ref_to_obj<span class="token punctuation">(</span>ref<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>ref<span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
<span class="token comment"># apscheduler.triggers.interval:IntervalTrigger </span>
<span class="token comment"># &lt;class &#39;apscheduler.triggers.interval.IntervalTrigger&#39;&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u539F\u6765\u8FD9\u4E24\u4E2A\u51FD\u6570\u7684\u4F5C\u7528\u5C31\u662F\u5BF9\u8C61\u4E0E\u5F15\u7528\u7684\u4E92\u76F8\u8F6C\u6362\u3002</p><h2 id="andtrigger" tabindex="-1"><a class="header-anchor" href="#andtrigger" aria-hidden="true">#</a> AndTrigger</h2><p>\u7ED9\u5B9A\u6240\u6709\u89E6\u53D1\u5668\u4E2D<strong>\u540C\u65F6\u6EE1\u8DB3</strong>\u6700\u65E9\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\uFF0C\u5982\u679C\u4E00\u76F4\u4E0D\u6EE1\u8DB3\u4F1A\u6B7B\u5FAA\u73AF\u3002</p><p>\u6709\u4E86\u57FA\u7C7B<code>BaseCombiningTrigger</code>\u7684\u52A0\u6301\uFF0C<code>AndTrigger</code>\u7C7B\u7684\u5B9E\u73B0\u975E\u5E38\u7B80\u5355\uFF0C\u4EC5\u9700\u8981\u5B9E\u73B0\u62BD\u8C61\u65B9\u6CD5<code>get_next_fire_time</code>\u5373\u53EF\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">get_next_fire_time</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> previous_fire_time<span class="token punctuation">,</span> now<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token comment"># \u83B7\u53D6\u591A\u4E2A\u89E6\u53D1\u5668\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4</span>
        fire_times <span class="token operator">=</span> <span class="token punctuation">[</span>trigger<span class="token punctuation">.</span>get_next_fire_time<span class="token punctuation">(</span>previous_fire_time<span class="token punctuation">,</span> now<span class="token punctuation">)</span>
                      <span class="token keyword">for</span> trigger <span class="token keyword">in</span> self<span class="token punctuation">.</span>triggers<span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token boolean">None</span> <span class="token keyword">in</span> fire_times<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">None</span>
        <span class="token comment"># \u5982\u679C\u591A\u4E2A\u89E6\u53D1\u5668\u4E2D\u6240\u6709\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\u90FD\u76F8\u540C\uFF0C\u5219\u8FD4\u56DE\u5176\u4E2D\u4E00\u4E2A(\u5176\u5B9E\u54EA\u4E2A\u90FD\u4E00\u6837\uFF0C\u56E0\u4E3A\u90FD\u884C\u76F8\u540C\u4E86)</span>
        <span class="token keyword">elif</span> <span class="token builtin">min</span><span class="token punctuation">(</span>fire_times<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">max</span><span class="token punctuation">(</span>fire_times<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>_apply_jitter<span class="token punctuation">(</span>fire_times<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>jitter<span class="token punctuation">,</span> now<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token comment"># \u5426\u5219\uFF0C\u5C31\u5C06now\u8BBE\u7F6E\u4E3A\u6700\u8FDF\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\uFF0C\u7136\u540E\u7EE7\u7EED\u5FAA\u73AF</span>
            now <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span>fire_times<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521D\u770B\u4EE3\u7801\u4E0D\u89C9\u5F97\u4EC0\u4E48\uFF0C\u5F53\u6211\u5199\u4E0B\u6CE8\u91CA\u65F6\u8111\u6D77\u4E2D\u6D6E\u73B0\u4E00\u4E2A\u7591\u95EE\uFF1F\u5982\u4F55\u4FDD\u8BC1\u6211\u63D0\u4F9B\u7684\u591A\u4E2A\u89E6\u53D1\u5668\u90FD\u80FD\u5728\u76F8\u540C\u7684\u65F6\u95F4\u89E6\u53D1\uFF1F\u56E0\u4E3A\u4E0D\u6EE1\u8DB3\u662F\u4E2A\u6B7B\u5FAA\u73AF\u5440\uFF01\u5E26\u7740\u7591\u95EE\u53BB\u5B98\u7F51\u770B\u770B\u6709\u6CA1\u6709\u89E3\u91CA\u3002</p><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804222710.png" alt="" loading="lazy"></p><p>\u770B\u5B8C\u5B98\u65B9\u4F8B\u5B50\u6211\u66F4\u7CCA\u6D82\u4E86\uFF0C\u539F\u56E0\u5728\u4E8E\u5B83\u5B9A\u4E49\u4E86\u4E24\u4E2A\u89E6\u53D1\u5668\uFF1A</p><ol><li>IntervalTrigger(hours=2)</li><li>CronTrigger(day_of_week=&#39;sat,sun&#39;)</li></ol><p>\u95EE\u9898\u5C31\u5728\u8FD9\u91CC\uFF0C\u5047\u5982\u6211\u57282022\u5E7408\u670804\u65E520:32:12\u5F00\u59CB\u8BA1\u65F6\uFF0C\u90A3\u4E48<code>IntervalTrigger</code>\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\u662F\u4EC0\u4E48\uFF1F</p><p>\u7B54\u6848\u662F2022\u5E7408\u670804\u65E522:32:12\u3002\u4E5F\u5C31\u662F\u4EE5\u540E\u6240\u6709\u65F6\u95F4\u7684xx:32:12\u3002</p><p>\u90A3\u4E48<code>cronTrigger</code>\u5462\uFF1F\u5B83\u5B9A\u4E49\u7684\u662F\u53EA\u5728 Saturdays and Sundays \u89E6\u53D1\u3002\u8FD9\u663E\u7136\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u7684\u96F6\u70B9\u554A</p><p>\u76F4\u63A5\u9A8C\u8BC1\u4E0B\u8BF4\u6CD5\uFF1A</p><p>\u8FD9\u662FIntervalTrigger\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\uFF1A</p><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804224244.png" alt="" loading="lazy"></p><p>\u4E5F\u5C31\u662F\u6BCF\u4E24\u4E2A\u5C0F\u65F6\u768441\u520609\u79D2\u3002</p><p>\u8FD9\u662FCronTrigger\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\uFF1A</p><p><img src="https://miclon-job.oss-cn-hangzhou.aliyuncs.com/img/20220804224527.png" alt="" loading="lazy"></p><p>\u8FD9\u662F\u6BCF\u4E2A\u5468\u7684\u5468\u516D\u7684\u96F6\u70B9\u3002</p><p>\u8FD9\u4E24\u4E2A\u65F6\u95F4\u663E\u7136\u6C38\u8FDC\u4E0D\u4F1A\u5B58\u5728\u4EA4\u96C6\uFF01BUG\uFF01\uFF01</p><p>\u6240\u4EE5\u89E3\u51B3\u65B9\u6848\u6700\u7B80\u5355\u7684\u5C31\u662F\uFF0C\u5728\u8BBE\u7F6E<code>IntervalTrigger</code>\u7684\u65F6\u5019\u7ED9\u5B83\u4E00\u4E2A\u96F6\u70B9\u7684\u65F6\u95F4\u3002</p><h2 id="ortrigger" tabindex="-1"><a class="header-anchor" href="#ortrigger" aria-hidden="true">#</a> OrTrigger</h2><p>\u7ED9\u5B9A\u6240\u6709\u89E6\u53D1\u5668\u4E2D<strong>\u4EFB\u610F\u4E00\u4E2A</strong>\u6700\u65E9\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">get_next_fire_time</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> previous_fire_time<span class="token punctuation">,</span> now<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># \u83B7\u53D6\u591A\u4E2A\u89E6\u53D1\u5668\u7684\u4E0B\u4E00\u6B21\u89E6\u53D1\u65F6\u95F4</span>
    fire_times <span class="token operator">=</span> <span class="token punctuation">[</span>trigger<span class="token punctuation">.</span>get_next_fire_time<span class="token punctuation">(</span>previous_fire_time<span class="token punctuation">,</span> now<span class="token punctuation">)</span>
                  <span class="token keyword">for</span> trigger <span class="token keyword">in</span> self<span class="token punctuation">.</span>triggers<span class="token punctuation">]</span>
    <span class="token comment"># \u8FC7\u6EE4\u6389None\u7684\u65F6\u95F4</span>
    fire_times <span class="token operator">=</span> <span class="token punctuation">[</span>fire_time <span class="token keyword">for</span> fire_time <span class="token keyword">in</span> fire_times <span class="token keyword">if</span> fire_time <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> fire_times<span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_apply_jitter<span class="token punctuation">(</span><span class="token builtin">min</span><span class="token punctuation">(</span>fire_times<span class="token punctuation">)</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>jitter<span class="token punctuation">,</span> now<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u770B\u8D77\u6765\u662F\u53EF\u4EE5\u4F7F\u7528\u4E24\u4E2Ajob\u6307\u5B9A\u4E0D\u540C\u7684\u89E6\u53D1\u5668\u8FBE\u5230\u76F8\u540C\u6548\u679C\u7684\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u63A5\u4E0B\u6765\u4F1A\u7EE7\u7EED\u5BF9\u5269\u4F59\u7684\u4E09\u4E2A\u89E6\u53D1\u5668\u505A\u4F9D\u6B21\u7684\u5256\u6790\uFF0C\u6700\u540E\u7B14\u8005\u4F1A\u7ED3\u5408\u9605\u8BFB\u6E90\u7801\u7684\u7ECF\u9A8C\u79EF\u7D2F\u505A\u4E00\u4E2A\u81EA\u5DF1\u7684\u89E6\u53D1\u5668\u3002 \u53E6\u5916\uFF0C\u5728\u4F7F\u7528<code>AndTrigger</code>\u7EC4\u5408\u89E6\u53D1\u5668\u4E0B\u6CE8\u610Fstart_date\u9700\u8981\u6307\u5B9A\u3002</p>`,52),o=[p];function i(c,l){return s(),a("div",null,o)}var d=n(t,[["render",i],["__file","trigger-1.html.vue"]]);export{d as default};