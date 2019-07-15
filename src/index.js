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

// @TODO: automate the named exports
export const Image = glamorous.Image
export const ScrollView = glamorous.ScrollView
export const Text = glamorous.Text
export const TextInput = glamorous.TextInput
export const TouchableHighlight = glamorous.TouchableHighlight
export const TouchableNativeFeedback = glamorous.TouchableNativeFeedback
export const TouchableOpacity = glamorous.TouchableOpacity
export const TouchableWithoutFeedback = glamorous.TouchableWithoutFeedback
export const View = glamorous.View
// These are only on `glamorous` if the version of ReactNative supports them
export const FlatList = glamorous.FlatList
export const SectionList = glamorous.SectionList

export default glamorous
export {ThemeProvider, withTheme}
