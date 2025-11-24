const n={},e=`<h1>vue2 与 vue3 上手感觉</h1>
<p>单说引入文件这一快 🐖
是真的不习惯</p>
<ul>
<li>vue2 + webpack</li>
</ul>
<pre><code class="language-js">  const xx = () =&gt; import('xxx)
</code></pre>
<ul>
<li>vue3 + vite</li>
</ul>
<pre><code class="language-js">  const xx = import.meta.glob('./某文件夹/*所有文件')
  // 得到的是一个对象
  const target = {
    './某文件夹/a.js': () =&gt; import('./某文件夹/a.js'),},
  }

  // 如何使用
  target['./某文件夹/a.js']

</code></pre>
`;export{n as attributes,e as html};
