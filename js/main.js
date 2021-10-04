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
let marketThings = document.getElementById("marketThings")

let bottomMenuButton = document.getElementsByClassName("bottomMenuButton")

let promptSave = document.getElementById("promptSave")
let promptLoad = document.getElementById("promptLoad")

let hatclicker = document.getElementById("hatclicker")

let stocks = document.getElementById("stocks")
let shop = document.getElementById("shop")
let market = document.getElementById("market")
let settings = document.getElementById("settings")

let coinCount = 0;
let coinsPerSecond = 0;
let coinPerClick = 1;
let coinPerClickplusCPS = 0;
let ascensions = 1;
let dollars = 0;
let things = [0, 0, 0, 0, 0, 0, 0, 0]
let upgrades = [0, 0, 0, 0, 0, 0, 0, 0]
let coinValue = 0.2;

fetch('../things.json')
    .then(response => response.json())
    .then(thingsInJson => thingsInJson.buildings.forEach(thing => {
    let thingDiv = document.createElement("div");

    let thingImg = document.createElement("img");
    let thingTitle = document.createElement("abbr");
    let thingDescription = document.createElement("footer");

    let thingInfo = document.createElement("dl");
    let thingCost = document.createElement("li");
    let thingCPS = document.createElement("li");
    let thingCount = document.createElement("li");
    
    thingImg.src = thing.image;
    thingTitle.innerText = thing.name;
    thingDescription.innerText = thing.description;

    thingCPS.innerText = thing.addCPS*ascensions + " CPS";
    thingCost.innerText = Math.round(thing.price*Math.pow(1.15, things[thing.id])) + " $";
    thingCount.innerText = things[thing.id] + " owned";

    thingCount.className = "thingCountInShop";
    thingCost.className = "thingCostInShop";

    thingDiv.appendChild(thingImg);
    thingDiv.appendChild(thingTitle);
    thingDiv.appendChild(thingInfo);
    thingDiv.appendChild(thingDescription);

    thingInfo.appendChild(thingCost);
    thingInfo.appendChild(thingCPS);
    thingInfo.appendChild(thingCount);

    storeThings.appendChild(thingDiv);
    
    thingDiv.onclick = () => {
        if(dollars >= Math.round(thing.price*Math.pow(1.15, things[thing.id]))){
            dollars -= Math.round(thing.price*Math.pow(1.15, things[thing.id]));
            dollarCounter.innerHTML = dollars + " $";

            coinsPerSecond += thing.addCPS*ascensions;
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

fetch('../things.json')
  .then(response => response.json())
  .then(thingsInJson => thingsInJson.upgrades.forEach(upgrade => {
    let upgradeDiv = document.createElement("div");

    let upgradeImg = document.createElement("img");
    let upgradeTitle = document.createElement("abbr");
    let upgradeDescription = document.createElement("footer");

    let upgradeInfo = document.createElement("dl");
    let upgradeCost = document.createElement("li");
    
    upgradeImg.src = upgrade.image;
    upgradeTitle.innerText = upgrade.name;
    upgradeDescription.innerText = upgrade.description;

    if(upgrade.id == 7){
        upgradeCost.innerText = Math.round(upgrade.price*Math.pow(2.5, ascensions)) + " coins"
    }

    else{
        upgradeCost.innerText = upgrade.price + " coins"
    }

    upgradeDiv.appendChild(upgradeImg);
    upgradeDiv.appendChild(upgradeTitle);
    upgradeDiv.appendChild(upgradeInfo);
    upgradeDiv.appendChild(upgradeDescription);

    upgradeInfo.appendChild(upgradeCost);

    if(upgrades[upgrade.id] == 1){
        upgradeDiv.style.display = "none";
    }

    marketThings.appendChild(upgradeDiv);
    
    upgradeDiv.onclick = () => {
        if(coinCount >= upgrade.price){
            if(upgrade.addCPC){
                coinPerClick += upgrade.addCPC;
            }

            if(upgrade.addCPCplusCPS){
                coinPerClickplusCPS += upgrade.addCPCplusCPS;
            }

            coinCount -= upgrade.price

            if(upgrade.id == 7){
                ascend();
            }

            else{
                upgrades[upgrade.id] = 1;
                upgradeDiv.style.display = "none";
            }

            for (let i = 0; i < coinCounter.length; i++) {
                coinCounter[i].innerHTML = coinCount + " coins";
            }
        }

        else{
            upgradeCost.style.color = "red";
            setTimeout(() => {upgradeCost.style.color = "white"}, 800);
        }
    }}
))
  

function hatClick(){
    coinCount += Math.round(coinPerClick + coinsPerSecond*coinPerClickplusCPS)

    hatclicker.classList.add('click');
    setTimeout(() => {hatclicker.classList.remove('click')}, 150);
    for (let i = 0; i < coinCounter.length; i++) {
        coinCounter[i].innerHTML = coinCount + " coins";
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
    if(eval(Cookies.get('CPCp')) != undefined){coinPerClickplusCPS = eval(Cookies.get('CPCp'))}
    if(eval(Cookies.get('ascensions')) != undefined){ascensions = eval(Cookies.get('ascensions'))}
    if(eval(Cookies.get('dollars')) != undefined){dollars = eval(Cookies.get('dollars'))}
    if(eval(Cookies.get('things')) != undefined){things = eval(Cookies.get('things').split("|"))}
    if(eval(Cookies.get('upgrades')) != undefined){upgrades = eval(Cookies.get('upgrades').split("|"))}

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
    coinValue = Math.round(Math.random() * 40)/100

    things = things.join("|");
    upgrades = upgrades.join("|");
    Cookies.set('coins', coinCount, {expires: 235, path: '' });
    Cookies.set('coinValue', coinValue, {expires: 235, path: '' });
    Cookies.set('CPS', coinsPerSecond, {expires: 235, path: '' });
    Cookies.set('CPC', coinPerClick, {expires: 235, path: '' });
    Cookies.set('CPCp', coinPerClickplusCPS, {expires: 235, path: '' });
    Cookies.set('ascensions', ascensions, {expires: 235, path: '' });
    Cookies.set('dollars', dollars, {expires: 235, path: '' });
    Cookies.set('things', things, {expires: 235, path: '' });
    Cookies.set('upgrades', upgrades, {expires: 235, path: '' });
    things = things.split("|");
    upgrades = upgrades.split("|");
    
    promptSave.style.visibility = "visible";
    setTimeout(() => {promptSave.style.visibility = "hidden"}, 2000);

    for (let i = 0; i < dollarValueThing.length; i++) {
        dollarValueThing[i].innerHTML = coinValue;
    }   
}, 60000);


hatclicker.onclick = hatClick;

sellAllButton.onclick = () => {
    dollars += Math.round(coinCount*coinValue)
    coinCount = 0;
    sellInput.value = 0
    coinInput.innerHTML = "0";
    dollarInput.innerHTML = "0";

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

function ascend(){
    Cookies.remove('coins');
    Cookies.remove('coinValue');
    Cookies.remove('CPS');
    Cookies.remove('CPC');
    Cookies.remove('CPCp');
    Cookies.remove('dollars');
    Cookies.remove('things');
    Cookies.remove('upgrades');
    ascensions *= 2;
    Cookies.set('ascensions', ascensions, {expires: 235, path: '' }).then(location.reload(true));
}

bottomMenuButton[0].onclick = () => {
    if(stocks.style.display == "block"){
        stocks.style.display = "none"
        stocksButton.style.backgroundColor = "#222"
    }

    else{
        stocks.style.display = "block";
        stocksButton.style.backgroundColor = "#00aeff"
    }
}

bottomMenuButton[1].onclick = () => {
    if(shop.style.display == "block"){
        shop.style.display = "none"
        shopButton.style.backgroundColor = "#222"
    }

    else{
        shop.style.display = "block";
        shopButton.style.backgroundColor = "#00aeff"
    }
}

bottomMenuButton[2].onclick = () => {
    if(market.style.display == "block"){
        market.style.display = "none"
        marketButton.style.backgroundColor = "#222"
    }

    else{
        market.style.display = "block";
        marketButton.style.backgroundColor = "#00aeff"
    }
}

bottomMenuButton[3].onclick = () => {
    if(settings.style.display == "block"){
        settings.style.display = "none"
        settingsButton.style.backgroundColor = "#222"
    }

    else{
        settings.style.display = "block";
        settingsButton.style.backgroundColor = "#00aeff"
    }
}