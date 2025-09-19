require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const { supabase } = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// CORS CONFIGURATION
// ==========================
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
      // allow non-browser requests (curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
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
      options: { data: { username } },
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
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

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
    if (!refresh_token) return res.status(400).json({ error: "Refresh token required" });

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
    const { data: recipes, error } = await supabase.from("recipes").select("*").order("id");
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
    ingredients.forEach((i) => ingredientMap[i.id] = i);

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
    allIngredients.forEach((i) => ingredientMap[i.id] = i);

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

// Get recipe by UUID
app.get("/api/recipes/:uuid", async (req, res) => {
  try {
    const recipe_uuid = req.params.uuid;
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("recipe_uuid", recipe_uuid)
      .single();
    if (error) throw error;

    const { data: recipeIng, error: riErr } = await supabase
      .from("recipe_ingredients")
      .select("*")
      .eq("recipe_id", recipe.id);
    if (riErr) throw riErr;

    const ingredientIds = recipeIng.map((r) => r.ingredient_id);
    const { data: ingredients, error: ingErr } = await supabase
      .from("ingredients")
      .select("*")
      .in("id", ingredientIds);
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
// COMMENTS ENDPOINTS (UUID-safe)
// ==========================

// Get comments and replies
app.get("/api/recipes/:uuid/comments", async (req, res) => {
  try {
    const recipe_uuid = req.params.uuid;

    const { data: comments, error } = await supabase
      .from("comments")
      .select("id, text, user_id, created_at")
      .eq("recipe_uuid", recipe_uuid)
      .order("created_at", { ascending: true });
    if (error) throw error;

    const commentIds = comments.map(c => c.id);

    let replies = [];
    if (commentIds.length > 0) {
      const { data: replyData, error: replyErr } = await supabase
        .from("replies")
        .select("id, comment_id, text, user_id, created_at")
        .in("comment_id", commentIds)
        .order("created_at", { ascending: true });
      if (replyErr) throw replyErr;
      replies = replyData;
    }

    const repliesByComment = {};
    replies.forEach(r => {
      if (!repliesByComment[r.comment_id]) repliesByComment[r.comment_id] = [];
      repliesByComment[r.comment_id].push(r);
    });

    const result = comments.map(c => ({
      ...c,
      replies: repliesByComment[c.id] || []
    }));

    res.json(result);
  } catch (err) {
    console.error("Comments fetch error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Add comment
app.post("/api/recipes/:uuid/comments", async (req, res) => {
  try {
    const recipe_uuid = req.params.uuid;
    const { user_id, text } = req.body;
    if (!user_id || !text) return res.status(400).json({ error: "user_id and text are required" });

    const { data, error } = await supabase
      .from("comments")
      .insert([{ recipe_uuid, user_id, text }])
      .select()
      .single();
    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// Add reply
app.post("/api/comments/:id/replies", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { user_id, text } = req.body;
    if (!user_id || !text) return res.status(400).json({ error: "user_id and text are required" });

    const { data, error } = await supabase
      .from("replies")
      .insert([{ comment_id: commentId, user_id, text }])
      .select()
      .single();
    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error("Add reply error:", err);
    res.status(500).json({ error: "Failed to add reply" });
  }
});

// ==========================
// OTHER ENDPOINTS (Ratings, Ingredients, Create Recipe)
// ==========================
// Keep all as-is, no parseInt for UUIDs where relevant

// ==========================
// ROOT & ERROR HANDLING
// ==========================
app.get("/", (req, res) => res.send("✅ Afrifoody API is running"));

app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message || err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ==========================
// SERVER START
// ==========================
app.listen(PORT, () => console.log(`✅ API running at http://localhost:${PORT}`));
