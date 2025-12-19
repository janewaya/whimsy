
// The images used within the program
const assestsURLMap = {
    "re_dragon": chrome.runtime.getURL("assets/RE_DRAGON.gif"),
    "re_other_dragon": chrome.runtime.getURL("assets/RE_DRAGON1.gif"),
    "og_dragon": chrome.runtime.getURL("assets/OG_DRAGON.gif"),
    "og_other_dragon": chrome.runtime.getURL("assets/OG_DRAGON1.gif"),
    "ye_dragon": chrome.runtime.getURL("assets/YE_DRAGON.gif"),
    "ye_other_dragon": chrome.runtime.getURL("assets/YE_DRAGON1.gif"),
    "gr_dragon": chrome.runtime.getURL("assets/GR_DRAGON.gif"),
    "gr_other_dragon": chrome.runtime.getURL("assets/GR_DRAGON1.gif"),
    "bl_dragon": chrome.runtime.getURL("assets/BL_DRAGON.gif"),
    "bl_other_dragon": chrome.runtime.getURL("assets/BL_DRAGON1.gif"),
    "in_dragon": chrome.runtime.getURL("assets/IN_DRAGON.gif"),
    "in_other_dragon": chrome.runtime.getURL("assets/IN_DRAGON1.gif"),
    "pu_dragon": chrome.runtime.getURL("assets/PU_DRAGON.gif"),
    "pu_other_dragon": chrome.runtime.getURL("assets/PU_DRAGON1.gif"),
    "heart": chrome.runtime.getURL("assets/Heart.gif")
}

const dragonLeftArray = [
    assestsURLMap.re_dragon,
    assestsURLMap.og_dragon,
    assestsURLMap.ye_dragon,
    assestsURLMap.gr_dragon,
    assestsURLMap.bl_dragon,
    assestsURLMap.pu_dragon,
    assestsURLMap.in_dragon,
]

const dragonRightArray = [
    assestsURLMap.re_other_dragon,
    assestsURLMap.og_other_dragon,
    assestsURLMap.ye_other_dragon,
    assestsURLMap.gr_other_dragon,
    assestsURLMap.bl_other_dragon,
    assestsURLMap.pu_other_dragon,
    assestsURLMap.in_other_dragon,
]

let dragonIdCur = 0;

// If the user submits an API key, open the chatbox
chrome.runtime.onMessage.addListener((req, _sender) => {
    if (req.type = "DRAGON") {
        startDragon();
    }
});

// When the window loads, insert a small popup in the corner of ones screen
window.addEventListener("load", startDragon);



// Creates the dragon
async function startDragon() {
    let howOften = 0;
    howOften = await getTime()

    console.log(howOften);

    while (howOften != 0) {
        let nextOccurance = Math.floor(Math.random() * howOften);
        let waitTime = howOften - nextOccurance;

        await sleep(nextOccurance * 60 * 1000).then(dragonFlight);

        await sleep(waitTime * 60 * 1000);

    }
}

async function dragonFlight() {

    let whichDragon = Math.floor(Math.random() * 2);
    let dragonColor = Math.floor(Math.random() * 6);
    const dragon = document.createElement("img");
    dragon.id = "dragon" + dragonIdCur;
    dragonIdCur++;
    dragon.style.cursor = 'grab';
    dragon.style.zIndex = '50';
    dragon.style.position = 'absolute';
    let height = window.innerHeight * 2 / 3;
    let addHeight = (window.innerHeight - height) / 2;
    let positionY = Math.floor(Math.random() * height) + addHeight;

    dragon.style.top = positionY + "px";
    dragon.style.width = 200 + "px";
    dragon.style.height = 200 + "px";

    if (whichDragon == 0) {
        flyRight(dragon, dragonRightArray[dragonColor]);
    } else if (whichDragon == 1) {
        flyLeft(dragon, dragonLeftArray[dragonColor]);
    }

    dragon.remove();
}

async function flyRight(dragon, right) {
    dragon.src = right;

    dragon.style.left = -200 + "px";
    dragon.addEventListener("click", () => { onPetLeft(dragon.id) });

    document.body.append(dragon);

    while (parseInt(dragon.style.left) <= window.innerWidth) {

        let newY = Math.floor(Math.random() * 3);

        if (newY == 0) {
            dragon.style.top = parseInt(dragon.style.top) - 3 + "px";
        } else if (newY == 1) {
            dragon.style.top = parseInt(dragon.style.top) + 3 + "px";
        }

        dragon.style.left = parseInt(dragon.style.left) + 2 + "px";

        dragon.remove();
        document.body.append(dragon);

        await sleep(100);
    };
}

async function flyLeft(dragon, left) {
    dragon.src = left;
    dragon.addEventListener("click", () => { onPetRight(dragon.id) });
    dragon.style.right = -200 + "px";

    document.body.append(dragon);

    while (parseInt(dragon.style.right) <= window.innerWidth) {

        let newY = Math.floor(Math.random() * 3);

        if (newY == 0) {
            dragon.style.top = parseInt(dragon.style.top) - 3 + "px";
        } else if (newY == 1) {
            dragon.style.top = parseInt(dragon.style.top) + 3 + "px";
        }

        dragon.style.right = parseInt(dragon.style.right) + 2 + "px";

        dragon.remove();
        document.body.append(dragon);

        await sleep(100);
    };
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTime() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["howOften"], (results) => {
            resolve(results["howOften"] || 0);
        });
    });
}

async function onPetLeft(dragonId) {
    const dragon = document.getElementById(dragonId);
    dragon.style.cursor = 'grabbing';
    setTimeout(() => {
        dragon.style.cursor = 'grab';
    }, 200);

    const heart = document.createElement("img");
    heart.src = assestsURLMap.heart;
    heart.style.zIndex = '51';
    heart.style.position = 'absolute';

    heart.style.top = parseInt(dragon.style.top) + 40 + "px";
    heart.style.left = parseInt(dragon.style.left) + 160 + "px";
    heart.style.width = 50 + "px";
    heart.style.height = 50 + "px";
    document.body.append(heart);

    for (let i = 0; i < 50; i++) {

        heart.style.left = parseInt(heart.style.left) + 2 + "px";
        heart.style.top = parseInt(heart.style.top) - 0.5 + "px";

        heart.remove();
        document.body.append(heart);

        await sleep(100);
    }
    heart.remove();
}

async function onPetRight(dragonId) {
    const dragon = document.getElementById(dragonId);
    dragon.style.cursor = 'grabbing';
    setTimeout(() => {
        dragon.style.cursor = 'grab';
    }, 200);

    const heart = document.createElement("img");
    heart.src = assestsURLMap.heart;
    heart.style.zIndex = '51';
    heart.style.position = 'absolute';

    heart.style.top = parseInt(dragon.style.top) + 40 + "px";
    heart.style.right = parseInt(dragon.style.right) + 160 + "px";
    heart.style.width = 50 + "px";
    heart.style.height = 50 + "px";
    document.body.append(heart);

    for (let i = 0; i < 50; i++) {

        heart.style.right = parseInt(heart.style.right) + 2 + "px";
        heart.style.top = parseInt(heart.style.top) - 0.5 + "px";

        heart.remove();
        document.body.append(heart);

        await sleep(100);
    }
    heart.remove();
}