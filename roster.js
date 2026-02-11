function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadIntoTable(players, tableElement) {
    tableElement.innerHTML = `
        <tr>
            <th>Roster</th>
            <th>MPG</th>
            <th>PPG</th>
            <th>RPG</th>
        </tr>
    `;

    players.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.first_name} ${player.last_name}</td>
            <td>${player.min || "N/A"}</td>
            <td>${player.pts || "N/A"}</td>
            <td>${player.reb || "N/A"}</td>
        `;
        tableElement.appendChild(row);
    });
}

async function fetchTeamRoster() {
    const teamId = getQueryParam("id");
    if (!teamId) {
        console.error("No team ID found in URL");
        return;
    }

    const headers = {
        "Authorization": "Bearer 46db9eca-a80d-4613-a6a7-28c3f704fcfa"
    };

    try {
        const teamResponse = await fetch(`https://api.balldontlie.io/v1/teams/${teamId}`, { headers });
        if (!teamResponse.ok) throw new Error(`Team fetch failed: ${teamResponse.status}`);
        const teamData = await teamResponse.json();
        document.querySelector("h1").textContent = teamData.full_name;

        const rosterResponse = await fetch(`https://api.balldontlie.io/v1/players?team_ids[]=${teamId}&per_page=100`, { headers });
        if (!rosterResponse.ok) throw new Error(`Roster fetch failed: ${rosterResponse.status}`);
        const rosterData = await rosterResponse.json();
        const players = rosterData.data;

        const table = document.querySelector("table");
        loadIntoTable(players, table);

    } catch (error) {
        console.error("Error fetching roster:", error);
    }
}

fetchTeamRoster();
