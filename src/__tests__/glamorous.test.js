import React from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'
import glamorous from '../'

describe('test', () => {
  it('supports static styles', () => {
    const staticStyle = {height: 500}
    const StyledView = glamorous(View)(staticStyle)
    const mounted = shallow(<StyledView />)

    expect(mounted.props()).toMatchObject({
      style: [StyleSheet.create({staticStyle}).staticStyle],
    })
  })

  it('supports dynamic styles', () => {
    const StyledView = glamorous(View)(props => ({
      backgroundColor: props.active ? 'blue' : 'red',
    }))
    const mountedActiveStyledView = shallow(<StyledView active height={450} />)
    const mountedInactiveStyledView = shallow(<StyledView />)


    expect(mountedActiveStyledView.props()).toMatchObject({
      style: [{backgroundColor: 'blue'}],
    })
    expect(mountedInactiveStyledView.props()).toMatchObject({
      style: [{backgroundColor: 'red'}],
    })
  })

  it('passes React components to the lower order compoennt', () => {
    const onLayout = jest.fn()
    const GlamorousView = glamorous(View)()
    const mounted = shallow(<GlamorousView onLayout={onLayout} />)

    expect(mounted.props()).toMatchObject({onLayout})
  })
})

describe('rootEl', () => {
  it('should work with rootel', () => {
    function MyComponent(props) {
      return <Text {...props} />
    }

    const myGlamorousComponentFactory = glamorous(
      MyComponent,
      {rootEl: 'Text'},
    )

    const MyGlamorousComponent = myGlamorousComponentFactory(props => ({
      fontSize: props.big ? 36 : 24,
    }))

    const mountedBigComponent = shallow(<MyGlamorousComponent big />)
    const mountedSmallComponent = shallow(<MyGlamorousComponent />)

    expect(mountedBigComponent.find(MyComponent).props()).toMatchObject({
      style: [{fontSize: 36}],
    })

    expect(mountedSmallComponent.find(MyComponent).props()).toMatchObject({
      style: [{fontSize: 24}],
    })
  })
})

describe('default components', () => {
  expect(shallow(<glamorous.FlatList />).find(FlatList)).toBeDefined()
  expect(shallow(<glamorous.Image />).find(Image)).toBeDefined()
  expect(shallow(<glamorous.ScrollView />).find(ScrollView)).toBeDefined()
  expect(shallow(<glamorous.SectionList />).find(SectionList)).toBeDefined()
  expect(shallow(<glamorous.Text />).find(Text)).toBeDefined()
  expect(shallow(<glamorous.TextInput />).find(TextInput)).toBeDefined()
  expect(shallow(<glamorous.TouchableHighlight />)
    .find(TouchableHighlight)).toBeDefined()
  expect(shallow(<glamorous.TouchableNativeFeedback />)
    .find(TouchableNativeFeedback)).toBeDefined()
  expect(shallow(<glamorous.TouchableOpacity />)
    .find(TouchableOpacity)).toBeDefined()
  expect(shallow(<glamorous.TouchableWithoutFeedback />)
    .find(TouchableWithoutFeedback)).toBeDefined()
  expect(shallow(<glamorous.View />).find(View)).toBeDefined()
})

it('styles as properties should have highest priority', () => {
  expect(renderer.create(
    <glamorous.View
      style={{backgroundColor: 'green'}}
      backgroundColor="blue"
    />,
  ).toJSON()).toMatchSnapshot()
})

describe('propsAreStyleOverrides', () => {
  it('should add style props to the style object', () => {
    const StyledView = glamorous(View, {
      propsAreStyleOverrides: true,
    })()
    expect(
      renderer.create(
        <StyledView backgroundColor="green" nonStyleProp={true} />,
      ).toJSON(),
    ).toMatchSnapshot()
  })
})
