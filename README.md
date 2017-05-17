# glamorous-native

A react-native port of [paypal/glamorous](https://github.com/paypal/glamorous) (inspired via https://github.com/paypal/glamorous/issues/7). Glamorous is React component styling solved with an elegant ([inspired](https://github.com/paypal/glamorous#inspiration)) API, [small footprint](https://github.com/paypal/glamorous#size), and great performance.


[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![PRs Welcome][prs-badge]][prs]
[![Examples][examples-badge]][examples]

## The Problem

In React Native, we write styles within our JS, but you don't like having to create entire component functions just for styling purposes. You don't wnat to give a name to something that's purely style-related. And it's kind of annoying to do the `StyleSheet.create`, conditionals, and props-forwarding song and dance.

For example, this is what you have to do with `StyleSheet`:

```js
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
})
function MyStyledText ({style, ...rest}) {
  return (
    <Text
      style={[styles.text, style]}
      {...rest}
    />
  )
}
```

## This solution

With `glamorous-native`, that example above looks as simple as this:

```js
const MyStyledText = glamorous.text({
  fontSize: 20,
  textAlign: 'center';
})
```

In fact, it's even better, because there are a bunch of features that make composing these components together really nice!

Oh, and what if you don't care to give `MyStyledText` a name? If you just want a text that's styled using `StyleSheet`? You can do that too:

```js
import {Text} from 'glamorous';

function Section() {
  return (
    <Text
      fontSize={20}
      textAlign="center"
    >
      Hello world!
    </Text>
  )
}
```

> See more [examples](examples)!

So that's the basics of this solution.. Let's get to the details!

## Installation

TBD

## Contributing

This project is in active development approaching completion. Your contributions are welcome! Take a look at the [contributing guide](contributing) and browse through the [good first task issues](https://github.com/robinpowered/glamorous-native/labels/good%20first%20task).



[build-badge]: https://img.shields.io/travis/robinpowered/glamorous-native.svg?style=flat-square
[build]: https://travis-ci.org/robinpowered/glamorous-native
[coverage-badge]: https://img.shields.io/codecov/c/github/robinpowered/glamorous-native.svg?style=flat-square
[coverage]: https://codecov.io/github/robinpowered/glamorous-native
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[examples-badge]: https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square
[examples]: ./examples
[contributing]: ./CONTRIBUTING.md
