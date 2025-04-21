// <Скрипт для исправления SEO-ошибок META тегов>
const SEOMetaManager = {
    // Настройки модулей
    modules: {
        missing: {
            status: true,
            settings: {
                defaultDomain: 'example.com',
                suffixTitle: ' | Title',
                suffixH1: ' | H1',
                suffixDesc: ' | Desc',
            },
        },
        equality: {
            status: true,
            settings: {
                titleSuffix: ' | Title',
                descSuffix: ' | Description',
            },
        },
        length: {
            status: false,
            settings: {
                titleMin: 30,
                titleMax: 60,
                descMin: 50,
                descMax: 160,
                filler: '_',
            },
        },
    },

    // Инициализация
    init: function() {
        console.log('Initializing SEO Meta Manager');
        console.log('Processing order: Missing -> Equality -> Length');
        console.log('Modules status:', this.modules);

        // Последовательная обработка модулей
        if (this.modules.missing.status) this.handleMissingMeta();
        if (this.modules.equality.status) this.handleEquality();
        if (this.modules.length.status) this.handleLength();
    },

    // Модуль отсутствия меты
    handleMissingMeta: function() {
        const s = this.modules.missing.settings;
        const len = this.modules.length.settings;

        // Актуальные значения на момент выполнения
        let currentTitle = document.title;
        let currentDesc = document.querySelector('meta[name="description"]')?.content || '';
        let currentH1 = document.querySelector('h1')?.textContent.trim() || '';

        // Title
        if (!currentTitle.trim()) {
            const source = currentH1 || currentDesc;
            currentTitle = source 
                ? this.adjustTextLength(source, len.titleMin, len.titleMax, len.filler) + s.suffixTitle
                : `Title | ${s.defaultDomain}`;
            document.title = currentTitle;
        }

        // H1
        if (!currentH1) {
            const source = document.title || currentDesc;
            let newH1;
            if (source) {
                const min = (source === document.title) ? len.titleMin : len.descMin;
                const max = (source === document.title) ? len.titleMax : len.descMax;
                newH1 = this.adjustTextLength(source, min, max, len.filler) + s.suffixH1;
            } else {
                newH1 = `H1 | ${s.defaultDomain}`;
            }
            const h1 = document.createElement('h1');
            h1.textContent = newH1;
            h1.style.display = 'none';
            document.body.prepend(h1);
            currentH1 = newH1; // Обновляем значение для последующих модулей
        }

        // Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc || !currentDesc.trim()) {
            const source = document.title || currentH1;
            let newDesc = source 
                ? this.adjustTextLength(source, len.descMin, len.descMax, len.filler) + s.suffixDesc
                : `Description | ${s.defaultDomain}`;
            
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = newDesc;
        }
    },

    // Модуль равенства
    handleEquality: function() {
        const s = this.modules.equality.settings;

        // Актуальные значения после обработки модуля Missing
        const currentTitle = document.title;
        const currentH1 = document.querySelector('h1')?.textContent.trim() || '';
        const metaDesc = document.querySelector('meta[name="description"]');
        let currentDesc = metaDesc?.content || '';
        let descModified = false;

        // Title == H1
        if (currentTitle === currentH1) {
            document.title = currentTitle + s.titleSuffix;
        }

        // Title == Description
        if (currentTitle === currentDesc && !descModified) {
            currentDesc += s.descSuffix;
            descModified = true;
            if (metaDesc) metaDesc.content = currentDesc;
        }

        // Description == H1
        if (currentDesc === currentH1 && !descModified) {
            currentDesc += s.descSuffix;
            if (metaDesc) metaDesc.content = currentDesc;
        }
    },

    // Модуль длины
    handleLength: function() {
        const s = this.modules.length.settings;

        // Корректировка Title
        let currentTitle = document.title;
        const newTitle = this.adjustTextLength(currentTitle, s.titleMin, s.titleMax, s.filler);
        if (newTitle !== currentTitle) document.title = newTitle;

        // Корректировка Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            let currentDesc = metaDesc.content;
            const newDesc = this.adjustTextLength(currentDesc, s.descMin, s.descMax, s.filler);
            if (newDesc !== currentDesc) metaDesc.content = newDesc;
        }
    },

    // Утилита для корректировки длины
    adjustTextLength: function(text, min, max, filler) {
        let adjusted = text.slice(0, max);
        if (adjusted.length < min) adjusted += filler.repeat(min - adjusted.length);
        return adjusted;
    },
};

// Запуск
document.addEventListener('DOMContentLoaded', () => SEOMetaManager.init());
// </Скрипт для исправления SEO-ошибок META тегов>