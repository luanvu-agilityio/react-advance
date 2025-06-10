import type { Config } from 'jest'

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '\\.(gif|png|jpg|jpeg|svg)$': '<rootDir>/test/mocks/fileMock.js',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@stores/(.*)': '<rootDir>/src/stores/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
    '@types/(.*)': '<rootDir>/src/types/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@layouts/(.*)': '<rootDir>/src/layouts/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
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
