function evaluateGlamorStyles(styles, props, theme, context) {
  return styles.map(style => {
    if (typeof style === 'function') {
      return style(Object.assign({}, props, {theme}), theme, context)
    }
    return style
  })
}

function getStyles(styles, props, styleOverrides, theme, context) {
  const glamorStyles = evaluateGlamorStyles(styles, props, theme, context)
  const outputStyles = glamorStyles

  if (props.style) {
    outputStyles.push(props.style)
  }

  if (styleOverrides && Object.keys(styleOverrides).length > 0) {
    outputStyles.push(styleOverrides)
  }

  return outputStyles
}

export default getStyles
