import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Recipe } from '@root/types';

interface TemporaryRecipeState {
    currentRecipe: Recipe | null;
    currentQuery: string;
    setCurrentRecipe: (recipe: Recipe | null) => void;
    setCurrentQuery: (query: string) => void;
    clearRecipe: () => void;
    clearQuery: () => void;
}

export const useTemporaryRecipeStore = create<TemporaryRecipeState>()(
    persist(
        (set) => ({
            currentRecipe: null,
            currentQuery: '',
            setCurrentRecipe: (recipe) => set({ currentRecipe: recipe }),
            setCurrentQuery: (query) => set({ currentQuery: query }),
            clearRecipe: () => set({ currentRecipe: null }),
            clearQuery: () => set({ currentQuery: '' })
        }),
        {
            name: 'temporary-recipe',
            partialize: (state) => ({
                currentRecipe: state.currentRecipe,
                currentQuery: state.currentQuery
            })
        }
    )
);
