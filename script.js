var btnGetRepos = document.getElementById("get-repos");
var ulRepos = document.getElementById("repos");

var userRepoUrl = "https://api.github.com/users/{user}/repos";
var repoCommitsUrl = "https://api.github.com/repos/{user}/{repo}/commits";

btnGetRepos.addEventListener("click", loadRepos);

async function loadRepos() {
    alert('here');
}
