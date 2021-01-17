"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  to: ["js", "js", "sf", "sf", "sfd", "erre", "sfd", "sf"],
  symbol: ["42", "42", "42", "42", "tm", "42", "42", "42"],
  subline: [
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
  ],
  pin: 1111,
  movementsDates: [
    "2019-12-23T07:42:02.383Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-28T23:36:17.929Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  dates: [],

  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  to: ["js", "js", "sf", "sf", "sfd", "erre", "sfd", "sf"],
  symbol: ["42", "42", "42", "42", "tm", "42", "42", "42"],
  subline: [
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
  ],
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-01T13:15:33.035Z",
    "2019-12-25T06:04:23.907Z",
    "2019-12-25T06:04:23.907Z",
    "2019-12-25T06:04:23.907Z",
    "2019-12-25T06:04:23.907Z",
    "2020-04-10T14:43:26.374Z",
    "2020-07-26T12:01:20.894Z",
  ],
  dates: [],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  to: ["js", "js", "sf", "sf", "sfd", "erre", "sfd", "sf"],
  symbol: ["42", "42", "42", "42", "tm", "42", "42", "42"],
  subline: [
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
  ],
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2019-12-23T07:42:02.383Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  dates: [],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  to: ["js", "js", "sf", "sf", "sfd", "erre", "sfd", "sf"],
  symbol: ["42", "42", "42", "42", "tm", "42", "42", "42"],
  subline: [
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
    "testig",
  ],
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  dates: [],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];
//
//create usernames
accounts.forEach((acc) => {
  acc.username = acc.owner
    .split(" ")
    .map((a) => a[0])
    .join("")
    .toLowerCase();
});
// console.log(accounts);

//
const username = document.getElementById("username");
const password = document.getElementById("password");
const login = document.getElementById("login");
const form = document.getElementById("form");
const section = document.getElementsByClassName("section")[0];
const openPage = document.getElementsByClassName("open-page")[0];
const greeting = document.getElementsByClassName("greeting")[0];
const money = document.getElementsByClassName("money")[0];
const d = document.getElementsByClassName("d")[1];
const w = document.getElementsByClassName("w")[1];
const transition = document.getElementsByClassName("transition")[0];
const transferBtn = document.getElementsByClassName("submit")[0];
const transferTo = document.getElementsByClassName("i")[0];
const transferAmount = document.getElementsByClassName("i")[1];
const requestBtn = document.getElementById("requestBtn");
const requestTo = document.getElementById("requestTo");
const requestAmount = document.getElementById("requestAmount");
const confirmBtn = document.getElementById("confirmBtn");
const confirmUser = document.getElementById("confirmUser");
const confirmPin = document.getElementById("confirmPin");
const sorts = document.getElementById("sorts");
const logoutBtn = document.getElementById("logout");
const span = document.getElementById("span");
//
let currentAccount, timer;

