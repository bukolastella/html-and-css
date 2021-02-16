export default class View {
  _data;
  _data2;
  render(data, data2, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    this._data2 = data2;
    const html = this._generateMarkup();

    if (!render) return html;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  update(data, data2) {
    this._data = data;
    this._data2 = data2;
    const newHtml = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newHtml);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(newHtml);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log("😪😪", newEl.firstChild?.nodeValue.trim());
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log(newEl, newEl.firstChild?.nodeValue);
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const html = `
                <div class="spinner">
                  <i class="fas fa-spinner fa-5x"></i>
                </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderMessage(message = this._message) {
    const html = `
        <div class="message">
              <i class="far fa-smile fa-2x"></i>
              <span
                >${message}</span
              >
            </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderError(message = this._errorMessage) {
    const html = `
        <div class="message">
        <i class="fas fa-exclamation-triangle fa-3x"></i></i>
              <span
                >ERROR: ${message}</span
              >
            </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
