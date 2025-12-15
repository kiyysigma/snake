// ... (kode sebelumnya tetap sama hingga akhir)

// Fungsi start game
function startGame() {
    if (!currentLevel) {
        alert('Pilih level dulu!');
        return;
    }
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

// ... (kode setelahnya tetap sama)

// Event listener
easyBtn.addEventListener('click', () => selectLevel('easy'));
normalBtn.addEventListener('click', () => selectLevel('normal'));
hardBtn.addEventListener('click', () => selectLevel('hard'));
startBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', backToMenu);

// Inisialisasi awal
loadHighScore();
selectLevel('normal');  // Set level default ke Normal, sehingga tombol Start langsung aktif
generateFood();
