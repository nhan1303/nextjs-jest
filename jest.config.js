module.exports = {
  modulePaths: ["<rootDir/>/tests"],
  testPathIgnorePatterns: ["<rootDir/>/.next/", "<rootDir/>/node_modules/"],
//   setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: "jsdom",
};
