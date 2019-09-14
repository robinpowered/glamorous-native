import {
    Animated,
    FlatList,
    Image,
    ListView,
    ScrollView,
    SectionList,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

import reactNativeProps from './react-native-props'

/* eslint-disable max-len */
const typeToProps = new Map()
typeToProps.set(FlatList, reactNativeProps.FlatList)
typeToProps.set(Image, reactNativeProps.Image)
typeToProps.set(ListView, reactNativeProps.ListView)
typeToProps.set(ScrollView, reactNativeProps.ScrollView)
typeToProps.set(SectionList, reactNativeProps.SectionList)
typeToProps.set(Text, reactNativeProps.Text)
typeToProps.set(TextInput, reactNativeProps.TextInput)
typeToProps.set(TouchableHighlight, reactNativeProps.TouchableHighlight)
typeToProps.set(TouchableNativeFeedback, reactNativeProps.TouchableNativeFeedback)
typeToProps.set(TouchableOpacity, reactNativeProps.TouchableOpacity)
typeToProps.set(TouchableWithoutFeedback, reactNativeProps.TouchableWithoutFeedback)
typeToProps.set(View, reactNativeProps.View)
/* eslint-enable max-len */

const allTypes = Object.values(reactNativeProps).reduce((set, props) => {
  props.forEach(prop => set.add(prop))
  return set
}, new Set())

function isRnProp(type, propName) {
  if (propName === 'children' || propName === 'style') {
    return true
  }

  const props = typeToProps.get(type)
  if (props) {
    return props.indexOf(propName) !== -1
  } else {
    // If it's a unknown component type,
    // we have to allow all possible react-native props instead
    return allTypes.has(propName)
  }
}

function isRnAnimatedProp(type, propName) {
  return propName === 'style' || isRnProp(type, propName)
}

export default function isReactNativeProp(element, propName) {
  if (element === Animated.Image) {
    return isRnAnimatedProp(Image, propName)
  }
  if (element === Animated.View) {
    return isRnAnimatedProp(View, propName)
  }
  if (element === Animated.Text) {
    return isRnAnimatedProp(Text, propName)
  }

  return isRnProp(element, propName)
}
