# 开发积攒的套路 🐖
## Vue2 相关套路
### 场景 1 双组件平行传值
描述: 假设 component1 组件的数据想让 组件 2 也收到, 该如何传值

-  解决办法 1  上层组件包裹 利用 ``v-model``
```html
  <OutSideCompo> 
    <compoent1 v-model='form' />

    <compoent2  v-model='form' />

  </OutSideCompo>
  <!-- 组件内部利用 props value 去接收 -->
```

```js
  data() {
    return {
      form: {}
    }
  }
```

-  解决办法 2 子组件 向 父组件传值
```html
  <OutSideCompo> 
    <compoent1 @子组件打出的事件='onChange' />

    <compoent2  v-model='form' />

  </OutSideCompo>
  <!-- 组件内部利用 props value 去接收 -->
```

```js
  data() {
    return {
      form: {}
    }
  },
  methods: {
    onChange(val) {
      this.form = val
    }
  }
```

-  解决办法 3 vue-happy-bus
这个需要安装库 针对 vue2 安装
```sh
  # pnpm 安装方式
  pnpm install vue-happy-bus

  # yarn 安装方式
  yarn add vue-happy-bus

  # npm 安装方式
  npm install vue-happy-bus
```
- 如何喂食? 🍭
```js
 // main.js

 import busFactory from 'vue-happy-bus'

 Vue.prototype.$busFactory = busFactory
 
```
- 组件内部如何使用
```html
<component1>
```

```js
  data() {
    return {
      bus: this.$busFactory(this)
    }
  }

  methods: {
    onChange(val) {
      this.bus.$emit('change', val)
    }
  }
```

- 另外一个组件内部接收🍬
```html
    <compoent2 />

```

```js
  created() {
    this.bus.$on('change', (val) => {
      this.form = val
    })
  },
  data() {
    return {
      bus: this.$busFactory(this)
    }
  }
```

```js
  // 实现方法多种多样, vuex 也可以, 但是比较麻烦了
```