// <Скрипт для дублирования скрытого h1 из description>
const SEOManager = {
    createH1: function() {
        // Поиск h1 тега
        const h1 = document.querySelector('h1');
        const title = document.title;
        const customText = " | Свой текст";

        // Проверка наличия h1
        if (!h1 || h1.textContent.trim() === '') {
            // Создание h1, если он не найден или пустой
            const newH1 = document.createElement('h1');
            newH1.textContent = title + customText;
            newH1.style.display = 'none'; // Стили для невидимого отображения
            document.body.prepend(newH1); // Добавляем новый h1 в начало body

            console.log('h1 не был найден и был создан: ' + newH1.textContent);
        } else {
            console.log('h1 найден: ' + h1.textContent);
        }
    }
};

// Вызов метода
document.addEventListener('DOMContentLoaded', function() {
    SEOManager.createH1();
 }, false);
// </Скрипт для дублирования скрытого h1 из description>