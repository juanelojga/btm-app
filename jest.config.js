module.exports = {
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework.js'),
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  transformIgnorePatterns: ['/node_modules/'],
}
