import { Fraction } from "fractional";
import View from "./Views";
// console.log(Fraction);

class RecipeView extends View {
  _parentElement = document.querySelector(".right");
  _errorMessage = "we could not find the recipe";
  _message = "";
  addHandlerRenderUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".tiny");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      // console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".mark");
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `<figure>
    <img
      src="${this._data.image}"
      alt="pizza image"
    />
    <h1>
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="info-sect">
    <div class="info">
      <div class="minutes">
        <i class="far fa-clock"></i>
        <span> <b>${this._data.cookingTime}</b> minutes</span>
      </div>
      <div class="servings">
        <i class="fas fa-user-friends"></i>
        <span> <b>${this._data.servings}</b> servings</span>
        <i data-update-to = ${
          this._data.servings - 1
        } class="fas fa-minus-circle tiny"></i>
        <i data-update-to = ${
          this._data.servings + 1
        } class="fas fa-plus-circle tiny"></i>
      </div>
      <div class="mark">
      <i class="far fa-bookmark ${this._data.bookmarked ? "active" : ""}"></i>
      </div>
    </div>
    <div class="info2">
      <div class="cal">
        <i class="fas fa-tags"></i> <span>calcolries: <b>${
          this._data2 ? this._data2.calories.toFixed(1) : "None"
        }</b> kcal </span>
      </div>
      <div class="diet">
        <i class="fas fa-tags"></i>
        <span>dietLabels: <b>${
          this._data2?.dietLabels[0] ? this._data2.dietLabels[0] : "None"
        }</b> </span>
      </div>
      <div class="health">
        <i class="fas fa-tags"></i>
        <span>healthLabels: <b>${
          this._data2?.healthLabels[0] ? this._data2.healthLabels[0] : "None"
        }</b> </span>
      </div>
    </div>
  </div>
  <div class="ig">
    <h1>RECIPE INGREDIENTS</h1>

    ${this._data.ingredients
      .map(
        (ing) => `
    <div>
    <i class="fas fa-check"></i>
    <p><span>${
      ing.quantity ? new Fraction(ing.quantity).toString() : ""
    }</span> ${ing.unit} ${ing.description}</p>
  </div>
    `
      )
      .join("")}
  </div>
  <div class="howto">
    <h1>HOW TO COOK IT</h1>
    <p>
      This recipe was carefully designed and tested by <b> ${
        this._data.publisher
      }</b>. Please check out directions at their website.
    </p>
    <button><a href="${this._data.sourceUrl}"> Direction -></a></button>
  </div>`;
  }
}

export default new RecipeView();
