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
const feedStream = select('.feed-stream');
const postBtn = select('.fa-paper-plane');
const postFile = select('#image-input');
const textarea = select('textarea');
const today = new Date();
const url = 'https://randomuser.me/api/?nat=CA&results=10';
const options = {
    method: 'GET',
    mode: 'cors'
};
let hour = today.getHours().toString();
let minutes = today.getMinutes().toString().padStart('2', 0)
let ampm = hour >= 12 ? 'p.m' : 'a.m';
let day = today.toDateString(); 
window.URL = window.URL || window.webkitURL;

// FUNCTIONS
onEvent('click', postBtn, () => {
    const message = select('.message').value;
    let content = document.createElement('div');
    content.classList.add('feed');

    try {
        let imageURL = URL.createObjectURL(postFile.files[0]);
        content.innerHTML = `
        <div class="user-info">
            <figure>
                <img src="assets/media/Profile.jpg" alt="">
                <h5>Matthew Banuag</h5>
            </figure>

            <small class="bold gray">${day.slice(0, 15)}, ${hour}:${minutes} ${ampm}</small>
        </div>

        <p>
            ${message}
        </p>

        <figure class="image-post">
            <img src="${imageURL}">
        </figure>

        <div class="likes-comments">
            <p><i class="fa-regular fa-heart"></i> 234</p>
            <p><i class="fa-regular fa-comments"></i> 68</p>
            <p><i class="fa-solid fa-share"></i> Share</p>
        </div>
        `;

        textarea.value = '';
        feedStream.prepend(content);
    } catch {
        content.innerHTML = `
        <div class="user-info">
            <figure>
                <img src="assets/media/Profile.jpg" alt="">
                <h5>Matthew Banuag</h5>
            </figure>

            <small class="bold gray">${day.slice(0, 15)}, ${hour}:${minutes} ${ampm}</small>
        </div>

        <p>
            ${message}
        </p>

        <div class="likes-comments">
            <p><i class="fa-regular fa-heart"></i> 234</p>
            <p><i class="fa-regular fa-comments"></i> 68</p>
            <p><i class="fa-solid fa-share"></i> Share</p>
        </div>
        `;

        textarea.value = '';
        feedStream.prepend(content);
    }
});

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
                    <small class="bold size">${users.results[i].name.first} ${users.results[i].name.last}</small>
                    <small class="bold gray">${users.results[i].location.city}, CA</small>
                </article>

                <div><i class="fa-solid fa-user-plus"></i></div>
            </div>
            `;
        }
    } catch(error) {
        console.log(error.message);
    }
}

getUsers();