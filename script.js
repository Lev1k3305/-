const audio = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const musicToggle = document.getElementById('musicToggle');
const overlay = document.getElementById('overlay');
const sendBtn = document.getElementById('sendBtn');

// Изначально громкость 50%
audio.volume = 0.5;

// Кнопка на главном экране
startBtn.addEventListener('click', () => {
    audio.play().catch(() => console.log("Нужен повторный клик по кнопке Play"));
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
    }, 1000);
});

// Кнопка управления внутри карточки
musicToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicToggle.innerText = "⏸ Pause";
    } else {
        audio.pause();
        musicToggle.innerText = "▶ Play";
    }
});

// Финал
sendBtn.addEventListener('click', async () => {
    const opinion = document.getElementById('opinion').value;
    const attraction = document.querySelector('input[name="attr"]:checked')?.value;

    if (!opinion || !attraction) {
        alert("Пожалуйста, ответь на вопросы...");
        return;
    }

    sendBtn.innerText = "Отправляю...";
    
    // Сюда вставь URL скрипта
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzT_TPIrTy6U9wkVr_Q_d-U6em7AKRJ5_wwbhlRZF226yn8GRs9N0y1wrc-5DqIr-8n/exec';
    
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ opinion, attraction, date: new Date().toLocaleString() })
        });
    } catch (e) {}

    document.getElementById('formSection').classList.add('hidden');
    document.getElementById('giftSection').classList.remove('hidden');

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6c1', '#ffffff']
    });
});

