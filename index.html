const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const gameOverText = document.getElementById('gameOverText');
const finalScore = document.getElementById('finalScore');
const finalHighScore = document.getElementById('finalHighScore');
const backBtn = document.getElementById('backBtn');

const gridSize = 20; // Ukuran setiap segmen
const tileCount = canvas.width / gridSize; // Jumlah tile (20x20)

let snake = [{x: 10, y: 10}]; // Posisi awal ular
let food = {x: 15, y: 15}; // Posisi awal makanan
let dx = 0, dy = 0; // Arah gerakan
let score = 0;
let highScore = 0; // Variabel untuk high score
let gameRunning = false;

// Fungsi load high score dari localStorage
function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
        highScore = parseInt(saved);
        highScoreElement.textContent = 'High Score: ' + highScore;
    }
}

// Fungsi save high score ke localStorage
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = 'High Score: ' + highScore;
    }
}

// Fungsi utama game loop
function gameLoop() {
    if (!gameRunning) return;
    moveSnake();
    if (checkCollision()) {
        saveHighScore();  // Update high score saat game over
        showGameOver();  // Tampilkan overlay game over
        return;
    }
    if (eatFood()) {
        score++;
        scoreElement.textContent = 'Skor: ' + score;
        generateFood();
        growSnake();
    }
    draw();
    setTimeout(gameLoop, 100); // Kecepatan game (ms)
}

// Gerakkan ular
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

// Periksa collision
function checkCollision() {
    const head = snake[0];
    // Nabrak dinding
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return true;
    // Nabrak badan sendiri
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

// Periksa makan makanan
function eatFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

// Tambah panjang ular
function growSnake() {
    const tail = snake[snake.length - 1];
    snake.push({x: tail.x, y: tail.y});
}

// Generate makanan baru
function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Pastikan tidak di badan ular
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Gambar canvas
function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gambar ular
    ctx.fillStyle = '#000';
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
    
    // Gambar makanan
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Kontrol keyboard
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    else if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    else if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

// Fungsi start game
function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    startBtn.disabled = true;
    startBtn.textContent = 'Game Running...';
    // Transisi: Sembunyikan menu, tampilkan canvas
    menu.classList.add('hidden');
    canvas.classList.add('active');
    generateFood();
    gameLoop();
}

// Fungsi tampilkan game over
function showGameOver() {
    gameRunning = false;
    finalScore.textContent = score;
    finalHighScore.textContent = highScore;
    gameOverOverlay.classList.remove('hidden');
}

// Fungsi kembali ke menu
function backToMenu() {
    gameOverOverlay.classList.add('hidden');
    canvas.classList.remove('active');
    menu.classList.remove('hidden');
    resetGame();
}

// Reset game
function resetGame() {
    snake = [{x: 10, y: 10}];
    dx = 0; dy = 0;
    score = 0;
    scoreElement.textContent = 'Skor: 0';
    gameRunning = false;
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';
    generateFood();
}

// Event listener
startBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', backToMenu);

// Inisialisasi awal
loadHighScore();
generateFood();
