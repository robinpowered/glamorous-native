import React from 'react'
import glamorous, {ThemeProvider} from 'glamorous-native'

const {TouchableOpacity} = glamorous

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
