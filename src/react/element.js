/**
 * @description vDOM
 */
class Element {
  constructor(type, props, ...children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

/**
 * @description 创建vDOM
 * @param  type 元素类型
 * @param props 属性对象
 * @param  {Array} children 子元素集合
 */
function createElement(type, props, ...children) {
  if (children.length === 0) {
    return new Element(type, props);
  } else {
    let subElements = [];

    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] === "string") {
        subElements.push(children[i]);
      } else {
        subElements.push(
          createElement(
            children[i].type,
            children[i].props,
            ...children[i].children
          )
        );
      }
    }
    return new Element(type, props, ...subElements);
  }
}

module.exports = createElement;
