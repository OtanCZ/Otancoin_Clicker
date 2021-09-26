import Cookies from './js.cookie.mjs'

fetch('../things.json')
  .then(response => response.json())
  .then(thingsInShop => console.log(thingsInShop))
  .catch(error => console.log(error));

let body = document.getElementById("body")
let dollarCounter = document.getElementById("dollarCounter")
let coinCounter = document.getElementById("coinCounter")
let CPScounter = document.getElementById("CPScounter")

let goleft = document.getElementById("goleft")
let goright = document.getElementById("goright")

let promptSave = document.getElementById("promptSave")
let promptLoad = document.getElementById("promptLoad")

let hatclicker = document.getElementById("hatclicker")
let title = document.getElementById("title")

let market = document.getElementById("market")
let shop = document.getElementById("shop")

hatclicker.setAttribute('draggable', false);
title.setAttribute('draggable', false);

let coinCount = 0;
let coinsPerSecond = 0;
let coinPerClick = 1;
let dollars = 0;
let things = [0, 0, 0, 0]

function hatClick(){
    coinCount += coinPerClick

    hatclicker.classList.add('click');
    setTimeout(() => {hatclicker.classList.remove('click')}, 150);
    coinCounter.innerHTML = coinCount + " coins";
}

setInterval(function(){
    coinCount += coinsPerSecond;
    coinCounter.innerHTML = coinCount + " coins";
}, 1000);

function loadSave() {
    if(eval(Cookies.get('coins')) != undefined){coinCount = eval(Cookies.get('coins'))}
    if(eval(Cookies.get('CPS')) != undefined){coinsPerSecond = eval(Cookies.get('CPS'))}
    if(eval(Cookies.get('CPC')) != undefined){coinPerClick = eval(Cookies.get('CPC'))}
    if(eval(Cookies.get('things')) != undefined){things = eval(Cookies.get('things'))}

    coinCounter.innerHTML = coinCount + " coins";
    CPScounter.innerHTML = coinsPerSecond + " coins per second";
    dollarCounter.innerHTML = dollars + " $";

    promptLoad.style.visibility = "visible";
    setTimeout(() => {promptLoad.style.visibility = "hidden"}, 2000);
}

setInterval(function(){
    Cookies.set('coins', coinCount, {expires: 235, path: '' });
    Cookies.set('CPS', coinsPerSecond, {expires: 235, path: '' });
    Cookies.set('CPC', coinPerClick, {expires: 235, path: '' });
    Cookies.set('dollars', dollars, {expires: 235, path: '' });
    Cookies.set('things', things, {expires: 235, path: '' });

    promptSave.style.visibility = "visible";
    setTimeout(() => {promptSave.style.visibility = "hidden"}, 2000);
}, 60000);

function goRight(){
    if(shop.style.display == "block"){
        shop.style.display = "none"
    }

    else{
        shop.style.display = "block";
    }
}

function goLeft(){
    if(market.style.display == "block"){
        market.style.display = "none"
    }

    else{
        market.style.display = "block";
    }
}

goleft.onclick = goLeft;
goright.onclick = goRight;
hatclicker.onclick = hatClick;
window.onload = loadSave;
