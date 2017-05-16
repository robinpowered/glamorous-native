import isStyleProp from './is-style-prop'

function shouldForwardProperty(rootEl, propName) {
  return typeof rootEl !== 'string' && !isStyleProp(rootEl, propName)
}

export default function splitProps({
  style: styleOverrides = {},
  theme,
  innerRef,
  glam,
  ...rest
}, {propsAreStyleOverrides, rootEl, forwardProps}) {
  const returnValue = {toForward: {}, styleOverrides}

  if (!propsAreStyleOverrides) {
    if (typeof rootEl !== 'string') {
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
