module.exports = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.vue$": "vue3-jest"
    },
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
    }
}