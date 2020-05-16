var btnGetRepos = document.getElementById("get-repos");
var ulRepos = document.getElementById("repos");

var reposTitle = document.getElementById("repos-title");
var tbUser = document.getElementById("user");

var userRepoUrl = "https://api.github.com/users/{user}/repos";
var repoCommitsUrl = "https://api.github.com/repos/{user}/{repo}/commits";

var reposData = [];

btnGetRepos.addEventListener("click", loadRepos);

async function loadRepos() {
    let user = tbUser.value;

    if (user == "") {
        alert("Please specify the username for the GitHub account!");
        return;
    }

    reposTitle.textContent = `${user}'s repositories:`;

    let url = userRepoUrl.replace("{user}", user);

    reposData = await (await fetch(url)).json();

    ulRepos.innerHTML = "";

    for (let i = 0; i < reposData.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = reposData[i].name;

        li.addEventListener("click", () => loadRepoData(i));

        ulRepos.appendChild(li);
    }
}

function loadRepoData(index) {
    alert(reposData[index].name);
}
