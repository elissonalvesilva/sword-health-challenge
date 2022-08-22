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
};