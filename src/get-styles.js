function evaluateGlamorStyles(styles, props, theme) {
  return styles.map(style => {
    if (typeof style === 'function') {
      return style(props, theme)
    }
    return style
  })
}

export default function getStyles(styles, props, styleOverrides, theme) {
  const glamorStyles = evaluateGlamorStyles(styles, props, theme)
  const outputStyles = glamorStyles

  if (styleOverrides && Object.keys(styleOverrides).length > 0) {
    outputStyles.push(styleOverrides)
  }

  if (props.style) {
    outputStyles.push(props.style)
  }

  return outputStyles
}
