// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the size of each box in the grid
const box = 32;

// Initialize the snake with one segment
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Generate the initial food position randomly
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// Initialize the score
let score = 0;

// Variable to store the direction of the snake
let d;

// Add an event listener for keyboard inputs to change the direction
document.addEventListener("keydown", direction);

// Function to set the direction based on the key pressed
function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Function to check if the snake collides with itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Function to draw everything on the canvas
function draw() {
    // Clear the canvas
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Get the current head position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the head position based on the direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Check if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        // Generate new food position
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Add new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Check for game over conditions
    if (snakeX < 0 || snakeX >= 18 * box || snakeY < 0 || snakeY >= 18 * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Draw the score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Call the draw function every 100 milliseconds
let game = setInterval(draw, 100);