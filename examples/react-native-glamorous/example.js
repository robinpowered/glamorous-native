import React from 'react'
import glamorous from 'glamorous-native'

const {View, Text} = glamorous

const InstructionText = glamorous.text({
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
})

export default class Example extends React.Component {
  render() {
    return (
      <View flex={1} backgroundColor="#F5FCFF" justifyContent="center" alignItems="center">
        <Text fontSize={20} textAlign="center" margin={10}>
          Look! No Styles!
        </Text>
        <InstructionText>
          To get started, edit example.js
        </InstructionText>
        <InstructionText>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </InstructionText>
      </View>
    )
  }
}
