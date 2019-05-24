module.exports = {
  setupFilesAfterEnv: [
    // https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js
    './test/fix-strange-errors'
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@Query': '<rootDir>/src/query-helper/index.js',
    '@build': '<rootDir>/src/query-helper/build/index.js',
    '@normalize': '<rootDir>/src/query-helper/normalize/index.js'
  }
}
