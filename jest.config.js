module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'test',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/../src/controller/**/*.ts',
    '<rootDir>/../src/service/**/*.ts',
  ],
  collectCoverage: true,
  moduleNameMapper: {
    '@controller/(.*)': ['<rootDir>/../src/controller/$1'],
    '@shared/(.*)': ['<rootDir>/../src/shared/$1'],
    '@service/(.*)': ['<rootDir>/../src/service/$1'],
    '@domain/(.*)': ['<rootDir>/../src/domain/$1'],
    '@repository/(.*)': ['<rootDir>/../src/repository/$1'],
  },
  coverageDirectory: '<rootDir>/../coverage',
  testEnvironment: 'node',
};
