import { ExtraGlamorousProps } from './glamorous-component'

import {
  ViewProps,
  TextStyle,
  ViewStyle,
  ImageStyle,
  TextInputProps,
  ImageProps,
  ScrollViewProps,
  TextProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  TouchableWithoutFeedbackProps,
  FlatListProps,
  SectionListProps
} from 'react-native'

export interface NativeComponent {
  Image: React.StatelessComponent<
    ImageProps & ExtraGlamorousProps & ImageStyle
  >
  ScrollView: React.StatelessComponent<
    ScrollViewProps & ExtraGlamorousProps & ViewStyle
  >
  Text: React.StatelessComponent<
    TextProps & ExtraGlamorousProps & TextStyle
  >
  TextInput: React.StatelessComponent<
    TextInputProps & ExtraGlamorousProps & TextStyle
  >
  TouchableHighlight: React.StatelessComponent<
    TouchableHighlightProps & ExtraGlamorousProps & ViewStyle
  >
  TouchableNativeFeedback: React.StatelessComponent<
    TouchableNativeFeedbackProps & ExtraGlamorousProps & ViewStyle
  >
  TouchableOpacity: React.StatelessComponent<
    TouchableOpacityProps & ExtraGlamorousProps & ViewStyle
  >
  TouchableWithoutFeedback: React.StatelessComponent<
    TouchableWithoutFeedbackProps & ExtraGlamorousProps & ViewStyle
  >
  View: React.StatelessComponent<
    ViewProps & ExtraGlamorousProps & ViewStyle
  >
  FlatList: React.StatelessComponent<
    FlatListProps<any> & ExtraGlamorousProps & ViewStyle
  >
  SectionList: React.StatelessComponent<
    SectionListProps<any> & ExtraGlamorousProps & ViewStyle
  >
}
