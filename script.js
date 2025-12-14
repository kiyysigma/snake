const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');  // Referensi tombol

const gridSize = 20; // Ukuran setiap segmen
const tileCount = canvas.width / gridSize; // Jumlah tile (20x20)

let snake = [{x: 10, y: 10}]; // Posisi awal ular
let food = {x: 15, y: 15}; // Posisi awal makanan
let dx = 0, dy = 0; // Arah gerakan
let score = 0;
let gameRunning = false;  // Flag untuk cek apakah game sedang berjalan

// Fungsi utama game loop
function gameLoop() {
    if (!gameRunning) return;  // Hentikan jika game tidak berjalan
    moveSnake();
    if (checkCollision()) {
        alert('Game Over! Skor: ' + score);
        resetGame();
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
    if (!gameRunning) return;  // Hanya respon jika game berjalan
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    else if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    else if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

// Fungsi start game
function startGame() {
    if (gameRunning) return;  // Mencegah start ulang
    gameRunning = true;
    startBtn.disabled = true;  // Nonaktifkan tombol setelah start
    startBtn.textContent = 'Game Running...';  // Ubah teks tombol
    generateFood();  // Pastikan makanan ada
    gameLoop();  // Mulai loop
}

// Reset game
function resetGame() {
    snake = [{x: 10, y: 10}];
    dx = 0; dy = 0;
    score = 0;
    scoreElement.textContent = 'Skor: 0';
    gameRunning = false;
    startBtn.disabled = false;  // Aktifkan tombol lagi
    startBtn.textContent = 'Start Game';  // Reset teks
    generateFood();
}

// Event listener untuk tombol start
startBtn.addEventListener('click', startGame);

// Inisialisasi awal (tanpa mulai game)
generateFood();
