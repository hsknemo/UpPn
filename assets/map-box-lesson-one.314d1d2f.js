const l={},o=`<h2>mapbox\u8BFE\u7A0B1 \u521D\u59CB\u5316\u5730\u56FE</h2>
<ul>
<li>\u8BFE\u7A0B\u5730\u5740</li>
</ul>
<a style="display: flex; align-items: center" href='https://www.bilibili.com/video/BV19V3ozFEA7/?spm_id_from=333.1387.homepage.video_card.click' target='_blank'>
<img style="display: block;margin-right: 10px; filter: grayscale(1)" width="20rem" height="20rem" src="https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico" alt="">\u8BFE\u7A0B\u5730\u5740
</a>
<blockquote>
<p>Hi! \u4F60\u597D\uFF0C\u6B22\u8FCE\u6765\u5230Mapbox GL JS\u8BFE\u7A0B\u3002\u672C\u7AE0\u8282\u4ECB\u7ECD\u5982\u4F55\u521D\u59CB\u5316\u5730\u56FE\u3002</p>
</blockquote>
<ul>
<li>HTML</li>
</ul>
<pre><code class="language-html">&lt;!--\u5F15\u5165\u76F8\u5173mapbox js\u53CAcss--&gt;
&lt;link href=&quot;https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css&quot; rel=&quot;stylesheet&quot; /&gt;
&lt;script src=&quot;https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js&quot;&gt;&lt;/script&gt;

&lt;div id=&quot;map&quot;&gt;&lt;/div&gt;
</code></pre>
<ul>
<li>\u914D\u7F6Emapbox token</li>
</ul>
<pre><code class="language-js">mapboxgl.accessToken = 'pk.eyJ1IjoiNGgzajgiLCJhIjoiY202cTRneXdpMDlheDJpb21rdGs2M3V6cSJ9.Ifg4pD0p8LxYmxmxwoTBNA'
</code></pre>
<ul>
<li>Javascript</li>
</ul>
<pre><code class="language-js">const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 2
})
</code></pre>
<ul>
<li>\u6CE8\u610F</li>
</ul>
<blockquote>
<p>mapbox \u6CA1\u6709style \u914D\u7F6E\u7684\u8BDD\u662F\u52A0\u8F7D\u4E0D\u51FA\u6765\u4E1C\u897F\u7684\u54DF~</p>
</blockquote>
<ul>
<li>\u7ED3\u5C3E</li>
</ul>
<blockquote>
<p>\u5982\u679C\u6709\u4E0D\u6B63\u786E\u7684\u5730\u65B9\uFF0C\u8BF7\u53CA\u65F6\u8054\u7CFB\u6211\u8FDB\u884C\u66F4\u6B63\uFF0C\u611F\u8C22\u89C2\u770B\u3002</p>
</blockquote>
<blockquote>
<p>\u81F4\u656C\u4E0D\u65AD\u52AA\u529B\u3001\u4E0D\u65AD\u8FDB\u6B65\u7684\u4F60\u3002</p>
</blockquote>
<p><code>\u7F16\u8F91\u4E8E2025\u5E7411\u670826\u65E509:24:48</code></p>
`;export{l as attributes,o as html};
