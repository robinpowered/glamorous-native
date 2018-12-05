/* eslint func-style:0, react/prop-types:0 */
import 'react-native-mock-render/mock'; // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import {CHANNEL} from '../constants'
import glamorous from '../'

const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

test('sanity test', () => {
  const StyledView = glamorous.view({marginLeft: 24})
  expect(shallow(<StyledView />).props()).toMatchObject({
    style: [{marginLeft: 24}],
  })
})

test('can use pre-glamorous components with style attributes', () => {
  expect(
    shallow(<glamorous.View flex={1} flexDirection="column" />).props(),
  ).toMatchObject({
    style: [{flex: 1, flexDirection: 'column'}],
  })
})

test('can use pre-glamorous components with style prop', () => {
  expect(
    shallow(
      <glamorous.View
        flex={1}
        flexDirection="column"
        style={{width: 200, marginLeft: 24}}
      />,
    ).props(),
  ).toMatchObject({
    style: [
      {width: 200, marginLeft: 24},
      {flex: 1, flexDirection: 'column'},
    ],
  })
})

test('merges composed component styles for reasonable overrides', () => {
  const Parent = glamorous.view({
    marginTop: 1,
    marginRight: 1,
    paddingTop: 1,
    paddingRight: 1,
  })
  const Child = glamorous(Parent)({
    marginRight: 2,
    marginBottom: 2,
    paddingTop: 2,
    paddingRight: 2,
  })
  const Grandchild = glamorous(Child)({
    marginBottom: 3,
    marginLeft: 3,
  })
  const otherStyles1 = StyleSheet.create({
    marginLeft: 4,
    paddingTop: 4,
  })
  const otherStyles2 = StyleSheet.create({
    paddingTop: 5,
    paddingRight: 5,
  })

  const wrapper = shallow(
    <Grandchild style={[otherStyles1, otherStyles2, {paddingRight: 6}]} />,
  )

  const computedStyles = StyleSheet.flatten(wrapper.props().style)

  expect(
    renderer
      .create(
        <Grandchild style={[otherStyles1, otherStyles2, {paddingRight: 6}]} />,
      )
      .toJSON(),
  ).toMatchSnapshot()

  expect(computedStyles).toMatchObject({
    marginTop: 1,
    marginRight: 2,
    paddingTop: 5,
    paddingRight: 6,
    marginBottom: 3,
    marginLeft: 4,
  })
})

test('merges composed component forwardProps', () => {
  const parent = ({shouldRender, ...rest}) =>
    (shouldRender ? <View {...rest} /> : null)

  const Child = glamorous(parent, {forwardProps: ['shouldRender']})()
  const Grandchild = glamorous(Child)()

  const wrapper = renderer.create(<Grandchild shouldRender={true} />)

  expect(wrapper.toJSON()).toMatchSnapshot()
})

test('styles can be functions that accept props', () => {
  const StyledView = glamorous.view({marginTop: 1}, ({margin}) => ({
    marginTop: margin,
  }))
  expect(renderer.create(<StyledView margin={2} />)).toMatchSnapshot()
})

test('falls back to `name` if displayName cannot be inferred', () => {
  const MyView = props => <View {...props} />
  const MyComp = glamorous(MyView)()
  expect(MyComp.displayName).toBe('glamorous(MyView)')
})

test('falls back to `unknown` if name cannot be inferred', () => {
  const MyComp = glamorous(props => <View {...props} />)()
  expect(MyComp.displayName).toBe('glamorous(unknown)')
})

test('allows you to specify a displayName', () => {
  const MyComp = glamorous(props => <View {...props} />, {
    displayName: 'HiThere',
  })()
  expect(MyComp.displayName).toBe('HiThere')
})

/* eslint-disable */
// @TODO - avoid passing invalid props
// test('will not forward `color` to a View', () => {
//   const originalConsoleError = console.error;
//   console.error = () => {};
//   expect(renderer.create(<glamorous.View color="red" />).toJSON()).toMatchSnapshot()
//   console.error = originalConsoleError;
// })
/* eslint-enable */

