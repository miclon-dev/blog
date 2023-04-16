import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as p,o as e,c as o,a as s,b as i,d as n,e as c}from"./app.c099355f.js";const l={},u=n("\u4ECA\u5929\u901Bgithub\u7684\u65F6\u5019\u770B\u5230\u8FD9\u6837\u4E00\u4E2A"),d={href:"https://github.com/pavlov99/json-rpc/blob/master/jsonrpc/dispatcher.py",target:"_blank",rel:"noopener noreferrer"},r=n("\u9879\u76EE"),k=n("\uFF0C\u5176\u4E2D\u5728RPC\u8FDC\u7A0B\u8C03\u7528\u63A5\u53E3\u4E2D\u5B9E\u73B0\u4E00\u4E2A\u529F\u80FD\uFF0C\u5E76\u7528"),m=s("code",null,"add_method",-1),v=n("\u8FDB\u884C\u88C5\u9970\uFF0C\u4E8E\u662F\u6211\u628A\u5B83\u4ECE\u9879\u76EE\u4E2D\u6458\u51FA\u6765\u3002 \u5E76\u5728\u6B64\u57FA\u7840\u4E0A\uFF0C\u6211\u989D\u5916\u589E\u52A0\u4E86"),b=s("code",null,"add_missing_method",-1),_=n("\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5305\u88C5\u4E00\u4E2A\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF0C\u5904\u7406\u62E6\u622A\u672A\u627E\u5230\u65B9\u6CD5\u7684\u60C5\u51B5\u3002"),f=c(`<p>\u4EE5\u4E0B\u4EE3\u7801\u6F14\u793A\u4E86\u5982\u4F55\u52A8\u6001\u8C03\u7528\u51FD\u6570\u3001\u65B9\u6CD5\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>
<span class="token keyword">import</span> functools

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> collections<span class="token punctuation">.</span>abc <span class="token keyword">import</span> MutableMapping
<span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
    <span class="token keyword">from</span> collections <span class="token keyword">import</span> MutableMapping


<span class="token keyword">class</span> <span class="token class-name">Dispatcher</span><span class="token punctuation">(</span>MutableMapping<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; Dictionary like object which maps method_name to method.&quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> prototype<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; Build method dispatcher.
        Parameters
        ----------
        prototype : object or dict, optional
            Initial method mapping.
        Examples
        --------
        Init object with method dictionary.
        &gt;&gt;&gt; Dispatcher({&quot;sum&quot;: lambda a, b: a + b})
        None
        &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>missing_method_name <span class="token operator">=</span> <span class="token string">&#39;__missing__&#39;</span>
        self<span class="token punctuation">.</span>method_map <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> prototype <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>build_method_map<span class="token punctuation">(</span>prototype<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> key <span class="token keyword">in</span> self<span class="token punctuation">.</span>method_map<span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>method_map<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>missing_method_name <span class="token keyword">in</span> self<span class="token punctuation">.</span>method_map<span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>method_map<span class="token punctuation">[</span>self<span class="token punctuation">.</span>missing_method_name<span class="token punctuation">]</span>
        <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span><span class="token string">&#39;missing method &lt;&#39;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&#39;&gt; if you want to close the Exception, you can use &#39;</span>
                                                   <span class="token string">&#39;add_missing_method.&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__setitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>method_map<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value

    <span class="token keyword">def</span> <span class="token function">__delitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">del</span> self<span class="token punctuation">.</span>method_map<span class="token punctuation">[</span>key<span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">__len__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>method_map<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>method_map<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>method_map<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">add_class</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> cls<span class="token punctuation">)</span><span class="token punctuation">:</span>
        prefix <span class="token operator">=</span> cls<span class="token punctuation">.</span>__name__<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;.&#39;</span>
        self<span class="token punctuation">.</span>build_method_map<span class="token punctuation">(</span>cls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> prefix<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">add_object</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
        prefix <span class="token operator">=</span> obj<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;.&#39;</span>
        self<span class="token punctuation">.</span>build_method_map<span class="token punctuation">(</span>obj<span class="token punctuation">,</span> prefix<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">add_dict</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">,</span> prefix<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> prefix<span class="token punctuation">:</span>
            prefix <span class="token operator">+=</span> <span class="token string">&#39;.&#39;</span>
        self<span class="token punctuation">.</span>build_method_map<span class="token punctuation">(</span><span class="token builtin">dict</span><span class="token punctuation">,</span> prefix<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">add_method</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> f<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; Add a method to the dispatcher.
        Parameters
        ----------
        f : callable
            Callable to be added.
        name : str, optional
            Name to register (the default is function **f** name)
        Notes
        -----
        When used as a decorator keeps callable object unmodified.
        Examples
        --------
        Use as method
        &gt;&gt;&gt; d = Dispatcher()
        &gt;&gt;&gt; d.add_method(lambda a, b: a + b, name=&quot;sum&quot;)
        &lt;function __main__.&lt;lambda&gt;&gt;
        Or use as decorator
        &gt;&gt;&gt; d = Dispatcher()
        &gt;&gt;&gt; @d.add_method
            def mymethod(*args, **kwargs):
                print(args, kwargs)
        Or use as a decorator with a different function name
        &gt;&gt;&gt; d = Dispatcher()
        &gt;&gt;&gt; @d.add_method(name=&quot;my.method&quot;)
            def mymethod(*args, **kwargs):
                print(args, kwargs)
        &quot;&quot;&quot;</span>
        <span class="token keyword">if</span> name <span class="token keyword">and</span> <span class="token keyword">not</span> f<span class="token punctuation">:</span>
            <span class="token keyword">return</span> functools<span class="token punctuation">.</span>partial<span class="token punctuation">(</span>self<span class="token punctuation">.</span>add_method<span class="token punctuation">,</span> name<span class="token operator">=</span>name<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>method_map<span class="token punctuation">[</span>name <span class="token keyword">or</span> f<span class="token punctuation">.</span>__name__<span class="token punctuation">]</span> <span class="token operator">=</span> f
        <span class="token keyword">return</span> f

    <span class="token keyword">def</span> <span class="token function">add_missing_method</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> f<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; Add missing method to the dispatcher&quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>missing_method_name <span class="token operator">=</span> name
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>add_method<span class="token punctuation">(</span>f<span class="token punctuation">,</span> name<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">build_method_map</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> prefix<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; Add prototype methods to the dispatcher.
        Parameters
        ----------
        prototype : object or dict
            Initial method mapping.
            If given prototype is a dictionary then all callable objects will
            be added to dispatcher.
            If given prototype is an object then all public methods will
            be used.
        prefix: string, optional
            Prefix of methods
        &quot;&quot;&quot;</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            prototype <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> method<span class="token punctuation">)</span><span class="token punctuation">)</span>
                             <span class="token keyword">for</span> method <span class="token keyword">in</span> <span class="token builtin">dir</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span>
                             <span class="token keyword">if</span> <span class="token keyword">not</span> method<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">&#39;_&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> attr<span class="token punctuation">,</span> method <span class="token keyword">in</span> prototype<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token builtin">callable</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">:</span>
                self<span class="token punctuation">[</span>prefix <span class="token operator">+</span> attr<span class="token punctuation">]</span> <span class="token operator">=</span> method


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    d <span class="token operator">=</span> Dispatcher<span class="token punctuation">(</span><span class="token punctuation">)</span>

    d<span class="token punctuation">.</span>add_method<span class="token punctuation">(</span><span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b<span class="token punctuation">:</span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;sum&quot;</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>add_method<span class="token punctuation">(</span><span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b<span class="token punctuation">:</span> a <span class="token operator">-</span> b<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;sub&quot;</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>add_method<span class="token punctuation">(</span><span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b<span class="token punctuation">:</span> a <span class="token operator">*</span> b<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;mul&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@d<span class="token punctuation">.</span>add_method</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;miclon&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> kwargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token string">&quot;miclon&quot;</span>

    <span class="token decorator annotation punctuation">@d<span class="token punctuation">.</span>add_class</span>
    <span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token punctuation">:</span>
        <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>

        <span class="token keyword">def</span> <span class="token function">method</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>a <span class="token operator">+</span> b
    
    <span class="token decorator annotation punctuation">@d<span class="token punctuation">.</span>add_missing_method</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&#39;__miss__&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">missing_method</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\u672A\u627E\u5230\u63A5\u6536\u8C03\u7528\u7684\u65B9\u6CD5&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">,</span> kwargs<span class="token punctuation">)</span>


    <span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token string">&#39;sum&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 3</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token string">&#39;miclon&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># (&#39;a&#39;, {&#39;b&#39;: &#39;c&#39;}, &#39;d&#39;) {}</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token string">&#39;myclass.method&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 3</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token string">&#39;qqqqq&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># \u672A\u627E\u5230\u63A5\u6536\u8C03\u7528\u7684\u65B9\u6CD5</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><hr><p><code>Dispatcher</code>\u662F\u4E00\u4E2A\u7C7B\u4F3C\u5B57\u5178\u7684\u5BF9\u8C61\uFF0C\u5B83\u8D1F\u8D23\u5B58\u50A8\u65B9\u6CD5\uFF0C\u5E76\u4E14\u63D0\u4F9B\u4E00\u4E2A\u5B57\u5178\u5B58\u50A8\u65B9\u6CD5\u7684\u540D\u79F0\u548C\u65B9\u6CD5\u7684\u6620\u5C04\u3002</p><p>\u5B9E\u9645\u8C03\u7528\u7AEF\u53EF\u4EE5\u901A\u8FC7\u65B9\u6CD5\u540D\u79F0\u6765\u52A8\u6001\u7684\u8C03\u7528\u65B9\u6CD5\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u65B9\u6CD5\u540D\u79F0\u6765\u83B7\u53D6\u65B9\u6CD5\u3002</p><p>\u5B83\u6CA1\u6709\u4EFB\u4F55\u9650\u5236\uFF0C\u4F60\u8981\u505A\u7684\u5C31\u662F\u66B4\u9732\u516C\u5171\u7684\u5B9E\u4F8B\u5316Dispatcher\u7C7B\u3002</p><p>\u7136\u540E\u901A\u8FC7\uFF1A<code>add_method</code>\u65B9\u6CD5\u6DFB\u52A0\u65B9\u6CD5\uFF0C<code>add_class</code>\u65B9\u6CD5\u6DFB\u52A0\u7C7B\uFF0C<code>add_object</code>\u65B9\u6CD5\u6DFB\u52A0\u5BF9\u8C61\uFF0C<code>add_dict</code>\u65B9\u6CD5\u6DFB\u52A0\u5B57\u5178(\u5B57\u5178\u4E2D\u4E5F\u662F\u65B9\u6CD5\u7684\u540D\u79F0\u548C\u65B9\u6CD5\u7684\u6620\u5C04)\uFF0C<code>add_missing_method</code>\u65B9\u6CD5\u6DFB\u52A0\u5F53\u5F15\u7528\u4E00\u4E2A\u4E0D\u5B58\u5728\u65B9\u6CD5\u7684\u65F6\u5019\u7684\u9ED8\u8BA4\u65B9\u6CD5\u3002</p>`,8);function h(g,y){const a=p("ExternalLinkIcon");return e(),o("div",null,[s("p",null,[u,s("a",d,[r,i(a)]),k,m,v,b,_]),f])}var x=t(l,[["render",h],["__file","python-dispatch-method.html.vue"]]);export{x as default};
