import createGlamorous from './create-glamorous'
import splitProps from './split-props'
import ThemeProvider from './theme-provider'
import withTheme from './with-theme'
import reactNativeElements, {
  ReactNativeElementMap,
} from './react-native-elements'

const glamorous = createGlamorous(splitProps)

Object.assign(
  glamorous,
  reactNativeElements.reduce((getters, key) => {
    const tag = key.toLowerCase()
    getters[tag] = glamorous(ReactNativeElementMap[key])
    // backward compatible camel case
    getters[camelCase(key)] = getters[tag]
    return getters
  }, {}),
)

Object.assign(
  glamorous,
  reactNativeElements.reduce((comps, tag) => {
    comps[tag] = glamorous[tag.toLowerCase()]()
    comps[tag].displayName = `glamorous.${tag}`
    comps[tag].propsAreStyleOverrides = true
    return comps
  }, {}),
)

function camelCase(tagName) {
  return tagName.slice(0, 1).toLowerCase() + tagName.slice(1)
}

export default glamorous
export {ThemeProvider, withTheme}
