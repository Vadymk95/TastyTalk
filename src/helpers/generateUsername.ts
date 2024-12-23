export const generateUsername = (): string => {
    return `user${Math.floor(Math.random() * 1000000)}`;
};