//function
function datesData(CA) {
  currentAccount.dates = [];
  for (let i = 0; i < currentAccount.movements.length; i++) {
    const ele = [];
    const aw = {
      to: currentAccount.to[i],
      symbol: currentAccount.symbol[i],
      subline: currentAccount.subline[i],
      mov: currentAccount.movements[i],
    };

    const re = new Map();
    if (
      i > 0 &&
      currentAccount.movementsDates[i] === currentAccount.movementsDates[i - 1]
    ) {
      currentAccount.dates.map((acc, a) => {
        acc.get(currentAccount.movementsDates[i - 1])?.push(aw);
      });
    } else {
      ele.push(aw);
      re.set(currentAccount.movementsDates[i], ele);
      currentAccount.dates.push(re);
      // console.log(currentAccount.dates.length);
    }
  }
  // console.log(currentAccount.dates);
}
//
function balanceUi(CA) {
  //calculate Balance
  const calculateBalance = CA.movements.reduce((cul, mov) => cul + mov, 0);
  // Display Balance
  money.innerHTML = `&#8358;${calculateBalance.toFixed(2)}`;
}
//
function summaryUi(CA) {
  //calculate Summary
  const In = CA.movements
    .filter((acc) => acc > 0)
    .reduce((cul, mov) => cul + mov, 0);

  const out = CA.movements
    .filter((acc) => acc < 0)
    .reduce((cul, mov) => cul + mov, 0);
  //display Summary
  d.innerHTML = `&#8358;${In.toFixed(2)}`;
  w.innerHTML = `&#8358;${Math.abs(out).toFixed(2)}`;
}
function movements(dates) {
  //clear transition
  transition.innerHTML = "";

  //loop through the dates which contains maps
  dates.forEach((d, i) => {
    //array to contain all the div to e appended
    const word = [];
    //a dummy loop to get access to the main values
    for (const iterator of d.values()) {
      //the main loop
      iterator.forEach((acc) => {
        const type = acc.mov > 0 ? "d" : "w";
        const html = `<div class="deposit">
          <div class="symbol">${acc.symbol}</div>
          <div class="doings-money">
            <div class="trans-doings">
              <div class="username">${acc.to}</div>
              <div class="doings">${acc.subline}</div>
            </div>
            <div class="trans-money ${type}">&#8358;${acc.mov}</div>
          </div>
        </div>`;
        //push each colum to the array
        word.push(html);
      });
    }
    //same for the dates header
    for (const iterator of d.keys()) {
      const heades = `<div class="trans-time">${iterator}</div>`;
      word.push(heades);
    }
    // console.log(word.length);
    //loop through
    word.forEach((w) => transition.insertAdjacentHTML("afterbegin", w));
  });
}
//
function calDate(d) {
  d.forEach((acc, i) => {
    const wa = new Date(acc);
    const waaaaa = `${wa.getDate()}ST ${wa.toLocaleString("default", {
      month: "long",
    })}, ${wa.getFullYear()}`;
    currentAccount.movementsDates[i] = waaaaa;
  });
}

//
function updateUi() {
  summaryUi(currentAccount);
  movements(currentAccount.dates);
  balanceUi(currentAccount);
}
//
const tie = function () {
  let time = 120;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    span.textContent = `${min}: ${sec}`;

    if (time === 0) {
      clearInterval(timer);
      section.style.opacity = 100;
      openPage.style.opacity = 0;
      openPage.style.zIndex = -10;
    }
    time--;
  };
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

//
//user logs in
login.addEventListener("click", function (e) {
  e.preventDefault();
  //
  currentAccount = accounts.find((acc) => acc.username === username.value);

  if (currentAccount?.pin === Number(password.value)) {
    //display open page
    section.style.opacity = 0;
    openPage.style.opacity = 100;
    openPage.style.zIndex = 10;
    //display welcome  back message
    greeting.textContent = `good afternoon, ${currentAccount.owner}`;
    ////update ui
    if (timer) clearInterval(timer);
    timer = tie();
    calDate(currentAccount.movementsDates);
    datesData(currentAccount);
    updateUi();
  }
  username.value = password.value = "";
});

