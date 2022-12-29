// Set up canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let playerX = 50;
let playerY = canvas.height - 50;
let playerSpeed = 5;

let alienSpeed = 1.1;
let alienDirection = 1;

let aliens = [];
for (let i = 0; i < 10; i++) {
    aliens.push({
        x: i * 50,
        y: 0,
    });
}


// Set up game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, 20, 20);

    // Draw aliens
    ctx.fillStyle = 'red';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, 20, 20);
    });

    // Move player
    if (input.left) {
        playerX -= playerSpeed;
    }
    if (input.right) {
        playerX += playerSpeed;
    }

    // Move aliens
    aliens.forEach(alien => {
        alien.x += alienSpeed * alienDirection;
    });

    // Check if aliens have reached the edge of the screen
    const rightmostAlien = aliens[aliens.length - 1];
    if (rightmostAlien.x > canvas.width - 20 || aliens[0].x < 0) {
        alienDirection *= -1;
        aliens.forEach(alien => {
            alien.y += 0.01;
        });
    }

    // Request another frame
    requestAnimationFrame(gameLoop);
}

// Set up input tracking
const input = {
    left: false,
    right: false,
};

document.addEventListener('keydown', event => {
    if (event.code === 'ArrowLeft') {
        input.left = true;
    }
    if (event.code === 'ArrowRight') {
        input.right = true;
    }
});
document.addEventListener('keyup', event => {
    if (event.code === 'ArrowLeft') {
        input.left = false;
    }
    if (event.code === 'ArrowRight') {
        input.right = false;
    }
});

// Start game loop
requestAnimationFrame(gameLoop);

