## mapbox课程1 初始化地图



- 课程地址



<a style="display: flex; align-items: center" href='https://www.bilibili.com/video/BV19V3ozFEA7/?spm_id_from=333.1387.homepage.video_card.click' target='_blank'>
<img style="display: block;margin-right: 10px; filter: grayscale(1)" width="20rem" height="20rem" src="https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico" alt="">课程地址
</a>





> Hi! 你好，欢迎来到Mapbox GL JS课程。本章节介绍如何初始化地图。



- HTML
```html
<!--引入相关mapbox js及css-->
<link href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet" />
<script src="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js"></script>

<div id="map"></div>
```

- 配置mapbox token 
```js
mapboxgl.accessToken = 'pk.eyJ1IjoiNGgzajgiLCJhIjoiY202cTRneXdpMDlheDJpb21rdGs2M3V6cSJ9.Ifg4pD0p8LxYmxmxwoTBNA'
```



- Javascript 
```js
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 2
})
```



- 注意

> mapbox 没有style 配置的话是加载不出来东西的哟~


- 结尾
> 如果有不正确的地方，请及时联系我进行更正，感谢观看。

> 致敬不断努力、不断进步的你。

``编辑于2025年11月26日09:24:48``
