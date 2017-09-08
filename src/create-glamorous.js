import React from 'react'
import {StyleSheet} from 'react-native'
import {CHANNEL} from './constants'
import getStyles from './get-styles'
import PropTypes from './react-compat'

function prepareStyles(styles) {
  return styles.filter(style => {
    if (typeof style === 'object') {
      return Object.keys(style).length > 0
    }
    return true
  })
  .map(style => {
    if (typeof style === 'object') {
      return StyleSheet.create({style}).style
    }
    return style
  })
}

export default function createGlamorous(splitProps) {
  return function glamorous(
    comp,
    {rootEl, displayName, forwardProps = []} = {},
  ) {
    return glamorousComponentFactory

    function glamorousComponentFactory(...unpreparedStyles) {
      const styles = prepareStyles(unpreparedStyles)

      class GlamorousComponent extends React.Component {
        state = {theme: null}
        setTheme = theme => this.setState({theme})

        constructor(props, context) {
          super(props, context)
          this.onRef = this.onRef.bind(this)
        }

        componentWillMount() {
          const {theme} = this.props

          if (this.context[CHANNEL]) {
            this.setTheme(theme ? theme : this.context[CHANNEL].getState())
          } else {
            this.setTheme(theme || {})
          }
        }

        componentWillReceiveProps(nextProps) {
          if (this.props.theme !== nextProps.theme) {
            this.setTheme(nextProps.theme)
          }
        }

        componentDidMount() {
          if (this.context[CHANNEL] && !this.props.theme) {
            this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme)
          }
        }

        componentWillUnmount() {
          this.unsubscribe && this.unsubscribe()
        }

        setNativeProps(nativeProps) {
          if (this.innerComponent) {
            this.innerComponent.setNativeProps(nativeProps)
          }
        }

        onRef(innerComponent) {
          this.innerComponent = innerComponent
          if (this.props.innerRef) {
            this.props.innerRef(innerComponent)
          }
        }

        render() {
          const props = this.props

          const {toForward, styleOverrides} = splitProps(
            props,
            GlamorousComponent,
          )

          const theme = __DEV__ ?
            Object.freeze(this.state.theme) :
            this.state.theme

          const fullStyles = getStyles(
            GlamorousComponent.styles,
            props,
            styleOverrides,
            theme,
            this.context,
          )

          const isStatelessFunction =
            typeof GlamorousComponent.comp === 'function' &&
            !GlamorousComponent.comp.prototype.render

          return React.createElement(GlamorousComponent.comp, {
            ...toForward,
            ref: isStatelessFunction ? undefined : this.onRef,
            style: fullStyles.length > 0 ? fullStyles : null,
          })
        }
      }

      GlamorousComponent.comp = comp

      GlamorousComponent.propTypes = {
        innerRef: PropTypes.func,
        theme: PropTypes.object,
      }

      const defaultContextTypes = {
        [CHANNEL]: PropTypes.object,
      }
      let userDefinedContextTypes = null

      // configure the contextTypes to be settable by the user,
      // however also retaining the glamorous channel.
      Object.defineProperty(GlamorousComponent, 'contextTypes', {
        enumerable: true,
        configurable: true,
        set(value) {
          userDefinedContextTypes = value
        },
        get() {
          // if the user has provided a contextTypes definition,
          // merge the default context types with the provided ones.
          if (userDefinedContextTypes) {
            return {
              ...defaultContextTypes,
              ...userDefinedContextTypes,
            }
          }
          return defaultContextTypes
        },
      })

      Object.assign(
        GlamorousComponent,
        getGlamorousComponentMetadata({
          comp,
          styles,
          rootEl,
          forwardProps,
          displayName,
        }),
      )

      return GlamorousComponent
    }
  }
}

function getGlamorousComponentMetadata({
  comp,
  styles,
  rootEl,
  forwardProps,
  displayName,
}) {
  const componentsComp = comp.comp ? comp.comp : comp

  return {
    styles: when(comp.styles, styles),
    comp: componentsComp,
    rootEl: rootEl || componentsComp,
    forwardProps: when(comp.forwardProps, forwardProps),
    displayName: displayName || `glamorous(${getDisplayName(comp)})`,
  }
}

function when(comp, prop) {
  return comp ? comp.concat(prop) : prop
}

function getDisplayName(comp) {
  return typeof comp === 'string' ?
    comp :
    comp.displayName || comp.name || 'unknown'
}
