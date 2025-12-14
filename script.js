const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
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
let touchStartX = 0, touchStartY = 0;  // Untuk swipe

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
        saveHighScore();
        showGameOver();
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

// Gambar canvas (update untuk desain baru)
function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gambar ular dengan desain bulat telur dan gradien
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        const radiusX = gridSize / 2;  // Lebar oval
        const radiusY = gridSize / 2.5;  // Tinggi oval (lebih pendek untuk telur)
        
        // Gradien hijau (muda ke tua)
        const gradient = ctx.createLinearGradient(x, y, x + gridSize, y + gridSize);
        gradient.addColorStop(0, '#90EE90');  // Hijau muda
        gradient.addColorStop(1, '#228B22');  // Hijau tua
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(x + radiusX, y + radiusY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Outline hitam tipis
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Gambar apel dengan desain lingkaran dan tangkai
    const foodX = food.x * gridSize + gridSize / 2;
    const foodY = food.y * gridSize + gridSize / 2;
    const radius = gridSize / 2.5;  // Radius lingkaran
    
    // Lingkaran merah
    ctx.fillStyle = '#FF0000';  // Merah
    ctx.beginPath();
    ctx.arc(foodX, foodY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Tangkai hijau
    ctx.strokeStyle = '#008000';  // Hijau
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(foodX, foodY - radius);
    ctx.lineTo(foodX, foodY - radius - 8);  // Tangkai panjang 8px
    ctx.stroke();
    
    // Daun kecil di samping tangkai
    ctx.fillStyle = '#32CD32';  // Hijau terang
    ctx.beginPath();
    ctx.ellipse(foodX + 2, foodY - radius - 4, 3, 5, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
}

// Kontrol keyboard (untuk desktop)
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
    else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    else if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
    else if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

// Kontrol tombol virtual (untuk mobile)
upBtn.addEventListener('click', () => { if (gameRunning && dy === 0) { dx = 0; dy = -1; } });
downBtn.addEventListener('click', () => { if (gameRunning && dy === 0) { dx = 0; dy = 1; } });
leftBtn.addEventListener('click', () => { if (gameRunning && dx === 0) { dx = -1; dy = 0; } });
rightBtn.addEventListener('click', () => { if (gameRunning && dx === 0) { dx = 1; dy = 0; } });

// Kontrol swipe (untuk mobile)
canvas.addEventListener('touchstart', (e) => {
    if (!gameRunning) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const threshold = 50;  // Minimal geser 50px

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Geser horizontal
        if (diffX > threshold && dx === 0) { dx = 1; dy = 0; }  // Kanan
        else if (diffX < -threshold && dx === 0) { dx = -1; dy = 0; }  // Kiri
    } else {
        // Geser vertikal
        if (diffY > threshold && dy === 0) { dx = 0; dy = 1; }  // Bawah
        else if (diffY < -threshold && dy === 0) { dx = 0; dy = -1; }  // Atas
    }
});

// Fungsi start game
function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    startBtn.disabled = true;
    startBtn.textContent = 'Game Running...';
    menu.classList.add('hidden');
    canvas.classList.add('active');
    controls.classList.remove('hidden');  // Tampilkan kontrol (hanya di mobile)
    generateFood();
    gameLoop();
}

// Fungsi tampilkan game over
function showGameOver() {
    gameRunning = false;
    finalScore.textContent = score;
    finalHighScore.textContent = highScore;
    gameOverOverlay.classList.remove('hidden');
    controls.classList.add('hidden');
}

// Fungsi kembali ke menu
function backToMenu() {
    gameOverOverlay.classList.add('hidden');
    canvas.classList.remove('active');
    menu.classList.remove('hidden');
    controls.classList.add('hidden');
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
