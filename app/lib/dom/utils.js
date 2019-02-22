const layout = require('tns-core-modules/ui/layouts/layout-base');
const { LayoutBase } = layout;
const content = require('tns-core-modules/ui/content-view');
const { ContentView } = content;
const core = require('tns-core-modules/ui/core/view');
const { View } = core;


export function isView(view) {
  return view instanceof View
}

export function isLayout(view) {
  return view instanceof LayoutBase
}

export function isContentView(view) {
  return view instanceof ContentView
}

export function insertChild(parentNode, childNode, atIndex = -1) {
  if (!parentNode) {
    return
  }

  if (parentNode.meta && typeof parentNode.meta.insertChild === 'function') {
    return parentNode.meta.insertChild(parentNode, childNode, atIndex)
  }

  if (!parentNode.nativeView || !childNode.nativeView) {
     return
  }

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  /*if (parentView instanceof LayoutBase) {
    if (childView.parent === parentView) {
      let index = parentView.getChildIndex(childView)
      if (index !== -1) {
        parentView.removeChild(childView)
      }
    }
    if (atIndex !== -1) {
      parentView.insertChild(childView, atIndex)
    } else {
      parentView.addChild(childView)
    }
  } else if (parentView instanceof ContentView) {
    if (childNode.nodeType === 8) {
      parentView._addView(childView, atIndex)
    } else {
      parentView.content = childView
    }
  } else */
  if (parentView && (parentView)._addChildFromBuilder) {
    (parentView)._addChildFromBuilder(
      childNode._nativeView.constructor.name,
      childView
    )
  } else {
     throw new Error("Parent can't contain children: " + parentNode + ", " + childNode);
  }
}

export function removeChild(parentNode, childNode) {
  if (!parentNode) {
    return
  }

  if (parentNode.meta && typeof parentNode.meta.removeChild === 'function') {
    return parentNode.meta.removeChild(parentNode, childNode)
  }

  if (!childNode.nativeView || !childNode.nativeView) {
    return
  }

  const parentView = parentNode.nativeView
  const childView = childNode.nativeView

  if (parentView instanceof LayoutBase) {
    parentView.removeChild(childView)
  } else if (parentView instanceof ContentView) {
    if (parentView.content === childView) {
      parentView.content = null
    }
    if (childNode.nodeType === 8) {
      parentView._removeView(childView)
    }
  } else if (isView(parentView)) {
    parentView._removeView(childView)
  } else {
    // throw new Error("Unknown parent type: " + parent);
  }
}
