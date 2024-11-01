import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
    count: number;
    increaseCount: () => void;
}

export const useStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                count: 0,
                increaseCount: () =>
                    set((state) => ({ count: state.count + 1 }))
            }),
            { name: 'app-storage' }
        )
    )
);
