const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const step1 = document.getElementById('step-1');
const inviteForm = document.getElementById('inviteForm');
const successMessage = document.getElementById('successMessage');

// 1. Убегающая кнопка "Нет"
const moveButton = () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Чтобы не кликнуло случайно на мобиле
    moveButton();
});

// Если нажала на "Нет" (через confirm)
noBtn.addEventListener('click', () => {
    if (confirm("Точно нет? 🥺")) {
        if (confirm("А если подумать?")) {
            alert("Попробуй нажать левую кнопку!");
        }
    }
});

// 2. Переход к выбору
yesBtn.addEventListener('click', () => {
    step1.style.display = 'none';
    inviteForm.style.display = 'block';
});

// 3. Финальная отправка
inviteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const choice = document.getElementById('choice').value;
    
    // ВСТАВЬ СВОЙ URL ИЗ GOOGLE APPS SCRIPT НИЖЕ
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwT4MpSDDREfEWTJbTKQdRIeJOZgbnmhHMBqUW0jaQF3iYrUViP1YZCrIIlnJ8cBvLW/exec'; 

    const submitBtn = inviteForm.querySelector('button');
    submitBtn.innerText = 'Секундочку...';
    submitBtn.disabled = true;

    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                answer: 'Да',
                choice: choice,
                date: new Date().toLocaleString('ru-RU')
            })
        });
    } catch (err) {
        console.log('Error bypass for no-cors');
    }

    // Показываем успех в любом случае
    inviteForm.style.display = 'none';
    successMessage.style.display = 'block';

    // Запуск конфетти!
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff7675', '#fab1a0', '#fd79a8']
    });
});