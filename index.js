// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const { supabase } = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "https://afrifoody.onrender.com",
  "https://afrifoody.netlify.app",
  "https://afrifoody.app"
];

app.set("trust proxy", 1);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming request origin:", origin);
      // allow non-browser requests (like curl/postman) that omit Origin
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("localhost:3000") ||
        origin.includes("127.0.0.1:3000") ||
        origin.includes("afrifoody.netlify.app")
      ) return callback(null, true);
      return callback(new Error(`CORS blocked: ${origin} not allowed.`));
    },
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ==========================
// AUTH ENDPOINTS
// ==========================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Email, password, and username are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // stores username in user_metadata
      },
    });

    if (error) throw error;

    res.status(201).json({
      message: "User registered successfully. Please confirm your email.",
      user: data.user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message || "Failed to register user" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Log the full user object for server-side debugging
    console.log("Supabase login user:", data.user);

    res.json({
      message: "Login successful",
      token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
      user: data.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ error: err.message || "Invalid credentials" });
  }
});

// Logout
app.post("/api/auth/logout", async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    const { error } = await supabase.auth.signOut({ refresh_token });
    if (error) throw error;

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: err.message || "Failed to log out" });
  }
});

// ==========================
// RECIPE ENDPOINTS
// ==========================

// Get all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const { data: recipes, error } = await supabase
      .from("recipes")
      .select("*")
      .order("id");

    if (error) throw error;
    if (!recipes?.length) return res.json([]);

    const recipeIds = recipes.map((r) => r.id);

    const { data: recipeIng, error: riErr } = await supabase
      .from("recipe_ingredients")
      .select("*")
      .in("recipe_id", recipeIds);

    if (riErr) throw riErr;

    const ingredientIds = [...new Set(recipeIng.map((r) => r.ingredient_id))];

    const { data: ingredients, error: ingErr } = await supabase
      .from("ingredients")
      .select("*")
      .in("id", ingredientIds);

    if (ingErr) throw ingErr;

    const ingredientMap = {};
    ingredients.forEach((i) => {
      ingredientMap[i.id] = i;
    });

    const ingredientsByRecipe = {};
    recipeIng.forEach((r) => {
      if (!ingredientsByRecipe[r.recipe_id]) ingredientsByRecipe[r.recipe_id] = [];
      if (ingredientMap[r.ingredient_id]) ingredientsByRecipe[r.recipe_id].push(ingredientMap[r.ingredient_id]);
    });

    const result = recipes.map((r) => ({
      ...r,
      image: r.image_url,
      ingredients: ingredientsByRecipe[r.id] || [],
    }));

    res.json(result);
  } catch (err) {
    console.error("Recipes fetch error:", err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Suggest recipes
app.post("/api/recipes/suggest", async (req, res) => {
  try {
    const { selectedIngredients } = req.body;
    if (!Array.isArray(selectedIngredients) || !selectedIngredients.length) {
      return res.status(400).json({ error: "selectedIngredients must be a non-empty array" });
    }

    // build an or query using ilike with %...% for partial matches
    const orQuery = selectedIngredients.map((n) => `name.ilike.%${n}%`).join(",");

    const { data: ingredients, error: ingErr } = await supabase.from("ingredients").select("*").or(orQuery);
    if (ingErr) throw ingErr;
    if (!ingredients?.length) return res.json([]);

    const ingredientIds = ingredients.map((i) => i.id);

    const { data: recipeIng, error: riErr } = await supabase
      .from("recipe_ingredients")
      .select("*")
      .in("ingredient_id", ingredientIds);

    if (riErr) throw riErr;
    if (!recipeIng?.length) return res.json([]);

    const recipeIds = [...new Set(recipeIng.map((r) => r.recipe_id))];

    const { data: allRecipeIng, error: allRiErr } = await supabase
      .from("recipe_ingredients")
      .select("*")
      .in("recipe_id", recipeIds);

    if (allRiErr) throw allRiErr;

    const allIngredientIds = [...new Set(allRecipeIng.map((r) => r.ingredient_id))];

    const { data: allIngredients, error: allIngErr } = await supabase
      .from("ingredients")
      .select("*")
      .in("id", allIngredientIds);

    if (allIngErr) throw allIngErr;

    const ingredientMap = {};
    allIngredients.forEach((i) => {
      ingredientMap[i.id] = i;
    });

    const ingredientsByRecipe = {};
    allRecipeIng.forEach((r) => {
      if (!ingredientsByRecipe[r.recipe_id]) ingredientsByRecipe[r.recipe_id] = [];
      if (ingredientMap[r.ingredient_id]) ingredientsByRecipe[r.recipe_id].push(ingredientMap[r.ingredient_id]);
    });

    const { data: recipes, error: recipesErr } = await supabase
      .from("recipes")
      .select("*")
      .in("id", recipeIds);

    if (recipesErr) throw recipesErr;

    const result = recipes.map((r) => ({
      ...r,
      image: r.image_url,
      ingredients: ingredientsByRecipe[r.id] || [],
    }));

    res.json(result);
  } catch (err) {
    console.error("Recipe suggest error:", err);
    res.status(500).json({ error: "Failed to suggest recipes" });
  }
});

// Get recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: recipe, error } = await supabase.from("recipes").select("*").eq("id", id).single();
    if (error) throw error;

    const { data: recipeIng, error: riErr } = await supabase.from("recipe_ingredients").select("*").eq("recipe_id", id);
    if (riErr) throw riErr;

    const ingredientIds = recipeIng.map((r) => r.ingredient_id);

    const { data: ingredients, error: ingErr } = await supabase.from("ingredients").select("*").in("id", ingredientIds);
    if (ingErr) throw ingErr;

    recipe.ingredients = ingredients;
    recipe.image = recipe.image_url;

    res.json(recipe);
  } catch (err) {
    console.error("Recipe fetch error:", err);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

// ==========================
// INGREDIENT ENDPOINTS
// ==========================
app.get("/api/ingredients", async (req, res) => {
  try {
    const q = req.query.q || "";
    const { data, error } = await supabase.from("ingredients").select("*").ilike("name", `%${q}%`).order("name");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Ingredients fetch error:", err);
    res.status(500).json({ error: "Failed to fetch ingredients" });
  }
});

app.get("/api/ingredients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("ingredients").select("*").eq("id", id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Ingredient fetch error:", err);
    res.status(500).json({ error: "Failed to fetch ingredient" });
  }
});

