import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from 'react-native'

export const ReactNativeElementMap = {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
}

// Gracefully append new components that may not be supported
// in earlier React Native versions
if (FlatList) {
  ReactNativeElementMap.FlatList = FlatList
}

if (SectionList) {
  ReactNativeElementMap.SectionList = SectionList
}

if (ImageBackground) {
  ReactNativeElementMap.ImageBackground = ImageBackground
}

export default Object.keys(ReactNativeElementMap)
