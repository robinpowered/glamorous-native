import { BuiltInGlamorousComponentFactory } from './component-factory'

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

export type NativeGlamorousComponentFactory<
  ElementProps,
  Props
> = BuiltInGlamorousComponentFactory<ElementProps, Props>

export interface NativeComponentFactory {
  image: NativeGlamorousComponentFactory<ImageProps, ImageStyle>
  scrollView: NativeGlamorousComponentFactory<ScrollViewProps, ViewStyle>
  text: NativeGlamorousComponentFactory<TextProps, TextStyle>
  textInput: NativeGlamorousComponentFactory<TextInputProps, TextStyle>
  touchableHighlight: NativeGlamorousComponentFactory<
    TouchableHighlightProps,
    ViewStyle
  >
  touchableNativeFeedback: NativeGlamorousComponentFactory<
    TouchableNativeFeedbackProps,
    ViewStyle
  >
  touchableOpacity: NativeGlamorousComponentFactory<
    TouchableOpacityProps,
    ViewStyle
  >
  touchableWithoutFeedback: NativeGlamorousComponentFactory<
    TouchableWithoutFeedbackProps,
    ViewStyle
  >
  view: NativeGlamorousComponentFactory<ViewProps, ViewStyle>
  flatList: NativeGlamorousComponentFactory<FlatListProps<any>, ViewStyle>
  sectionList: NativeGlamorousComponentFactory<
    SectionListProps<any>,
    ViewStyle
  >
}

export type ComponentKey = keyof NativeComponentFactory
