module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\.spec\.ts$',
  transform: {
    '^.+\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "node_modules/(?!typeorm|@nestjs/typeorm|uuid|@uuid/ts)"
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};