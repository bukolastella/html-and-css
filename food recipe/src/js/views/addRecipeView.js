import View from "./Views";
import previewView from "./previewView";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".modal");
  _overlay = document.querySelector(".overlay");
  _tO = document.querySelector(".add");
  _tC = document.querySelector(".x");
  _message = "Recipe upload was successful";

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    //   console.log('sddsj');
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  _addHandlerShowWindow() {
    this._tO.addEventListener("click", this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._tC.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
