
const submitValue = document.getElementById("submitBox");
const submitButton = document.getElementById("submitButton");

document.addEventListener('DOMContentLoaded', function () {
    submitButton.addEventListener('click', onPress);
});

// The function to run once the user presses the submit button
async function onPress() {
    // Stores the saved value and resets it
    let howOften = Number(submitValue.value);
    submitValue.value = "";
    if (howOften != NaN) {
        submitValue.placeholder = "Thank you!";

        // Saves the time within memory
        chrome.storage.sync.set({ "howOften": howOften });
        // Begins running the dragon
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.tabs.sendMessage(tab.id, { type: "DRAGON" });
        });

    } else {
        submitValue.placeholder = "Please submit a number";
    }
}


