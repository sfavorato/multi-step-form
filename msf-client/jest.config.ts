import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Handles TypeScript and JSX files
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  collectCoverage: false,
};

export default config;
