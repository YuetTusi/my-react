const $ = require("jquery");
const { createReactUnit } = require("./unit");

let ReactDOM = {
  //维护DOM编号
  nextRootIndex: 0,
  /**
   * @description 将元素渲染到目标容器中
   * @param element 渲染的元素，可以是文本、原生DOM或vDOM
   * @param container 容器
   */
  render: function(element, container) {
    let unitInstance = createReactUnit(element);
    let markup = unitInstance.getMarkup(this.nextRootIndex);

    container.appendChild(markup);
    $(document).trigger("mounted"); //将DOM挂载完成后，手动触发mounted事件
  }
};

module.exports = ReactDOM;
