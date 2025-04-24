// <Скрипт для alt и title атрибутов img>
const ImageAttributeSetter2 = {
    words: [
        "пример", "тест", "изображение", "фото", 
        "иллюстрация", "картинка", "дизайн", "концепция"
    ],
    
    // Настройки
    mode: "dynamic",  // "random" или "dynamic"
    tagLength: null,  // Число или null для автоопределения
    
    // Генератор псевдослучайных чисел
    PRNG: class {
        constructor(seed) {
            this.seed = seed;
        }
        
        next() {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280;
        }
    },
    
    // Хеш-функция для строки
    stringToSeed(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    },
    
    // Расчет seed для изображения
    getSeed(index) {
        return Math.abs(parseInt(this.stringToSeed(window.location.pathname + index)));
    },
    
    // Автоматический расчет длины тега
    calculateAutoTagLength() {
        const imagesCount = document.querySelectorAll('img').length;
        const wordsCount = this.words.length;
        return Math.max(1, Math.floor(imagesCount / wordsCount));
    },
    
    // Генерация тега для dynamic режима
    getDynamicTag(index, length) {
        const prng = new this.PRNG(this.getSeed(index));
        const result = Array.from({length}, () => {
            const randomValue = prng.next();
            return this.words[Math.floor(randomValue * this.words.length)];
        }).join(' ');
        // console.log("mt", this.stringToSeed(window.location.pathname + index), this.getSeed(index), Math.floor(prng.next()),Math.floor(prng.next() * this.words.length));
        return result;
    },
    
    // Генерация тега для random режима
    getRandomTag(length) {
        return Array.from({length}, () => 
            this.words[Math.floor(Math.random() * this.words.length)]
        ).join(' ');
    },
    
    // Установка атрибутов
    setAltAttributes() {
        const imgs = document.querySelectorAll('img');
        const length = this.tagLength ?? this.calculateAutoTagLength();
        let counter = 0;
        
        imgs.forEach((img, index) => {
            const value = this.mode === "dynamic" 
                ? this.getDynamicTag(index, length) 
                : this.getRandomTag(length);
            
            if (img.getAttribute('alt') == '' || img.getAttribute('alt') == null) {
                // console.log("alt",img.getAttribute('alt'));
                img.setAttribute('alt', value);
                counter++;
            }
        });
        
        console.log(`Установлено alt тегов: ${counter}`);
    },
    
    setTitleAttributes() {
        const imgs = document.querySelectorAll('img');
        const length = this.tagLength ?? this.calculateAutoTagLength();
        let counter = 0;
        
        imgs.forEach((img, index) => {
            const value = this.mode === "dynamic" 
                ? this.getDynamicTag(index, length) 
                : this.getRandomTag(length);
            
            if (img.getAttribute('title') == '' || img.getAttribute('title') == null) {
                // console.log("title",img.getAttribute('title'));
                img.setAttribute('title', value);
                counter++;
            }
        });
        
        console.log(`Установлено title тегов: ${counter}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ImageAttributeSetter2.setAltAttributes();
    ImageAttributeSetter2.setTitleAttributes();
});
 // </Скрипт для alt и title атрибутов img>