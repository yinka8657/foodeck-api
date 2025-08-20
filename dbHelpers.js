// dbHelpers.js
const db = require('./db'); // your better-sqlite3 instance

// Add a single ingredient object to the DB
// ingredient = { name, image, description, value, expiry }
function addIngredient(ingredient) {
  const insert = db.prepare(`
    INSERT INTO ingredients (name, image, description, value, expiry)
    VALUES (?, ?, ?, ?, ?)
  `);

  try {
    insert.run(
      ingredient.name,
      ingredient.image || 'https://via.placeholder.com/150',
      ingredient.description || '',
      ingredient.value || '',
      ingredient.expiry || null
    );
    return { success: true };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Ingredient already exists' };
    }
    return { success: false, error: err.message };
  }
}

// Find an ingredient by name (case-insensitive)
function findIngredientByName(name) {
  const stmt = db.prepare('SELECT * FROM ingredients WHERE LOWER(name) = LOWER(?)');
  return stmt.get(name);
}

// Find missing ingredients from an array of ingredient names
function findMissingIngredients(ingredientNames) {
  const getIngredient = db.prepare(
    `SELECT id FROM ingredients WHERE LOWER(name) = LOWER(?)`
  );

  const missing = [];

  for (const name of ingredientNames) {
    const row = getIngredient.get(name);
    if (!row) {
      missing.push(name);
    }
  }

  return missing;
}

// Add a recipe and link ingredients by name
// recipe = {
//   title, value, time, image, instructions, ingredients: [ 'Salt', 'Onion', ... ]
// }
function addRecipe(recipe) {
  if (!recipe.title || !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    return { success: false, error: 'Recipe must have a title and at least one ingredient' };
  }

  // Check for missing ingredients first
  const missingIngredients = findMissingIngredients(recipe.ingredients);
  if (missingIngredients.length > 0) {
    return {
      success: false,
      error: 'Cannot add recipe. Missing ingredients: ' + missingIngredients.join(', '),
    };
  }

  const insertRecipe = db.prepare(`
    INSERT INTO recipes (title, value, time, image_url, instructions)
    VALUES (?, ?, ?, ?, ?)
  `);

  const getRecipeId = db.prepare('SELECT id FROM recipes WHERE title = ?');
  const getIngredientId = db.prepare('SELECT id FROM ingredients WHERE LOWER(name) = LOWER(?)');
  const insertRecipeIngredient = db.prepare(`
    INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
    VALUES (?, ?)
  `);

  try {
    const insertTransaction = db.transaction(() => {
      insertRecipe.run(
        recipe.title,
        recipe.value || '',
        recipe.time || '',
        recipe.image || '',
        recipe.instructions || ''
      );

      const recipeRow = getRecipeId.get(recipe.title);
      if (!recipeRow) throw new Error('Failed to retrieve inserted recipe ID');

      for (const ingredientName of recipe.ingredients) {
        const ingredientRow = getIngredientId.get(ingredientName);
        if (!ingredientRow) {
          throw new Error(`Ingredient '${ingredientName}' not found`);
        }
        insertRecipeIngredient.run(recipeRow.id, ingredientRow.id);
      }
    });

    insertTransaction();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = {
  addIngredient,
  addRecipe,
  findIngredientByName,
  findMissingIngredients,
};
