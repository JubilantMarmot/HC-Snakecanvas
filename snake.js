const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Pretty much just put all the varibles here and define them
let snake;
let fruit;
let d;
let isGameOver;

document.addEventListener('keydown', changeDirection);

function setup() {
    snake = []; // Like a stack or queue data structure is what I'm doing, I mean it is a snake that gets bigger :-)
    for (let i = 0; i < 5; i++) {
        snake.push({ x: i, y: 0 });
    }
    fruit = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
    d = { x: 1, y: 0 };
    isGameOver = false;
    gameLoop();
}



function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * scale, part.y * scale, scale, scale);
    });
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x * scale, fruit.y * scale, scale, scale);
}

function moveSnake() {
    const head = { x: snake[0].x + d.x, y: snake[0].y + d.y };
    snake.unshift(head);

    if (head.x === fruit.x && head.y === fruit.y) {
        fruit = { x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) };
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && d.y === 0) {
        d = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && d.y === 0) {
        d = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && d.x === 0) {
        d = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && d.x === 0) {
        d = { x: 1, y: 0 };
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}
function gameLoop() {
    if (isGameOver) return;

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFruit();
        checkCollision();
        gameLoop();
    }, 100);
}
function gameOver() {
    isGameOver = true;
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Sorry game is over', canvas.width / 2 - 70, canvas.height / 2);
}

setup();
