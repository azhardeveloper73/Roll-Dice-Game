import { loadScoreBoard } from "../supabase/supabase.js";



const leaderBoardBtn = document.querySelector("#leaderBoard");
const leaderboardModalBtn = document.querySelector("#leaderboardModal");
const closeLeaderboardBtn = document.querySelector("#closeLeaderboard");

leaderBoardBtn.addEventListener("click", () => {
  leaderboardModalBtn.style.display = "block";
  document.querySelectorAll(".leaderboard-row").forEach((row) => row.remove());
  loadScoreBoard({
  tableSelector: ".leaderboard-table",
  rowClass: "leaderboard-row",
  template: (item, index) => `
      <span class="rank">${index + 1}</span>
      <span class="winner">${item.winner_name}</span>
      <span class="loser">${item.loser_name}</span>
      <span class="score">${item.winner_score}</span>
  `
});
});

closeLeaderboardBtn.addEventListener("click", () => {
  leaderboardModalBtn.style.display = "none";
});

const gameDetailsBtn = document.querySelector("#gameDetails");
const gameDetailsModalBtn = document.querySelector("#gameDetails-modal");
const closeBtn = document.querySelector(".close-btn");

gameDetailsBtn.addEventListener("click", () => {
  gameDetailsModalBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  gameDetailsModalBtn.style.display = "none";
});

const playGameBtn = document.querySelector("#playGame");
const confirmModalBtn = document.querySelector("#confirmModal");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const warningModalBtn = document.querySelector("#warningModal");
const closeWarningBtn = document.querySelector("#closeWarning");

playGameBtn.addEventListener("click", () => {
  confirmModalBtn.style.display = "block";
});

yesBtn.addEventListener("click", () => {
  window.location.href = "../home/home.html";
});

noBtn.addEventListener("click", () => {
  warningModalBtn.style.display = "block";
});

closeWarningBtn.addEventListener("click", () => {
  warningModalBtn.style.display = "none";
  confirmModalBtn.style.display = "none";
});
