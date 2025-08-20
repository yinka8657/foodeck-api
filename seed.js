require('dotenv').config();
const db = require('./db'); // your better-sqlite3 db instance

const ingredients = [
  {
    id: 1,
    name: "Rice",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/rice.jpg",
    description: "A staple grain widely consumed in Africa, used in dishes like jollof rice and fried rice.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 2,
    name: "Ofada Rice",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ofada-rice.jpg",
    description: "Indigenous Nigerian variety of rice with a distinct aroma and slightly nutty flavor, often served with spicy stew.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 3,
    name: "Maize Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/corn-flour.jpg",
    description: "Ground dried maize, used in African staples like pap, tuwo, and ugali.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 4,
    name: "Teff Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/teff-flour.jpg",
    description: "Gluten-free flour from teff grain, a staple in Ethiopia, used to make injera.",
    value: "Fibre",
    expiry: "1/12/2026"
  },

  {
    id: 5,
    name: "Yam",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/yam.jpg",
    description: "Starchy tuber popular in West Africa, often boiled, fried, or pounded.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 6,
    name: "Cassava",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/cassava.jpg",
    description: "Root crop processed into gari, fufu, and tapioca, a major energy source in Africa.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },
  
  {
    id: 7,
    name: "Cocoyam",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/cocoyam.jpg",
    description: "Root vegetable used in soups and pottages, with a slightly nutty flavor.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 8,
    name: "Plantains",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/plantain.jpg",
    description: "Starchy banana variety, consumed boiled, fried, or roasted across Africa.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 9,
    name: "Beans",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/beans.jpg",
    description: "Legume commonly used in African dishes like moi moi, akara, and beans porridge.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 10,
    name: "Bean Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/beans-flour.jpg",
    description: "Ground dried beans used in making moi moi, akara, and other African delicacies.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 11,
    name: "Bambara Nut Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/bambara-nut-flour.jpg",
    description: "Ground flour from Bambara groundnut, used in snacks and traditional porridge.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 12,
    name: "Cassava Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/cassava-flour.jpg",
    description: "Fine flour made from cassava, used in bread, pastries, and fufu.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 13,
    name: "Flour",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/flour.jpg",
    description: "General wheat-based flour used for bread, pastries, and snacks.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },
  
  {
    id: 14,
    name: "Pumpkin",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/pumpkin.jpg",
    description: "Sweet-fleshed vegetable used in soups, stews, and as a side dish.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 15,
    name: "Garden Eggs",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/garden-egg.jpg",
    description: "Small African eggplants used in stews, sauces, and eaten raw with peanut sauce.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 16,
    name: "Potato",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/potato.jpg",
    description: "Versatile tuber eaten boiled, fried, or mashed.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 17,
    name: "Baobab Leaf Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/baobab-leaf-powder.jpg",
    description: "Powdered baobab leaves used in sauces and soups in West Africa.",
    value: "Calcium",
    expiry: "1/12/2026"
  },

  {
    id: 18,
    name: "Baobab Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/baobab-powder.jpg",
    description: "Powder from baobab fruit pulp, used in drinks, smoothies, and sauces.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 19,
    name: "Tomatoes",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/tomatoes.jpg",
    description: "Juicy red fruit used as a base for stews, soups, and sauces, adding flavor and color.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 20,
    name: "Tomato Paste",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/tomato-paste.jpg",
    description: "Concentrated form of tomatoes, providing intense flavor and color in cooking.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 21,
    name: "Red Bell Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/red-bell-peppers.jpg",
    description: "Sweet, crunchy peppers that add flavor, color, and nutrients to dishes.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 22,
    name: "Green Bell Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/green-bell-pepper.jpg",
    description: "Mild-tasting peppers used in stir-fries, stews, and salads.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 23,
    name: "Scotch Bonnet Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/scotch-bonnet-peppers.jpg",
    description: "Small, very hot peppers that add spice and aroma to West African dishes.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 24,
    name: "Onions",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/onions.jpg",
    description: "Aromatic vegetable used to build flavor in soups, stews, and sauces.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 25,
    name: "Coriander Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/coriander-leaves.jpg",
    description: "Fresh herb with a citrusy flavor used as garnish and seasoning.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 26,
    name: "Green Chili Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/green-chili-peppers.jpg",
    description: "Spicy peppers used fresh or cooked to add heat and flavor to meals.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 27,
    name: "Lime Juice",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/lime-juice.jpg",
    description: "Tart liquid from limes, used for seasoning, marinades, and beverages.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 28,
    name: "Spinach Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/spinach-leaves.jpg",
    description: "Tender leafy greens used in soups, stir-fries, and salads.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 29,
    name: "Spinach",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/spinach-leaves.jpg",
    description: "Broad leafy green vegetable used cooked or raw in various dishes.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 30,
    name: "Oha Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/oha-leaves.jpg",
    description: "Soft-textured leaves used in traditional Igbo soups like Oha Soup.",
    value: "Fibre",
    expiry: "1/12/2026"
  },

  {
    id: 31,
    name: "Afang Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/afang-leaves.jpg",
    description: "Slightly bitter leaves used in Afang Soup, often mixed with waterleaf.",
    value: "Fibre",
    expiry: "1/12/2026"
  },

  {
    id: 32,
    name: "Waterleaf",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/waterleaf.jpg",
    description: "Soft, water-rich leaves used in soups and stews to add thickness and nutrition.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 33,
    name: "Ugwu Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ugwu-leaves.jpg",
    description: "Dark green leafy vegetable used widely in Nigerian soups.",
    value: "Iron",
    expiry: "1/12/2026"
  },

  {
    id: 34,
    name: "Uziza Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/uziza-leaves.jpg",
    description: "Aromatic leaves with a peppery flavor, used to spice up soups.",
    value: "Fibre",
    expiry: "1/12/2026"
  },

  {
    id: 35,
    name: "Utazi Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/utazi-leaves.jpg",
    description: "Bitter-tasting leaves used for flavoring and medicinal purposes in soups.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 36,
    name: "Pumpkin Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/pumpkin-leaves.jpg",
    description: "Tender green leaves from pumpkin plants, cooked in soups and stews.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 37,
    name: "Basil Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/basil-leaves.jpg",
    description: "Fragrant herb used fresh or dried to enhance flavor in soups and sauces.",
    value: "Vitamin K",
    expiry: "1/12/2026"
  },

  {
    id: 38,
    name: "Goat Meat",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/goat-meat.jpg",
    description: "Lean red meat with a distinct flavor, commonly used in stews, soups, and grills.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 39,
    name: "Stock Fish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/stock-fish.jpg",
    description: "Sun-dried cod or similar fish used to add deep umami flavor to African soups.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 40,
    name: "Beef",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/beef.jpg",
    description: "Popular red meat used in a wide range of soups, stews, and grilled dishes.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 41,
    name: "Chicken Stock",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/chicken-stock.jpg",
    description: "Flavorful liquid made from simmering chicken bones, used to enhance soups and sauces.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 42,
    name: "Chicken Breast",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/chicken-breast.jpg",
    description: "Lean white meat used in grilled, stir-fried, or stewed recipes.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 43,
    name: "Chicken Pieces",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/chicken-pieces.jpg",
    description: "Mixed cuts of chicken, providing a variety of flavors and textures in cooking.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 44,
    name: "Assorted Meat",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/assorted-meat.jpg",
    description: "Combination of various cow or goat parts (tripe, intestine, skin) used in soups and stews.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 45,
    name: "Catfish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/catfish.jpg",
    description: "Freshwater fish with a rich, moist flavor, often used in pepper soups and stews.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 46,
    name: "Fresh Fish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/fresh-fish.jpg",
    description: "Recently caught fish of various types, providing delicate flavor and texture.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 47,
    name: "Goat Head",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/goat-head.jpg",
    description: "Specialty cut used in dishes like Isi Ewu, prized for its tender and flavorful meat.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 48,
    name: "Cow Foot",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/cow-foot.jpg",
    description: "Gelatin-rich meat cut, slow-cooked in soups for thickness and flavor.",
    value: "Protein",
    expiry: "1/12/2026"
  },

    {
    id: 49,
    name: "Periwinkle",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/periwinkle.jpg",
    description: "Small edible sea snails often used in Nigerian coastal soups for added texture and flavor.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 50,
    name: "Crayfish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/crayfish.jpg",
    description: "Dried and ground freshwater crustaceans used as a seasoning to impart a rich, savory taste to dishes.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 51,
    name: "Stock Fish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/stock-fish.jpg",
    description: "Sun-dried cod or similar white fish that adds deep umami and aroma to traditional soups.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 52,
    name: "Vegetable Oil",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/vegetable-oil.jpg",
    description: "A neutral-flavored oil extracted from plant sources, widely used for frying, sautéing, and general cooking.",
    value: "Fats",
    expiry: "1/12/2026"
  },

  {
    id: 53,
    name: "Palm Oil",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/palm-oil.jpg",
    description: "Deep red oil extracted from palm fruit, giving African soups and stews a distinct color and flavor.",
    value: "Vitamin E",
    expiry: "1/12/2026"
  },

  {
    id: 54,
    name: "Groundnut Oil",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/groundnut-oil.jpg",
    description: "Light-flavored oil extracted from peanuts, ideal for frying and deep cooking due to its high smoke point.",
    value: "Fats",
    expiry: "1/12/2026"
  },

  {
    id: 55,
    name: "Melon Seeds",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/melon-seeds.jpg",
    description: "Seeds from the egusi melon, ground and used to thicken and flavor West African soups.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 56,
    name: "Groundnut",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/groundnut-oil.jpg",
    description: "Commonly known as peanuts, eaten roasted, boiled, or used in cooking and snacks.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 57,
    name: "Groundnut Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/groundnut-powder.jpg",
    description: "Finely ground roasted peanuts used to enrich soups, stews, and sauces.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 58,
    name: "Groundnut Paste",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/groundnut-paste.jpg",
    description: "Thick peanut-based paste used in making sauces, stews, and spreads.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 59,
    name: "Ogbono Seeds",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ogbono-seeds.jpg",
    description: "Wild African mango seeds, ground to create a mucilaginous texture in soups.",
    value: "Fats",
    expiry: "1/12/2026"
  },

  {
    id: 60,
    name: "Curry Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/curry-powder.jpg",
    description: "A blend of spices including turmeric, coriander, and cumin, adding color and aromatic flavor to dishes.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 61,
    name: "Thyme",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/thyme.jpg",
    description: "A fragrant herb used fresh or dried to season soups, stews, and meats.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 62,
    name: "Pepper Soup Spice",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/pepper-soup-spice.jpg",
    description: "A traditional Nigerian blend of spices like uda, ehuru, and alligator pepper used for pepper soup.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 63,
    name: "Suya Spice Mix",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/suya-spice-mix.jpg",
    description: "A peanut-based spicy mix including ginger, garlic, paprika, and chili, used for grilled meats.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 64,
    name: "Yaji Spice Mix",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/suya-spice-mix.jpg",
    description: "A variation of suya spice with extra chili, peanuts, and aromatic herbs for intense heat and flavor.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 65,
    name: "Locust Beans",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/locust-beans.jpg",
    description: "Fermented African carob seeds, used to add deep umami flavor to traditional soups.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 66,
    name: "Dried Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/dried-peppers.jpg",
    description: "Sun-dried chili peppers ground into flakes or powder for heat and flavor.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 67,
    name: "Dried Apricots",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/dried-apricots.jpg",
    description: "Sweet dried fruit used in savory-sweet stews and rice dishes.",
    value: "Vitamin A",
    expiry: "1/12/2026"
  },

  {
    id: 68,
    name: "Raisins",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/raisins.jpg",
    description: "Dried grapes used to add sweetness and texture to savory or dessert recipes.",
    value: "Natural Sugar",
    expiry: "1/12/2026"
  },

  {
    id: 69,
    name: "Cardamom Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/caradom-powder.jpg",
    description: "Aromatic spice from cardamom seeds, adding warmth and sweetness to dishes.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 70,
    name: "Black Pepper",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/black-pepper.jpg",
    description: "Ground spice from peppercorns, enhancing flavor and aiding digestion.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 71,
    name: "Red Chili Flakes",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/red-chili-flakes.jpg",
    description: "Crushed dried red chilies used to add heat to food.",
    value: "Capsaicin",
    expiry: "1/12/2026"
  },

  {
    id: 72,
    name: "Vinegar",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/vinegar.jpg",
    description: "Sour liquid from fermented alcohol, used for pickling, marinades, and flavor balance.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 73,
    name: "Bay Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/bay-leaves.jpg",
    description: "Aromatic leaves used to infuse soups, stews, and sauces with subtle herbal notes.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 74,
    name: "Garlic",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/garlic.jpg",
    description: "Pungent bulb used fresh or dried to season and enhance flavor.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

   {
    id: 75,
    name: "Ginger",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ginger.jpg",
    description: "Aromatic root used for heat, flavor, and medicinal benefits.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 76,
    name: "Chili Pepper",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/chili-pepper.jpg",
    description: "Fresh or dried peppers that add varying levels of heat to food.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 77,
    name: "Salt",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/salt.jpg",
    description: "Essential seasoning used to enhance flavor and preserve food.",
    value: "Sodium",
    expiry: "1/12/2026"
  },

  {
    id: 78,
    name: "Seasoning Cubes",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/seasoning-cubes.jpg",
    description: "Compressed stock cubes made from salt, spices, and flavorings, used to season dishes.",
    value: "Sodium",
    expiry: "1/12/2026"
  },

  {
    id: 79,
    name: "Ground Pepper",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ground-pepper.jpg",
    description: "Finely ground black or white peppercorns, used for flavor and mild heat.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 80,
    name: "Pepper Sauce",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/pepper-sauce.jpg",
    description: "A spicy condiment made from blended peppers, oil, and seasonings.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },

  {
    id: 81,
    name: "Potash",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/potash.jpg",
    description: "Alkaline cooking additive used to tenderize food and thicken certain traditional dishes.",
    value: "Potassium Carbonate",
    expiry: "1/12/2026"
  },

  {
    id: 82,
    name: "Honey",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/honey.jpg",
    description: "Sweet viscous liquid made by bees, used as a natural sweetener and flavor enhancer.",
    value: "Natural Sugar",
    expiry: "1/12/2026"
  },

  {
    id: 83,
    name: "Sugar",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/sugar.jpg",
    description: "Sweetener used in cooking, baking, and beverages.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 84,
    name: "Granulated Sugar",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/granulated-sugar.jpg",
    description: "White refined sugar with fine crystals, used widely in sweet recipes and drinks.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 85,
    name: "Yeast",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/yeast.jpg",
    description: "Living fungus used in baking to ferment and leaven dough.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 86,
    name: "Water",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/water.jpg",
    description: "Clear, odorless liquid vital for cooking, steaming, and boiling.",
    value: "Essential for Hydration",
    expiry: "1/12/2026"
  },

   {
    id: 87,
    name: "White Bread",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/white-bread.jpg",
    description: "Soft bread made from refined white flour, used in snacks and meals.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 88,
    name: "Milk",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/milk.jpg",
    description: "Nutrient-rich liquid from mammals, used for drinking, cooking, and baking.",
    value: "Protein",
    expiry: "1/12/2026"
  },

   {
    id: 89,
    name: "Eggs",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/eggs.jpg",
    description: "Versatile food from poultry, used boiled, fried, scrambled, or in baking.",
    value: "Protein",
    expiry: "1/12/2026"
  },

  {
    id: 90,
    name: "Coconut Milk",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/coconut-milk.jpg",
    description: "Creamy liquid extracted from grated coconut meat, used in curries, stews, and desserts.",
    value: "Fats",
    expiry: "1/12/2026"
  },

  {
    id: 91,
    name: "Palm Nuts",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/palm-nuts.jpg",
    description: "Palm nuts are the fruit of the oil palm tree, commonly boiled, pounded, and processed to extract palm oil used in West African soups such as Banga and Ofe Akwu.",
    value: "Vitamin E",
    expiry: "1/12/2026"
  },

  {
    id: 92,
    name: "Banga Spices",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/banga-spices.jpg",
    description: "A traditional spice mix for Banga soup, often including combinations like oburunbebe stick, ataiko, rohojie, and other indigenous spices that give the soup its distinctive aroma and flavor.",
    value: "Antioxidants",
    expiry: "1/12/2026"
  },

  {
    id: 93,
    name: "Scent Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/scent-leaves.jpg",
    description: "Aromatic leafy herb popular in Nigerian cooking, valued for its peppery, minty taste and health benefits such as aiding digestion and boosting immunity.",
    value: "Calcuim & Iron",
    expiry: "1/12/2026"
  },

  {
    id: 94,
    name: "Pepper",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/habanero-peppers.jpg",
    description: "Pepper is a spicy vegetable rich in Vitamin C and antioxidants, commonly used to add heat and flavor to Nigerian dishes.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },
  {
    id: 95,
    name: "Okra",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/okra.jpg",
    description: "Okra is a green pod vegetable known for its mucilaginous texture that thickens soups such as Okra Soup.",
    value: "Dietary Fiber",
    expiry: "1/12/2026"
  },
  {
    id: 96,
    name: "Sesame Seeds",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/sesame-seeds.jpg",
    description: "Sesame seeds are tiny oil-rich seeds used in soups like Beniseed Soup, providing protein, calcium, and healthy fats.",
    value: "Healthy Fats",
    expiry: "1/12/2026"
  },
  {
    id: 97,
    name: "Abacha",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/abacha.jpg",
    description: "Abacha, also known as African Salad, is made from processed shredded cassava and is popular in Igbo cuisine.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },
  {
    id: 98,
    name: "Ugba",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/ugba.jpg",
    description: "Ugba is fermented African oil bean seed, often mixed with Abacha, rich in plant protein and probiotics.",
    value: "Protein",
    expiry: "1/12/2026"
  },
  {
    id: 99,
    name: "Pigeon Peas",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/pigeon-peas.jpg",
    description: "Pigeon peas are legumes high in protein and fiber, used in stews, porridges, and side dishes.",
    value: "Protein",
    expiry: "1/12/2026"
  },
  {
    id: 100,
    name: "Dried Fish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/dried-fish.jpg",
    description: "Dried fish is preserved fish with a strong flavor, commonly used in Nigerian soups and stews for its umami richness.",
    value: "Protein",
    expiry: "1/12/2026"
  },
  {
    id: 101,
    name: "Smoked Fish",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/smoked-fish.jpg",
    description: "Smoked fish is fire-dried fish that adds a deep smoky taste to soups and sauces while providing omega-3 fatty acids.",
    value: "Omega-3 Fatty Acids",
    expiry: "1/12/2026"
  },
  {
    id: 102,
    name: "Cow Tripe",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/cow-tripe.jpg",
    description: "Cow tripe, the edible stomach lining of cattle, is commonly used in Nigerian soups and stews like Pepper Soup and Nkwobi.",
    value: "Protein",
    expiry: "1/12/2026"
  },
  {
    id: 103,
    name: "Habanero Peppers",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/habanero-peppers.jpg",
    description: "Habanero peppers are very hot chili peppers rich in capsaicin, often used to bring intense spice to Nigerian dishes.",
    value: "Capsaicin",
    expiry: "1/12/2026"
  },
  {
    id: 104,
    name: "Corn",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/corn.jpg",
    description: "Corn is a cereal grain eaten boiled, roasted, or ground into flour. It is a staple in many Nigerian meals such as Pap and Tuwo.",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },
  {
    id: 105,
    name: "Water Yam",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/water-yam.jpg",
    description: "Water yam is a yam variety often grated and used to prepare dishes like Ikokore (water yam porridge).",
    value: "Carbohydrates",
    expiry: "1/12/2026"
  },

  {
    id: 106,
    name: "Banga",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/palm-nuts.jpg",
    description: "Palm nuts are the fruit of the oil palm tree, commonly boiled, pounded, and processed to extract palm oil used in West African soups such as Banga and Ofe Akwu.",
    value: "Vitamin E",
    expiry: "1/12/2026"
  },

  {
    id: 107,
    name: "Lemon Juice",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/lemon-juice.jpg",
    description: "Freshly squeezed citrus juice commonly used to enhance flavor in both sweet and savory dishes. Rich in Vitamin C and antioxidants.",
    value: "Vitamin C",
    expiry: "1/12/2026"
  },
  {
    id: 108,
    name: "Baking Powder",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/baking-powder.jpg",
    description: "A leavening agent used in baking to help dough rise, made from a mixture of carbonate or bicarbonate and acid salts.",
    value: "Sodium Bicarbonate",
    expiry: "1/12/2026"
  },
  {
    id: 109,
    name: "Okazi Leaves",
    image: "https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/ingredient_image/okazi-leaves.jpg",
    description: "A tough, slightly bitter leafy vegetable widely used in Nigerian soups such as Afang Soup. Known for its high fiber content.",
    value: "Dietary Fiber & Iron",
    expiry: "1/12/2026"
  },


];









// Ensure images fallback placeholder
ingredients.forEach(i => {
  if (!i.image || i.image.trim() === "") {
    i.image = "https://via.placeholder.com/150";
  }
});

const recipes = [
  {
    id: 1,
    title: 'Jollof Rice',
    value: 'Carbohydrate',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/jollof-rice.jpg',
    ingredients: [
      'Rice',
      'Tomatoes',
      'Tomato Paste',
      'Red Bell Peppers',
      'Onions',
      'Vegetable Oil',
      'Chicken Stock',
      'Curry Powder',
      'Thyme',
      'Salt',
      'Ground Pepper'
    ],
    instructions: 'Wash and parboil the rice until partially cooked, then drain and set aside. Blend the tomatoes, red bell peppers, and onions into a smooth paste. Heat vegetable oil in a pot, fry sliced onions until fragrant, then stir in the blended mix with tomato paste. Season with curry powder, thyme, salt, and pepper, and cook until the oil separates from the sauce. Add chicken stock and stir in the parboiled rice, mixing thoroughly. Cover and cook on low heat until the rice is tender and has absorbed all flavors.'
  },

  {
    id: 2,
    title: 'Egusi Soup',
    value: 'Protein',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/egusi-soup.jpg',
    ingredients: [
      'Melon Seeds',
      'Palm Oil',
      'Spinach Leaves',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Onions',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Season and boil the goat meat and stock fish until tender, reserving the broth. Heat palm oil in a pot, add chopped onions, and fry lightly. Stir in the ground melon seeds, cooking gently to release flavor. Gradually add the meat stock while stirring to form a thick base. Mix in the cooked meat, fish, crayfish, and chopped peppers, adjusting seasoning as needed. Add spinach leaves and simmer briefly before serving hot.'
  },

  {
    id: 3,
    title: 'Bunny Chow',
    value: 'Protein',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/bunny-chow.jpg',
    ingredients: [
      'White Bread',
      'Chicken Breast',
      'Curry Powder',
      'Onions',
      'Garlic',
      'Ginger',
      'Tomatoes',
      'Potato',
      'Vegetable Oil',
      'Salt',
      'Pepper'
    ],
    instructions: 'Slice the bread loaf in half and hollow out the center to make a bowl. Heat vegetable oil in a large pan and sauté onions, garlic, and ginger until aromatic. Add diced chicken and brown lightly before mixing in curry powder. Stir in tomatoes and potatoes, adding water to form a sauce if necessary. Cook until chicken is tender and potatoes are soft. Ladle the curry into the bread bowl and serve hot.'
  },

  {
    id: 4,
    title: 'Bobotie',
    value: 'Protein',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/bobotie.jpg',
    ingredients: [
      'Beef',
      'White Bread',
      'Milk',
      'Eggs',
      'Onions',
      'Curry Powder',
      'Dried Apricots',
      'Raisins',
      'Vinegar',
      'Bay Leaves',
      'Salt',
      'Pepper'
    ],
    instructions: 'Preheat the oven to 180°C and grease a baking dish. Soak slices of bread in milk until soft, then squeeze gently. Fry chopped onions until soft, then add minced beef and cook until browned. Mix in curry powder, apricots, raisins, vinegar, salt, and pepper. Transfer to the baking dish and smooth the surface. Whisk eggs with the leftover milk, pour over the meat, top with bay leaves, and bake until golden brown.'
  },

  {
    id: 5,
    title: 'Chapati',
    value: 'Carbohydrates',
    time: '35min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/chapati.jpg',
    ingredients: [
      'Flour',
      'Water',
      'Salt',
      'Vegetable Oil'
    ],
    instructions: 'Combine flour and salt in a bowl, then add warm water gradually to form a dough. Knead for 10 minutes until smooth and elastic, then cover and rest for 30 minutes. Divide into small balls and roll out each into thin circles. Heat a skillet, lightly brush with oil, and cook each chapati until golden on both sides. Stack and cover to keep warm until ready to serve.'
  },

  {
    id: 6,
    title: 'Mandazi',
    value: 'Carbohydrates',
    time: '25min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/mandazi.jpg',
    ingredients: [
      'Flour',
      'Granulated Sugar',
      'Coconut Milk',
      'Baking Powder',
      'Cardamom Powder',
      'Vegetable Oil',
      'Salt'
    ],
    instructions: 'In a mixing bowl, combine flour, sugar, baking powder, cardamom, and salt. Add coconut milk slowly, mixing until a soft dough forms. Knead lightly, cover, and rest for 20 minutes. Roll the dough to about 1 cm thick and cut into triangles or squares. Heat oil in a deep pan and fry until golden on both sides. Drain on paper towels before serving warm.'
  },

  {
    id: 7,
    title: 'Kachumbari',
    value: 'Vitamin C',
    time: '10min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/kachumbari.jpg',
    ingredients: [
      'Tomatoes',
      'Onions',
      'Coriander Leaves',
      'Green Chili Peppers',
      'Lime Juice',
      'Salt'
    ],
    instructions: 'Dice ripe tomatoes into small cubes and thinly slice the red onions. Soak the onions in salted water for a few minutes to reduce sharpness. Chop coriander leaves and chili peppers finely. Combine all vegetables in a bowl, drizzle with lime juice, and season with salt. Toss gently to mix flavors and serve immediately as a refreshing side.'
  },

  {
    id: 8,
    title: 'Nyama Choma',
    value: 'Protein',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/nyama-choma.jpg',
    ingredients: [
      "Goat Meat",
      'Lemon Juice',
      'Salt',
      'Black Pepper',
      'Red Chili Flakes'
    ],
    instructions: 'Cut goat meat into medium pieces and place in a large bowl. Marinate with lemon juice, salt, pepper, and chili flakes for at least an hour. Preheat a charcoal grill until hot. Place meat on the grill, turning occasionally until fully cooked and charred on the edges. Serve hot with ugali or fresh vegetables.'
  },

  {
    id: 9,
    title: 'Ugali',
    value: 'Carbohydrates',
    time: '15min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ugali.jpg',
    ingredients: [
      'Maize Flour',
      'Water',
      'Salt'
    ],
    instructions: 'Bring salted water to a boil in a large pot. Slowly pour in maize flour while stirring constantly to prevent lumps. Reduce heat and continue stirring until thick and firm. Shape into a mound and serve hot with meat or vegetable dishes.'
  },

  {
    id: 10,
    title: 'Injera',
    value: 'Fiber',
    time: '20min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/injera.jpg',
    ingredients: [
      'Teff Flour',
      'Water',
      'Salt'
    ],
    instructions: 'Mix teff flour, water, and salt into a thin batter, cover, and ferment for 1–3 days until slightly sour. Heat a skillet over medium heat and pour the batter in a circular motion to cover the surface. Cover and cook until bubbles form and the top sets without flipping. Remove and keep warm. Repeat with the remaining batter. Serve with various stews or vegetables.'
  },

  {
    id: 11,
    title: 'Suya',
    value: 'Protein',
    time: '30min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/suya.jpg',
    ingredients: [
      'Beef',
      'Groundnut Powder',
      'Suya Spice Mix',
      'Vegetable Oil',
      'Onions',
      'Tomatoes',
      'Salt'
    ],
    instructions: 'Slice beef into thin strips and pat dry with a paper towel. Mix ground peanut powder with suya spice and salt, then coat the beef thoroughly. Thread the beef strips onto skewers and brush lightly with vegetable oil. Grill over medium-high heat, turning occasionally, until cooked through and slightly charred. Serve hot with sliced onions and tomatoes on the side.'
  },

  {
    id: 12,
    title: 'Pepper Soup',
    value: 'Protein',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/pepper-soup.jpg',
    ingredients: [
      'Goat Meat',
      'Pepper Soup Spice',
      'Scotch Bonnet Peppers',
      'Onions',
      'Basil Leaves',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Wash and cut goat meat into medium pieces, then place in a pot with chopped onions and seasoning cubes. Add water to cover and bring to a boil. Stir in pepper soup spice blend and chopped scotch bonnet peppers. Reduce heat and simmer until the meat is tender. Add fresh basil leaves before serving for extra flavor.'
  },

  {
    id: 13,
    title: 'Fufu',
    value: 'Carbohydrates',
    time: '30min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/fufu.jpg',
    ingredients: [
      'Cassava',
      'Yam',
      'Water'
    ],
    instructions: 'Peel cassava and yams, then cut into chunks. Boil in water until soft. Drain and transfer to a mortar, pounding until smooth and stretchy. Alternatively, blend boiled pieces in a food processor. Shape into balls and serve with soups or stews.'
  },

  {
    id: 14,
    title: 'Groundnut Stew',
    value: 'Fats',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/groundnut-stew.jpg',
    ingredients: [
      'Groundnut',
      'Tomatoes',
      'Onions',
      'Chicken Pieces',
      'Vegetable Oil',
      'Seasoning Cubes',
      'Salt',
      'Chili Pepper'
    ],
    instructions: 'Heat vegetable oil in a pot and sauté chopped onions until fragrant. Add diced tomatoes and cook until soft. Stir in peanut butter and mix until smooth, then add chicken pieces. Pour in enough water to make a thick stew and season with cubes, salt, and chili pepper. Simmer until the chicken is cooked through and the sauce is rich.'
  },

  {
    id: 15,
    title: 'Moi Moi',
    value: 'Protein',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/moi-moi.jpg',
    ingredients: [
      'Beans',
      'Red Bell Peppers',
      'Scotch Bonnet Peppers',
      'Onions',
      'Vegetable Oil',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Soak beans in water, then peel off the skins. Blend peeled beans with peppers, onions, and water to form a smooth paste. Add vegetable oil, seasoning cubes, and salt, mixing well. Pour into ramekins or banana leaves, cover tightly, and steam for about 45 minutes. Check for firmness before serving.'
  },

  {
    id: 16,
    title: 'Efo Riro',
    value: 'Iron',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/efo-riro.jpg',
    ingredients: [
      'Spinach Leaves',
      'Tomatoes',
      'Red Bell Peppers',
      'Scotch Bonnet Peppers',
      'Palm Oil',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Onions',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Wash and season goat meat and stock fish, then boil until tender. Blend tomatoes, red bell peppers, and scotch bonnets into a smooth paste. Heat palm oil in a pot, add sliced onions, and fry briefly. Stir in the blended pepper mixture and cook until the oil floats to the top. Add the cooked meats, crayfish, and seasoning, then stir in spinach leaves. Simmer for a few minutes before serving.'
  },

  {
    id: 17,
    title: 'Oha Soup',
    value: 'Fiber',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/oha-soup.jpg',
    ingredients: [
      'Oha Leaves',
      'Cocoyam',
      'Palm Oil',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Wash and season the goat meat and stock fish, then boil until tender. Add cocoyam paste to the broth and stir until dissolved, forming a thick soup base. Pour in palm oil and stir well. Add ground crayfish, peppers, and seasoning, then bring to a simmer. Stir in shredded oha leaves and cook for a few minutes before serving hot.'
  },

  {
    id: 18,
    title: 'Afang Soup',
    value: 'Antioxidants',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/afang-soup.jpg',
    ingredients: [
      'Afang Leaves',
      'Waterleaf',
      'Palm Oil',
      'Periwinkle',
      'Stock Fish',
      'Beef',
      'Crayfish',
      'Seasoning Cubes',
      'Salt',
      'Scotch Bonnet Peppers'
    ],
    instructions: 'Wash and season beef and stock fish, then boil until tender. Add palm oil to the pot, followed by ground crayfish, peppers, and seasoning. Stir in chopped waterleaf and cook until softened. Add the shredded afang leaves and periwinkle, then simmer until the soup thickens. Adjust seasoning to taste and serve hot.'
  },

  {
    id: 19,
    title: 'Okra Soup',
    value: 'Fiber',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/okra-soup.jpg',
    ingredients: [
      'Okra',
      'Palm Oil',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Scotch Bonnet Peppers',
      'Onions',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Wash and dice fresh okra into small pieces. Boil goat meat and stock fish with onions and seasoning until tender. Add palm oil to the pot, followed by crayfish and chopped peppers. Stir in the diced okra and cook for a few minutes until slightly thickened. Serve hot with fufu or pounded yam.'
  },

  {
    id: 20,
    title: 'Edikang Ikong Soup',
    value: 'Vitamin A',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/edikang-ikong-soup.jpg',
    ingredients: [
      'Ugwu Leaves',
      'Waterleaf',
      'Palm Oil',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Periwinkle',
      'Seasoning Cubes',
      'Salt',
      'Scotch Bonnet Peppers'
    ],
    instructions: 'Wash and boil goat meat and stock fish until tender. Add palm oil to the pot, then stir in ground crayfish and chopped peppers. Add chopped waterleaf and cook until softened. Stir in the shredded ugu leaves and periwinkle, mixing well. Simmer briefly to retain the green color of the vegetables, then serve hot.'
  },

  {
    id: 21,
    title: 'Nsala Soup',
    value: 'Omega-3',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/nsala-soup.jpg',
    ingredients: [
      'Catfish',
      'Yam',
      'Uziza Leaves',
      'Crayfish',
      'Seasoning Cubes',
      'Salt',
      'Scotch Bonnet Peppers',
      'Utazi Leaves'
    ],
    instructions: 'Peel and boil yam, then pound into a smooth paste. Clean and cut catfish into steaks, place in a pot with water, and season with cubes, crayfish, and chopped peppers. Add yam paste to thicken the soup, stirring well. Finish with shredded uziza and utazi leaves before serving.'
  },

  {
    id: 22,
    title: 'Ogbono Soup',
    value: 'Omega-3',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ogbono-soup.jpg',
    ingredients: [
      'Ogbono Seeds',
      'Palm Oil',
      'Goat Meat',
      'Stock Fish',
      'Crayfish',
      'Spinach',
      'Seasoning Cubes',
      'Salt',
      'Scotch Bonnet Peppers'
    ],
    instructions: 'Boil goat meat and stock fish with onions and seasoning until tender. In another pot, dissolve ground ogbono seeds in palm oil over low heat, stirring constantly. Pour in meat stock, add crayfish, peppers, and the cooked meats. Stir in spinach and simmer briefly before serving.'
  },

  {
    id: 23,
    title: 'Akara',
    value: 'Protein',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/akara.jpg',
    ingredients: [
      'Beans',
      'Onions',
      'Scotch Bonnet Peppers',
      'Salt',
      'Vegetable Oil'
    ],
    instructions: 'Soak beans and remove skins. Blend with onions and peppers into a smooth batter, adding salt to taste. Heat vegetable oil in a pan and drop spoonfuls of the batter into hot oil. Fry until golden brown on all sides. Serve hot as a snack or breakfast item.'
  },

  {
    id: 24,
    title: 'Ayamase',
    value: 'Vitamin C',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ayamase.jpg',
    ingredients: [
      'Green Bell Peppers',
      'Scotch Bonnet Peppers',
      'Onions',
      'Locust Beans',
      'Palm Oil',
      'Goat Meat',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Blend green bell peppers, scotch bonnets, and onions into a smooth paste. Bleach palm oil in a pot, add locust beans, then pour in the blended mix. Fry until the oil rises to the top. Add cooked goat meat and seasoning, then simmer until flavors meld.'
  },

  {
    id: 25,
    title: 'Beans and Plantain Pottage',
    value: 'Protein & Carbohydrate',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/beans-and-plantain-pottage.jpg',
    ingredients: [
      'Beans',
      'Plantains',
      'Palm Oil',
      'Onions',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil beans until tender. Add chopped ripe plantains, palm oil, onions, and peppers. Season with cubes and salt, then simmer until the plantains are soft and the dish thickens slightly. Serve hot.'
  },

  {
    id: 26,
    title: 'Yam Porridge',
    value: 'Carbohydrate',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/yam-porridge.jpg',
    ingredients: [
      'Yam',
      'Palm Oil',
      'Tomatoes',
      'Onions',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt',
      'Spinach'
    ],
    instructions: 'Peel and cube yam. Place in a pot with water, tomatoes, onions, and peppers. Add palm oil and seasoning, then simmer until yam is tender. Mash slightly for a thick texture and stir in spinach before serving.'
  },

  {
    id: 27,
    title: 'Ofada Rice and Ayamase Sauce',
    value: 'Carbohydrate',
    time: '65min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/offada-rice-and-ayamase-sauce.jpg',
    ingredients: [
      'Ofada Rice',
      'Green Bell Peppers',
      'Scotch Bonnet Peppers',
      'Onions',
      'Locust Beans',
      'Palm Oil',
      'Assorted Meat',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Cook ofada rice until tender. Blend peppers and onions, bleach palm oil, and add locust beans. Fry blended mixture until reduced, then add cooked assorted meats and seasoning. Serve the sauce hot over the rice.'
  },

  {
    id: 28,
    title: 'Ukodo',
    value: 'Carbohydrate & Protein',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ukodo.jpg',
    ingredients: [
      'Yam',
      'Plantains',
      'Goat Meat',
      'Pepper Soup Spice',
      'Onions',
      'Scotch Bonnet Peppers',
      'Basil Leaves',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Cut yam and plantains into chunks. Boil goat meat with onions, spice, and seasoning until tender. Add yam and plantains to the pot along with chopped peppers. Simmer until soft, then stir in basil leaves before serving hot.'
  },

  {
    id: 29,
    title: 'Tuwo Shinkafa',
    value: 'Carbohydrate',
    time: '35min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/tuwo-shinkafa.jpg',
    ingredients: [
      'Rice',
      'Water',
      'Salt'
    ],
    instructions: 'Rinse short-grain rice and cook in water until very soft. Mash with a wooden spoon to form a smooth, thick texture. Mold into balls and serve with soups like miyan kuka or miyan taushe.'
  },

  {
    id: 30,
    title: 'Miyan Kuka',
    value: 'Iron',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/miyan-kuka.jpg',
    ingredients: [
      'Baobab Leaf Powder',
      'Beef',
      'Palm Oil',
      'Crayfish',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Onions',
      'Salt'
    ],
    instructions: 'Boil beef with onions, seasoning, and peppers until tender. Add palm oil and crayfish, then sprinkle in baobab leaf powder while stirring to avoid lumps. Simmer until thickened and serve hot with tuwo shinkafa.'
  },
  {
    id: 31,
    title: 'Miyan Taushe',
    value: 'Vitamin A',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/miyan-taushe.jpg',
    ingredients: [
      'Pumpkin',
      'Groundnut Paste',
      'Beef',
      'Palm Oil',
      'Scotch Bonnet Peppers',
      'Onions',
      'Seasoning Cubes',
      'Salt',
      'Spinach'
    ],
    instructions: 'Boil beef until tender. Blend pumpkin and peppers into a smooth paste. Add palm oil to a pot, pour in the paste, then stir in groundnut paste and seasoning. Add spinach before serving with tuwo shinkafa.'
  },

  {
    id: 32,
    title: 'Okpa',
    value: 'Protein',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/okpa.jpg',
    ingredients: [
      'Bambara Nut Flour',
      'Palm Oil',
      'Salt',
      'Seasoning Cubes',
      'Water'
    ],
    instructions: 'Mix bambara nut flour with palm oil until smooth. Add seasoning, salt, and water to form a medium-thick batter. Wrap in banana leaves or bowls and steam until firm. Serve hot or warm.'
  },

  {
    id: 33,
    title: 'Masa',
    value: 'Carbohydrates',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/masa.jpg',
    ingredients: [
      'Rice',
      'Sugar',
      'Yeast',
      'Water',
      'Salt'
    ],
    instructions: 'Soak rice, blend into a smooth batter, add yeast, sugar, and salt. Let rise, then fry small rounds in a special masa pan until golden.'
  },

  {
    id: 34,
    title: 'Nkwobi',
    value: 'Collagen',
    time: '90min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/nkwobi.jpg',
    ingredients: [
      'Cow Foot',
      'Palm Oil',
      'Potash',
      'Onions',
      'Scotch Bonnet Peppers',
      'Utazi Leaves',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil cow foot until very tender. Dissolve potash in water and strain. Mix palm oil with potash water until it forms a thick yellow paste. Add peppers, onions, seasoning, and the cow foot. Garnish with utazi leaves.'
  },

  {
    id: 35,
    title: 'Isi Ewu',
    value: 'Protein',
    time: '85min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/isi-ewu.jpg',
    ingredients: [
      'Goat Head',
      'Palm Oil',
      'Potash',
      'Scotch Bonnet Peppers',
      'Onions',
      'Utazi Leaves',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil goat head until tender. Prepare potash water, mix with palm oil until creamy. Add peppers, onions, seasoning, and goat head pieces. Garnish with utazi leaves before serving.'
  },

  {
    id: 36,
    title: 'Coconut Rice',
    value: 'Carbohydrates & Fats',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/coconut-rice.jpg',
    ingredients: [
      'Rice',
      'Coconut Milk',
      'Onions',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil rice in coconut milk with onions, peppers, and seasoning until tender and infused with coconut flavor.'
  },

  {
    id: 37,
    title: 'Kilishi',
    value: 'Protein',
    time: '150min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/kilishi.jpg',
    ingredients: [
      'Beef',
      'Groundnut Powder',
      'Yaji Spice Mix',
      'Salt',
      'Honey',
      'Water'
    ],
    instructions: 'Slice beef thinly and marinate in groundnut powder mixed with yaji, honey, and salt. Sun-dry until partly dry, then grill over low heat until crisp.'
  },

  {
    id: 38,
    title: 'Fried Plantain',
    value: 'Potassium',
    time: '15min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/fried-plantain.jpg',
    ingredients: [
      'Plantains',
      'Vegetable Oil',
      'Salt'
    ],
    instructions: 'Peel and slice plantains, sprinkle with salt, and fry in hot oil until golden on both sides.'
  },

  {
    id: 39,
    title: 'Ekuru',
    value: 'Protein',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ekuru.jpg',
    ingredients: [
      'Beans',
      'Salt',
      'Water'
    ],
    instructions: 'Peel beans, blend with water into a smooth paste, and season with salt. Steam in leaves until firm. Serve plain or with sauce.'
  },

  {
    id: 40,
    title: 'Boli',
    value: 'Fiber',
    time: '20min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/boli.jpg',
    ingredients: [
      'Plantains',
      'Groundnut',
      'Salt'
    ],
    instructions: 'Roast ripe plantains over open flame until charred. Serve with roasted groundnuts and a pinch of salt.'
  },

  {
    id: 41,
    title: 'Fisherman Soup',
    value: 'Omega-3',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/fisherman-soup.jpg',
    ingredients: [
      'Fresh Fish',
      'Periwinkle',
      'Crayfish',
      'Palm Oil',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt',
      'Basil Leaves'
    ],
    instructions: 'Clean fish and season lightly. In a pot, heat palm oil, add crayfish, peppers, and seasoning. Add fish and periwinkles, simmer until cooked, and finish with basil leaves.'
  },

  {
    id: 42,
    title: 'Garden Egg Sauce',
    value: 'Fiber',
    time: '30min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/garden-egg-sauce.jpg',
    ingredients: [
      'Garden Eggs',
      'Palm Oil',
      'Onions',
      'Scotch Bonnet Peppers',
      'Crayfish',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil garden eggs until soft, peel, and mash. Fry onions and peppers in palm oil, add crayfish and seasoning, then stir in mashed garden eggs. Simmer for a few minutes before serving.'
  },

  {
    id: 43,
    title: 'Ewa Agoyin',
    value: 'Protein',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ewa-agoyin.jpg',
    ingredients: [
      'Beans',
      'Palm Oil',
      'Dried Peppers',
      'Onions',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil beans until very soft. In another pan, bleach palm oil, fry onions and dried pepper blend until darkened. Serve beans topped generously with the pepper sauce.'
  },

  {
    id: 44,
    title: 'Gboma Dessi',
    value: 'Iron',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/gboma-dessi.jpg',
    ingredients: [
      'Spinach',
      'Tomatoes',
      'Onions',
      'Palm Oil',
      'Goat Meat',
      'Crayfish',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil goat meat until tender. Fry tomatoes, onions, and peppers in palm oil. Add crayfish and seasoning, then stir in spinach and simmer for a few minutes before serving.'
  },

  {
    id: 45,
    title: 'Waina',
    value: 'Carbohydrates',
    time: '35min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/waina.jpg',
    ingredients: [
      'Rice',
      'Yeast',
      'Sugar',
      'Salt',
      'Vegetable Oil'
    ],
    instructions: 'Soak rice, then blend with water into a smooth batter. Add yeast, sugar, and salt. Let it ferment, then fry in a special waina pan until golden brown on both sides.'
  },

  {
    id: 46,
    title: 'Balangu',
    value: 'Protein',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/balangu.jpg',
    ingredients: [
      'Beef',
      'Salt',
      'Onions',
      'Scotch Bonnet Peppers',
      'Seasoning Cubes'
    ],
    instructions: 'Cut beef into strips and season with salt. Grill over open flames until partly cooked. Pound grilled beef in a mortar to soften, then return to the fire until fully done. Serve with chopped onions and peppers.'
  },

  {
    id: 47,
    title: 'Dan Wake',
    value: 'Protein',
    time: '30min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/dan-wake.jpg',
    ingredients: [
      'Bean Flour',
      'Cassava Flour',
      'Baobab Powder',
      'Salt',
      'Water',
      'Potash',
      'Groundnut Oil',
      'Pepper Sauce',
    ],
    instructions: 'Mix bean flour, cassava flour, and baobab powder with salt and potash solution to form a dough. Shape into small balls and drop into boiling water until they float. Serve with groundnut oil and pepper sauce.'
  },

  {
    id: 48,
    title: 'Porridge Yam and Beans',
    value: 'Protein & Carbohydrate',
    time: '50min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/porridge-yam-and-beans.jpg',
    ingredients: [
      'Yam',
      'Beans',
      'Palm Oil',
      'Crayfish',
      'Pepper',
      'Onions',
      'Seasoning Cubes',
      'Salt',
    ],
    instructions: 'Boil peeled yam cubes and pre-cooked beans together. Add palm oil, ground crayfish, onions, and pepper. Mash lightly to desired texture and simmer until flavors blend.'
  },

  {
    id: 49,
    title: 'Iru Soup',
    value: 'Protein',
    time: '35min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/iru-soup.jpg',
    ingredients: [
      'Locust Beans',
      'Palm Oil',
      'Dried Fish',
      'Crayfish',
      'Pepper',
      'Onions',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Heat palm oil, fry onions, add locust beans and stir-fry briefly. Add dried fish, crayfish, and pepper, then simmer until flavors combine.'
  },

  {
    id: 50,
    title: 'Catfish Stew',
    value: 'Protein',
    time: '40min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/catfish-stew.jpg',
    ingredients: [
      'Catfish',
      'Palm Oil',
      'Tomatoes',
      'Red Bell Peppers',
      'Scotch Bonnet Peppers',
      'Onions',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Clean catfish with hot water, season, and set aside. Blend tomatoes, peppers, and onions, then fry in palm oil. Add catfish gently and simmer until cooked through.'
  },

  {
    id: 51,
    title: 'Beniseed Soup',
    value: 'Fats & Calcium',
    time: '55min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/beniseed-soup.jpg',
    ingredients: [
      'Sesame Seeds',
      'Palm Oil',
      'Assorted Meat',
      'Stock Fish',
      'Crayfish',
      'Pepper',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Roast Sesameseed, grind into paste. Cook meat and stock fish with seasoning, add beniseed paste, palm oil, and pepper. Simmer until thick.'
  },

  {
    id: 52,
    title: 'Masa With Honey Drizzle',
    value: 'Carbohydrates',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/masa-with-honey-drizzle.jpg',
    ingredients: [
      'Rice',
      'Yeast',
      'Sugar',
      'Salt',
      'Vegetable Oil',
      'Honey'
    ],
    instructions: 'Soak rice, blend, and mix with yeast, sugar, and salt. Ferment for a few hours. Fry in a masa pan until golden, then serve with honey drizzle.'
  },

  {
    id: 53,
    title: 'Abacha and Ugba',
    value: 'Carbohydrates & Fibre',
    time: '35min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/abacha-and-ugba.jpg',
    ingredients: [
      'Abacha',
      'Ugba',
      'Palm oil',
      'Crayfish',
      'Onions',
      'Pepper',
      'Salt',
      'Seasoning Cubes',
      'Garden eggs',
      'Utazi leaves',
      'Fresh Fish'
    ],
    instructions: 'Soak abacha in warm water until soft and drain. Heat palm oil in a bowl (no direct fire), add potash solution, and stir until it becomes thick and yellow. Mix in crayfish, pepper, onions, seasoning, and ugba. Add abacha and toss until coated. Garnish with utazi leaves, garden egg slices, and smoked fish if desired.'
  },

  {
    id: 54,
    title: 'Echicha',
    value: 'Protein & Fibre',
    time: '75min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/echicha.jpg',
    ingredients: [
      'Cocoyam',
      'Pigeon Peas',
      'Palm Oil',
      'Dried Fish',
      'Crayfish',
      'Pepper',
      'Seasoning Cubes',
      'Salt',
      'Spinach',
      'Pumpkin Leaves'
    ],
    instructions: 'Boil Pigeon Peas until tender. Soak and wash Dried Cocoyam slices. In a pot, heat Palm Oil, add Onions, Crayfish, and Pepper, then stir in Cocoyam. Add the cooked Pigeon Peas, Fish, Seasoning, and Salt. Simmer until flavors blend, then stir in Vegetables before serving.'
  },

  {
    id: 55,
    title: 'Ojojo',
    value: 'Carbohydrates',
    time: '25min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ojojo.jpg',
    ingredients: [
      'Water Yam',
      'Onions',
      'Pepper',
      'Salt',
      'Seasoning Cubes',
      'Vegetable Oil'
    ],
    instructions: 'Peel and grate Water Yam into a smooth paste. Mix with chopped Onions, Pepper, Salt, and Seasoning. Scoop spoonfuls into hot oil and fry until golden brown. Serve with Pepper Sauce or as a snack.'
  },

  {
    id: 56,
    title: 'Ofe Akwu (Banga Stew)',
    value: 'Vitamin A & E',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ofe-akwu.jpg',
    ingredients: [
      'Banga',
      'Tomatoes',
      'Pepper',
      'Onions',
      'Crayfish',
      'Smoked Fish',
      'Goat Meat',
      'Seasoning Cubes',
      'Scent Leaves'
    ],
    instructions: 'Boil and pound Palm Nuts, then extract the juice. Cook Meat and Fish with Onions, Pepper, and Seasoning. Add Palm Nut extract and bring to boil. Add blended Tomatoes, Crayfish, and more Seasoning. Simmer until thickened, then add Scent Leaves before serving with Rice.'
  },

  {
    id: 57,
    title: 'Shaki Stew',
    value: 'Protein',
    time: '80min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/shaki-stew.jpg',
    ingredients: [
      'Cow Tripe',
      'Tomatoes',
      'Pepper',
      'Onions',
      'Seasoning Cubes',
      'Crayfish',
      'Vegetable Oil',
      'Salt'
    ],
    instructions: 'Wash and boil Shaki until soft. Blend Tomatoes, Pepper, and Onions. Heat Oil, fry the blend until water evaporates, add Shaki, Seasoning, and Crayfish. Simmer until well coated and thickened. Serve with Rice, Yam, or Bread.'
  },

  {
    id: 58,
    title: 'Ofada Stew',
    value: 'Vitamin C & Iron',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ofada-stew.jpg',
    ingredients: [
      'Green Bell Peppers',
      'Red Bell Peppers',
      'Habanero Peppers',
      'Onions',
      'Palm Oil',
      'Assorted Meat',
      'Locust Beans',
      'Seasoning Cubes',
      'Crayfish'
    ],
    instructions: 'Blend Peppers and Onions coarsely. Boil Assorted Meats until tender. Bleach Palm Oil slightly, add Locust Beans, then fry the Pepper blend. Add Meats, Crayfish, Seasoning, and simmer until Oil floats on top. Serve with Ofada Rice.'
  },

  {
    id: 59,
    title: 'Ofe Nsala With Fresh Fish',
    value: 'Omega-3 & Fatty Acids',
    time: '45min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ofe-nsala-with-fresh-fish.jpg',
    ingredients: [
      'Catfish',
      'Utazi Leaves',
      'Yam',
      'Pepper',
      'Crayfish',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil Yam until soft, pound, and set aside. Clean Catfish with hot water. In a pot, boil Fish with Pepper, Crayfish, Seasoning, and Salt. Add Yam paste to thicken. Simmer, then add Utazi Leaves before serving.il slightly, add Locust Beans, then fry the Pepper blend. Add Meats, Crayfish, Seasoning, and simmer until Oil floats on top. Serve with Ofada Rice.'
  },

  {
    id: 60,
    title: 'Okazi Soup',
    value: 'Antioxidants',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/okazi-soup.jpg',
    ingredients: [
      'Okazi Leaves',
      'Waterleaf',
      'Palm Oil',
      'Stock fish',
      'Beef',
      'Crayfish',
      'Pepper',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Boil Meats and Stock Fish until tender. Add Palm Oil, Crayfish, Pepper, and Seasoning. Add Waterleaf first, then Okazi Leaves. Simmer for a few minutes and serve with Fufu.'
  },

  {
    id: 61,
    title: 'Adalu',
    value: 'Protein & Fibre',
    time: '70min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/adalu.jpg',
    ingredients: [
      'Beans',
      'Corn',
      'Palm Oil',
      'Pepper',
      'Onions',
      'Crayfish',
      'Salt',
      'Seasoning Cubes'
    ],
    instructions: 'Boil Beans until soft, then add Corn. Stir in Palm Oil, Onions, Crayfish, Pepper, Salt, and Seasoning. Cook until thick and creamy.'
  },

  {
    id: 62,
    title: 'Ekpang Nkukwo',
    value: 'Fibre & Calcium',
    time: '90min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/ekpang-nkukwo.jpg',
    ingredients: [
      'Cocoyam',
      'Water Yam',
      'Pumpkin Leaves',
      'Periwinkle',
      'Smoked Fish',
      'Crayfish',
      'Palm Oil',
      'Pepper',
      'Seasoning Cubes',
      'Salt'
    ],
    instructions: 'Peel and grate Cocoyam and Water Yam. Wrap spoonfuls in Pumpkin Leaves and layer in a pot with cleaned Periwinkle, Fish, and Crayfish. Add Palm Oil, Pepper, Seasoning, and a little water. Cook on low heat until well done.'
  },

  {
    id: 63,
    title: 'Banga Soup',
    value: 'Vitamin E',
    time: '60min',
    image: 'https://xeevemzgzndrhywyzxei.supabase.co/storage/v1/object/public/recipe_image/banga-soup.jpg',
    ingredients: [
      'Banga',
      'Fresh Fish',
      'Beef',
      'Banga Spices',
      'Crayfish',
      'Pepper',
      'Seasoning Cubes',
      'Scent Leaves'
    ],
    instructions: 'Boil Palm Nuts, pound, and extract the juice. Boil Meat or Fish with Seasoning Cubes. Add Palm Nut extract, Banga Spices, Pepper, and Crayfish. Simmer until thickened, then add Scent Leaves before serving.'
  },

  // Add more recipes if needed...
];

// Insert ingredients wrapped in a transaction
function seedIngredients() {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO ingredients (id, name, image, description, value, expiry) VALUES (?, ?, ?, ?, ?, ?)
  `);
  const insertMany = db.transaction((ingredients) => {
    for (const ingredient of ingredients) {
      insert.run(
        ingredient.id,
        ingredient.name,
        ingredient.image,
        ingredient.description,
        ingredient.value,
        ingredient.expiry
      );
    }
  });
  insertMany(ingredients);
}

// Insert recipes and link ingredients wrapped in a transaction
function seedRecipes() {
  const insertRecipe = db.prepare(`
    INSERT OR IGNORE INTO recipes (id, title, value, time, image_url, instructions)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const getRecipeId = db.prepare('SELECT id FROM recipes WHERE title = ?');
  const getIngredientId = db.prepare('SELECT id FROM ingredients WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))');
  const insertRecipeIngredient = db.prepare('INSERT OR IGNORE INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)');

  const insertMany = db.transaction(() => {
    for (const recipe of recipes) {
      insertRecipe.run(
        recipe.id,
        recipe.title,
        recipe.value,
        recipe.time,
        recipe.image,
        recipe.instructions || ''
      );
      const recipeRow = getRecipeId.get(recipe.title);
      if (!recipeRow) {
        console.warn(`Failed to find recipe ID for: ${recipe.title}`);
        continue;
      }
      const recipeId = recipeRow.id;

      for (const ingredientName of recipe.ingredients) {
        const normalizedName = ingredientName.trim().toLowerCase();
        const ingredientRow = getIngredientId.get(normalizedName);
        if (ingredientRow) {
          insertRecipeIngredient.run(recipeId, ingredientRow.id);
        } else {
          console.warn(`Ingredient '${ingredientName}' not found for recipe '${recipe.title}'`);
        }
      }
    }
  });

  insertMany();
}

function seed() {
  console.log('Seeding ingredients...');
  seedIngredients();
  console.log('Seeding recipes...');
  seedRecipes();
  console.log('Done seeding!');
}

if (require.main === module) {
  seed();
}
