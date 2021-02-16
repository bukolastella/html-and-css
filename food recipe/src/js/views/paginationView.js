import View from "./Views";

class PaginationView extends View {
  _parentElement = document.querySelector(".page");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".aq");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // console.log(curPage, this._data.page);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage + 1}" class="r aq">Page ${
        curPage + 1
      } <i class="far fa-hand-point-right"></i></button>
        `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
    <button data-goto="${
      curPage - 1
    }" class="l aq"> <i class="far fa-hand-point-left"></i>  Page ${
        curPage - 1
      } </button>
    `;
    }
    // Other page
    if (curPage < numPages) {
      return `
      <button  data-goto="${
        curPage - 1
      }" class="l aq"> <i class="far fa-hand-point-left"></i> Page ${
        curPage - 1
      }</button>
      <button data-goto="${curPage + 1}" class="r aq">Page ${
        curPage + 1
      } <i class="far fa-hand-point-right"></i></button>
        `;
    }
    // Page 1, and there are NO other pages
    return "";
  }
}

export default new PaginationView();
