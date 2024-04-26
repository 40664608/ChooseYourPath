// Start the game from the first scene
function startGame() {
    window.location.href = "scene1.html";
}

// Save game progress
function saveGame() {
    const currentScene = window.location.href;
    const gameProgress = { currentScene };

    localStorage.setItem("gameProgress", JSON.stringify(gameProgress));
    alert("Game progress saved!");
}

// Resume game from the last saved progress
function resumeGame() {
    const savedProgress = localStorage.getItem("gameProgress");

    if (savedProgress) {
        const gameProgress = JSON.parse(savedProgress);
        window.location.href = gameProgress.currentScene; // Resume from last saved scene
    } else {
        alert("No saved game found.");
    }
}

// Restart the game with confirmation
function restartGame() {
    if (confirm("Are you sure you want to restart the game? All progress will be lost.")) {
        localStorage.removeItem("gameProgress"); // Clear saved progress
        window.location.href = "index.html"; // Return to the start
    }
}

// Check if the "Resume" button should be visible based on saved progress
function checkResumeButton() {
    const savedProgress = localStorage.getItem("gameProgress");
    const resumeButton = document.getElementById("resumeButton");

    if (resumeButton) {
        resumeButton.style.display = savedProgress ? "inline" : "none"; //
    }
}

function submitFeedback(event) {
    event.preventDefault();

    const feedbackText = document.getElementById("feedback").value.trim();
    const ratingValue = document.getElementById("rating").value;

    if (feedbackText === "") {
        alert("Please enter feedback before submitting.");
        return;
    }

    console.log("Feedback:", feedbackText, "Rating:", ratingValue);

    // Reset form after submission
    document.getElementById("feedback").value = "";
    document.getElementById("rating").value = "1";

    alert("Thank you for your feedback!");
}

function saveCharacter(event) {
    event.preventDefault();

    const characterName = document.getElementById("characterName").value.trim();
    const characterGender = document.getElementById("characterGender").value;

    if (characterName === "") {
        alert("Please enter a valid character name.");
        return;
    }

    localStorage.setItem("characterName", characterName);
    localStorage.setItem("characterGender", characterGender);

    alert("Character customization saved!");
}

function getAchievements() {
    const defaultAchievements = {
        exitForest: false,
        getEatenByCrocodile: false,
        surviveDangerousCreature: false,
        findHiddenPath: false,
    };

    const existingAchievements = JSON.parse(localStorage.getItem("achievements"));
    return { ...defaultAchievements, ...existingAchievements };
}

function setAchievements(achievements) {
    localStorage.setItem("achievements", JSON.stringify(achievements));
}

function unlockAchievement(achievementName) {
    const achievements = getAchievements();
    achievements[achievementName] = true; // Mark the achievement as completed
    setAchievements(achievements);

    console.log(`Achievement unlocked: ${achievementName}`);
}

// Check if an achievement is unlocked
function isAchievementUnlocked(achievementName) {
    const achievements = getAchievements();
    return achievements[achievementName] === true; // Return true if the achievement is unlocked
}