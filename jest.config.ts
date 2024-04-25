import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    moduleNameMapper: {
        '^@components/(.*)': '<rootDir>/src/components/$1',
        '^@constants/(.*)': '<rootDir>/src/constants/$1',
        '^@utils/(.*)': '<rootDir>/src/utils/$1',
        '^@types/(.*)': '<rootDir>/src/types/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
};

export default config;
