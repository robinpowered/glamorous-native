function evaluateGlamorStyles(styles, props, theme, context) {
  return styles.map(style => {
    if (typeof style === 'function') {
      return style(props, theme, context)
    }
    return style
  })
}

function getStyles(styles, props, styleOverrides, theme, context) {
  const glamorStyles = evaluateGlamorStyles(styles, props, theme, context)
  const outputStyles = glamorStyles

  if (styleOverrides && Object.keys(styleOverrides).length > 0) {
    outputStyles.push(styleOverrides)
  }

  if (props.style) {
    outputStyles.push(props.style)
  }

  return outputStyles
}

export default getStyles
