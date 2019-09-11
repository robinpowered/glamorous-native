// Type definitions for Glamorous v3.2.0
// Project: https://github.com/paypal/glamorous
// Definitions by: Kok Sam <https://github.com/sammkj>

import * as React from 'react'
import { NativeComponent } from './built-in-glamorous-components'
import {
  NativeComponentFactory,
  ComponentKey,
} from './built-in-component-factories'
import { GlamorousComponent, ExtraGlamorousProps } from './glamorous-component'
import {
  BuiltInGlamorousComponentFactory,
  KeyGlamorousComponentFactory,
  KeyGlamorousComponentFactoryCssOverides,
  GlamorousComponentFactory,
  GlamorousComponentFactoryCssOverides,
} from './component-factory'
import { StyleFunction, StyleArray, StyleArgument } from './style-arguments'

import { Omit } from './helpers'
import {
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from 'react-native'

export {
  GlamorousComponent,
  ExtraGlamorousProps,
  StyleFunction,
  StyleArray,
  StyleArgument,
  BuiltInGlamorousComponentFactory,
  KeyGlamorousComponentFactory,
  KeyGlamorousComponentFactoryCssOverides,
  GlamorousComponentFactory,
  GlamorousComponentFactoryCssOverides,
  NativeComponent,
  NativeComponentFactory,
  ComponentKey,
}

export interface GlamorousOptions<Props, Context, DefaultProps> {
  displayName: string
  rootEl: string | React.ComponentType<any>
  forwardProps: String[]
  shouldClassNameUpdate: (
    props: Props,
    prevProps: Props,
    context: Context,
    prevContext: Context
  ) => boolean
  propsAreCssOverrides?: false
  withProps: DefaultProps
}

export interface PropsAreCssOverridesGlamorousOptions<
  Props,
  Context,
  DefaultProps
> {
  displayName?: string
  rootEl?: string | React.ComponentType<any>
  forwardProps?: String[]
  shouldClassNameUpdate?: (
    props: Props,
    prevProps: Props,
    context: Context,
    prevContext: Context
  ) => boolean
  propsAreCssOverrides: true
  withProps?: DefaultProps
}

export type Component<T, StyleType = AllStyles> =
  | React.ComponentClass<T>
  | React.StatelessComponent<T>

type OmitInternals<Props extends GlamorousProps> = Omit<
  Props,
  keyof GlamorousProps
>

type GlamorousProps = { theme?: object }

type AllStyles = TextStyle | ViewStyle | ImageStyle

export interface GlamorousInterface
  extends NativeComponentFactory,
    NativeComponent {
  <
    ExternalProps extends { style?: StyleProp<AllStyles> },
    StyleType = ExternalProps['style'],
    Context = object,
    DefaultProps extends object = object
  >(
    component: Component<
      ExternalProps & GlamorousProps & { style?: StyleType }
    >,
    options?: Partial<GlamorousOptions<ExternalProps, Context, DefaultProps>>
  ): GlamorousComponentFactory<ExternalProps, StyleType, DefaultProps>
  // # Glamarous Component factories
  // Two overloads are needed per shape due to a union return of CSSProperties | SVGProperties
  // resulting in a loss of typesafety on function arguments
  // ## create a component factory from your own component
}

interface ThemeProps {
  theme: object
}

export class ThemeProvider extends React.Component<ThemeProps, any> {}

export function withTheme<Props extends { theme: any }>(
  component: React.ComponentClass<Props>
): React.ComponentClass<Omit<Props, 'theme'>>

export function withTheme<Props extends { theme: any }>(
  component: React.StatelessComponent<Props>
): React.StatelessComponent<Omit<Props, 'theme'>>

declare const glamorous: GlamorousInterface

export default glamorous
