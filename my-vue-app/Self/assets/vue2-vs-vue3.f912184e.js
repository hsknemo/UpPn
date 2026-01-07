const n={},e=`<h1>vue2 \u4E0E vue3 \u4E0A\u624B\u611F\u89C9</h1>
<p>\u5355\u8BF4\u5F15\u5165\u6587\u4EF6\u8FD9\u4E00\u5FEB \u{1F416}
\u662F\u771F\u7684\u4E0D\u4E60\u60EF</p>
<ul>
<li>vue2 + webpack</li>
</ul>
<pre><code class="language-js">  const xx = () =&gt; import('xxx)
</code></pre>
<ul>
<li>vue3 + vite</li>
</ul>
<pre><code class="language-js">  const xx = import.meta.glob('./\u67D0\u6587\u4EF6\u5939/*\u6240\u6709\u6587\u4EF6')
  // \u5F97\u5230\u7684\u662F\u4E00\u4E2A\u5BF9\u8C61
  const target = {
    './\u67D0\u6587\u4EF6\u5939/a.js': () =&gt; import('./\u67D0\u6587\u4EF6\u5939/a.js'),},
  }

  // \u5982\u4F55\u4F7F\u7528
  target['./\u67D0\u6587\u4EF6\u5939/a.js']

</code></pre>
`;export{n as attributes,e as html};
