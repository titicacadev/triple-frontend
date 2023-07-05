const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.test.json')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['lib', 'node_modules', 'server.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: [
    '<rootDir>/packages/**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib', '/server.js'],
}
