module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.vue$": "vue3-jest",
        "^.+\\.tsx?$": [
            'ts-jest',
            {
              diagnostics: {
                ignoreCodes: [1343]
              },
              astTransformers: {
                before: [
                  {
                    path: 'node_modules/ts-jest-mock-import-meta',  
                    options: { metaObjectReplacement: { url: 'https://www.url.com' } }
                  }
                ]
              }
            }
        ]
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
            plugins: ["babel-plugin-transform-vite-meta-env"],
        },
    }

}