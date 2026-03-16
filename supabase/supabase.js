import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qvvbdzorcxibpcvhzeep.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dmJkem9yY3hpYnBjdmh6ZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODMyODEsImV4cCI6MjA4OTA1OTI4MX0.W-rwpSile21S2JJXDeSR5a713kw8EDUCp4ZB4gqGdjQ";

// Create a single supabase client for interacting with your database
const supabasePlayer = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function saveScore(winner, loser, score) {
  const { data, error } = await supabasePlayer.from("scores").insert([
    {
      winner_name: winner,
      loser_name: loser,
      winner_score: score,
    },
  ]);

  if (error) {
    console.log("Error saving score:", error);
  } else {
    console.log("Score saved:", data);
  }
}



async function loadScoreBoard({ tableSelector, rowClass, template }) {
  // Purani rows remove karo
  document.querySelectorAll(`${tableSelector} .${rowClass}`).forEach(row => row.remove());

  const { data, error } = await supabasePlayer
    .from("scores")
    .select("*")
    .order("winner_score", { ascending: false })
    .limit(5);

  if (error) return console.log(error);

  const table = document.querySelector(tableSelector);

  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.classList.add(rowClass);
    row.innerHTML = template(item, index);
    table.appendChild(row);
  });
}

export {supabasePlayer, saveScore, loadScoreBoard}