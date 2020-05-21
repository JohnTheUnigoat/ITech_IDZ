var btnGetRepos = document.getElementById("get-repos");
var ulRepos = document.getElementById("repos");

var reposTitle = document.getElementById("repos-title");
var tbUser = document.getElementById("user");

var repoTitle = document.getElementById("repo-title");
var repoInfo = document.getElementById("repo-info");

var userRepoUrl = "https://api.github.com/users/{user}/repos";

var repos = [];

btnGetRepos.addEventListener("click", loadRepos);

async function loadRepos() {
    let user = tbUser.value;

    if (user == "") {
        alert("Please specify the username for the GitHub account!");
        return;
    }

    reposTitle.textContent = `${user}'s repositories:`;

    let url = userRepoUrl.replace("{user}", user);

    repos = await (await fetch(url)).json();

    ulRepos.innerHTML = "";

    for (let i = 0; i < repos.length; i++) {
        let repoDiv = document.createElement("div");
        repoDiv.className = "repo-panel";
        repoDiv.innerHTML = `<div class="repo">${repos[i].name}</div>`;

        repoDiv.addEventListener("click", () => loadRepoData(i));

        ulRepos.appendChild(repoDiv);
    }
}

function loadRepoData(index) {
    let repo = repos[index];

    repoTitle.innerText = repo.name;

    repoInfo.innerHTML = "";

    repoInfo.innerHTML += `<h3>Description:</h3>\n<p>${repo.description}</p>`;
    repoInfo.innerHTML += `<h3>URL:</h3>\n<p>${repo.url}</p>`;
    repoInfo.innerHTML += `<h3>Created:</h3>\n<p>${repo.created_at}</p>`;
    repoInfo.innerHTML += `<h3>Last update:</h3>\n<p>${repo.updated_at}</p>`;

    loadLanguageData(index);

    loadCommitData(index);
}

async function loadLanguageData(index) {
    let url = repos[index].languages_url;

    let languages = await (await fetch(url)).json();

    let langSum = 0;

    for (const lang in languages) {
        langSum += languages[lang];
    }

    repoInfo.innerHTML += `<h3>Languages</h3>`;

    let ul = document.createElement('ul');

    for (const lang in languages) {
        let langPercentage = Math.round(languages[lang] / langSum * 100);
        ul.innerHTML += `<li>${lang}: ${langPercentage}%</li>`;
    }

    repoInfo.appendChild(ul);
}

async function loadCommitData(index) {
    let url = repos[index].commits_url.replace("{/sha}", "");

    let commits = await (await fetch(url)).json();

    repoInfo.innerHTML += `<h3>Commits</h3>`;

    let commitTable = document.createElement('table');
    commitTable.id = "commit-table";

    let tableDiv = document.createElement("div");
    tableDiv.id = "table-container";

    let th_row = document.createElement("tr");
    th_row.innerHTML = "<th>Hash</th><th>Message</th><th>Date</th>";

    commitTable.appendChild(th_row);

    commits.forEach(commit => {
        let tr = document.createElement("tr");

        let sha = commit.sha.slice(0, 6);
        let message = commit.commit.message;
        let date = new Date(commit.commit.committer.date);
        let dateStr = date.toDateString();
        let timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        tr.innerHTML += `<td>${sha}</td>\n`;
        tr.innerHTML += `<td>${message}</td>\n`;
        tr.innerHTML += `<td>${dateStr}, ${timeStr}</td>\n`;

        commitTable.appendChild(tr);
    });

    tableDiv.appendChild(commitTable);

    repoInfo.appendChild(tableDiv);
}
