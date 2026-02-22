const audio = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const sendBtn = document.getElementById('sendBtn');

// Запуск при клике
startBtn.addEventListener('click', () => {
    audio.volume = 0.5; // Сделаем чуть погромче для атмосферы
    
    // Пробуем играть
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Музыка пошла!");
        }).catch(error => {
            console.log("Браузер заблокировал автоплей: ", error);
        });
    }

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
    }, 1000);
});

// Отправка данных
sendBtn.addEventListener('click', async () => {
    const opinion = document.getElementById('opinion').value;
    const attraction = document.querySelector('input[name="attr"]:checked')?.value;

    if (!opinion || !attraction) {
        alert("Пожалуйста, ответь на вопросы, это важно для меня...");
        return;
    }

    sendBtn.innerText = "Записываю в память...";
    sendBtn.disabled = true;

    // СЮДА ВСТАВЬ ССЫЛКУ ИЗ GOOGLE SCRIPTS
    const scriptURL = 'ВСТАВЬ_СЮДА_URL';
    
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
        colors: ['#ffb6c1', '#ffffff', '#ff8fa3']
    });
});
