const application = require("tns-core-modules/application");
const ElementNode = require('../dom/ElementNode');
const State = require("@glimmer/object-reference").State;
const Context = require("@glimmer/opcode-compiler").Context;
const artifacts = require("@glimmer/program").artifacts;
const r = require("@glimmer/runtime");
const { renderAot, renderSync, AotRuntime } = r;
const ctx = require('./context');
const DocumentNode = require('../dom/DocumentNode');
const registerElements = require('../dom/setup-registry');
const { RESOLVER_DELEGATE, Compilable } = ctx;
const RUNTIME_RESOLVER = require('./resolver');

module.exports = async function renderComponent(str, data) {
  registerElements();
  let document = new DocumentNode();
  let element = new ElementNode('frame');
  document.appendChild(element);
  let c = Context(RESOLVER_DELEGATE);
  let main = Compilable(str).compile(c);
  let payload = artifacts(c);
  let runtime = AotRuntime(document, payload, RUNTIME_RESOLVER);
  let state = State(data);
  let cursor = { element: element, nextSibling: null };

  application.on(application.launchEvent, () => {
    let iterator = renderAot(runtime, main, cursor, state);
    result = renderSync(runtime.env, iterator);

    // This is super hacky and likely needs to be abstracted away.
    element.nativeView.navigate({
      create: () => {
        return element.firstElement().nativeView
      }
    });
  });


  application.run({
    create() {
      return element.nativeView;
    }
  });
}


