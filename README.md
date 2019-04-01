<img src="https://github.com/robinpowered/glamorous-native/raw/master/other/logo/full.png" alt="glamorous-native logo" title="glamorous-native" align="right" width="150" height="150" />

# glamorous-native

[glamorous][glamorous] for React Native. React component styling solved with an elegant ([inspired](#inspiration)) API, small footprint, and great performance. For full feature documentation, see the [glamorous docs][glamorous-readme].

> Read [the intro blogpost][intro-blogpost]

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![MIT License][license-badge]][LICENSE]
[![Semantic Releases][semantic-release-badge]][semantic-release]
[![PRs Welcome][prs-badge]][prs]
[![Chat][chat-badge]][chat]
[![Examples][examples-badge]][examples]


## The Problem

In React Native, we write styles within our JS, but you don't like having to create entire component functions just for styling purposes. You don't want to give a name to something that's purely style-related. And it's kind of annoying to do the `StyleSheet.create`, conditionals, and props-forwarding song and dance.

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
  textAlign: 'center'
})
```

In fact, it's even better, because there are a bunch of features that make composing these components together really nice!

Oh, and what if you don't care to give `MyStyledText` a name? If you just want a text that's styled using `StyleSheet`? You can do that too:

```js
const {Text} = glamorous;

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

> See more [examples][examples]!

So that's the basics of this solution.. Let's get to the details!

## Installation

This module is distributed via [npm][npm] and should be installed as one of your project's `dependencies`:

```
npm install --save glamorous-native
```

This also depends on `react` and `react-native`; you likely already have these dependencies since React Native projects are generally [scaffolded][react-native-get-started-scaffold].

From here you can now import this module:

```js
import glamorous, {ThemeProvider} from 'glamorous-native'
```

### Jest Configuration

