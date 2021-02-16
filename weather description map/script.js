"use strict";

class Data {
  _date;
  latitude;
  longitude;
  country;
  names;
  temp;
  humidity;
  pressure;
  descrip;
  flagImage;
  capital;
  region;
  population;
  id;
  update;
}

// const w = new Data();
// console.log((w.latitude = "jsja"));
// console.log(w);

class App {
  #mymap;
  #allData = [];
  constructor() {
    this._getposition();
    this._getLocalStorage();
    document
      .querySelector(".inner")
      .addEventListener("click", this._toMarker.bind(this));
  }

  _getposition() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
      alert("unable to get your location")
    );
  }
  _marker(lat, lng, classname, wordings) {
    L.marker([lat, lng])
      .addTo(this.#mymap)
      .bindPopup(
        L.popup({
          maxWidth: 600,
          minWidth: 50,
          closeOnClick: false,
          autoClose: false,
          className: `${classname}`,
        })
      )
      .setPopupContent(`${wordings}`)
      .openPopup();
  }
  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    // console.log(this);
    this.#mymap = L.map("map").setView([latitude, longitude], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#mymap);

    this._marker(latitude, longitude, "", "Current location");

    this.#allData.forEach((work) => {
      // console.log(work);
      this._marker(work.latitude, work.longitude, "tip", new Date(work._date));
    });

    this.#mymap.on(
      "click",
      function (mapE) {
        const { lat, lng } = mapE.latlng;
        this._data(lat, lng);

        //
      }.bind(this)
    );
    this.#mymap.on("moveend", this._updateTime.bind(this));
    this.#mymap.on("moveend", this._time.bind(this));
  }
  async _data(lat, lng) {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2c7023fbf71a1033c4694bd51fce603`
      );
      if (!res.ok) throw new Error("Problem getting data");
      const data = await res.json();
      const w = new Data();
      w.latitude = lat;
      w.longitude = lng;
      this._weatherDetails(data, w);
      const { country } = data.sys;
      this._countryData(country, w);
      // this._marker(lat, lng, "tip", w._date);
    } catch (err) {
      alert(`Problem getting data. Check Internet Connection`);
    }
  }
  _updateTime() {
    const content = document.querySelectorAll(".leaflet-popup-content");
    // console.log(content);
    for (let index = 1; index < content.length; index++) {
      const sec = Math.trunc(
        (new Date() - new Date(this.#allData[index - 1]._date)) / 1000
      );
      // console.log(sec);
      if (sec < 60)
        content[index].textContent = `${
          this.#allData[index - 1].names
        } |   ${Math.trunc(
          (new Date() - new Date(this.#allData[index - 1]._date)) / 1000
        )} sec ago`;
      if (sec > 60 - 1)
        content[index].textContent = `${
          this.#allData[index - 1].names
        } |   ${Math.trunc(
          (new Date() - new Date(this.#allData[index - 1]._date)) / (1000 * 60)
        )} min ago`;
      if (sec > 3600 - 1)
        content[index].textContent = `${
          this.#allData[index - 1].names
        } |   ${Math.trunc(
          (new Date() - new Date(this.#allData[index - 1]._date)) /
            (1000 * 60 * 60)
        )} hr ago`;
      if (sec > 86400 - 1)
        content[index].textContent = `${
          this.#allData[index - 1].names
        } |   ${Math.trunc(
          (new Date() - new Date(this.#allData[index - 1]._date)) /
            (1000 * 60 * 60 * 24)
        )} day ago`;
    }
  }
  _time() {
    const content = document.querySelectorAll(".time");
    const newContent = Array.from(content).reverse();
    // console.log(newContent, this.#allData);
    for (let index = newContent.length - 1; index > -1; index--) {
      // console.log(newContent.length, index);
      // newContent[index].textContent = `${Math.trunc(
      //   (new Date() - new Date(this.#allData[index]._date)) / 1000
      // )} sec ago`;
      const sec = Math.trunc(
        (new Date() - new Date(this.#allData[index]._date)) / 1000
      );
      // console.log(sec);
      if (sec < 60)
        newContent[index].textContent = `${Math.trunc(
          (new Date() - new Date(this.#allData[index]._date)) / 1000
        )} sec ago`;
      if (sec > 60 - 1)
        newContent[index].textContent = `${Math.trunc(
          (new Date() - new Date(this.#allData[index]._date)) / (1000 * 60)
        )} min ago`;
      if (sec > 3600 - 1)
        newContent[index].textContent = `${Math.trunc(
          (new Date() - new Date(this.#allData[index]._date)) / (1000 * 60 * 60)
        )} hr ago`;
      if (sec > 86400 - 1)
        newContent[index].textContent = `${Math.trunc(
          (new Date() - new Date(this.#allData[index]._date)) /
            (1000 * 60 * 60 * 24)
        )} day ago`;
    }
  }
  _weatherDetails(data, w) {
    w.id = (Date.now() + "").slice(-10);
    const z = data.main;
    w.temp = z.temp;
    w.pressure = z.pressure;
    w.humidity = z.humidity;
    w.names = data.name;
    const a = data.weather;
    w.descrip = a[0].description;
    w._date = new Date();
    // console.log(data);
    // console.log(w);
  }
  async _countryData(code, w) {
    try {
      const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
      if (!res.ok) throw new Error("Location Not Available");
      const data = await res.json();
      this._countryDetails(data, w);
      this._showDetails(w);
      this._marker(w.latitude, w.longitude, "tip", w._date);
    } catch (err) {
      alert(err);
    }
  }
  _countryDetails(data, w) {
    w.flagImage = data.flag;
    w.country = data.name;
    w.capital = data.capital;
    w.region = data.region;
    w.population = data.population;
    // console.log(w);
    this.#allData.push(w);
    this._localStorage();
    // console.log(this.#allData);
    // console.log(data);
  }
  _showDetails(w) {
    const html = `
    <div class="row-1" data-id ='${w.id}'>
    <div class="flag">
      <div class= "j" style= 'background: url(${w.flagImage});
      width: 90px;
      height: 80px;
      background-size: cover;
      background-repeat: no-repeat;
     background-position: center;
    object-fit: cover;
      ' ></div>
    </div>
    <div class="content">
      <div class="content-top">
        <h3 class="country">${w.country}</h3>
        <h4 class="names">${w.names}</h4>
      </div>

      <div class="content-down middle">
        <div class="time">0 sec ago</div>
        <div class="temp"><span>🌡</span> ${Math.trunc(
          w.temp - 273.15
        )}<sup>o</sup>C</div>
        <div class="humidity"><span>❄</span>${w.humidity}%</div>
        <div class="description"><span>☁</span> ${w.descrip}</div>
      </div>

      <div class="content-down end">
        <div><span>capital:</span>${w.capital}</div>
        <div><span>region:</span> ${w.region}</div>
        <div><span>population:</span> ${(w.population / 1000000).toFixed(
          2
        )} M</div>
      </div>
    </div>
  </div>
    `;

    const inner = document.querySelector(".inner");
    inner.insertAdjacentHTML("afterbegin", html);
  }
  _toMarker(e) {
    const moveMarker = e.target.closest(".row-1");
    console.log(moveMarker);
    if (!moveMarker) return;
    console.log(app);
    const move = this.#allData.find((f) => f.id === moveMarker.dataset.id);
    this.#mymap.setView([move.latitude, move.longitude], 6, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // console.log(move);
  }
  _localStorage() {
    localStorage.setItem("keydata", JSON.stringify(this.#allData));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("keydata"));
    // console.log(data);
    if (!data) return;
    this.#allData = data;
    this.#allData.forEach((work) => this._showDetails(work));
  }
}

const app = new App();

// `https://restcountries.eu/rest/v2/alpha/${code}`
// `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2c7023fbf71a1033c4694bd51fce603`
