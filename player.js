function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchPlayer() {
    const playerId = getQueryParam("id");

    if (!playerId) {
        console.error("No player ID found");
        return;
    }

    const headers = {
        "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
    };

    try {
        const response = await fetch(
            `https://api.balldontlie.io/v1/players/${playerId}`,
            { headers }
        );

        if (!response.ok)
            throw new Error(`Player fetch failed: ${response.status}`);

        const responseData = await response.json();
        const player = responseData.data;

        document.getElementById("playerName").textContent =
            `${player.first_name} ${player.last_name}`;

        const details = document.getElementById("playerDetails");

        details.innerHTML = `
            <li>Position: ${player.position || "N/A"}</li>
            <li>Height: ${player.height || "N/A"}</li>
            <li>Weight: ${player.weight || "N/A"}</li>
            <li>Jersey: ${player.jersey_number || "N/A"}</li>
            <li>College: ${player.college || "N/A"}</li>
            <li>Draft Year: ${player.draft_year || "N/A"}</li>
            <li>Team: ${player.team.full_name}</li>
        `;

    } catch (error) {
        console.error("Error fetching player:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.history.back();
        });
    }

    fetchPlayer();
});