const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.test')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['lib', 'node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/packages',
  }),
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
}
