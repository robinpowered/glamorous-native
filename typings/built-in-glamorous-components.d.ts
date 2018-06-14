import { ExtraGlamorousProps } from './glamorous-component'

import {
  ViewProperties,
  TextStyle,
  ViewStyle,
  ImageStyle,
  TextInputProperties,
  ImageProperties,
  ListViewProperties,
  ScrollViewProps,
  TextProperties,
  TouchableHighlightProperties,
  TouchableNativeFeedbackProperties,
  TouchableOpacityProperties,
  TouchableWithoutFeedbackProps,
  FlatListProperties,
  SectionListProperties
} from 'react-native'

export interface NativeComponent {
  Image: React.StatelessComponent<
    ImageProperties & ExtraGlamorousProps & ImageStyle
  >
  ListView: React.StatelessComponent<
    ListViewProperties & ExtraGlamorousProps & ViewStyle
  >
  ScrollView: React.StatelessComponent<
    ScrollViewProps & ExtraGlamorousProps & ViewStyle
  >
  Text: React.StatelessComponent<
    TextProperties & ExtraGlamorousProps & TextStyle
  >
  TextInput: React.StatelessComponent<
    TextInputProperties & ExtraGlamorousProps & TextStyle
  >
  TouchableHighlight: React.StatelessComponent<
    TouchableHighlightProperties & ExtraGlamorousProps & ViewStyle
  >
  TouchableNativeFeedback: React.StatelessComponent<
    TouchableNativeFeedbackProperties & ExtraGlamorousProps & ViewStyle
  >
  TouchableOpacity: React.StatelessComponent<
    TouchableOpacityProperties & ExtraGlamorousProps & ViewStyle
  >
  TouchableWithoutFeedback: React.StatelessComponent<
    TouchableWithoutFeedbackProps & ExtraGlamorousProps & ViewStyle
  >
  View: React.StatelessComponent<
    ViewProperties & ExtraGlamorousProps & ViewStyle
  >
  FlatList: React.StatelessComponent<
    FlatListProperties<any> & ExtraGlamorousProps & ViewStyle
  >
  SectionList: React.StatelessComponent<
    SectionListProperties<any> & ExtraGlamorousProps & ViewStyle
  >
}
