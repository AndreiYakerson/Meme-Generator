'use strict'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function getRandomId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''

    for (let i = 0; i < 7; i++) {
        const curChar = chars.charAt([getRandomInt(0,chars.length - 1)]);
        id += curChar
    }

    return id
}


