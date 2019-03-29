const $ = require("jquery");

/**
 * 渲染元素的基类
 */
class BaseUnit {
  constructor(element) {
    //当前元素，可能是文本、原生DOM或vDOM
    this._currentElement = element;
  }
  //等子类重写
  getMarkup(index) {
    return `<span data-reactid="${index}">${index}<span>`;
  }
}

/**
 * @description 文本元素
 */
class ReactTextUnit extends BaseUnit {
  constructor(element) {
    super(element);
  }
  /**
   * @description 得到真实DOM，子类重写父类的方法
   * @param {number} index DOM编号
   */
  getMarkup(index) {
    this._rootId = index;
    let span = document.createElement("span");
    span.setAttribute("data-reactid", this._rootId);
    span.appendChild(document.createTextNode(this._currentElement));
    return span;
  }
}

/**
 * @description 原生HTML DOM元素
 */
class ReactNativeUnit extends BaseUnit {
  constructor(element) {
    super(element);
    this._currentElement = element;
  }
  /**
   * @description 得到真实DOM，子类重写父类的方法
   * @param {number} index DOM编号
   */
  getMarkup(index) {
    this._rootId = index;
    let { type, props, children } = this._currentElement;
    let tagName = type;
    let $dom = document.createElement(tagName);
    $dom.setAttribute("data-reactid", index);
    setUnitAttr($dom, props, index);

    children = children || [];
    children.forEach((item, i) => {
      //递归子元素
      let subInstance = createReactUnit(item);
      $dom.appendChild(subInstance.getMarkup(`${this._rootId}.${i}`));
    });
    return $dom;
  }
}

/**
 * @description VirtualDOM元素
 */
class ReactCompositeUnit extends BaseUnit {
  constructor(element) {
    super(element);
  }
  getMarkup(index) {
    let { type: Component, props } = this._currentElement;
    this.compomentInstance = new Component(props);
    if (this.compomentInstance.componentWillMount) {
      this.compomentInstance.componentWillMount();
    }
    let vDom = this.compomentInstance.render();
    $(document).on("mounted", e => {
      if (this.compomentInstance.componentDidMount) {
        this.compomentInstance.componentDidMount();
      }
    });
    return createReactUnit(vDom).getMarkup(index);
  }
}

/**
 * @description 根据元素返回解析后的对象
 * @param element
 * @returns 返回一个对象，内部封装了返回真实DOM方法
 */
function createReactUnit(element) {
  //是文本元素
  if (typeof element === "string" || typeof element === "number") {
    return new ReactTextUnit(element);
  }
  //是原生HTMLDOM
  if (typeof element === "object" && typeof element.type === "string") {
    return new ReactNativeUnit(element);
  }
  //是React 虚拟DOM
  if (typeof element === "object" && typeof element.type === "function") {
    return new ReactCompositeUnit(element);
  }
}

/**
 * @description 设置元素属性
 * @param {Object} el 元素
 * @param {Object} props 属性对象
 * @param {Number} rootIndex 结点编号
 */
function setUnitAttr(el, props, rootIndex = 0) {
  if (props) {
    Object.entries(props).forEach(([name, val]) => {
      if (/^on[A-Z]/.test(name)) {
        //若是以on开头的属性，以委托的方式绑定事件
        $(document).delegate(
          `[data-reactid="${rootIndex}"]`,
          name.slice(2).toLowerCase(),
          val
        );
      } else {
        switch (name) {
          case "className":
            el.setAttribute("class", val);
            break;
          case "htmlFor":
            el.setAttribute("for", val);
            break;
          default:
            el.setAttribute(name, val);
            break;
        }
      }
    });
  }
}

let unit = {
  createReactUnit
};

module.exports = unit;
