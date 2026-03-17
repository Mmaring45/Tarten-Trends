document.addEventListener("DOMContentLoaded", async () => {
  const allBtn = document.getElementById("all-teams");
  const eastBtn = document.getElementById("east-teams");
  const westBtn = document.getElementById("west-teams");
  const teamsContainer = document.getElementById("teams");

  if (!allBtn || !eastBtn || !westBtn || !teamsContainer) {
    console.error("Missing DOM elements: check your IDs");
    return;
  }

  const headers = {
    "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
  };

  let allTeams = [];

  
  async function fetchTeams() {
    try {
      const response = await fetch("https://api.balldontlie.io/v1/teams", { headers });
      if (!response.ok) throw new Error(`Teams fetch failed: ${response.status}`);
      const data = await response.json();
      allTeams = data.data; 
      displayTeams(allTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  
  function displayTeams(teams) {
    teamsContainer.innerHTML = ""; 
    teams.forEach(team => {
      const link = document.createElement("a");
      link.className = "team-card";
      link.href = `team-roster.html?id=${team.id}`;
      link.innerHTML = `
        <h3>${team.full_name}</h3>
        <p>${team.city} — ${team.conference} Conference</p>
      `;
      teamsContainer.appendChild(link);
    });
  }

  
  allBtn.addEventListener("click", () => displayTeams(allTeams));
  eastBtn.addEventListener("click", () =>
    displayTeams(allTeams.filter(team => team.conference === "East"))
  );
  westBtn.addEventListener("click", () =>
    displayTeams(allTeams.filter(team => team.conference === "West"))
  );

  
  fetchTeams();
});