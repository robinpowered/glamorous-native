import {Component} from './glamorous'

import {Omit} from './helpers'

/**
* `glamorousComponentFactory` returns a ComponentClass
*
* @see {@link https://github.com/paypal/glamorous/blob/master/src/create-glamorous.js#L28-L131}
*/

export interface ExtraGlamorousProps {
  innerRef?: React.Ref<{}>;
  theme?: object
}

export type GlamorousComponent<ExternalProps, Props> = React.ComponentClass<
  ExtraGlamorousProps & ExternalProps
>
