import { BuiltInGlamorousComponentFactory } from './component-factory'

import {
  ViewProperties,
  TextStyle,
  ViewStyle,
  ImageStyle,
  TextInputProperties,
  ImageProperties,
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
  scrollView: NativeGlamorousComponentFactory<ScrollViewProps, ViewStyle>
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
