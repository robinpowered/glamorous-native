import React from 'react'

// eslint-disable-next-line import/no-mutable-exports
let PropTypes

if (parseFloat(React.version.slice(0, 4)) >= 15.5) {
  try {
    PropTypes = require('prop-types')
  } catch (error) {
    // ignore
  }
}
PropTypes = PropTypes || React.PropTypes

export default PropTypes
