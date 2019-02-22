const precompile = require("@glimmer/compiler").precompile;
const opcodeCompiler = require('@glimmer/opcode-compiler');
const {
  Component,
  MINIMAL_CAPABILITIES
} = opcodeCompiler;

/**
 * Ideally we precompile all the templates through a
 * through a plugin at build time. This is done just
 * for demo purposes.
 */
function Compilable(source) {
  return Component(precompile(source));
}

exports.Compilable = Compilable;

// COMPONENTS and HELPERS are normally created as a sideffect of compiling
const COMPONENTS = {
  Row: {
    source: `<label class="h3 m-5" height="30" row="{{@i}}" text="{{@item}}"></label>`,
    handle: 1
  }
};
const HELPERS = {
  'repeat-auto': 0
};

exports.RESOLVER_DELEGATE = {
  lookupComponent(
    name
  ) {
    let component = COMPONENTS[name];
    if (component === null) return null;

    let { handle, source } = component;

    return {
      handle,
      compilable: Compilable(source),
      capabilities: MINIMAL_CAPABILITIES
    };
  },

  lookupHelper(name) {
    if (name in HELPERS) return HELPERS[name];
  }
};