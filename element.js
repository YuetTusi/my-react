class Element {
  constructor(type, props = null, ...children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

module.exports = { Element };
