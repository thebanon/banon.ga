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
// @updateURL    https://banon.cf/jumplate/user.js
// @downloadURL  https://banon.cf/jumplate/user.js
// ==/UserScript==

/*
var reset = document.createElement("style").setAttribute("id", "jumplate-reset");
document.head.appendChild(reset)
var reset = ` body > * { all: unset; } `;
document.head.querySelector('#style').insertAdjacentHTML('beforeend',reset);
*/

var style = document.createElement("link");
style.setAttribute("rel", "stylesheet");
style.setAttribute("type", "text/css");
style.setAttribute("href", "https://banon.cf/jumplate/style.css");
document.head.appendChild(style);

var script = document.createElement("script");
script.setAttribute("src", "https://banon.cf/jumplate/script.js");
document.head.appendChild(script);
