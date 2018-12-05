import {View, Text} from 'react-native'

import splitProps from '../split-props'

test('style props should be forwarded', () => {
  const {toForward} = splitProps(
    {numberOfLines: 1, otherProp: true},
    {propsAreStyleOverrides: false, rootEl: Text, forwardProps: []},
  )

  expect(toForward).toEqual({numberOfLines: 1})
})

test('props for other view types should not be forwarded', () => {
  const {toForward} = splitProps(
    {keyboardType: true, otherProp: true, onLayout: 1},
    {propsAreStyleOverrides: false, rootEl: View, forwardProps: []},
  )

  // keyboardType belongs to for example TextInput, but not a View.
  expect(toForward).toEqual({onLayout: 1})
})
