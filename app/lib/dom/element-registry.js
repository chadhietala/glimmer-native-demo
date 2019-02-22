const elementMap = {}
const dashRegExp = /-/g

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpenTag: false,
  component: null
}

function normalizeElementName(elementName) {
  return `${elementName
    .replace(dashRegExp, '')
    .toLowerCase()}`
}

exports.normalizeElementName = normalizeElementName;

exports.registerElement = function registerElement(elementName, resolver, meta = null) {
  const normalizedName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap[normalizedName]) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  const entry = {
    resolver: resolver,
    meta: meta
  }
  elementMap[normalizedName] = entry
}

exports.getElementMap = function getElementMap() {
  return elementMap
}

exports.getViewClass = function getViewClass(elementName) {
  const normalizedName = normalizeElementName(elementName)
  const entry = elementMap[normalizedName]

  if (!entry) {
    throw new TypeError(`No known component for element ${elementName}.`)
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
  }
}

exports.getViewMeta = function getViewMeta(elementName) {
  const normalizedName = normalizeElementName(elementName)

  let meta = defaultViewMeta
  const entry = elementMap[normalizedName]

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

exports.isKnownView = function isKnownView(elementName) {
  return elementMap[normalizeElementName(elementName)]
}

