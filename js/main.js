import Cookies from './js.cookie.mjs'

let dollarCounter = document.getElementById("dollarCounter")
let coinCounter = document.getElementsByClassName("coinCounter")
let CPScounter = document.getElementById("CPScounter")
let dollarValueThing = document.getElementsByClassName("dollarValueThing")
let dollarValueForAll = document.getElementById("dollarValueForAll")

let sellAllButton = document.getElementById("sellAllButton")

let sellInput = document.getElementById("sellInput")
let sellInputButton = document.getElementById("sellInputButton")
let coinInput = document.getElementById("coinInput")
let dollarInput = document.getElementById("dollarInput")

let storeThings = document.getElementById("storeThings")
let thingCountInShop = document.getElementsByClassName("thingCountInShop")
let thingCostInShop = document.getElementsByClassName("thingCostInShop")

let bottomMenuButton = document.getElementsByClassName("bottomMenuButton")

let promptSave = document.getElementById("promptSave")
let promptLoad = document.getElementById("promptLoad")

let hatclicker = document.getElementById("hatclicker")
let title = document.getElementById("title")

let market = document.getElementById("market")
let shop = document.getElementById("shop")
let stats = document.getElementById("stats")
let settings = document.getElementById("settings")

hatclicker.setAttribute('draggable', false);
title.setAttribute('draggable', false);

let coinCount = 0;
let coinsPerSecond = 0;
let coinPerClick = 1;
let dollars = 0;
let things = [0, 0, 0, 0, 0, 0, 0, 0]
let coinValue = 0.2;

fetch('../things.json')
  .then(response => response.json())
  .then(thingsInShop => thingsInShop.buildings.forEach(thing => {
    let thingDiv = document.createElement("div");

    let thingImg = document.createElement("img");
    let thingTitle = document.createElement("abbr");

    let thingInfo = document.createElement("dl");
    let thingCost = document.createElement("li");
    let thingCPS = document.createElement("li");
    let thingCount = document.createElement("li");
    
    thingImg.src = thing.image;
    thingTitle.innerText = thing.name;
    thingTitle.title = thing.description;

    thingCPS.innerText = thing.addCPS + " CPS";
    thingCost.innerText = Math.round(thing.price*Math.pow(1.15, things[thing.id])) + " $";
    thingCount.innerText = things[thing.id] + " owned";

    thingCount.className = "thingCountInShop";
    thingCost.className = "thingCostInShop";

    thingDiv.appendChild(thingImg);
    thingDiv.appendChild(thingTitle);
    thingDiv.appendChild(thingInfo);

    thingInfo.appendChild(thingCost);
    thingInfo.appendChild(thingCPS);
    thingInfo.appendChild(thingCount);

    storeThings.appendChild(thingDiv);
    
    thingDiv.onclick = () => {
        if(dollars >= Math.round(thing.price*Math.pow(1.15, things[thing.id]))){
            dollars -= Math.round(thing.price*Math.pow(1.15, things[thing.id]));
            dollarCounter.innerHTML = dollars + " $";

            coinsPerSecond += thing.addCPS;
            CPScounter.innerHTML = coinsPerSecond + " CPS";

            eval(things[thing.id]++);
            thingCount.innerHTML = things[thing.id] + " owned"

            thingCost.innerHTML = Math.round(thing.price*Math.pow(1.15, things[thing.id])) + " $"
        }

        else{
            thingCost.style.color = "red";
            setTimeout(() => {thingCost.style.color = "white"}, 800);
        }
    }}
  ))
  .catch(error => console.log(error));

function hatClick(){
    coinCount += coinPerClick

    hatclicker.classList.add('click');
    setTimeout(() => {hatclicker.classList.remove('click')}, 150);
    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
    }
}

