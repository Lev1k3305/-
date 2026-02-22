const audio = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const sendBtn = document.getElementById('sendBtn');

// Старт: музыка и проявление контента
startBtn.addEventListener('click', () => {
    audio.volume = 0.3; // Тихий фон
    audio.play();
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
    }, 1000);
});

// Отправка и показ обещания
sendBtn.addEventListener('click', async () => {
    const opinion = document.getElementById('opinion').value;
    const attraction = document.querySelector('input[name="attr"]:checked')?.value;

    if (!opinion || !attraction) {
        alert("Заполни поля, чтобы я знал, что ты думаешь...");
        return;
    }

    sendBtn.innerText = "Сохраняю...";
    
    // ТВОЙ URL ИЗ GOOGLE SCRIPTS
    const scriptURL = 'ВСТАВЬ_СЮДА_СВОЮ_ССЫЛКУ';
    
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ opinion, attraction, date: new Date().toLocaleString() })
        });
    } catch (e) {}

    // Смена блоков
    document.getElementById('formSection').classList.add('hidden');
    document.getElementById('giftSection').classList.remove('hidden');

    // Праздничный эффект в розовых тонах
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6c1', '#ffffff', '#ff8fa3']
    });
});

