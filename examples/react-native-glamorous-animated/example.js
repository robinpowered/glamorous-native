import React from 'react'
import {Animated, TouchableOpacity} from 'react-native'
import glamorous from 'glamorous-native'

const {View, Text} = glamorous

const InstructionText = glamorous.text({
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
})

const glamorousAnimatedComponentFactory = glamorous(Animated.View)
const AnimatedView = glamorousAnimatedComponentFactory({
  height: 200,
  width: 200,
  margin: 20,
  backgroundColor: 'red',
})
AnimatedView.propsAreStyleOverrides = true

export default class Example extends React.Component {
  state = {opacity: new Animated.Value(1)}

  toggle = () => {
    var toValue = this.state.opacity._value === 0 ? 1 : 0;
    Animated.timing(
      this.state.opacity,
      {toValue},
    ).start()
  }

  render() {
    return (
      <View flex={1} backgroundColor="#F5FCFF" justifyContent="center" alignItems="center">
        <TouchableOpacity onPress={this.toggle}>
          <Text fontSize={20} textAlign="center" margin={10}>
            Toggle Visibillity
          </Text>
        </TouchableOpacity>

        <AnimatedView opacity={this.state.opacity} />
      </View>
    )
  }
}
