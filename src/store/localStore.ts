import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocalStorageStore<T> {
    state: Record<string, T>;
    setItem: (key: string, value: T) => void;
    getItem: (key: string, defaultValue: T) => T;
}

export const useLocalStorageStore = create<LocalStorageStore<any>>()(
    persist(
        (set, get) => ({
            state: {},
            setItem: (key, value) => {
                set((prevState) => ({
                    state: { ...prevState.state, [key]: value }
                }));
            },
            getItem: (key, defaultValue) => {
                return get().state[key] ?? defaultValue;
            }
        }),
        {
            name: 'temporary-state'
        }
    )
);
