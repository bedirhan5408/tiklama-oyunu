// Değişkenler
let score = 0;
let level = 1;
let timeLeft = 30;
let highScore = 0;
let interval;

// Elementler
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const timerElement = document.getElementById("timer");
const clickButton = document.getElementById("clickButton");
const resetButton = document.getElementById("resetButton");
const highScoreElement = document.getElementById("highScore");

// Ses Efektleri
const clickSound = new Audio("click.mp3");
const resetSound = new Audio("reset.mp3");

// Arka Plan Renkleri
const backgrounds = ["#f4f4f9", "#d4f1f4", "#f7d4f4", "#f4f1d4", "#d4f4d7"];

// Oyunu Kaydet
function saveGame() {
    const gameState = {
        score: score,
        level: level,
        timeLeft: timeLeft,
        highScore: highScore
    };
    localStorage.setItem("clickerGameSave", JSON.stringify(gameState));
}

// Oyunu Yükle
function loadGame() {
    const savedGame = localStorage.getItem("clickerGameSave");
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        score = gameState.score || 0;
        level = gameState.level || 1;
        timeLeft = gameState.timeLeft || 30;
        highScore = gameState.highScore || 0;

        // Ekranı Güncelle
        scoreElement.textContent = score;
        levelElement.textContent = level;
        timerElement.textContent = timeLeft;
        highScoreElement.textContent = highScore;
        document.body.style.backgroundColor = backgrounds[level % backgrounds.length];
    }
}

// Tıklama İşlemi
clickButton.addEventListener("click", () => {
    clickSound.play();

    // Rastgele Bonus Puan (%20 şans)
    let bonus = Math.random() < 0.2 ? 5 : 1;

    // Puan ve Seviye Güncelle
    score += bonus * level;
    scoreElement.textContent = score;

    // Seviye Atla
    if (score >= level * 50) {
        level++;
        levelElement.textContent = level;

        // Arka Plan Rengini Değiştir
        document.body.style.backgroundColor = backgrounds[level % backgrounds.length];
    }

    // Oyunu Kaydet
    saveGame();
});

// Zamanlayıcı
function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            endGame();
        }

        // Oyunu Kaydet
        saveGame();
    }, 1000);
}

// Oyunu Sıfırla
resetButton.addEventListener("click", () => {
    resetSound.play();
    score = 0;
    level = 1;
    timeLeft = 30;

    scoreElement.textContent = score;
    levelElement.textContent = level;
    timerElement.textContent = timeLeft;
    document.body.style.backgroundColor = backgrounds[0];
    clearInterval(interval);
    startTimer();

    // Oyunu Kaydet
    saveGame();
});

// Oyunu Bitir
function endGame() {
    alert(`Oyun Bitti! Toplam Puan: ${score}`);

    // En Yüksek Skoru Güncelle
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }

    // Skoru ve Zamanı Sıfırla
    score = 0;
    level = 1;
    timeLeft = 30;

    scoreElement.textContent = score;
    levelElement.textContent = level;
    timerElement.textContent = timeLeft;
    document.body.style.backgroundColor = backgrounds[0];

    // Oyunu Kaydet
    saveGame();
}

// Oyunu Başlat
loadGame(); // Kaydedilmiş oyunu yükle
startTimer();