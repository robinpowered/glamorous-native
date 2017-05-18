# Examples for `glamorous-native` animations with `react-native`

### What's inside

<img src="https://cloud.githubusercontent.com/assets/656630/26209355/97525e9c-3bba-11e7-9a44-ae3c91b20b07.gif" height="450" />

```js
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
```


### Steps to run

```
git clone https://github.com/robinpowered/glamorous-native.git
cd glamorous-native/examples/react-native-glamorous-animated
npm install
npm start
```

After starting the packager (via `npm start`), open the iOS or Android project and launch the application. If this is your first time starting a React Native application, see the [getting started docs](https://facebook.github.io/react-native/docs/getting-started.html).


### Play around

If you'd like to experiment while you're in here, `example.js` is the place for you!

