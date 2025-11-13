import 'jest-preset-angular/global-setup'

export default {
    preset: 'jest-preset-angular',
    roots: ['src'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/src/test.ts',
        '<rootDir>/src/environments/',
    ],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
        '/^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '//.html$',
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(angular-imask|angular-svg-icon|@angular|ngrx|uuid|@vg-constellation|@ngneat))',
    ],
    coverageDirectory: 'reports/coverage',
    collectCoverageFrom: [
			'src/app/*.ts',
			'src/app/**/*.ts',
		],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: '<rootDir>/reports/tests',
                outputName: 'unit-test-evidence.html',
            },
        ],
        [
            'jest-html-reporter',
            {
                outputPath: '<rootDir>/reports/cucumber/requirements-evidence.html',
            },
        ],
    ],
}