test('allows you to specify the tag rendered by a component', () => {
  const MyViewComponent = props => <View {...props} />
  const MyStyledViewComponent = glamorous(MyViewComponent, {rootEl: View})({
    height: 1,
    width: 1,
  })
  expect(
    renderer
      .create(
        <MyStyledViewComponent
          height={2}
          noForward={true}
          style={{width: 2}}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot()
})

// @TODO
/*
est('forwards props when the GlamorousComponent.rootEl is known', () => {
  // this test demonstrates how to prevent glamorous from forwarding
  // props all the way down to components which shouldn't be getting them
  // (components you have no control over).

  // here's a component you can't change, it renders all props to it's
  // `rootEl` which is a `div` in this case. They probably shouldn't be doing
  // this, but there are use cases for libraries to do this:
  const SomeComponentIHaveNoControlOver = jest.fn(props => <div {...props} />)

  // to prevent glamorous from forwarding non-div attributes to this
  // component, you can make a glamorous version out of it and specify the
  // `rootEl` as `div` (doesn't matter a whole lot, except in the case of
  // `svg`, if it's an `svg`, then definitely put `svg` otherwise, put
  // something else...
  const MyWrappedVersion = glamorous(SomeComponentIHaveNoControlOver, {
    rootEl: 'div',
  })()
  // no need to pass anything. This will just create be a no-op class,
  // no problem
  const MyWrappedVersionMock = jest.fn(props => (
    <MyWrappedVersion {...props} />
  ))

  // from there we can use our wrapped version and it will function the
  // same as the original
  const MyMyWrappedVersion = jest.fn(props => (
    <MyWrappedVersionMock {...props} />
  ))

  // then if we make a parent glamorous, it will forward props down until
  // it hits our wrapper at which time it will check whether the prop is
  // valid for `rootEl === 'div'`, and if it's not then it wont forward the
  // prop along to `SomeComponentIHaveNoControlOver` and we wont have the
  // warning from react about noForward being an invalid property for a
  // `div`. Yay!
  const MyStyledMyMyWrappedVersion = glamorous(MyMyWrappedVersion)({
    padding: 1,
    margin: 1,
  })
  const secretMessage = 'He likes it! Hey Mikey!'
  const ui = render(
    <MyStyledMyMyWrappedVersion noForward={42}>
      {secretMessage}
    </MyStyledMyMyWrappedVersion>,
  )
  const {calls: [[calledProps]]} = SomeComponentIHaveNoControlOver.mock
  expect(calledProps.noForward).toBe(undefined)
  expect(MyWrappedVersionMock).toHaveBeenCalledWith(
    {
      className: expect.anything(),
      children: secretMessage,
      noForward: 42,
    },
    expect.anything(),
    expect.anything(),
  )
  expect(MyMyWrappedVersion).toHaveBeenCalledWith(
    {
      children: secretMessage,
      className: expect.anything(),
      noForward: 42,
    },
    expect.anything(),
    expect.anything(),
  )
  expect(ui).toMatchSnapshotWithGlamor()
})
*/

test('renders a component with theme properties', () => {
  const Comp = glamorous.view(
    {
      backgroundColor: 'red',
    },
    ({theme}) => ({padding: theme.padding}),
  )
  expect(
    renderer.create(<Comp theme={{padding: '10px'}} />).toJSON(),
  ).toMatchSnapshot()
})

// @TODO
/*
test('in development mode the theme is frozen and cannot be changed', () => {
  global.__DEV__ = true
  expect.assertions(1)
  const Comp = glamorous.view(
    {
      backgroundColor: 'red',
    },
    (props, theme) => {
      expect(() => {
        theme.foo = 'bar'
      }).toThrow()
      return {}
    },
  )
  render(<Comp theme={{foo: 'baz'}} />)
})
*/

// @TODO
/*
test('in production mode the theme is not frozen and can be changed', () => {
  const env = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'
  expect.assertions(1)
  const Comp = glamorous.div(
    {
      color: 'red',
    },
    (props, theme) => {
      expect(() => {
        theme.foo = 'bar'
      }).not.toThrow()
      return {}
    },
  )
  render(<Comp theme={{foo: 'baz'}} />)
  process.env.NODE_ENV = env
})
*/

// @TODO - cant mount
test('passes an updated theme when theme prop changes', () => {
  const Comp = glamorous.view(
    {
      backgroundColor: 'red',
    },
    ({theme}) => ({padding: theme.padding}),
  )
  const wrapper = shallow(<Comp theme={{padding: 10}} />)
  expect(wrapper.props()).toMatchObject({
    style: [{backgroundColor: 'red'}, {padding: 10}],
  })
  // expect(wrapper).toMatchSnapshot(`with theme prop of padding 10`)
  wrapper.setProps({theme: {padding: 20}})
  expect(wrapper.props()).toMatchObject({
    style: [{backgroundColor: 'red'}, {padding: 20}],
  })
  // expect(wrapper).toMatchSnapshot(`with theme prop of padding 20`)
})

test('cleans up theme subscription when unmounts', () => {
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const Comp = glamorous.view()
  const wrapper = shallow(<Comp />, {context})
  wrapper.instance().componentWillMount()
  wrapper.instance().componentDidMount()
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})

test('ignores context if a theme props is passed', () => {
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const Comp = glamorous.view()
  const wrapper = shallow(<Comp theme={{}} />, {context})
  wrapper.instance().componentWillMount()
  wrapper.instance().componentDidMount()
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalledTimes(0)
})

// @TODO
/*
test('allows you to pass custom props that are allowed', () => {
  const MyComponent = jest.fn(function MyComponent({shouldRender, ...rest}) {
    return shouldRender ? <div {...rest} /> : null
  })
  const MyStyledComponent = glamorous(MyComponent, {
    forwardProps: ['shouldRender'],
    rootEl: 'div',
  })({
    padding: 1,
  })
  expect(
    render(
      <MyStyledComponent shouldRender={true} otherThing={false} id="hello" />,
    ),
  ).toMatchSnapshotWithGlamor()
  expect(MyComponent).toHaveBeenCalledTimes(1)
  expect(MyComponent).toHaveBeenCalledWith(
    {
      shouldRender: true,
      id: 'hello',
      className: expect.any(String),
    },
    expect.any(Object),
    expect.any(Object),
  )
})
*/

// @TODO - cant mount
/*
test('should recieve inner ref if specified', () => {
  const getRef = jest.fn()
  const Comp = glamorous.view({
    marginLeft: '24px',
  })

  mount(<Comp innerRef={getRef} />)

  expect(getRef).toHaveBeenCalled()
})
*/

it('should accept user defined contextTypes', () => {
  const dynamicStyles = jest.fn()
  const Child = glamorous.view(dynamicStyles)
  Child.contextTypes = {
    fontSize: PropTypes.number,
  }

  const context = {
    fontSize: 24,
  }

  shallow(<Child />, {context})
  expect(dynamicStyles).toHaveBeenCalledTimes(1)
  const theme = {}
  const props = {theme}
  expect(dynamicStyles).toHaveBeenCalledWith(props, theme, context)
})
