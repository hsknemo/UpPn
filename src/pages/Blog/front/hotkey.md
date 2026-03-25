# 快捷键

```js
window.addEventListener('keydown', ev => {
  console.log(ev)
})
```

<br />
绑定快键键的时候 修饰键 ctrl alt shift meta(mac 的command) 可以同时按下
事件（KeyboardEvent）里面的会记录修饰键为true
