import {
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

export const ReactNativeElementMap = {
  Image,
  ListView,
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

export default Object.keys(ReactNativeElementMap)
