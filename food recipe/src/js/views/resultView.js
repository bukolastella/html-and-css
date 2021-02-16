import View from "./Views";

class ResultView extends View {
  _parentElement = document.querySelector(".left_result");
  _errorMessage = "No recipe found for your search, try again";
  _message = "";
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<div class="result ${result.id === id ? "result_active" : ""}">
    <a href="#${result.id}">
    <img src="${result.image}" alt="${result.title}" />
    <h1>${result.title}</h1>
    <h5>${result.publisher}</h5>
    <i class="far fa-user-circle ${result.key ? "" : "hidden"}"></i>
    </a>
  </div>`;
  }
}

export default new ResultView();
