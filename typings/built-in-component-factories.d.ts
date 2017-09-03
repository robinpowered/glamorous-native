import { BuiltInGlamorousComponentFactory } from './component-factory'

import {
  ViewProperties,
  ScrollViewStyle,
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

export type NativeGlamorousComponentFactory<
  ElementProps,
  Properties
> = BuiltInGlamorousComponentFactory<ElementProps, Properties>

export interface NativeComponentFactory {
  image: NativeGlamorousComponentFactory<ImageProperties, ImageStyle>
  listView: NativeGlamorousComponentFactory<ListViewProperties, ViewStyle>
  scrollView: NativeGlamorousComponentFactory<ScrollViewProps, ScrollViewStyle>
  text: NativeGlamorousComponentFactory<TextProperties, TextStyle>
  textInput: NativeGlamorousComponentFactory<TextInputProperties, TextStyle>
  touchableHighlight: NativeGlamorousComponentFactory<
    TouchableHighlightProperties,
    ViewStyle
  >
  touchableNativeFeedback: NativeGlamorousComponentFactory<
    TouchableNativeFeedbackProperties,
    ViewStyle
  >
  touchableOpacity: NativeGlamorousComponentFactory<
    TouchableOpacityProperties,
    ViewStyle
  >
  touchableWithoutFeedback: NativeGlamorousComponentFactory<
    TouchableWithoutFeedbackProps,
    ViewStyle
  >
  view: NativeGlamorousComponentFactory<ViewProperties, ViewStyle>
  flatList: NativeGlamorousComponentFactory<FlatListProperties<any>, ViewStyle>
  sectionList: NativeGlamorousComponentFactory<
    SectionListProperties<any>,
    ViewStyle
  >
}

export type ComponentKey = keyof NativeComponentFactory
