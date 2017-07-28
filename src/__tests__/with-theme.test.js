/* eslint func-style:0, react/prop-types:0 */
import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import renderer from 'react-test-renderer'

import withTheme from '../with-theme'
import ThemeProvider from '../theme-provider'
import {CHANNEL} from '../constants'

const getMockedContext = unsubscribe => ({ // eslint-disable-line no-unused-vars
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

test('renders a non-glamorous component with theme', () => {
  const CompWithTheme = withTheme(({theme: {padding}}) => (
    <View style={{padding}} />
  ))
  expect(
    renderer.create(
      <ThemeProvider theme={{padding: '10px'}}>
        <CompWithTheme />
      </ThemeProvider>,
    ).toJSON(),
  ).toMatchSnapshot()
})

// @TODO - cant mount
/*
test('theme properties updates get propagated down the tree', () => {
  class Parent extends Component {
    state = {
      padding: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{padding: this.state.padding}}>
          <Child />
        </ThemeProvider>
      )
    }
  }

  const Child = withTheme(({theme: {padding}}) => <div style={{padding}} />)
  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 10px`)
  wrapper.setState({padding: 20})
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 20px`)
})
*/

test('works properly with classes', () => {
  /* eslint-disable react/prefer-stateless-function */
  class Child extends React.Component {
    render() {
      const {theme: {padding}} = this.props
      return <View style={{padding}} />
    }
  }

  Child.propTypes = {
    theme: PropTypes.object,
  }

  const ChildWithTheme = withTheme(Child)

  class Parent extends React.Component {
    state = {
      padding: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{padding: this.state.padding}}>
          <ChildWithTheme />
        </ThemeProvider>
      )
    }
  }

  const wrapper = renderer.create(<Parent />)
  expect(wrapper.toJSON()).toMatchSnapshot(`with theme prop of padding 10`)
})

test('pass through when no theme provider found up tree', () => {
  /* eslint-disable no-console */
  const originalWarn = console.warn
  console.warn = jest.fn()

  const Child = withTheme(() => <View />)
  const Parent = () => <Child />
  const wrapper = renderer.create(<Parent />)

  expect(wrapper.toJSON()).toMatchSnapshot(`without theme provider`)

  /* eslint-disable */
  // @TODO - cant mount
  // expect(console.warn).toHaveBeenCalledTimes(1)
  // expect(console.warn).toHaveBeenCalledWith(
  //   // eslint-disable-next-line max-len
  //   `glamorous warning: Expected component called "Stateless Function" which uses withTheme to be within a ThemeProvider but none was found.`,
  // )
  /* eslint-enable */
  console.warn = originalWarn
})

//@TODO - cant mount
/*
test('does not warn when NODE_ENV is set to `production`', () => {
  const originalWarn = console.warn
  console.warn = jest.fn()

  const originalEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  const Child = withTheme(() => <div />)
  const Parent = () => <Child />
  mount(<Parent />)

  expect(console.warn).not.toHaveBeenCalled()

  console.warn = originalWarn
  process.env.NODE_ENV = originalEnv
})
*/

// @TODO - cant mount
/*
test('unsubscribes from theme updates on unmount', () => {
  const Child = withTheme(() => <div />)
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const wrapper = mount(<ThemeProvider theme={{}}><Child /></ThemeProvider>, {
    context,
  })
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})
*/