// Upsert-like ingredient
app.post("/api/ingredients", async (req, res) => {
  try {
    const { name, image = null, description = null, value = null } = req.body || {};
    const clean = (s) => (typeof s === "string" ? s.trim() : "");
    const cleanName = clean(name);

    if (!cleanName) {
      return res.status(400).json({ error: "name is required" });
    }

    // use ilike partial match properly
    const { data: existing, error: findErr } = await supabase.from("ingredients").select("*").or(`name.ilike.%${cleanName}%`);
    if (findErr) throw findErr;

    const match = (existing || []).find((i) => (i.name || "").trim().toLowerCase() === cleanName.toLowerCase());
    if (match) {
      return res.status(200).json(match);
    }

    const { data, error } = await supabase
      .from("ingredients")
      .insert([{ name: cleanName, image, description, value }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json(data);
  } catch (err) {
    console.error("Ingredient upsert error:", err);
    return res.status(500).json({ error: err.message || "Failed to add ingredient" });
  }
});

// ==========================
// Rating Endpoints
// ==========================

// POST /api/recipes/:id/rating  - create or update user's rating for a recipe
app.post("/api/recipes/:id/rating", async (req, res) => {
  try {
    const { id: recipe_id } = req.params;
    const { rating, user_id } = req.body;

    if (!recipe_id || (rating === undefined || rating === null) || !user_id) {
      return res.status(400).json({ error: "recipe_id, rating, and user_id are required" });
    }

    // Upsert so a user can only have one rating per recipe
    const { data, error } = await supabase
      .from("ratings")
      .upsert([{ recipe_id: parseInt(recipe_id, 10), rating: parseInt(rating, 10), user_id }], { onConflict: ["recipe_id", "user_id"] })
      .select();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ error: "Failed to save rating" });
  }
});