To use `glamorous-native` in Jest (such as with snapshot tests), you need to configure the `transformIgnorePatterns` configuration in your `package.json`. [More documentation about this can be found here](https://facebook.github.io/jest/docs/tutorial-react-native.html#transformignorepatterns-customization).

```json
{
  "jest": {
    "preset": "react-native",
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|glamorous-native)"
    ]
  }
}
```

## Terms and concepts

### glamorous

The `glamorous` function is the main (only) export. It allows you to create glamorous components that render the styles to the component you give it. This is done by forwarding a `style` prop to the component you tell it to render. But before we get into how you wrap custom components, let's talk about the built-in React Native components.

#### built-in React Native component factories

For every React Native element, there is an associated `glamorous` component factory attached to the `glamorous` function. As above, you can access these factories like so: `glamorous.view`, `glamorous.text`, `glamorous.listView`, etc.

```js
const MyStyledView = glamorous.view({margin: 1})

<MyStyledView>{content}</MyStyledView>
// rendered output: <View style={{margin: 1}}>{content}</View>
// styles applied: {margin: 1}
// style is also cached and registered with `StyleSheet`
```

#### glamorousComponentFactory

Whether you create one yourself or use one of the built-in ones mentioned above, each `glamorousComponentFactory` allows you to invoke it with styles and it returns you a new component which will have those styles applied when it's rendered. This is accomplished by generating a `StyleSheet` entry for the styles you give it and forwarding that `style` onto the rendered element. So if you're wrapping a component you intend to style, you'll need to make sure you accept the `style` as a property and apply it where you want the styles applied in your custom component (normally the root element).

```js
const UnstyledComp = ({style, children}) => (<View style={[style, otherStyle]}>{children}</View>)
const MyStyledComp = glamorous(UnstyledComp)({margin: 1})

<MyStyledComp>{content}</MyStyledComp>
// rendered output: <View style={[<glamor-generated-style>, otherStyle]}>{content}</View>
// styles applied: {margin: 1}
// style is also cached and registered with `StyleSheet`
```

##### ...styles

The `glamorousComponentFactory` accepts any number of style object arguments. These can be style objects or functions which are invoked with `props` on every render and return style objects. To learn more about what these style objects can look like, please take a look at the [StyleSheet][react-native-stylesheet] documentation, and the supported styles for the React Native component (`View`, `Text`, etc).

```js
const MyStyledView = glamorous.view(
  {
    margin: 1
  },
  (props) => ({
    padding: props.noPadding ? 0 : 4
  })
)

<MyStyledView /> // styles applied: {margin: 1, padding: 4}
<MyStyledView noPadding /> // styles applied: {margin: 1, padding: 0}
```

You can also specify other styles you'd like applied to the component as well. `StyleSheet` created styles can be passed in the same way we've been passing in inline styles and dynamic styles based on props.

```js
const styleSheetStyles = StyleSheet.create({
  style1: {
    paddingTop: 1,
    paddingRight: 1
  },
  style2: {
    paddingRight: 2,
    paddingBottom: 2
  }
})

const style3 = {paddingBottom: 3, paddingLeft: 3}
const style4 = {paddingLeft: 4}


const MyStyledView = glamorous.view(
  styleSheetStyles.style1,
  styleSheetStyles.style2,
  style3,
  style4
)

<MyStyledView />
// styles applied: {paddingTop: 1, paddingRight: 2, paddingBottom: 3, paddingLeft: 4}
```

#### GlamorousComponent

The `GlamorousComponent` is what is returned from the `glamorousComponentFactory`. Its job is to get all the styles together and forward a prepared `style` property onto your component.

##### supported props

By default `GlamorousComponent` supports two props: `style` and `theme` which are used to override the styles of the component in different scenarios. For a more detailed explanation see [Overriding component styles](#overriding-component-styles) and [Theming](#theming) sections below.

##### `innerRef`

This is a function and if provided, will be called with the inner element's reference.

```js
const MyView = glamorous.view({padding: 20})

// You can get a reference to the inner element with the `innerRef` prop

class MyComponent extends React.Component {
  render() {
    return () {
      return (
        <MyView innerRef={c => this._viewRef = c} />
      )
    }
  }
}
```

innerRef also supports the new [React.createRef()](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) api

```js
const MyView = glamorous.view({padding: 20})

// You can get a reference to the inner element with the `innerRef` prop

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return () {
      return (
        <MyView innerRef={this.myRef} />
      )
    }
  }
}
```

##### other props

Only props that are safe to forward to the specific element (ie. that will ultimately be rendered) will be forwarded. So this is totally legit:

```js
<MyStyledText size="big" />
```

A use case for doing something like this would be for dynamic styles:

```js
const staticStyles = {color: 'green'}
const dynamicStyles = props => ({fontSize: props.size === 'big' ? 32 : 24})
const MyDynamicallyStyledText = glamorous.text(staticStyles, dynamicStyles)
```

> The exception to this prop forwarding is the pre-created `GlamorousComponent`s (see below).

#### built-in GlamorousComponents

Often you want to style something without actually giving it a name (because naming things is hard). So glamorous also expose a pre-created `GlamorousComponent` for each React Native node type which makes this reasonable to do:

```js
const {View, Text, TouchableHighlight, Image} = glamorous;

function MyUserInterface ({name, tagline, imageUrl, size, onPress}) {
  const nameSize = size;
  const taglineSize = size * 0.5;

  return (
    <View flex={1} flexDirection="column" justifyContent="center">
      <TouchableHighlight onPress={onPress} underlayColor="#336479">
        <Image borderRadius={90} height={180} source={{uri: imageUrl}} />
        <Text fontSize={nameSize} fontWeight="bold">{name}</Text>
      </TouchableHighlight>
      <Text fontSize={taglineSize} color="#767676">
        {tagline}
      </Text>
    </View>
  );
}
```

Having to name all of this stuff could be tedious, so having these pre-built components is handy. The other handy bit here is that the props _are_ the styles for these components. Notice that glamorous can distinguish between props that are for styling, and those that are have semantic meaning (like with the `Image` and `Touchable` components which make use of `source` and `onPress` props).

The `style` prop can be used to provide `StyleSheet` styles:

```js
import glamorous, {withTheme} from 'glamorous-native'
const {View, Text} = glamorous

const predefinedStyle = StyleSheet.create({
  view: {
    flex: 1
  },
  text: {
    color: '#767676',
    fontSize: 18
  }
})

const MyUserInterface = withTheme(({tagline, theme}) => (
  <View style={[predefinedStyle.view, {backgroundColor: theme.primaryColor}]}>
    <Text style={predefinedStyle.text}>
      {tagline}
    </Text>
  </View>
))
```

One other tip... This totally works:

```js
<glamorous.Text color="blue">
  JSX is pretty wild!
</glamorous.Text>
```

#### Overriding component styles

The most common scenario for using props is to override the style of an existing component (generated by `glamorous` or not). That can be achieved by using the props `style` and `theme` or simply component composition with `glamorous()` function.

If you're interested in knowing more about using the `theme` prop, see the [Theming](#theming) section instead for a more detailed explanation. In this section we'll explain how to use `style` and composition to override the styles of a component.

Let's see how that can be done in the examples below.

We'll use this as our `GlamorousComponent`:

```js
const MyStyledText = glamorous.view({margin: 1, fontSize: 1, padding: 1})
```

###### using `style`

For each `style` you provide, the `GlamorousComponent` will append these styles, such that if they overlap the `glamorous` styles, the provided styles take the highest priority over the component's predefined styles and will override them. The rest will otherwise merge right in. This is similar to providing an array of styles to a component.

```js
const styles = StyleSheet.create({
  custom: {
    fontSize: 2,
    padding: 2
  }
})

<MyStyledText style={styles.custom} />
// styles applied:
// {margin: 1, fontSize: 2, padding: 2}
```

##### using `glamorous()` composition

If we just want to extend the styles of an existing component, it can be done by using the `glamorous()` function.

```js
const MyComposedStyledText = glamorous(MyStyledText)({fontSize: 4, padding: 4})
<MyComposedStyledText />
// styles applied:
// {margin: 1, fontSize: 4, padding: 4}
```

In fact, the built-in React Native component factories provided are just an abstraction of this function, so `glamorous.view` could be written as `glamorous(View)` instead.

### glamorous API

The `glamorous` function allows you to create your own `glamorousComponentFactory` [see above](#glamorouscomponentfactory) for any component you have. For example:

```js
const MyComponent = props => <Text {...props} />
const myGlamorousComponentFactory = glamorous(MyComponent)
const MyGlamorousComponent = myGlamorousComponentFactory({/* styles */})

<MyGlamorousComponent numberOfLines={2} /* forwarded to the Text */ />
```

You can also provide a few options to help glamorous know how to handle your component:

#### displayName

The `displayName` of a React component is used by React in the [React DevTools][react-devtools] and is really handy for debugging React applications. Glamorous will do its best to give a good `displayname` for your component, but, for the example above, the best it can do is `glamorous(MyComponent)`. If you want to specify a `displayName`, you can do so with this property. For example:

```js
const MyComponent = props => <Text {...props} />
const myGlamorousComponentFactory = glamorous(
  MyComponent,
  {displayName: 'MyGlamorousComponent'}
)
```

And now all components created by the `myGlamorousComponentFactory` will have the `displayName` of `MyGlamorousComponent`.

#### rootEl

React has an [Unknown Prop Warning](https://facebook.github.io/react/warnings/unknown-prop.html) that it logs when you pass spurious props to elements: (i.e. `<View big={true} />`). Because you can style your components using props, glamorous needs to filter out the props you pass so it doesn't forward these on to the underlying React Native component. However, if you create your own factory using a custom component, glamorous will just forward all the props (because the component may actually need them and glamorous has no way of knowing). But in some cases, the component may be spreading all of the props onto the root element that it renders. For these cases, you can tell glamorous which element is being rendered and glamorous will apply the same logic for which props to forward that it does for the built-in factories. For example:

```js
const MyComponent = props => <Text {...props} />
const myGlamorousComponentFactory = glamorous(
  MyComponent,
  {rootEl: Text}
)

const MyGlamorousComponent = myGlamorousComponentFactory(props => ({
  fontSize: props.big ? 36 : 24
}))

<MyGlamorousComponent big={true} numberOfLines={1} />
// This will render:
// <Text numberOfLines={1} />
// with {fontSize: 36}
// `big` is not forwarded to MyComponent because the `rootEl` is a `Text` and `big`
// is not a valid attribute for a `Text`, however `numberOfLines` will be forwarded
// because `numberOfLines` is a valid prop
```

#### forwardProps

There are some cases where you're making a `glamorousComponentFactory` out of a custom component that spreads _some_ of the properties across an underlying React Native component, but not all of them. In this case you should use `rootEl` to forward only the right props to be spread onto the React Native component, but you can also use `forwardProps` to specify extra props that should be forwarded. For example:

```js
const MyComponent = ({shouldRender, ...rest}) => (
  shouldRender ? <Text {...rest} /> : null
)
const MyStyledComponent = glamorous(MyComponent, {
  forwardProps: ['shouldRender'],
  rootEl: Text
})(props => ({
  fontSize: props.big ? 36 : 24
}))
<MyStyledComponent shouldRender={true} big={false} numberOfLines={1} />
// This will render:
// <Text numberOfLines={1} />
// with {fontSize: 24}
// `shouldRender` will be forwarded to `MyComponent` because it is included in
// `forwardProps`. `big` will not be forwarded to `MyComponent` because `rootEl`
// is a `Text` and that's not a valid prop for a `Text`, but it will be used in
// the styles object function that determines the `fontSize`. Finally `numberOfLines`
// will be forwarded to `MyComponent` because it is a valid prop for a `Text`
```

#### propsAreStyleOverrides

This allows you to use props as styles. When it's set to true, props will be added to the component's style object, taking precedence over existing values. Pre-built components like `glamorous.Text` use this option by default.

```js
const GreenText = glamorous(
  Text,
  {propsAreStyleOverrides: true}
)({
  color: 'green'
})

<GreenText fontSize={30} selectable={true} />
// This will render:
// <Text selectable={true} />
// with {color: 'green', fontSize: 30}
// the selectable prop is passed to the underlying
// Text component because glamorous recognizes that
// it's not a valid style property
```

### Theming

`glamorous-native` fully supports theming using a special `<ThemeProvider>` component.

It provides the `theme` to get all glamorous components down the tree.

```js
import glamorous, {ThemeProvider} from 'glamorous-native'

// our main theme object
const theme = {
  main: {color: 'red'}
}

// our secondary theme object
const secondaryTheme = {
  main: {color: 'blue'}
}

// a themed <Title> component
const Title = glamorous.text({
  fontSize: 10
}, (props, theme) => ({
  color: theme.main.color
}))

// use <ThemeProvider> to pass theme down the tree
<ThemeProvider theme={theme}>
  <Title>Hello!</Title>
</ThemeProvider>

// it is possible to nest themes
// inner themes will be merged with outers
<ThemeProvider theme={theme}>
  <View>
    <Title>Hello!</Title>
    <ThemeProvider theme={secondaryTheme}>
      {/* this will be blue */}
      <Title>Hello from here!</Title>
    </ThemeProvider>
  </View>
</ThemeProvider>

// to override a theme, just pass a theme prop to a glamorous component
// the component will ignore any surrounding theme, applying the one passed directly via props
<ThemeProvider theme={theme}>
  {/* this will be yellow */}
  <Title theme={{main: {color: 'yellow'}}}>Hello!</Title>
</ThemeProvider>
```

`glamorous-native` also exports a `withTheme` higher order component (HOC) so you can access your theme in any component!

```jsx
import glamorous, {ThemeProvider, withTheme} from 'glamorous-native'

// our main theme object
const theme = {
  main: {color: 'red'}
}

// a themed <Title> component
const Title = glamorous.text({
  fontSize: 19
}, (props, theme) => ({
  color: theme.main.color
}))

// normal component that takes a theme prop
const SubTitle = ({children, theme: {color}}) => (
  <Text style={{color}}>{children}</Text>
)

// extended component with theme prop
const ThemedSubTitle = withTheme(SubTitle)

<ThemeProvider theme={theme}>
  <Title>Hello!</Title>
  <ThemedSubTitle>from withTheme!</ThemedSubTitle>
</ThemeProvider>
```

Or if you prefer decorator syntax:

```jsx
import React, {Component} from 'react'
import glamorous, {ThemeProvider,  withTheme} from 'glamorous-native'

// our main theme object
const theme = {
  main: {color: 'red'}
}

// a themed <Title> component
const Title = glamorous.text({
  fontSize: 10
}, (props, theme) => ({
  color: theme.main.color
}))

// extended component with theme prop
@withTheme
class SubTitle extends Component {
  render() {
    const {children, theme: {main: {color}}} = this.props
    return <Text style={{color}}>{children}</Text>
  }
}

<ThemeProvider theme={theme}>
  <Title>Hello!</Title>
  <SubTitle>from withTheme!</SubTitle>
</ThemeProvider>
```

> `withTheme` expects a `ThemeProvider` further up the render tree and will warn in `development` if one is not found!

### Context

[context](https://facebook.github.io/react/docs/context.html) is an unstable
API and it's not recommended to use it directly. However, if you need to use it
for some reason, here's an example of how you could do that:

```jsx
const dynamicStyles = (props, theme, context) => ({
  color: context.isLoggedIn ? 'green' : 'red'
})
const MyText = glamorous.text(dynamicStyles)
MyText.contextTypes = {
  isLoggedIn: PropTypes.string,
}

class Parent extends React.Component {
  getChildContext() {
    return {
      isLoggedIn: true,
    }
  }
  render() {
    return <MyText>Greetings</MyText>
  }
}

Parent.childContextTypes = {
  isLoggedIn: PropTypes.string,
}

<Parent />
// renders <Text />
// with {color: 'green'}
```

## Inspiration

This package was inspired by the work from people's work on the following projects:
- [glamorous][glamorous]
- [styled-components](https://github.com/styled-components/styled-components)
- [jsxstyle](https://github.com/smyte/jsxstyle)

## Contributing

This project is in active development approaching completion. Your contributions are welcome! Take a look at the [contributing guide][contributing] and browse through the [good first task issues](https://github.com/robinpowered/glamorous-native/labels/good%20first%20task).


[build-badge]: https://img.shields.io/travis/robinpowered/glamorous-native.svg?style=flat-square
[build]: https://travis-ci.org/robinpowered/glamorous-native
[coverage-badge]: https://img.shields.io/codecov/c/github/robinpowered/glamorous-native.svg?style=flat-square
[coverage]: https://codecov.io/github/robinpowered/glamorous-native
[version-badge]: https://img.shields.io/npm/v/glamorous-native.svg?style=flat-square
[package]: https://www.npmjs.com/package/glamorous-native
[license-badge]: https://img.shields.io/npm/l/glamorous-native.svg?style=flat-square
[license]: https://github.com/robinpowered/glamorous-native/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square]
[semantic-release]: https://github.com/robinpowered/glamorous-native/releases
[examples-badge]: https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square
[examples]: ./examples
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release]: https://github.com/robinpowered/glamorous-native/releases
[chat]: https://gitter.im/paypal/glamorous
[chat-badge]: https://img.shields.io/gitter/room/paypal/glamorous.svg?style=flat-square
[contributing]: ./CONTRIBUTING.md
[glamorous]: https://github.com/paypal/glamorous
[glamorous-readme]: https://github.com/paypal/glamorous#readme
[intro-blogpost]: https://medium.com/robin-powered/introducing-glamorous-for-react-native-1b8365e7f33f
[npm]: https://www.npmjs.com/
[react-native-stylesheet]: https://facebook.github.io/react-native/docs/stylesheet.html
[react-devtools]: https://github.com/facebook/react-devtools
[react-unknown-props]: https://facebook.github.io/react/warnings/unknown-prop.html
[react-native-get-started-scaffold]: https://facebook.github.io/react-native/docs/getting-started.html#testing-your-react-native-installation
