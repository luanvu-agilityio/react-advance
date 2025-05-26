import type { Config } from 'jest'

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/test/mocks/fileMock.ts',
  },
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).tsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
export default config
