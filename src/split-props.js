import isStyleProp from './is-style-prop'
import isReactNativeProp from './is-react-native-prop'
import {elementConstructors} from './react-native-elements'

function isReactNativeElement(rootEl) {
  return elementConstructors.indexOf(rootEl) !== -1 || rootEl === 'RCTView'
}

function shouldForwardProperty(rootEl, propName) {
  return (
    isReactNativeElement(rootEl) &&
    isReactNativeProp(rootEl, propName) &&
    !isStyleProp(rootEl, propName)
  )
}

export default function splitProps(
  {theme, innerRef, glam, ...rest},
  {propsAreStyleOverrides, rootEl, forwardProps},
) {
  const styleOverrides = {}
  const returnValue = {toForward: {}, styleOverrides}

  if (!propsAreStyleOverrides) {
    // Forward everything to non-builtin components
    if (!isReactNativeElement(rootEl)) {
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
    } else if (propsAreStyleOverrides && isStyleProp(rootEl, propName)) {
      split.styleOverrides[propName] = rest[propName]
    }
    return split
  }, returnValue)
}
