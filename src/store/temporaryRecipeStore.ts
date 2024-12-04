import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Recipe } from '@root/types';

interface TemporaryRecipeState {
    currentRecipe: Recipe | null;
    currentQuery: string;
    currentStep: number;
    manualFormData: Partial<Recipe> | null;
    setCurrentRecipe: (recipe: Recipe | null) => void;
    setCurrentQuery: (query: string) => void;
    setCurrentStep: (step: number) => void;
    setManualFormData: (data: Partial<Recipe>) => void;
    clearRecipe: () => void;
    clearQuery: () => void;
    resetManualForm: () => void;
}

export const useTemporaryRecipeStore = create<TemporaryRecipeState>()(
    persist(
        (set) => ({
            currentRecipe: null,
            currentQuery: '',
            currentStep: 0,
            manualFormData: null,
            setCurrentRecipe: (recipe) => set({ currentRecipe: recipe }),
            setCurrentQuery: (query) => set({ currentQuery: query }),
            setCurrentStep: (step) => set({ currentStep: step }),
            setManualFormData: (data) => set({ manualFormData: data }),
            clearRecipe: () => set({ currentRecipe: null }),
            clearQuery: () => set({ currentQuery: '' }),
            resetManualForm: () => set({ currentStep: 0, manualFormData: null })
        }),
        {
            name: 'temporary-recipe',
            partialize: (state) => ({
                currentRecipe: state.currentRecipe,
                currentQuery: state.currentQuery,
                currentStep: state.currentStep,
                manualFormData: state.manualFormData
            })
        }
    )
);
