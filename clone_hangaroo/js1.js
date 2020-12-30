"use strict";
// HINT;

const secretWords = [
  "USAIN BOLT",
  "CHESS",
  "BASKETBALL",
  "DAVIDO",
  "MICHEAL JACKSON",
  "LIL DICKY FT CHRIS BROWN",
  "MERLIN",
  "THE FLASH",
  "GAME OF THRONES",
  "GRACIAS",
  "MERRY CHRISTMAS",
  "HELLO",
  "JUST DO IT",
  "THINK DIFFERENT",
  "EVERYWHERE YOU GO",
];
const hints = [
  "famous athlete",
  "checkmate",
  "slam dunk",
  `song artist'holy ground`,
  "famous song artist",
  "freeky friday",
  `"in a land of myth..."`,
  `my name is barry allen...`,
  `dracarys`,
  "thank you",
  "feliz navidad",
  "ciao",
  "nike",
  "apple",
  "MTN",
];
const category = [
  "sport",
  "games",
  "sport",
  "music",
  "music",
  "music",
  "movies",
  "movies",
  "movies",
  "translation",
  "translation",
  "translation",
  "brand logo",
  "brand logo",
  "brand logo",
];
const randomFact = [
  "The heads on Easter Island have bodies.",
  "You lose up to 30 percent of your taste buds during flight.",
  "The moon has moonquakes.",
  "Your nostrils work one at a time.",
  "A chef's toque contains 100 folds.",
  `The "M's" in M&Ms stand for "Mars" and "Murrie."`,
  "The human body literally glows.",
  "Copper door knobs are self-disinfecting.",
  "Cotton candy was invented by a dentist.",
  `The English word with the most definitions is "set."`,
  `The dot over the lower case "i" or "j" is known as a "tittle."`,
  "Chewing gum boosts concentration.",
  "The total weight of ants on earth once equaled the total weight of people.",
  '"E" is the most common letter and appears in 11 percent of all english words.',
  `Pringles aren't actually potato chips.`,
];
const imgFact = [
  "Easter-Island-heads.jpg",
  "Airplane-meals.jpg",
  "Waning-moon.jpg",
  "Small-child-nostrils.jpg",
  "South-Asian-male-chef.jpg",
  "MandMs-candy.jpg",
  "Woman-watching-sunset.jpg",
  "Copper-doorknob.jpg",
  "Rainbow-cotton-candy.jpg",
  "Shelve-of-dictionaries.jpg",
  "Uppercase-and-lowercase-letter-j-in-pink-neon.jpg",
  "Young-black-woman-blowing-bubble-with-gum.jpg",
  "red-ants-1.jpg",
  "shutterstock_248343595.jpg",
  "Pringles.jpg",
];
// const selector = Math.floor(Math.random(0, 1) * secretWords.length);
// const secretWord = secretWords[selector];
// const hint = hints[selector];
// console.log(secretWord, hint);

//a function to find indices of the space
const findIndices = (str, char) =>
  str.split("").reduce((indices, letter, index) => {
    letter === char && indices.push(index);
    return indices;
  }, []);

//a function for the colored Boxes
const coloredBoxes = function (word, row) {
  const f = document.getElementsByClassName(`bottom-row${row}`)[0];
  const bottomRow2 = f.querySelectorAll("div");
  const elem = Math.ceil((bottomRow2.length - word.length) / 2);

  //looping through and adding the blues
  for (let i = elem; i < word.length + elem; i++) {
    bottomRow2[i].classList.add("blue");
  }
  //removing the color where space is meant to be inline with the secret word
  if (word.split(" ").length > 1) {
    const w = findIndices(word, " ");
    for (let i = 0; i < w.length; i++) {
      bottomRow2[w[i] + elem].classList.remove("blue");
    }
  }
};

//a function
const nextLevel = function (selected) {
  //check if the allowed reveal words are complete
  let element = 0;
  for (let i = 0; i < selected.length; i++) {
    if (!(selected[i].textContent === "")) {
      element += 1;
    }
  }
  //then what to do if they are complete
  if (element === selected.length) {
    //adding the green dot to indicate level completed
    const level = document.getElementsByClassName("level");
    level[state].style.backgroundColor = "#ffcc00";
    level[state].style.boxShadow = "0px 0px 0px";

    //a counter for the next modal window
    if (wi === 4) {
      //if next modal window bring out the 'you win' modal
      const youModal = document.getElementsByClassName("modal")[1];
      youModal.classList.remove("hidden");
      const overlay = document.getElementsByClassName("overlay")[0];
      overlay.classList.remove("hidden");

      const you = document.getElementById("you");
      you.addEventListener("click", reload);
      function reload() {
        location.reload();
      }
    } else {
      const next = document.getElementsByClassName("modal")[0];
      next.classList.remove("hidden");
      const overlay = document.getElementsByClassName("overlay")[0];
      overlay.classList.remove("hidden");

      const factSelector = Math.floor(Math.random(0, 1) * randomFact.length);
      const fact = randomFact[factSelector];
      const p = document.getElementById("p");
      p.innerHTML = `<br><i>RANDOM FUN FACT👀:</i> ${fact}  <img src="${imgFact[factSelector]}" class = 'image' alt="">`;
    }
  }
};

