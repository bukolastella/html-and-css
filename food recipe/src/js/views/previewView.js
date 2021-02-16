import View from "./Views";

class PreviewView extends View {
  _parentElement = "";
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `<div class="result ${this._data.id === id ? "result_active" : ""}">
    <a href="#${this._data.id}">
    <img src="${this._data.image}" alt="${this._data.title}" />
    <h1>${this._data.title}</h1>
    <h5>${this._data.publisher}</h5>
    </a>
  </div>`;
  }
}

export default new PreviewView();
