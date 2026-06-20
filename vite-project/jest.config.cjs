module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json",
                useESM: true,
            },
        ],
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tests/e2e/"],
};
