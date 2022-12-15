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
const loginBtn = select('.login-btn');
const createBtn = select('.create-btn');
const dialogProfileSuccess = select('.dialog-success');
const dialogProfileFailed = select('.dialog-failed');
const dialogLoginFailed = select('.dialog-login-failed');
const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
let usernameInput = select('.username-input');
let passwordInput = select('.password-input');
usernameInput.value = '';
passwordInput.value = '';

onEvent('click', createBtn, () => {
    let username = usernameInput.value;
    let password = passwordInput.value;

    if(!emailRegex.test(username)) return usernameInput.style.border = 'thin solid #FF4A4A';
    if(password.length < 6) return passwordInput.style.border = 'thin solid #FF4A4A';
    
    localStorage.setItem('password', JSON.stringify(password));
    localStorage.setItem('username', JSON.stringify(username));

    dialogProfileSuccess.showModal();
    setTimeout(() => {
        dialogProfileSuccess.close();
    }, 2000);

    console.log(localStorage);
}); 

// EVENTS
onEvent('click', loginBtn, () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    
    if(localStorage.length < 1) {
        dialogProfileFailed.showModal();
        setTimeout(() => {
            dialogProfileFailed.close();
        }, 1500);
        return;
    }

    if(username !== localStorage.getItem('username') || 
       password !== localStorage.getItem('password')) {
        dialogLoginFailed.showModal();
        setTimeout(() => {
            dialogLoginFailed.close();
            console.log(username);
            console.log(password);
        }, 1500);
        return;
    } 

    window.location.href = './home.html';
});





