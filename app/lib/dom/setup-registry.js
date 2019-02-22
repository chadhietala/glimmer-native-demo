// Largely taken from the Vue implimentation
const registerElement = require('./element-registry').registerElement;

module.exports = function registerElements() {
  registerElement('head', () => null, {

    insertChild(parentNode, childNode, atIndex) {
    },
  })

  registerElement(
    'StackLayout',
    () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout
  )

  registerElement('Label', () => require('tns-core-modules/ui/label').Label)

  registerElement(
    'ActionBar',
    () => require('tns-core-modules/ui/action-bar').ActionBar
  )

  registerElement(
    'GridLayout',
    () => require('tns-core-modules/ui/layouts/grid-layout').GridLayout
  )

  registerElement(
    'ScrollView',
    () => require('tns-core-modules/ui/scroll-view').ScrollView
  )

  registerElement('Frame', () => require('tns-core-modules/ui/frame').Frame, {
    insertChild(parentNode, childNode, atIndex) {
      //dont bother
    }
  });

  registerElement('Button', () => require('tns-core-modules/ui/button').Button)

  registerElement('div', () => require('tns-core-modules/ui/frame').Frame, {
    insertChild(parentNode, childNode, atIndex) {
      //dont bother
      parentNode.appendChild(childNode);
    }
  });

  registerElement(
    'TextView',
    () => require('tns-core-modules/ui/text-view').TextView,
  )

  registerElement(
    'p',
    () => require('tns-core-modules/ui/text-view').TextView,
  )

  registerElement('Page', () => require('tns-core-modules/ui/page').Page)

  registerElement(
    'Comment', () => null
  //  () => require('tns-core-modules/ui/placeholder').Placeholder
  )

}