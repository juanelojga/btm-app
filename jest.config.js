module.exports = {
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework.js'),
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}

if (process.cwd() === __dirname) {
  Object.assign(module.exports, {
    collectCoverageFrom: ['**/src/**/*.js'],
    coverageThreshold: {
      global: {
        statements: 17,
        branches: 8,
        functions: 20,
        lines: 17,
      },
    },
  })
}
