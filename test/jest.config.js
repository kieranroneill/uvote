module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
    ],
    coverageDirectory: 'coverage',
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/mocks/fileMock.js',
    },
    rootDir: '..',
    roots: ['<rootDir>/src/'],
    setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
    testEnvironment: 'node',
    testEnvironmentOptions: { userAgent: 'node.js', appName: 'Netscape', language: 'en' },
    testMatch: [
        '<rootDir>/src/**/?(*.)(test).(j|t)s?(x)'
    ],
    testResultsProcessor: 'jest-junit',
    transform: {
        '^.+\\.js?$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
    },
    verbose: true
};
