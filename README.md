## 手写 react 核心源码

ReactDOM 是一个对象，核心内容为一个 render 渲染方法：

```js
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render("Hello React", document.getElementById("root"));
```

关于最终渲染的 DOM，若是一个文本结点则会使用一个 span 标签来包裹，标签里面使用一个`data-reactid`来对 DOM 结点进行编号：

```html
<span data-reactid="0">Hello React</span>
```

规则如图示：
![dom-index](./dom-index.jpg)

_使用深度优先原则，对整个 DOM 树来进行编号的目的是方便 DOM-diff 算法来更新 DOM 树_

### render 实现

在使用 render 方法来渲染为真实的 HTMLDOM 时，有 3 种情况：

1. 元素就是一个文本或是数值
2. 元素是一个原生的 HTML DOM
3. 元素是一个虚拟结点 vDOM

由于情况较为复杂， 我们抽离出一个方法来处理：`createReactUnit()`。这个方法里面做好判断，对应以上 3 种情况来创建不同的 DOM。

`createReactUnit()` 方法不论传入的是何种类型的元素，它的返回值是一个封装好的**对象**，对象中有一个`getMarkup`方法，调用它则返回一段 HTML 文本，可以直接插入到真实的 DOM 结点上。
