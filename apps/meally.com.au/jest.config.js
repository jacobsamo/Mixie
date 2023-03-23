const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@components/(.*)': '<rootDir>/src/common/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/common/libs/$1',
    '^/@styles/(.*)$': '<rootDir>/src/common/styles/$1',
    '^/@component_styles/(.*)$': '<rootDir>/src/common/components/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};
console.log(createJestConfig.moduleNameMapper);
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
