const MAX_BLUE_ESSENCE = 20000;
const MAX_RIOT_POINTS = 5000;

var blueEssence = document.getElementById('blue_essence');
var riotPoints = document.getElementById('riot_points');

blueEssence.innerText = getRandomNumber(MAX_BLUE_ESSENCE);
riotPoints.innerText = getRandomNumber(MAX_RIOT_POINTS);

function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}