// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

// Public client (recipes, ingredients, etc.)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Admin client (for creating users)
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  module.exports = { supabase, supabaseAdmin };
