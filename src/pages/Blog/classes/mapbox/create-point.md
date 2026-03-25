## mapbox课程3 创建一个点
> 准备点位数据，准备撒点图标，将数据源和图层添加到地图上


<br/>

- 课程地址

<br/>

<a style="display: flex; align-items: center" href='https://www.bilibili.com/video/BV1XrGFzBESG/?spm_id_from=333.1387.homepage.video_card.click&vd_source=6d401709c12c2c12d4ed83b1335b9d95' target='_blank'>
<img style="display: block;margin-right: 10px; filter: grayscale(1)" width="20rem" height="20rem" src="https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico" alt="">课程地址
</a>

- 1.引入撒点图标

    

 ```javascript 
 map.loadImage(
  'data:image/png;base64,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', (error, image) => {
    if (error) throw error;
    map.addImage('marker1', image);
  })

map.loadImage(
  'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image);
  })

 
 ```
- 2.准备撒点数据

    

 ```javascript 
 var pointDataGeojson2 = {
  'type': 'FeatureCollection',
  'features': [
    {
      // feature for Mapbox DC
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          121.48211102197638, 31.22894997464809
        ]
      },
      'properties': {
        'title': 'Mapbox DC',
        icon: 'marker1',
      }
    },
    {
      // feature for Mapbox DC
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          121.48343561046238, 31.227123120578284
        ]
      },
      'properties': {
        'title': 'Mapbox DC',
        icon: 'custom-marker',
      }
    },
  ]
}
 
 ```
- 3.创建数据源并添加

    

 ```javascript 
 var pointSource = {
  type: 'geojson',
  data: {
    type: "FeatureCollection",
    features: []
  },
}
map.addSource('pointSource', pointSource)
var point_source = map.getSource('pointSource');
point_source.setData(pointDataGeojson2)
 
 ```
- 4.创建图层并添加

    

 ```javascript 
 var pointLayer1 = {
  id: 'pointLayer2',
  type: 'symbol',
  source: 'pointSource',
  layout: {
    // 为图层设置引用的图片ID
    "icon-image": ['get', 'icon'],
    "icon-size": 1,
  }
}
map.addLayer(pointLayer1)
 
 ```