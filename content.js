let reels = [];
let currentIndex = 0;

// Function to select all reels
function updateReels() {
    reels = document.querySelectorAll('div.x1qjc9v5.x9f619.x78zum5.xg7h5cd');
    console.log(`Found ${reels.length} reels`);
}

// Function to move to the next reel
function goToReel(index) {
    if (reels.length === 0) {
        updateReels();
    }

    if (index < 0) index = 0;
    if (index >= reels.length) index = reels.length - 1;

    reels[index].scrollIntoView({ behavior: "smooth", block: "center" });
    console.log(`Scrolled to reel ${index}`);
    currentIndex = index;
}

// Polling for gamepad input
function checkGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    for (let i = 0; i < gamepads.length; i++) {
        const gp = gamepads[i];
        if (!gp) continue;

        // Example: Use D-Pad up/down
        const dpadUp = gp.buttons[12]?.pressed;
        const dpadDown = gp.buttons[13]?.pressed;

        if (dpadDown) {
            goToReel(currentIndex + 1);
        }

        if (dpadUp) {
            goToReel(currentIndex - 1);
        }
    }
}

// Re-run reel search when DOM changes (in case new reels load)
const observer = new MutationObserver(() => {
    updateReels();
});

observer.observe(document.body, { childList: true, subtree: true });

// Start the gamepad polling loop
setInterval(checkGamepad, 100);  // Adjust delay if needed

// Initial reels load
updateReels();
goToReel(currentIndex);
