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

export default glamorous
export {ThemeProvider, withTheme}

// Temporary workaround to allow named component exports
// eg: import {View} from 'glamorous-native
export const FlatList = glamorous.FlatList
export const Image = glamorous.Image
export const ListView = glamorous.ListView
export const ScrollView = glamorous.ScrollView
export const SectionList = glamorous.SectionList
export const Text = glamorous.Text
export const TextInput = glamorous.TextInput
export const TouchableHighlight = glamorous.TouchableHighlight
export const TouchableNativeFeedback = glamorous.TouchableNativeFeedback
export const TouchableOpacity = glamorous.TouchableOpacity
export const TouchableWithoutFeedback = glamorous.TouchableWithoutFeedback
export const View = glamorous.View
