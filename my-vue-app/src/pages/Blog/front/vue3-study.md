#### 组件内部引入图片 【vite】

```up-br 
```

- ```up-keyword 快捷方法```



```js
/**
 * 文件名称
 * @param name
 * @returns {string}
 */
const getImg = (name) => {
  return new URL(`../assets/img/${name}`, import.meta.url).href
}
```
