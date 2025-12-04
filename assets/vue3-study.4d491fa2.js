const e={},n=`<h4>\u7EC4\u4EF6\u5185\u90E8\u5F15\u5165\u56FE\u7247 \u3010vite vue3\u3011</h4>
<pre><code class="language-up-br"></code></pre>
<ul>
<li><code>up-keyword \u5FEB\u6377\u65B9\u6CD5</code></li>
</ul>
<pre><code class="language-js">/**
 * \u6587\u4EF6\u540D\u79F0
 * @param name
 * @returns {string}
 */
const getImg = (name) =&gt; {
  return new URL(\`../assets/img/\${name}\`, import.meta.url).href
}
</code></pre>
<pre><code class="language-up-br"></code></pre>
<ul>
<li><code>up-keyword \u5FEB\u6377\u65B9\u6CD5</code></li>
</ul>
<h4>\u5BFC\u5305\u3010vite vue3\u3011</h4>
<pre><code class="language-js">/**
 * \u6587\u4EF6\u540D\u79F0
 * @param name
 * @returns {string}
 */
const getLangModuleName = (lang) =&gt; {
    const langModule = import(new URL(\`/node_modules/@shikijs/langs-precompiled/dist/\${lang}.mjs\`, import.meta.url).href)
}
</code></pre>
`;export{e as attributes,n as html};
