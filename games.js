const headers = {
    "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
};

let allGames = [];

async function fetchGames() {
    try {
        const response = await fetch("https://api.balldontlie.io/v1/games?per_page=100", { headers });
        if (!response.ok) throw new Error('Games fetch failed: ' + response.status);
        const data = await response.json();
        allGames = data.data;
        displayGames(allGames);
        populateTeamFilter(allGames);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

function displayGames(games) {
    const gamesContainer = document.getElementById("games");
    if (!gamesContainer) {
        console.error("Games container not found!");
        return;
    }

    gamesContainer.innerHTML = "";

    games.forEach(game => {
        const link = document.createElement("a");
        link.className = "game-card";
        link.href = `games.html?id=${game.id}`;
        link.innerHTML = `
            <h3>${game.home_team.full_name} vs ${game.visitor_team.full_name}</h3>
            <p>${new Date(game.date).toLocaleDateString()} - ${game.status}</p>
        `;
        gamesContainer.appendChild(link);
    });
}

function populateTeamFilter(games) {
    const filter = document.getElementById("teamFilter");
    if (!filter) {
        console.error("Team filter dropdown not found!");
        return;
    }

    // Collect all unique teams from games
    const teams = {};
    games.forEach(game => {
        teams[game.home_team.id] = game.home_team.full_name;
        teams[game.visitor_team.id] = game.visitor_team.full_name;
    });

    // Add "All Teams" option
    filter.innerHTML = `<option value="all">All Teams</option>`;

    // Add team options
    Object.keys(teams).forEach(id => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = teams[id];
        filter.appendChild(option);
    });

    // Add change listener
    filter.addEventListener("change", () => {
        const selectedId = filter.value;
        if (selectedId === "all") {
            displayGames(allGames);
        } else {
            const filtered = allGames.filter(
                game => game.home_team.id == selectedId || game.visitor_team.id == selectedId
            );
            displayGames(filtered);
        }
    });
}

// Run everything
fetchGames();