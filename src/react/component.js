/**
 * @description 模拟实现React.Component
 */
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(partialState) {
    this.state = {
      ...state,
      ...partialState
    };
  }
}

module.exports = Component;
