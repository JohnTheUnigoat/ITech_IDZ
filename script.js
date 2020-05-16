var btnGetRepos = document.getElementById("get-repos");
var ulRepos = document.getElementById("repos");

var reposTitle = document.getElementById("repos-title");
var tbUser = document.getElementById("user");

var userRepoUrl = "https://api.github.com/users/{user}/repos";
var repoCommitsUrl = "https://api.github.com/repos/{user}/{repo}/commits";

btnGetRepos.addEventListener("click", loadRepos);

async function loadRepos() {
    let user = tbUser.value;

    if (user == "") {
        alert("Please specify the usrname for the GitHub account!");
        return;
    }

    reposTitle.textContent = `${user}'s repositories:`;

    let url = userRepoUrl.replace("{user}", user);

    let repoData = await (await fetch(url)).json();

    ulRepos.innerHTML = "";

    repoData.forEach(repo => {
        let li = document.createElement("li");
        li.innerHTML = repo.name;

        ulRepos.appendChild(li);
    });
}
