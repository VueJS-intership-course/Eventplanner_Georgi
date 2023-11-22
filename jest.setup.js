jest.mock('vue-router', () => ({
    useRoute: jest.fn(() => ({
        query: {}
    })),
    useRouter: jest.fn(() => ({
        push: () => { }
    }))
}))

jest.mock("firebase/app", () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(),
        firestore: jest.fn(),
    };
});

jest.mock('vue-router', () => ({
    useRoute: jest.fn(() => ({
        query: {}
    })),
    useRouter: jest.fn(() => ({
        push: () => { }
    }))
}))


jest.mock('@/utils/notifications.js', () => ({}))