let state = 0;
let selector, secretWord, reveal, m;
let buttons = document.getElementById("middle");
m = 0;

function game() {
  selector = Math.floor(Math.random(0, 1) * secretWords.length);
  secretWord = secretWords[selector];
  const hint = hints[selector];
  const cate = category[selector];
  console.log(secretWord);
  m = 0;

  if (secretWord.length < 13) {
    coloredBoxes(secretWord, 2);

    //reveal seceretword
    reveal = secretWord.split(" ").join("");
    const selected = document.getElementsByClassName(`blue`);
    // buttons = document.getElementById("middle");

    buttons.addEventListener("click", key);

    function key(e) {
      const letter = e.target.textContent;

      if (reveal.includes(letter)) {
        const position = findIndices(reveal, letter);
        for (let i = 0; i < position.length; i++) {
          selected[position[i]].textContent = letter;
        }

        //next level
        nextLevel(selected);
      } else {
        //if the clicked on element is wrong color 'x'
        const x = document.getElementById(`x${m}`);
        x.style.color = "#ff3300";
        x.style.textShadow = "1px 2px 2px #fff200";
        m += 1;

        //after 3 trials game over, reload page
        if (m === 3) {
          for (let i = 0; i < selected.length; i++) {
            selected[i].textContent = reveal[i];
          }
          const lostModal = document.getElementsByClassName("modal")[2];
          lostModal.classList.remove("hidden");
          const overlay = document.getElementsByClassName("overlay")[0];
          overlay.classList.remove("hidden");

          const you2 = document.getElementById(`you${2}`);
          you2.addEventListener("click", reload);
          function reload() {
            location.reload();
          }
        }
      }
    }
  } else if (12 < secretWord.length < 26) {
    const splitWord = secretWord.split(" ");
    const firstRow = new Array(splitWord.shift()); //first row for the first row after splittig the secret word through space

    //if after splitting the words in first row are still more than required move them to splitword
    //it also solves some weird behaviour
    if (firstRow.join(" ").length < 13) {
      firstRow.push(splitWord.shift());
    }

    if (firstRow.join(" ").length > 12) {
      splitWord.push(firstRow.pop());
    }
    //

    const Row1 = firstRow.join(" ");
    const Row2 = splitWord.join(" ");
    coloredBoxes(Row1, 2);
    coloredBoxes(Row2, 3);

    //reveal seceretword
    reveal = secretWord.split(" ").join("");
    const selected = document.getElementsByClassName(`blue`);
    // const buttons = document.getElementById("middle");

    buttons.addEventListener("click", function (e) {
      const letter = e.target.textContent;

      if (reveal.includes(letter)) {
        const position = findIndices(reveal, letter);
        console.log(position);

        for (let i = 0; i < position.length; i++) {
          selected[position[i]].textContent = letter;
        }

        nextLevel(selected);
      } else {
        //if the clicked on element is wrong color 'x'
        const x = document.getElementById(`x${m}`);
        x.style.color = "#ff3300";
        x.style.textShadow = "1px 2px 2px #fff200";
        m += 1;

        //
        if (m === 3) {
          //after 3 trials game over, reload page
          const lostModal = document.getElementsByClassName("modal")[2];
          lostModal.classList.remove("hidden");
          const overlay = document.getElementsByClassName("overlay")[0];
          overlay.classList.remove("hidden");

          const you2 = document.getElementById(`you${2}`);
          you2.addEventListener("click", reload);
          function reload() {
            location.reload();
          }
        }
      }
    });
  }

  //HINTS
  const hintBoxes = document.getElementsByClassName("bottom1")[0];
  hintBoxes.textContent = `${hint}`;

  //category
  const categorys = document.getElementsByClassName("last")[0];
  categorys.textContent = `${cate}`;
}

game(); //first call of the game

const nextButton = document.getElementById("button");
let wi = 0; //a nextButton counter
nextButton.addEventListener("click", function () {
  wi += 1;

  //clear all  as we are going to the next level
  const clear = document.getElementsByClassName(`blue`);
  for (let i = 0; i < clear.length; ) {
    clear[i].textContent = "";
    clear[i].classList.remove("blue");
  }

  //remove the secretword as we don't want it to come up again
  if (secretWords.indexOf(secretWord) > -1) {
    secretWords.splice(secretWords.indexOf(secretWord), 1);
  }

  //as we click reset the chances
  for (let i = 0; i < 3; i++) {
    const xClear = document.getElementById(`x${i}`);
    xClear.style.color = "#4f4f6b";
    xClear.style.textShadow = "2px 2px 7px #111111";
  }

  //hid it back
  const next = document.getElementsByClassName("modal")[0];
  next.classList.add("hidden");
  const overlay = document.getElementsByClassName("overlay")[0];
  overlay.classList.add("hidden");

  //counters
  selector = 0;
  reveal = "";
  m = 0;

  state += 1;
  buttons = document.getElementById("a"); // away of resetting the buttons varaible as it just keeps firing twice

  game(); //recall the game
});
