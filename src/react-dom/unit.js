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
    if (props) {
      //赋属性值
      Object.entries(props).forEach(([key, val]) => {
        if (/^on[A-Z]/.test(key)) {
          //若是以on开头的属性，以委托的方式绑定事件
          $(document).delegate(
            `[data-reactid="${this._rootId}"]`,
            key.slice(2).toLowerCase(),
            val
          );
        } else {
          $dom.setAttribute(key, val);
        }
      });
    }

    children = children || [];
    children.forEach((item, i) => {
      //递归子元素
      let subInstance = createReactUnit(item);
      // console.log(subInstance.getMarkup("abc"));
      $dom.appendChild(subInstance.getMarkup(`${this._rootId}.${i}`));
    });
    // $dom.innerHTML = children.join(""); //将子元素的所有内容加到标签里

    return $dom;
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
  if (typeof element === "object" && typeof element.type === "string") {
    return new ReactNativeUnit(element);
  }
}

let unit = {
  createReactUnit
};

module.exports = unit;
