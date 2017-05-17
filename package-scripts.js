const npsUtils = require('nps-utils')

const concurrent = npsUtils.concurrent

module.exports = {
  scripts: {
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint ./src',
    },
    reportCoverage: {
      description: 'Report coverage stats to codecov. This should be run after the `test` script',
      script: 'codecov',
    },
    validate: {
      description: 'This runs several scripts to make sure thigns look good before committing or on clean install',
      default: concurrent.nps('lint', 'test'),
    },
    examples: {
      // add yours here!
    },
  },
  options: {
    silent: false,
  },
}

// this is not transpiled
/*
  eslint
  max-len: 0,
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
