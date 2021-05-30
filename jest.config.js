module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.lazy.js',
    '!**/*.test.js',
    '!**/mocks/**',
    '!**/node_modules/**',
    '!lib/**'
  ],
  coverageDirectory: '',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageThreshold: {
    global: {
      functions: 90,
      statements: 90
    }
  },
  moduleDirectories: [
    './node_modules',
    './src'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/mocks/imports/style-mock.js'
  },
  roots: [
    './src'
  ],
  testRegex: '(/src/.*|(\\.|/)).test\\.js$',
  transform: {
    '\\.(aac|gif|eot|jpg|jpeg|m4a|mp3|mp4|oga|otf|png|svg|ttf|wav|webm|webp|woff|woff2)$': '<rootDir>/mocks/imports/transform-file.js',
    '\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: []
};
