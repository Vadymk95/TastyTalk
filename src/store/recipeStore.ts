import { db } from '@root/firebase/firebaseConfig';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from 'firebase/firestore';
import { create } from 'zustand';

import { Recipe } from '@root/types';

interface RecipeStoreState {
    addRecipe: (recipe: Recipe) => Promise<void>;
    updateRecipe: (id: string, updatedData: Partial<Recipe>) => Promise<void>;
    deleteRecipe: (id: string) => Promise<void>;
    getRecipe: (id: string) => Promise<Recipe | null>;
    getAllRecipes: () => Promise<Recipe[]>;
}

export const useRecipeStore = create<RecipeStoreState>(() => ({
    addRecipe: async (recipe) => {
        try {
            const recipesRef = collection(db, 'recipes');
            await addDoc(recipesRef, recipe);
        } catch (error) {
            console.error('Error adding recipe:', error);
            throw error;
        }
    },

    updateRecipe: async (id, updatedData) => {
        try {
            const recipeRef = doc(db, 'recipes', id);
            await updateDoc(recipeRef, updatedData);
        } catch (error) {
            console.error('Error updating recipe:', error);
            throw error;
        }
    },

    deleteRecipe: async (id) => {
        try {
            const recipeRef = doc(db, 'recipes', id);
            await deleteDoc(recipeRef);
        } catch (error) {
            console.error('Error deleting recipe:', error);
            throw error;
        }
    },

    getRecipe: async (id) => {
        try {
            const recipeRef = doc(db, 'recipes', id);
            const snapshot = await getDoc(recipeRef);
            if (snapshot.exists()) {
                return snapshot.data() as Recipe;
            } else {
                console.warn('Recipe not found:', id);
                return null;
            }
        } catch (error) {
            console.error('Error fetching recipe:', error);
            throw error;
        }
    },

    getAllRecipes: async () => {
        try {
            const recipesRef = collection(db, 'recipes');
            const snapshot = await getDocs(recipesRef);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Recipe[];
        } catch (error) {
            console.error('Error fetching all recipes:', error);
            throw error;
        }
    }
}));
