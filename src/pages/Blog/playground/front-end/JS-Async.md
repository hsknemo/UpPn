# 土法造炮

<br>

### JS 的异步问题, 可能常常伴随着我们, 让我们在开发中感到头疼,  接下来看看我在日常使用中是如何解决异步的

<br>

注:  以下 fetch 不一定是浏览器原生 api, 也可能是我们自己封装的

<br>

- Promise, 这个不在赘述, 直接上代码
```js
  你可能遇到这样的一个情况, 一个接口请求完之后你再去请求另外一个接口,
  代码需要写在一个个的 then 里面,从而达到同步的效果

  fetch(url)
  .then(res => res.json())
  .then(
    fetch(url2)
  )
  ..then()

```

- async await
  这可是一个非常非常实用的一个方法

```js
  async function() {
    var reuslt = await fetch(url).then(res => res.json())
    var result2 = await fetch(url2).then(res => res.json())
  }

```

- 用数组去保证异步的执行顺序

 <br>
  
 场景 Vue 页面: 我们有俩组数据, 页面依赖于这两个数据的显示, 如果这两个数据没有及时过来, 那么
      页面, 可能出来但是可能也报错, 这样就会导致页面的显示不正常, 所以我们需要一个解决方法

```html
<div v-if='showPage'>{{ a[b.name] }}</div>
```

```js
   data() {
     return {
       a: {}
       b: {}
     }
   }

  // 解决办法就很简单
  // 利用 Map + callback
  this.action()
  async action() {
    var tableArray = ['a', 'b']

    // 存储每次接口请求的结果及可以拿到是否根据 tableArray 请求完的长度
    var isValideCapture = new Map()

    // 补丁函数 最后执行的
    var patchNotice = _ => {
      this.showPage = true
      // 这样在页面里面就不会再有控制台报错了
    }

    var successCapture =  item => {
      log('每次循环过来的数据', item)

      //  为了不重复数据, 存储每次请求调用
      isValideCapture.set(item, item)

      // 重点      
      if (isValideCapture.size === tableArray.length) {
        //  完全加载好之后才会通知程序走该走的逻辑
        patchNotice()
      }
    }

    var fetch = function(item, callback) {
      item()
      callback(item)
    }

    for (let i = 0; i < tableArray.length; i++) {
      const tableName = tableArray[i]
      // 每一次循环都会执行这个 回调函数
      await fetch(tableName, successCapture)
    }
  },

```

<br >

持续更新中...