transferBtn.addEventListener("click", function (e) {
  clearInterval(timer);
  timer = tie();
  e.preventDefault();
  const transferuser = accounts.find(
    (acc) => acc.username === transferTo.value
  );

  const calculateBalance = currentAccount.movements.reduce(
    (cul, mov) => cul + mov,
    0
  );

  const allowed =
    transferuser &&
    transferuser?.owner !== currentAccount.owner &&
    Number(transferAmount.value) > 0 &&
    calculateBalance - Number(transferAmount.value) > 1000;

  if (allowed) {
    transferuser.movements.push(Number(transferAmount.value));
    currentAccount.movements.push(Number("-" + transferAmount.value));
    transferuser.to.push(currentAccount.username);
    currentAccount.to.push(transferuser.username);
    transferuser.symbol.push("TM");
    currentAccount.symbol.push("TM");
    transferuser.subline.push("transfer receives");
    currentAccount.subline.push("money transfered");

    const time = `${new Date().getDate()}ST ${new Date().toLocaleString(
      "default",
      {
        month: "long",
      }
    )}, ${new Date().getFullYear()}`;
    transferuser.movementsDates.push(new Date());
    currentAccount.movementsDates.push(time);
  }
  transferTo.value = transferAmount.value = "";

  datesData(currentAccount);
  updateUi();
  sorts.selectedIndex = 0;
});
requestBtn.addEventListener("click", function (e) {
  clearInterval(timer);
  timer = tie();
  e.preventDefault();
  const transferuser = accounts.find((acc) => acc.username === requestTo.value);
  const calculateBalance = currentAccount.movements.reduce(
    (cul, mov) => cul + mov,
    0
  );

  const allowed =
    transferuser &&
    transferuser?.owner !== currentAccount.owner &&
    Number(requestAmount.value) > 0 &&
    calculateBalance - Number(requestAmount.value) > 1000;

  if (allowed === true) {
    transferuser.movements.push(Number(requestAmount.value));
    currentAccount.movements.push(Number("+" + requestAmount.value));
    transferuser.to.push(currentAccount.username);
    currentAccount.to.push(transferuser.username);
    transferuser.symbol.push("RM");
    currentAccount.symbol.push("RM");
    transferuser.subline.push("money given");
    currentAccount.subline.push("money granted");

    const time = `${new Date().getDate()}ST ${new Date().toLocaleString(
      "default",
      {
        month: "long",
      }
    )}, ${new Date().getFullYear()}`;
    transferuser.movementsDates.push(new Date());
    currentAccount.movementsDates.push(time);

    requestBtn.textContent = "pending";
    requestBtn.style.width = "100px";
    requestBtn.style.cursor = "wait";

    requestBtn.disabled = true;

    datesData(currentAccount);
    updateUi();
    clearInterval(timer);
    sorts.selectedIndex = 0;
  }
  requestTo.value = requestAmount.value = "";
});
confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.username === confirmUser.value &&
    currentAccount.pin === Number(confirmPin.value)
  ) {
    // console.log("hhiu");
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    //undisplay open page
    section.style.opacity = 100;
    openPage.style.opacity = 0;
    openPage.style.zIndex = -10;
  }
  confirmUser.value = confirmPin.value = "";
});

sorts.addEventListener("click", function (e) {
  clearInterval(timer);
  timer = tie();
  if (sorts.value === "deposits only") {
    const head = Array.from(document.querySelectorAll(".trans-time"));
    head.forEach((acc) => {
      acc.style.display = "none";
    });
    const sort = Array.from(document.querySelectorAll(".deposit"));
    sort.forEach((acc) => {
      const a = String(acc.textContent.split("\n").slice(-3, -2));
      const z = Number(a.split("₦").splice(-1));
      if (z > 0) acc.style.display = "";
      if (z < 0) acc.style.display = "none";
    });
  }
  if (sorts.value === "withdraw only") {
    const head = Array.from(document.querySelectorAll(".trans-time"));
    head.forEach((acc) => {
      acc.style.display = "none";
    });
    const sort = Array.from(document.querySelectorAll(".deposit"));
    sort.forEach((acc) => {
      const a = String(acc.textContent.split("\n").slice(-3, -2));
      const z = Number(a.split("₦").splice(-1));
      if (z < 0) acc.style.display = "";
      if (z > 0) acc.style.display = "none";
    });
  }
  if (sorts.value === "all transition") {
    const head = Array.from(document.querySelectorAll(".trans-time"));
    head.forEach((acc) => {
      acc.style.display = "";
    });
    const sort = Array.from(document.querySelectorAll(".deposit"));
    sort.forEach((acc) => {
      const a = String(acc.textContent.split("\n").slice(-3, -2));
      const z = Number(a.split("₦").splice(-1));
      if (z) acc.style.display = "";
    });
  }
});

logoutBtn.addEventListener("click", function () {
  requestTo.value = requestAmount.value = "";
  transferTo.value = transferAmount.value = "";
  confirmUser.value = confirmPin.value = "";
  //undisplay open page
  section.style.opacity = 100;
  openPage.style.opacity = 0;
  openPage.style.zIndex = -10;
});