function openMenu(menu){
    if(menu == 0){
        if(market.style.display == "block"){
            market.style.display = "none"
            marketButton.style.backgroundColor = "transparent"
        }

        else{
            market.style.display = "block";
            marketButton.style.backgroundColor = "lightblue"
        }
    }

    if(menu == 1){
        if(shop.style.display == "block"){
            shop.style.display = "none"
            shopButton.style.backgroundColor = "transparent"
        }

        else{
            shop.style.display = "block";
            shopButton.style.backgroundColor = "lightblue"
        }
    }

    if(menu == 2){
        if(stats.style.display == "block"){
            stats.style.display = "none"
            statsButton.style.backgroundColor = "transparent"
        }

        else{
            stats.style.display = "block";
            statsButton.style.backgroundColor = "lightblue"
        }
    }

    if(menu == 3){
        if(settings.style.display == "block"){
            settings.style.display = "none"
            settingsButton.style.backgroundColor = "transparent"
        }

        else{
            settings.style.display = "block";
            settingsButton.style.backgroundColor = "lightblue"
        }
    }
}

setInterval(function(){
    coinCount += coinsPerSecond;
    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
    }
    dollarValueForAll.innerHTML = Math.round(coinCount*coinValue)
}, 1000);

window.addEventListener("DOMContentLoaded", () => {
    if(eval(Cookies.get('coins')) != undefined){coinCount = eval(Cookies.get('coins'))}
    if(eval(Cookies.get('coinValue')) != undefined){coinValue = eval(Cookies.get('coinValue'))}
    if(eval(Cookies.get('CPS')) != undefined){coinsPerSecond = eval(Cookies.get('CPS'))}
    if(eval(Cookies.get('CPC')) != undefined){coinPerClick = eval(Cookies.get('CPC'))}
    if(eval(Cookies.get('dollars')) != undefined){dollars = eval(Cookies.get('dollars'))}
    if(eval(Cookies.get('things')) != undefined){things = eval(Cookies.get('things').split("|"))}

    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
    }

    CPScounter.innerHTML = coinsPerSecond + " CPS";
    dollarCounter.innerHTML = dollars + " $";

    for (let i = 0; i < dollarValueThing.length; i++) {
        dollarValueThing[i].innerHTML = coinValue;
    }

    dollarValueForAll.innerHTML = Math.round(coinCount*coinValue)
    
    promptLoad.style.visibility = "visible";
    setTimeout(() => {promptLoad.style.visibility = "hidden"}, 2000);
});

setInterval(function(){
    things = things.join("|");
    Cookies.set('coins', coinCount, {expires: 235, path: '' });
    Cookies.set('coinValue', coinValue, {expires: 235, path: '' });
    Cookies.set('CPS', coinsPerSecond, {expires: 235, path: '' });
    Cookies.set('CPC', coinPerClick, {expires: 235, path: '' });
    Cookies.set('dollars', dollars, {expires: 235, path: '' });
    Cookies.set('things', things, {expires: 235, path: '' });
    things = things.split("|");
    
    promptSave.style.visibility = "visible";
    setTimeout(() => {promptSave.style.visibility = "hidden"}, 2000);

    coinValue = Math.round(Math.random() * 40)/100

    for (let i = 0; i < dollarValueThing.length; i++) {
        dollarValueThing[i].innerHTML = coinValue;
    }   
}, 60000);


hatclicker.onclick = hatClick;

sellAllButton.onclick = () => {
    dollars += Math.round(coinCount*coinValue)
    coinCount = 0;

    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
    }
    dollarCounter.innerHTML = dollars + " $"

    dollarValueForAll.innerHTML = Math.round(coinCount*coinValue)
};

sellInput.oninput = () => {
    if(sellInput.value > coinCount){
        sellInput.value = coinCount
    }

    if(sellInput.value < 0){
        sellInput.value = 0
    }

    coinInput.innerHTML = sellInput.value
    dollarInput.innerHTML = Math.round(sellInput.value*coinValue)
}

sellInputButton.onclick = () => {
    coinCount -= coinInput.innerHTML;
    dollars += Math.round(sellInput.value*coinValue);

    sellInput.value = 0;
    coinInput.innerHTML = "0";
    dollarInput.innerHTML = "0";
    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
    }

    dollarCounter.innerHTML = dollars + " $"
    dollarValueForAll.innerHTML = Math.round(coinCount*coinValue)
}

bottomMenuButton[0].onclick = openMenu.bind("menu", 0);
bottomMenuButton[1].onclick = openMenu.bind("menu", 1);
bottomMenuButton[2].onclick = openMenu.bind("menu", 2);
bottomMenuButton[3].onclick = openMenu.bind("menu", 3);