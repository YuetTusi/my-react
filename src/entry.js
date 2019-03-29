// const { Element } = require("./element");
const ReactDOM = require("./react-dom");
const React = require("./react");

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log("will");
  }
  componentDidMount() {
    console.log("did");
  }
  render() {
    return React.createElement(
      "h1",
      null,
      "Hello React.",
      React.createElement("h2", { className: "red" }, "h2"),
      React.createElement("h2", { className: "green" }, "h2"),
      React.createElement("h2", { className: "blue" }, "h2")
    );
  }
}

let counter = React.createElement(Counter, { name: "计数器" });

ReactDOM.render(counter, document.getElementById("root"));

// function test() {
//   alert(122);
// }

// const vDom = createElement(
//   "div",
//   {
//     style: "border:5px solid green",
//     className: "green"
//   },
//   createElement("button", { id: "btn1", onClick: test }, "OK1"),
//   createElement("button", { id: "btn2", onClick: test }, "OK2"),
//   createElement("button", { id: "btn3", onClick: test }, "OK3")
// );

// ReactDOM.render(vDom, document.getElementById("root"));
