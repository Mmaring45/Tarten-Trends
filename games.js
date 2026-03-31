const headers = {
    "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
};

let allGames = [];

async function fetchGames() {
    try {
        const response = await fetch("https://api.balldontlie.io/v1/games", { headers });
        if (!response.ok) throw new Error('Games fetch failed: ' + response.status);
        const data = await response.json();
        allGames = data.data;
        displayGames(allGames);
    } 
    catch (error) {
        console.error("Error fetching games:", error);
    }
}

function displayGames(games) {
    constgamesContainer = document.getElementById("games");

    if (!gamesContainer) {
        console.error("Games container not found");
        return;
    }

    gamesContainer.innerHTML = "";
    
    games.forEach(game => {
        const link = document.createElement("a");
        link.className = "game-card";

        link.innerHTML = `
            <h3>${game.home_team.full_name} vs ${game.visitor_team.full_name}</h3>
            <p>${new Date(game.date).toLocaleDateString()} - ${game.status}</p>
        `;
        gamesContainer.appendChild(link);
    })
}
fetchGames();
