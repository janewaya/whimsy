
// The images used within the program
const assestsURLMap = {
    "dragon": chrome.runtime.getURL("assets/DRAGON.gif"),
    "other_dragon": chrome.runtime.getURL("assets/DRAGON(1).gif"),
    "heart": chrome.runtime.getURL("assets/Heart.gif")
}

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
        dragon.src = assestsURLMap.other_dragon;

        dragon.style.left = -200 + "px";
        dragon.addEventListener("click", () => {onPetLeft(dragon.id)});

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
    } else if (whichDragon == 1) {
        dragon.src = assestsURLMap.dragon;
        dragon.addEventListener("click", () => {onPetRight(dragon.id)});
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

    dragon.remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTime() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["howOften"], (results) => {
            resolve(results["howOften"] || 60);
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