async function fetchTeams() {
      try {
        const response = await fetch("https://api.balldontlie.io/v1/teams", {
          headers: {
            "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
          }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched data:", data);
        const teams = data.data;

        const teamsContainer = document.getElementById("teams");
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
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchTeams();