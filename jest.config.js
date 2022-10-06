const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.json')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['lib', 'node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
}
