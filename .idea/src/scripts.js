function startGame() {
    // Start from the first scene in the 'scenes' folder
    window.location.href = "scenes/scene1.html";
}

function saveGame() {
    const gameProgress = {
        currentScene: "scenes/scene1.html",
    };

    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    alert("Game progress saved!");
}

function resumeGame() {
    const savedProgress = localStorage.getItem('gameProgress');

    if (savedProgress) {
        const gameProgress = JSON.parse(savedProgress);
        window.location.href = gameProgress.currentScene; // Resume from last saved scene
    } else {
        alert("No saved game found.");
    }
}

function restartGame() {
    if (confirm("Are you sure you want to restart the game? All progress will be lost.")) {
        localStorage.removeItem('gameProgress'); // Clear saved progress
        window.location.href = "index.html"; // Return to the start
    }
}

function checkResumeButton() {
    const savedProgress = localStorage.getItem('gameProgress'); // Check for saved progress
    const resumeButton = document.getElementById("resumeButton");

    if (savedProgress) {
        resumeButton.style.display = "inline"; // Show 'Resume' button if progress exists
    } else {
        resumeButton.style.display = "none"; // Hide otherwise
    }
}

function submitFeedback(event) {
    event.preventDefault();

    const feedbackText = document.getElementById("feedback").value;
    const ratingValue = document.getElementById("rating").value;

    if (feedbackText === "") {
        alert("Please enter feedback before submitting."); // Validation
        return;
    }

    console.log("Feedback:", feedbackText, "Rating:", ratingValue); // Log feedback and rating

    // Clear form after submission
    document.getElementById("feedback").value = "";
    document.getElementById("rating").value = "1";

    alert("Thank you for your feedback!");
}

function saveCharacter(event) {
    event.preventDefault();

    const characterName = document.getElementById("characterName").value;
    const characterGender = document.getElementById("characterGender").value;

    localStorage.setItem("characterName", characterName);
    localStorage.setItem("characterGender", characterGender);

    alert("Character customisation saved!");
}

function getAchievements() {
    return JSON.parse(localStorage.getItem('achievements')) || {
        exitForest: false,
        getEatenByCrocodile: false,
        surviveDangerousCreature: false,
        findHiddenPath: false,
    };
}

function setAchievements(achievements) {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function unlockAchievement(achievementName) {
    const achievements = getAchievements();
    achievements[achievementName] = true; // Mark the achievement as completed
    setAchievements(achievements); // Save updated achievements to local storage
}

function isAchievementUnlocked(achievementName) {
    const achievements = getAchievements();
    return achievements[achievementName] === true; // Return true if the achievement is unlocked
}