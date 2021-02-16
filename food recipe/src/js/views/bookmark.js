import View from "./Views";
import previewView from "./previewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".a");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it";
  _message = "";
  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, this._data2, false))
      .join("");
  }
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  q() {
    const p = document.querySelector(".bookmark");
    const t = document.querySelector("header");
    const btn = document.querySelector(".a");
    t.addEventListener("click", function (e) {
      const we = e.target.closest(".bookmark");
      if (we) {
        const as = btn.toggleAttribute("style");
        if (as) {
          btn.setAttribute("style", "visibility : visible");
        }
      }
    });
  }
}

export default new BookmarkView();
