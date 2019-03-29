// const { Element } = require("./element");
const ReactDOM = require("./react-dom");
const createElement = require("./react/element");

// const text = "Hello React";

function test() {
  alert(122);
}

const vDom = createElement(
  "div",
  {
    style: "border:5px solid green"
  },
  createElement("button", { id: "btn1", onClick: test }, "OK1"),
  createElement("button", { id: "btn2", onClick: test }, "OK2"),
  createElement("button", { id: "btn3", onClick: test }, "OK3")
);

ReactDOM.render(vDom, document.getElementById("root"));

// console.log(Element);
