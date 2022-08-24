const path = require('path');

module.exports = {
  verbose: true,
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  setupFiles: [],
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/coverage/',
    '/test/',
    '/*.config.js',
    '/_old/',
  ],
};
