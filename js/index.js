/*
When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
*/

//When Toggle is clicked, it changes the VALUE of the form input button to "Search By Repo".

//Depending on the current searchType, execute the right fetch() request


const searchEndpoint = 'https://api.github.com/search/users?q=octocat';
const userList = document.querySelector('#user-list');
const submitButton = document.querySelector('#submit-button');

document.addEventListener('DOMContentLoaded', searchFn)

// Adds an EL to Submit & Executes either getUserRequest or getRepoRequest
function searchFn() {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const value = e.target.search.value;
        form.reset()
        if (submitButton.value === 'Search By Users') {
            const repoList = document.querySelector('#repos-list');
            const userList = document.querySelector('#user-list')
            repoList.innerHTML = '';
            userList.innerHTML = '';
            getUserRequest(value);
        } else {
            const repoList = document.querySelector('#repos-list');
            const userList = document.querySelector('#user-list')
            repoList.innerHTML = '';
            userList.innerHTML = '';
            getRepoRequest(value);
        }
    })
}

// Executes REPO Search
function getRepoRequest(value) {
    fetch(`https://api.github.com/users/${value}/repos`)
    .then(res => res.json())
    .then(data => {
        data.forEach(repo => {
            const repoList = document.querySelector('#repos-list');
            const li = document.createElement('li');
            li.innerHTML = `
            <a href='${repo.html_url}'>${repo.name.toUpperCase()}'S REPOSITORY</a>
            <br>
            <br>
            `;
            repoList.appendChild(li)
        })
    })
}

// GET & Add Users/Repos on the DOM
function getUserRequest(value) {
    // Populates DOM with ALL the Users
    fetch(`https://api.github.com/search/users?q=${value}`)
    .then(res => res.json())
    .then(data => {
       const userList = data.items;
        userList.forEach(user => {
            const ul = document.querySelector('#user-list')
            const li = document.createElement('li');
            li.innerHTML = `
            <a href=${user.html_url}>${user.login.toUpperCase()}'S PROFILE</a>
            <br>
            <img src=${user.avatar_url}'>
            <br>
            <br>
            `;
            ul.appendChild(li);
            
            // Listens for an EL on the Username and renders a link to that User's collection of repositories
            li.addEventListener('click', () => {
                const repoUl = document.querySelector('#repos-list')
                repoUl.innerHTML = '';
                fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(repoItem => {
                        const repoLi = document.createElement('li');
                        repoLi.innerHTML = `
                        <a href='${repoItem.html_url}'>${repoItem.name.toUpperCase()}'s REPOSITORY</a>
                        <br>
                        <br>
                        `;
                        repoUl.appendChild(repoLi);
                    })
                })
            })
        })
    })
}

/*
BONUS OBJECTIVE
*/

const toggleButton = document.querySelector('#toggle-button');

//Event listener on the "Respositories" button
toggleButton.addEventListener('click', toggleSearch)

// Toggles the Search Button's Value between Users & Repos
function toggleSearch(e) {
    if (submitButton.value === 'Search By Users') {
        submitButton.value = 'Search By Repository'
    } else {
        submitButton.value = 'Search By Users'
    }
}


