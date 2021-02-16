// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import { render } from "sass";
// import { initParams } from "request-promise-native";
import { async } from "q";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";
import paginationView from "./views/paginationView";
import bookmarkView from "./views/bookmark";
import addRecipeView from "./views/addRecipeView";

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = "5ed6604591c37cdc054bcac4";
    if (!id) return;

    recipeView.renderSpinner();
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmark);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe, model.state.secondResult);
  } catch (err) {
    recipeView.renderError();
    // console.error(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe, model.state.secondResult);
  recipeView.update(model.state.recipe, model.state.secondResult);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe, model.state.secondResult);
  bookmarkView.render(model.state.bookmark);
};
const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.secondResult);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmark);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(err);
  }
};

// controlSearchResult();
// controlRecipe();
const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerRenderUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarkView.q();
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
// ["hashchange", "load"].forEach((ev) => window.addEventListener(ev, handler));
