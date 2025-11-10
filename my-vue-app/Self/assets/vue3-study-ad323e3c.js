const e={},n=`<h4>组件内部引入图片 【vite】</h4>
<pre><code class="language-up-br"></code></pre>
<ul>
<li><code>up-keyword 快捷方法</code></li>
</ul>
<pre><code class="language-js">/**
 * 文件名称
 * @param name
 * @returns {string}
 */
const getImg = (name) =&gt; {
  return new URL(\`../assets/img/\${name}\`, import.meta.url).href
}
</code></pre>
`;export{e as attributes,n as html};
