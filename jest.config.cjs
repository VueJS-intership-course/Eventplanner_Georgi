module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "\\.[jt]sx?$": "babel-jest",
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.vue$": "vue3-jest",
        "^.+\\.tsx?$": "ts-jest",
        '^.+\\.css$': 'jest-transform-stub',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: [
        "js",
        "json",
        "vue",
        "ts",
        "tsx"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(ol)/)"
    ],
    extensionsToTreatAsEsm: [
        ".ts",
        ".tsx"
    ],
    testEnvironment: "jsdom",
    snapshotSerializers: [
        "jest-serializer-vue"
    ],
    moduleNameMapper: {
        "axios": "axios/dist/node/axios.cjs",
        "^@/(.*)$": "<rootDir>/src/$1",
        "firebase": "firebase/compat/app",
        '^vue3-toastify$': 'vue3-toastify',
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "^@/common-templates/TheModal\\.vue$": "identity-obj-proxy",
    },
}