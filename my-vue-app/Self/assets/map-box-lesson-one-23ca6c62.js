const n={},o=`<h2>mapbox课程1 初始化地图</h2>
<br/>
<ul>
<li>课程地址</li>
</ul>
<br/>
<a style="display: flex; align-items: center" href='https://www.bilibili.com/video/BV19V3ozFEA7/?spm_id_from=333.1387.homepage.video_card.click' target='_blank'>
<img style="display: block;margin-right: 10px; filter: grayscale(1)" width="20rem" height="20rem" src="https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico" alt="">课程地址
</a>
<br/>
<br/>
<blockquote>
<p><span style='border: 2px solid #353535; padding: 5px;'>序</span>: Hi! 你好，欢迎来到Mapbox GL JS课程。本章节介绍如何初始化地图。</p>
</blockquote>
<br/>
<ul>
<li>HTML</li>
</ul>
<pre><code class="language-html">&lt;!--引入相关mapbox js及css--&gt;
&lt;link href=&quot;https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css&quot; rel=&quot;stylesheet&quot; /&gt;
&lt;script src=&quot;https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js&quot;&gt;&lt;/script&gt;

&lt;div id=&quot;map&quot;&gt;&lt;/div&gt;
</code></pre>
<ul>
<li>配置mapbox token</li>
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
<br/>
<p><span style='border: 2px solid #353535; padding: 5px;'>注</span>:</p>
<br/>
<blockquote>
<p>mapbox 没有style 配置的话是加载不出来东西的哟~</p>
</blockquote>
<br/>
<p><span style='border: 2px solid #353535; padding: 5px;'>结</span>:</p>
<br/>
<blockquote>
<p>如果有不正确的地方，请及时联系我进行更正，感谢观看。</p>
</blockquote>
<blockquote>
<p>致敬不断努力、不断进步的你。</p>
</blockquote>
`;export{n as attributes,o as html};
