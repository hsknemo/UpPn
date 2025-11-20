#### 组件内部引入图片 【vite vue3】

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

```up-br 
```

- ```up-keyword 快捷方法```


#### 导包【vite vue3】
```js
/**
 * 文件名称
 * @param name
 * @returns {string}
 */
const getLangModuleName = (lang) => {
    const langModule = import(new URL(`/node_modules/@shikijs/langs-precompiled/dist/${lang}.mjs`, import.meta.url).href)
}
```
