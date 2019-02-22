const ViewNode = require('./ViewNode');
const registry = require('./element-registry');
const { getViewClass } = registry;

function camelize(kebab) {
  return kebab.replace(/[\-]+(\w)/g, (m, l) => l.toUpperCase());
}


module.exports = class ElementNode extends ViewNode {
  constructor(tagName) {
    super()

    this.nodeType = 1
    this.tagName = tagName

    //there are some special elements that don't exist natively

    const viewClass = getViewClass(tagName)
    if (viewClass) {
      this._nativeView = new viewClass()
      this._nativeView.__GlimmerNativeElement__ = this;
    }


    console.log(`created ${this} ${this._nativeView}`)


    let setStyle = (value) => {
      this.setAttribute('style', value);
    }

    let getStyle = () => {
       return this.getAttribute('style');
    }

    this.style = {
      setProperty: (propertyName, value, priority) => {
         this.setStyle(camelize(propertyName), value);
      },

      removeProperty:  (propertyName) => {
         this.setStyle(camelize(propertyName), null);
      },

      get cssText() {
        console.log("got css text");
        return getStyle();
      },

      set cssText(value) {
        console.log("set css text");
         setStyle(value);
      }
    }

  }

  appendChild(childNode) {
    super.appendChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText((childNode).text)
    }

    if (childNode.nodeType === 7) {
      (childNode).setOnNode(this);
    }
  }

  insertBefore(childNode, referenceNode) {
    super.insertBefore(childNode, referenceNode)

    if (childNode.nodeType === 3) {
      this.setText((childNode).text)
    }

    if (childNode.nodeType === 7) {
      (childNode).setOnNode(this);
    }
  }

  removeChild(childNode) {
    super.removeChild(childNode)

    if (childNode.nodeType === 3) {
      this.setText('')
    }

    if (childNode.nodeType === 7) {
      (childNode).clearOnNode(this);
    }
  }


}
