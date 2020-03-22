const MAX_BLUE_ESSENCE = 20000;
const MAX_RIOT_POINTS = 5000;
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

    /* Get a random number between 0 and 1. This allows us to choose a random skin from a champion, 
    but the minimum amount of skins that all characters have is 2, so we limit it to that number */
    var randomSkinChampIndex = getRandomNumber(0, 1);

    /* We use the variables that we have just defined and set up the URL of the chosen skin
    URL example: http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg */
    return `${SKINS_BASE_URL}${randomChampName}_${randomSkinChampIndex}.jpg`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}