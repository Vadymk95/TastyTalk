import { FC } from 'react';

export const MyRecipes: FC = () => {
    return (
        <div>
            <h1>My Recipes</h1>

            {/* <FilterBlock
                onFilterChange={(filters) => {
                    console.log('Filters applied:', filters);
                }}
            /> */}

            {/* <RecipeGrid
                    recipes={[]}
                    onRecipeClick={(recipeId) => {
                        console.log('Recipe clicked:', recipeId);
                    }}
                /> */}
        </div>
    );
};
