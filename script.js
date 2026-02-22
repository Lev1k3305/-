// 1. Вход и запуск музыки
startBtn.addEventListener('click', () => {
    audio.volume = 0.4; // Громкость 40%
    audio.play();

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 1500);
});

// 2. Сбор данных и финал
document.getElementById('sendBtn').addEventListener('click', async () => {
    const opinion = document.getElementById('opinion').value;
    const attraction = document.querySelector('input[name="attr"]:checked')?.value;

    if (!opinion || !attraction) {
        alert("Пожалуйста, заполни поля, мне это важно...");
        return;
    }

    const btn = document.getElementById('sendBtn');
    btn.innerText = "Записываю в память...";
    btn.disabled = true;

    // ДАННЫЕ ДЛЯ ОТПРАВКИ
    const data = {
        opinion: opinion,
        attraction: attraction,
        time: new Date().toLocaleString('ru-RU')
    };

    // ТВОЙ URL ИЗ GOOGLE APPS SCRIPT
    const scriptURL = 'ВСТАВЬ_СЮДА_СВОЮ_ССЫЛКУ';

    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.log("Error sending data");
    }

    // Показываем подарок
    document.getElementById('formSection').classList.add('hidden');
    document.getElementById('gift').classList.remove('hidden');
    
    // Эффект конфетти
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb86fc', '#ffffff']
    });
});
