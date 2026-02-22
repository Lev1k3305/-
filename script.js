const audio = document.getElementById('bgMusic');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const sendBtn = document.getElementById('sendBtn');

// Нажатие на розовую кнопку "Нажми меня"
startBtn.addEventListener('click', () => {
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Музыка не смогла загрузиться"));

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
    }, 1000);
});

sendBtn.addEventListener('click', async () => {
    const opinion = document.getElementById('opinion').value;
    const attraction = document.querySelector('input[name="attr"]:checked')?.value;

    if (!opinion || !attraction) {
        alert("Пожалуйста, поделись мыслями...");
        return;
    }

    sendBtn.innerText = "Отправляю...";
    
    // Сюда вставь ссылку из Google Apps Script
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
        colors: ['#ffb6c1', '#ffffff']
    });
});


