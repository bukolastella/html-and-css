// import { star } from "cli-spinners";
// import { entries } from "core-js/fn/dict";
// import { async } from "q";
// import { start } from "repl";
import { API_URL } from "./config";
import { API_KEY } from "./config";
import { API_ID, KEY } from "./config";
import { getJSON, sendJSON } from "./helpers";
export const state = {
  recipe: {},
  secondResult: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: 10,
    page: 1,
  },
  bookmark: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  //   console.log(recipe);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmark.some((b) => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    const listIng = [];
    state.recipe.ingredients.map((ing) =>
      listIng.push(`${ing.quantity} ${ing.unit} ${ing.description}`)
    );
    // console.log(state.recipe);

    const secondRecipe = {
      title: state.recipe.title,
      ingr: listIng,
      url: state.recipe.sourceUrl,
      img: state.recipe.image,
      yield: state.recipe.servings,
      ttime: state.recipe.cookingTime,
    };
    // console.log(listIng);
    // console.log(state.recipe);
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      if (!response.ok) throw new Error(`😎🙂😎😎😎${response}`);
      return response.json(); // parses JSON response into native JavaScript objects
    }
    state.secondResult = await postData(
      `https://api.edamam.com/api/nutrition-details?app_id=${API_ID}&app_key=${API_KEY}`,
      secondRecipe
    );
  } catch (err) {
    console.error(`😪😪😪${err}`);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    // console.log(state.search.results);
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};
// loadSearchResult("pizza");
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((element) => {
    element.quantity = (element.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex((el) => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmark();
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3) throw new Error("wrong ingredient format");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmark = JSON.parse(storage);
};
init();

const clearBookmark = function () {
  localStorage.clear("bookmarks");
};
clearBookmark();