// GET /api/recipes/:id/rating/:userId - fetch user's rating for recipe
app.get("/api/recipes/:id/rating/:userId", async (req, res) => {
  try {
    const { id: recipe_id, userId } = req.params;
    const { data, error } = await supabase
      .from("ratings")
      .select("rating")
      .eq("recipe_id", parseInt(recipe_id, 10))
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    res.json({ rating: data?.rating ?? null });
  } catch (err) {
    console.error("Fetch rating error:", err);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
});

// GET /api/recipes/:id/ratings/average - fetch average rating for recipe
app.get("/api/recipes/:id/ratings/average", async (req, res) => {
  try {
    const { id: recipe_id } = req.params;
    const { data, error } = await supabase
      .from("ratings")
      .select("rating")
      .eq("recipe_id", parseInt(recipe_id, 10));

    if (error) throw error;

    const ratings = (data || []).map((r) => Number(r.rating)).filter((n) => !Number.isNaN(n));
    const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    res.json({ average: avg, count: ratings.length });
  } catch (err) {
    console.error("Average rating error:", err);
    res.status(500).json({ error: "Failed to fetch average rating" });
  }
});

// ==========================
// CREATE RECIPE (without quantity)
// ==========================
app.post("/api/recipes", async (req, res) => {
  try {
    const {
      title,
      value = null,
      time = null,
      image_url = null,
      instructions = null,
      ingredientIds = [],
      ingredientDetails = [],
    } = req.body || {};

    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    // Handle ingredientDetails
    let createdIds = [];
    let providedNames = (ingredientDetails || []).map((i) => i.name).filter(Boolean);

    if (providedNames.length > 0) {
      const orQuery = providedNames.map((n) => `name.ilike.%${n}%`).join(",");
      const { data: existingByName, error: findErr } = await supabase
        .from("ingredients")
        .select("*")
        .or(orQuery);

      if (findErr) throw findErr;

      const lowerExisting = new Set((existingByName || []).map((i) => i.name.trim().toLowerCase()));

      const missing = ingredientDetails.filter((i) => !lowerExisting.has(i.name.trim().toLowerCase()));

      if (missing.length > 0) {
        const toInsert = missing.map((i) => ({
          name: i.name,
          description: i.description || null,
          image: i.image || null,
        }));

        const { data: inserted, error: insertErr } = await supabase.from("ingredients").insert(toInsert).select();
        if (insertErr) throw insertErr;
        createdIds = (inserted || []).map((i) => i.id);
      }

      const existingIds = (existingByName || []).map((i) => i.id);
      createdIds = [...existingIds, ...createdIds];
    }

    const allIngredientIds = [
      ...(Array.isArray(ingredientIds) ? ingredientIds : []),
      ...createdIds,
    ]
      .map((x) => parseInt(x, 10))
      .filter((x) => Number.isInteger(x));

    const uniqueIngredientIds = [...new Set(allIngredientIds)];

    if (uniqueIngredientIds.length === 0) {
      return res.status(400).json({ error: "At least one ingredient is required" });
    }

    const { data: recipe, error: recipeErr } = await supabase
      .from("recipes")
      .insert([{ title, value, time, image_url, instructions }])
      .select()
      .single();

    if (recipeErr) throw recipeErr;

    // Link ingredients (without quantity)
    const links = uniqueIngredientIds.map((id) => ({
      recipe_id: recipe.id,
      ingredient_id: id,
    }));

    const { error: linkErr } = await supabase.from("recipe_ingredients").insert(links);
    if (linkErr) throw linkErr;

    // Return recipe + ingredients
    const { data: recipeIng, error: riErr } = await supabase
      .from("recipe_ingredients")
      .select("ingredient_id")
      .eq("recipe_id", recipe.id);

    if (riErr) throw riErr;

    const ingIds = (recipeIng || []).map((r) => r.ingredient_id);

    const { data: ingredients, error: ingErr } = await supabase.from("ingredients").select("*").in("id", ingIds);
    if (ingErr) throw ingErr;

    return res.status(201).json({
      ...recipe,
      ingredients: ingredients || [],
    });
  } catch (err) {
    console.error("Create recipe error:", err);
    return res.status(500).json({ error: err.message || "Failed to create recipe" });
  }
});

// ==========================
// ROOT HEALTH CHECK
// ==========================
app.get("/", (req, res) => {
  res.send("✅ Afrifoody API is running");
});

// ==========================
// ERROR HANDLING
// ==========================
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message || err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ==========================
// SERVER START
// ==========================
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
