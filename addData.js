const { addIngredient, addRecipe } = require('./dbHelpers');

// Example: Add one ingredient
const ingredientResult = addIngredient({
  name: 'Garlic',
  image: 'https://example.com/garlic.jpg',
  description: 'Fresh garlic cloves',
  value: 'Vitamin C',
  expiry: '2026-12-31',
});
console.log('Add Ingredient:', ingredientResult);

// Example: Add one recipe with ingredient names linked
const recipeResult = addRecipe({
  title: 'Garlic Chicken',
  value: 'Protein',
  time: '40 mins',
  image: 'https://example.com/garlic-chicken.jpg',
  instructions: 'Cook chicken with garlic...',
  ingredients: ['Chicken', 'Garlic', 'Salt', 'Pepper'],  // must exist in ingredients table
});
console.log('Add Recipe:', recipeResult);
