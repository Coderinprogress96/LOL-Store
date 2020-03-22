const MAX_BLUE_ESSENCE = 20000;
const MAX_RIOT_POINTS = 5000;
const MIN_DISCOUNT = 15;
const MAX_DISCOUNT = 75;
const SKIN_PRICES = [420, 750, 975, 1350, 1850, 3250];
const CHAMPIONS_DATA_URL = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json';
const SKINS_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';

var blueEssence = document.getElementById('blue_essence');
var riotPoints = document.getElementById('riot_points');
var skinImages = document.getElementsByClassName('img-thumbnail');

blueEssence.innerText = getRandomNumber(1, MAX_BLUE_ESSENCE);
riotPoints.innerText = getRandomNumber(1, MAX_RIOT_POINTS);

// Send a HTTP request to that URL and set the random skins using the response
fetch(CHAMPIONS_DATA_URL).then(response => response.json()).then(setRandomSkins);

function setRandomSkins(response) {
    // Get only the name of the campions from the response as an array
    var championNames = Object.keys(response.data);

    for (var i = 0; i < skinImages.length; i++) {
        // Get the actual skin img element of the list
        var actualSkin = skinImages[i];

        // Get a new random skin URL
        var randomSkinUrl = getRandomSkinUrl(championNames);

        // Set the new src of the actual skin
        actualSkin.src = randomSkinUrl;
    }
}

function getRandomSkinUrl(championNames) {
    // Get a random index between 0 and the number of current champions
    var randomChampIndex = getRandomNumber(0, championNames.length - 1);

    // Get a random champion name using the random index
    var randomChampName = championNames[randomChampIndex];

    /* We use the variables that we have just defined and set up the URL of the chosen skin
    URL example: http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg */
    return `${SKINS_BASE_URL}${randomChampName}_1.jpg`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// <p> with skin prices.
var stockPrices = document.getElementsByClassName("stockPrices"); // precios base
var newPrices = document.getElementsByClassName("newPrices"); // precios nuevos
var discounts = document.getElementsByClassName("disc"); // numeros del descuento

//Function that calculate the new price of the skins in base of the discount
function getDiscountPrice(price, discount) {
    return Math.floor((price - ((parseInt(discount) * parseInt(price)) / 100)));
}

//Discounts of the skins
for (var i = 0; i < discounts.length; i++) {
    var randomSkinIndex = getRandomNumber(0, SKIN_PRICES.length -1);
    stockPrices[i].textContent = SKIN_PRICES[randomSkinIndex];
    
    discounts[i].textContent = getRandomNumber(MIN_DISCOUNT, MAX_DISCOUNT) + "%";

    var stockPrice = parseInt(stockPrices[i].textContent);
    var discSkin = parseInt(discounts[i].textContent);
    newPrices[i].textContent = getDiscountPrice(stockPrice, discSkin);
}