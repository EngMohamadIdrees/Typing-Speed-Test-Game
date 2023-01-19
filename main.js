let wordsEasy = [
  "size",
  "art",
  "end",
  "game",
  "down",
  "him",
  "per",
  "law",
  "shop",
];
let wordsNormal = [
  "county",
  "photo",
  "members",
  "power",
  "while",
  "care",
  "network",
  "computer",
  "systems",
  "three",
  "total",
  "place",
  "guide",
  "download",
  "without",
  "access",
  "think",
  "north",
  "since",
  "current",
  "posts",
  "big",
  "media",
  "control",
  "water",
  "history",
  "pictures",
];
let wordsHard = [
  "resources",
  "following",
  "american",
  "personal",
  "including",
  "directory",
];

// Setting Levels
let dicOfWordsLevels = {
  Easy: wordsEasy,
  Normal: wordsNormal,
  Hard: wordsHard,
};
const levels = {
  Easy: 2,
  Normal: 3,
  Hard: 2,
};

// Get Selectors
let selectElement = document.querySelector("select");
let StartButton = document.querySelector(".start-game");
let levelSpan = document.querySelector(".game-info .level");
let timeSpan = document.querySelector(".game-info .time");
let wordSpan = document.createElement("span");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upComingWords = document.querySelector(".next-words");
let timeLeftSpan = document.querySelector(".user-info .time");
let scoreUserSpan = document.querySelector(".user-info .user-score");
let scoreGameSpan = document.querySelector(".user-info .game-score");
let finsihWord = document.querySelector(".finish");

let defualtLevelSeconds;
let defualtLevelName;
let words;

//  Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
StartButton.onclick = function () {
  this.remove();
  input.style = "display:block";
  input.focus();
  // Get Level Input
  defualtLevelName = selectElement.value;
  // Default Level
  defualtLevelSeconds = levels[defualtLevelName];
  words = dicOfWordsLevels[defualtLevelName];
  // Setting Levels + Seconds + Score
  levelSpan.innerHTML = defualtLevelName;
  timeSpan.innerHTML = defualtLevelSeconds;
  timeLeftSpan.innerHTML = defualtLevelSeconds;
  scoreGameSpan.innerHTML = words.length;
  // Remove Select Input
  selectElement.remove();
  // Generate Words Function
  generateWords();
};

function generateWords() {
  // Get Random Word From Araay
  let ranomWord = words[Math.floor(Math.random() * words.length)];

  // Get Index Of The Word
  let wordIndex = words.indexOf(ranomWord);

  // Remove The Word From The Array
  words.splice(wordIndex, 1);

  // Show The Random Word
  wordSpan.innerHTML = ranomWord;
  theWord.appendChild(wordSpan);

  // Empty Upcoming Words
  upComingWords.innerHTML = "";

  // Generate Upcoming Word
  for (let i = 0; i < words.length; i++) {
    // Create Span Element
    let span = document.createElement("span");
    span.innerHTML = words[i];
    upComingWords.appendChild(span);
  }
  startPlay();

  // Call Start Play Function
}

function startPlay() {
  // Reset Time Left
  timeLeftSpan.innerHTML = defualtLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML == 0) {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (wordSpan.innerHTML.toLowerCase() == input.value.toLowerCase()) {
        //Empty Input Field
        input.value = "";
        // Incremant Scroe
        scoreUserSpan.innerHTML++;
        if (words.length > 0) {
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let resultText = document.createTextNode("You Win");
          span.appendChild(resultText);
          finsihWord.appendChild(span);

          // Remove Upcoming Words Box
          upComingWords.remove();
          input.style = "display:none";
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let resultText = document.createTextNode("Game Over You Lose");
        span.appendChild(resultText);
        finsihWord.appendChild(span);
      }
    }
  }, 1000);
}
