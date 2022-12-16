'use strict';
// UTILITY FUNCTIONS
// Add Event Listener Function
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
// Query Selector Function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// HTML DOCUMENT BRIDGE
const peopleContainer = select('.people-container');
const url = 'https://randomuser.me/api/?nat=CA&results=10';
const options = {
    method: 'GET',
    mode: 'cors'
};

async function getUsers() {
    try {
        const response = await fetch(url, options);

        if(!response.ok) {
            console.log(error.message);
        }

        let users = await response.json();
        for(let i = 0; i < users.results.length; i++) {
            peopleContainer.innerHTML += `
            <div class="other-users-box">
                <figure>
                    <img src="${users.results[i].picture.large}" class="users-profile-pic">
                </figure>

                <article>
                    <p class="bold">${users.results[i].name.first} ${users.results[i].name.last}</p>
                    <small class="bold gray">${users.results[i].location.city}, CA</small>
                </article>

                <div><i class="fa-solid fa-user-plus"></i></div>
            </div>
            `;
        }
        console.log(users);
    } catch(error) {
        console.log(error.message);
    }
}

getUsers();