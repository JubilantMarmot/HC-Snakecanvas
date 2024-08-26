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
// I'll do this in a bit
//document.addEventListener('keydown', changeDirection);

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
