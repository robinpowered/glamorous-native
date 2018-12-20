import React from 'react'
import {CHANNEL} from './constants'
import PropTypes from './react-compat'

function generateWarningMessage(componentName) {
  // eslint-disable-next-line max-len
  return `glamorous warning: Expected component called "${componentName}" which uses withTheme to be within a ThemeProvider but none was found.`
}

export default function withTheme(ComponentToTheme) {
  class ThemedComponent extends React.Component {
    state = {theme: {}}
    setTheme = theme => this.setState({theme})

    componentWillMount() {
      if (!this.context[CHANNEL]) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn(
            generateWarningMessage(
              ComponentToTheme.displayName ||
                ComponentToTheme.name ||
                'Stateless Function',
            ),
          )

          if (!!this.props.innerRef && !ComponentToTheme.prototype.isReactComponent) {
            console.warn('innerRef won\'t work on stateless component')
          }
        }

        return
      }

      this.setState({theme: this.context[CHANNEL].getState()})
    }

    componentDidMount() {
      if (this.context[CHANNEL]) {
        this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme)
      }
    }

    componentWillUnmount() {
      // cleanup subscription
      this.unsubscribe && this.unsubscribe()
    }

    render() {
      const {innerRef, ...rest} = this.props
      if (!!ComponentToTheme.prototype.isReactComponent) {
        return <ComponentToTheme ref={innerRef} {...rest} {...this.state} />
      }
      return <ComponentToTheme {...rest} {...this.state} />
    }
  }

  ThemedComponent.defaultProps = {
    innerRef: function innerRef() {},
  }

  ThemedComponent.propTypes = {
    innerRef: PropTypes.func,
  }

  ThemedComponent.contextTypes = {
    [CHANNEL]: PropTypes.object,
  }

  return ThemedComponent
}
