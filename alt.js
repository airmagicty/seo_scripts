// <Скрипт для alt и title атрибутов img>
const ImageAttributeSetter = {
    // Массив слов для alt и title атрибутов
    words: [
        "пример",
        "тест",
        "изображение",
        "фото",
        "иллюстрация",
        "картинка",
        "дизайн",
        "концепция"
    ],

    // Функция для получения случайного слова из массива
    getRandomWord: function() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    },

    // Метод для установки alt атрибутов для всех изображений на странице
    setAltAttributes: function() {
        const imgs = document.querySelectorAll('img');
        let changedCount = 0; // Счетчик измененных alt атрибутов

        imgs.forEach(img => {
            // Проверяем, есть ли у изображения alt атрибут и не пустой ли он
            if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
                // Устанавливаем alt атрибут со случайным словом
                img.setAttribute('alt', this.getRandomWord());
                changedCount++; // Увеличиваем счетчик измененных атрибутов
            }
        });

        // Выводим сообщение в консоль о количестве измененных alt тегов
        console.log(`Изменено alt тегов: ${changedCount}`);
    },

    // Метод для установки title атрибутов для всех изображений на странице
    setTitleAttributes: function() {
        const imgs = document.querySelectorAll('img');
        let changedCount = 0; // Счетчик измененных title атрибутов

        imgs.forEach(img => {
            // Проверяем, есть ли у изображения title атрибут и не пустой ли он
            if (!img.hasAttribute('title') || img.getAttribute('title').trim() === '') {
                // Устанавливаем title атрибут со случайным словом
                img.setAttribute('title', this.getRandomWord());
                changedCount++; // Увеличиваем счетчик измененных атрибутов
            }
        });

        // Выводим сообщение в консоль о количестве измененных title тегов
        console.log(`Изменено title тегов: ${changedCount}`);
    }
};

// Вызов методов для установки alt и title атрибутов
document.addEventListener('DOMContentLoaded', function() {
    ImageAttributeSetter.setAltAttributes();
    ImageAttributeSetter.setTitleAttributes();
 }, false);
 // </Скрипт для alt и title атрибутов img>