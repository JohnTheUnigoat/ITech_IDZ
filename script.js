var btnGetRepos = document.getElementById("get-repos");
var ulRepos = document.getElementById("repos");

var reposTitle = document.getElementById("repos-title");
var tbUser = document.getElementById("user");

var repoTitle = document.getElementById("repo-title");
var repoInfo = document.getElementById("repo-info");

var userRepoUrl = "https://api.github.com/users/{user}/repos";
var repoCommitsUrl = "https://api.github.com/repos/{user}/{repo}/commits";

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

    console.log(repos);

    ulRepos.innerHTML = "";

    for (let i = 0; i < repos.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = repos[i].name;

        li.addEventListener("click", () => loadRepoData(i));

        ulRepos.appendChild(li);
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
    // TODO: add loading languages and commits
}
