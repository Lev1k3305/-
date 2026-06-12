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
    document.getElementById('mainContent').classList.remove('hidden');
    setTimeout(() => {
        overlay.style.display = 'none';
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
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxTQkdrRENCfnXzZxFt_YE08F0wrk2aoxqFGMViLI0Zy-foRh8TmRabjluVlOUQ5mo6/exec';

    // Optimistically update UI
    document.getElementById('formSection').classList.add('hidden');
    document.getElementById('giftSection').classList.remove('hidden');

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6c1', '#ffffff']
    });

    try {
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            keepalive: true,
            body: JSON.stringify({ opinion, attraction, date: new Date().toLocaleString() })
        });
    } catch (e) {}
});
