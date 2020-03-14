// ==UserScript==
// @name         JumpLate
// @namespace    https://www.chree.banon.gq/jumplate
// @version      1
// @description  Custom Theme for JumpinChat
// @author       Chree Banon
// @match        https://jumpin.chat/*
// @exclude      https://jumpin.chat/thebanon
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @run-at       document-end
// @license      MIT
// @updateURL    https://github.com/thebanon/jumplate/raw/master/user.js
// @downloadURL  https://github.com/thebanon/jumplate/raw/master/user.js
// ==/UserScript==

/*var reset = document.createElement("link");
reset.setAttribute("rel", "stylesheet");
reset.setAttribute("type", "text/css");
reset.setAttribute("href", "https://github.com/thebanon/jumplate/raw/master/reset.css");
document.head.appendChild(reset);*/

var reset = document.createElement("style").setAttribute("id", "jumplate-reset");
document.head.appendChild(reset)
var reset = `
    body { display: none !important; }
`;
document.head.querySelector('#style').insertAdjacentHTML('beforeend',reset);

var style = document.createElement("link");
style.setAttribute("rel", "stylesheet");
style.setAttribute("type", "text/css");
style.setAttribute("href", "https://github.com/thebanon/jumplate/raw/master/style.css");
document.head.appendChild(style);

var script = document.createElement("script");
script.setAttribute("src", "https://github.com/thebanon/jumplate/raw/master/script.js");
document.head.appendChild(script);
