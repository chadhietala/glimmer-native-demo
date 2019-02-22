const map = require('@glimmer/reference').map;
const TEMPLATE_ONLY_COMPONENT = require("@glimmer/runtime").TEMPLATE_ONLY_COMPONENT;

// prettier-ignore
const TABLE = [
  // handle 0 is the increment helper
  args => map(args.positional.at(0), (i) => (new Array(i) ).fill('auto').join(' ')),

  // handle 1 is a template only component
  TEMPLATE_ONLY_COMPONENT
];

module.exports = {
  resolve(handle) {
    if (handle < TABLE.length) {
      return TABLE[handle];
    }
  }
}