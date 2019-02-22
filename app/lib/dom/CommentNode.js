const ElementNode = require('./ElementNode');

module.exports = class CommentNode extends ElementNode {
  constructor(text) {
    super('comment')

    this.nodeType = 8
    this.text = text
    console.log(`created ${this}`)
  }
}
