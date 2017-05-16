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
// eslint-disable-next-line max-len
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes'
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes'

const viewStyleProps = Object.keys(ViewStylePropTypes)
const textStyleProps = Object.keys(TextStylePropTypes)

const viewStyleComponents = [
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
]

const textStyleComponents = [
  Text,
  TextInput,
]

export default function isStyleProp(element, propName) {
  if (textStyleComponents.indexOf(element) > -1) {
    return textStyleProps.indexOf(propName) > -1
  }

  if (viewStyleComponents.indexOf(element) > -1) {
    return viewStyleProps.indexOf(propName) > -1
  }

  return false
}
