# Examples for `glamorous-native` themes with `react-native`

### What's inside

![example](https://cloud.githubusercontent.com/assets/656630/26137844/f17ce47e-3a92-11e7-8970-b7d1580d19ba.gif)

```js
import React from 'react'
import glamorous, {ThemeProvider, TouchableOpacity} from 'glamorous-native'

// A View that reflects a specified theme
const ThemedView = glamorous.view((props, theme) => ({
  backgroundColor: theme.backgroundColor
}))
ThemedView.propsAreStyleOverrides = true

// A Text that reflects a specified theme
const ThemedText = glamorous.text((props, theme) => ({
  color: theme.color
}))
ThemedText.propsAreStyleOverrides = true

// Instructional text, composed from ThemedText with additional style rules
const InstructionText = glamorous(ThemedText)({
  textAlign: 'center',
  marginBottom: 5
})

export default class Example extends React.Component {
  state = {
    theme: Theme.primary
  }

  toggleTheme = () => {
    this.setState(({theme}) => ({
      theme: theme === Theme.primary ? Theme.dark : Theme.primary
    }))
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <ThemedView flex={1} justifyContent="center" alignItems="center">
          <ThemedText fontSize={20} textAlign="center" margin={10}>
            Look! No Styles!
          </ThemedText>

          <InstructionText>
            To get started, edit example.js
          </InstructionText>
          <InstructionText>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </InstructionText>

          <TouchableOpacity onPress={this.toggleTheme}>
            <ThemedText fontWeight="bold">Toggle Theme</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemeProvider>
    )
  }
}

const Theme = {
  primary: {
    backgroundColor: '#F5FCFF',
    color: '#333333'
  },
  dark: {
    backgroundColor: '#000',
    color: '#FFF'
  }
}

```

### Steps to run

```
git clone https://github.com/robinpowered/glamorous-native.git
cd glamorous-native/examples/react-native-glamorous-themes
npm install
npm start
```

After starting the packager (via `npm start`), open the iOS or Android project and launch the application. If this is your first time starting a React Native application, see the [getting started docs](https://facebook.github.io/react-native/docs/getting-started.html).


### Play around

If you'd like to experiment while you're in here, `example.js` is the place for you!

