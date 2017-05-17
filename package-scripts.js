const npsUtils = require('nps-utils')

const concurrent = npsUtils.concurrent
const series = npsUtils.series

module.exports = {
  scripts: {
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz',
    },
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint .',
    },
    reportCoverage: {
      description: 'Report coverage stats to codecov. This should be run after the `test` script',
      script: 'codecov',
    },
    validate: {
      description: 'This runs several scripts to make sure thigns look good before committing or on clean install',
      default: concurrent.nps('lint', 'test'),
    },
    release: {
      description: 'We automate releases with semantic-release. This should only be run on travis',
      script: series(
        'semantic-release pre'

        // 'npm publish',
        // 'semantic-release post',
      ),
    },
    examples: {
      reactNative: {
        description: 'A simple react-native project using glamorous-native',
        script: series(
          'cd examples/react-native-glamorous',
          'npm install'
        ),
      },
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
