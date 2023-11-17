module.exports = {
    preset: 'ts-jest',
    transform: {
        '\\.js$': ['babel-jest', { configFile: './babel.config.json' }],
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.vue$": "vue3-jest",
        "^.+\\.tsx?$": "ts-jest"
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
    },
    globals: {
        "ts-jest": {
            tsconfig: false,
            useESM: true,
            babelConfig: true,
            plugins: ["babel-plugin-transform-vite-meta-glob"],
        },
    }

}