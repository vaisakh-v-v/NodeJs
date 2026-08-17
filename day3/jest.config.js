const config = {
  testEnvironment: "node",

  transform: {
    "^.+\\.ts$": "babel-jest"
  },

  testMatch: ["**/*.test.ts"]
};

module.exports = config;