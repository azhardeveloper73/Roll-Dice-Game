// import { createClient } from '@supabase/supabase-js'

// const { createClient } = supabase;

// const SUPABASE_URL = "https://qvvbdzorcxibpcvhzeep.supabase.co";
// const SUPABASE_ANON_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dmJkem9yY3hpYnBjdmh6ZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODMyODEsImV4cCI6MjA4OTA1OTI4MX0.W-rwpSile21S2JJXDeSR5a713kw8EDUCp4ZB4gqGdjQ";

// // Create a single supabase client for interacting with your database
// const supabasePlayer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// async function saveScore(winner, loser, score) {
//   const { data, error } = await supabasePlayer.from("scores").insert([
//     {
//       winner_name: winner,
//       loser_name: loser,
//       winner_score: score,
//     },
//   ]);

//   if (error) {
//     console.log("Error saving score:", error);
//   } else {
//     console.log("Score saved:", data);
//   }
// }

// async function loadScoreBoard() {
//   const { data, error } = await supabasePlayer
//     .from("scores")
//     .select("*")
//     .order("winner_score", { ascending: false })
//     .limit(5);

//   if (error) {
//     console.log(error);
//     return;
//   }

//   const table = document.querySelector(".scoreBoard-table");

//   data.forEach((item, index) => {
//     const row = `
//       <div class="scoreBoard-row">
//           <div>${index + 1}</div>
//           <div>${item.winner_name}</div>
//           <div>${item.loser_name}</div>
//           <div>${item.winner_score}</div>
//       </div>
//     `;

//     table.insertAdjacentHTML("beforeend", row);
//   });
// }

import { saveScore, loadScoreBoard } from "../supabase/supabase.js";

const scoreBoardBtn = document.querySelector("#scoreBoard");
const scoreBoardModalBtn = document.querySelector("#scoreBoardModal");
const closescoreBoardBtn = document.querySelector("#closescoreBoard");

scoreBoardBtn.addEventListener("click", () => {
  scoreBoardModalBtn.style.display = "flex";
  document.querySelectorAll(".scoreBoard-row").forEach((row) => row.remove());
  loadScoreBoard({
  tableSelector: ".scoreBoard-table",
  rowClass: "scoreBoard-row",
  template: (item, index) => `
      <div>${index + 1}</div>
      <div>${item.winner_name}</div>
      <div>${item.loser_name}</div>
      <div>${item.winner_score}</div>
  `
});
});

closescoreBoardBtn.addEventListener("click", () => {
  scoreBoardModalBtn.style.display = "none";
});

const playGamebtn = document.querySelector("#playGame");
const mainModal = document.querySelector("#mainModal");
const player1NameInput = document.querySelector("#player1Name");
const player2NameInput = document.querySelector("#player2Name");
const setTargetInput = document.querySelector("#setTarget");
const winningTarget = document.querySelector("#target");
const p1NameDisplay = document.querySelector("#p1Name");
const p2NameDisplay = document.querySelector("#p2Name");

playGamebtn.addEventListener("click", () => {
  if (
    player1NameInput.value.trim() === "" ||
    player2NameInput.value.trim() === "" ||
    setTargetInput.value.trim() === ""
  ) {
    alert("Please fill all inputs before starting the game");
    return;
  }

  mainModal.style.display = "none";

  winningTarget.innerText = `Winning Target = ${setTargetInput.value}`;
  p1Name.innerText = player1NameInput.value;
  p2Name.innerText = player2NameInput.value;
});

let player1Turn = true;

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

player1.classList.add("active");

const rollDiceBtn = document.querySelector("#rollDice");
const diceImage = document.querySelector("#diceImage");
const currentScoreAreaP1 = document.querySelector("#currentScoreAreaP1");
const currentScoreAreaP2 = document.querySelector("#currentScoreAreaP2");
const turnTrueDisplay = document.querySelector("#turnTrue");
const turnFalseDisplay = document.querySelector("#turnFalse");
let currentScore = 0;
let totalScoreAreaP1 = 0;
let totalScoreAreaP2 = 0;

rollDiceBtn.addEventListener("click", () => {
  const randomNumber = Math.ceil(Math.random() * 6);
  diceImage.src = `../assets/${randomNumber}.svg`;

  if (randomNumber === 1) {
    currentScore = 0;
    if (player1Turn) {
      currentScoreAreaP1.textContent = currentScore;
      player1Turn = false;
    } else {
      currentScoreAreaP2.textContent = currentScore;
      player1Turn = true;
    }
    updateTurnDisplay();
    player1.classList.toggle("active");
    player2.classList.toggle("active");
    return;
  }

  currentScore += randomNumber;

  if (player1Turn) {
    currentScoreAreaP1.textContent = currentScore;
  } else {
    currentScoreAreaP2.textContent = currentScore;
  }
});

const holdDiceBtn = document.querySelector("#holdDice");
const totalScoreP1Ui = document.querySelector("#totalScoreP1Ui");
const totalScoreP2Ui = document.querySelector("#totalScoreP2Ui");
const winningModal = document.querySelector("#winningModal");
const winnerName = document.querySelector("#winnerName");

holdDiceBtn.addEventListener("click", async () => {
  if (player1Turn) {
    totalScoreAreaP1 += currentScore;
    totalScoreP1Ui.textContent = totalScoreAreaP1;
    currentScore = 0;
    currentScoreAreaP1.textContent = 0;

    if (+totalScoreP1Ui.textContent >= +setTargetInput.value) {
      winningModal.style.display = "flex";
      winnerName.innerHTML = `🏆 ${player1NameInput.value} is the Winner 🏆`;
      try {
        await saveScore(
          player1NameInput.value,
          player2NameInput.value,
          totalScoreAreaP1,
        );
        console.log("Score saved successfully");
      } catch (err) {
        console.log("Error saving score:", err);
      }
      return;
    }

    player1Turn = false;
  } else {
    totalScoreAreaP2 += currentScore;
    totalScoreP2Ui.textContent = totalScoreAreaP2;
    currentScore = 0;
    currentScoreAreaP2.textContent = 0;

    if (+totalScoreP2Ui.textContent >= +setTargetInput.value) {
      winningModal.style.display = "flex";
      winnerName.innerHTML = `🏆 ${player2NameInput.value} is the Winner 🏆`;
      try {
        await saveScore(
          player2NameInput.value,
          player1NameInput.value,
          totalScoreAreaP2,
        );
        console.log("Score saved successfully");
      } catch (err) {
        console.log("Error saving score:", err);
      }
      return;
    }

    player1Turn = true;
  }

  player1.classList.toggle("active");
  player2.classList.toggle("active");
  updateTurnDisplay();
});

const newGameBtn = document.querySelectorAll(".newGame");

newGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    winningModal.style.display = "none";
    mainModal.style.display = "flex";

    currentScore = 0;
    totalScoreAreaP1 = 0;
    totalScoreAreaP2 = 0;

    totalScoreP1Ui.textContent = 0;
    totalScoreP2Ui.textContent = 0;

    currentScoreAreaP1.textContent = 0;
    currentScoreAreaP2.textContent = 0;
    diceImage.src = `../assets/static.svg`;

    player1Turn = true;

    updateTurnDisplay();
  });
});

function updateTurnDisplay() {
  if (player1Turn) {
    turnTrueDisplay.textContent = "🎲 Your Turn";
    turnFalseDisplay.textContent = "⏳ Please Wait...";
  } else {
    turnTrueDisplay.textContent = "⏳ Please Wait...";
    turnFalseDisplay.textContent = "🎲 Your Turn";
  }
}
