import isStyleProp from './is-style-prop'

function isForwardPropertyRootElement(rootEl) {
  return typeof rootEl !== 'string' || rootEl === 'RCTView'
}

function shouldForwardProperty(rootEl, propName) {
  return isForwardPropertyRootElement(rootEl) && !isStyleProp(rootEl, propName)
}

export default function splitProps({
  theme,
  innerRef,
  glam,
  ...rest
}, {propsAreStyleOverrides, rootEl, forwardProps}) {
  const styleOverrides = {}
  const returnValue = {toForward: {}, styleOverrides}

  if (!propsAreStyleOverrides) {
    if (isForwardPropertyRootElement(rootEl)) {
      returnValue.toForward = rest
      return returnValue
    }
  }

  return Object.keys(rest).reduce((split, propName) => {
    if (
      forwardProps.indexOf(propName) !== -1 ||
      shouldForwardProperty(rootEl, propName)
    ) {
      split.toForward[propName] = rest[propName]
    } else if (propsAreStyleOverrides) {
      split.styleOverrides[propName] = rest[propName]
    }
    return split
  }, returnValue)
}
