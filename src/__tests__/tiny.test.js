import React from 'react'
import {View} from 'react-native'
import renderer from 'react-test-renderer'
import glamorousTiny from '../tiny'

test('should pass glam object prop', () => {
  const dynamicStyles = jest.fn(({glam: {big}}) => ({
    height: big ? 20 : 10,
  }))
  const Comp = glamorousTiny(View)(
    {
      marginLeft: 24,
    },
    dynamicStyles,
  )

  const glam = {big: true}
  const theme = {color: 'blue'}
  expect(
    renderer
      .create(<Comp accessible={true} glam={glam} theme={theme} />)
      .toJSON(),
  ).toMatchSnapshot()
  expect(dynamicStyles).toHaveBeenCalledTimes(1)
  const props = {
    glam,
    accessible: true,
    theme, // this is just incidental because we have a theme prop
  }
  const context = expect.any(Object)
  expect(dynamicStyles).toHaveBeenCalledWith(props, context)
})
