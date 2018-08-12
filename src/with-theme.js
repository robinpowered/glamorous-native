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
      const { innerRef, ...rest } = this.props
      return <ComponentToTheme ref={innerRef} {...rest} {...this.state} />
    }
  }

  ThemedComponent.defaultProps = {
    innerRef: function(ref) {}
  }

  ThemedComponent.contextTypes = {
    [CHANNEL]: PropTypes.object,
  }

  return ThemedComponent
}
