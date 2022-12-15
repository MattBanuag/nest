'use strict';
// UTILITY FUNCTIONS TO INCREASE CODE EFFICIENCY

// Add Event Listener Function
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// Query Selector Function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}


// Create HTML Element Function
function create(element, parent = document) {
    return parent.createElement(element);
}

export { onEvent, select, create };