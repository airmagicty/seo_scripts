// <Скрипт для исправления SEO-ошибок META тегов>
const SEOManagerV2 = {
    // Настройки модулей
    modules: {
        equality: {
            status: true,
            settings: {
                titleSuffix: '| Title',
                descSuffix: '| Description',
            },
        },
        length: {
            status: true,
            settings: {
                titleMin: 30,
                titleMax: 60,
                descMin: 50,
                descMax: 160,
                filler: '_',
            },
        },
        missing: {
            status: true,
            settings: {
                defaultDomain: 'example.com',
                suffixTitle: '| Title',
                suffixH1: '| H1',
                suffixDesc: '| Desc',
            },
        },
    },

    // Инициализация
    init: function() {
        console.log('Initializing SEO Manager Script');
        console.log('Modules status:');
        console.log('- Equality:', this.modules.equality.status);
        console.log('- Length:', this.modules.length.status);
        console.log('- Missing Meta:', this.modules.missing.status);

        // Сохраняем оригинальные значения
        this.originalTitle = document.title;
        this.originalDesc = document.querySelector('meta[name="description"]')?.content || '';
        this.originalH1 = document.querySelector('h1')?.textContent.trim() || '';

        // Запуск модулей
        if (this.modules.missing.status) this.handleMissingMeta();
        if (this.modules.equality.status) this.handleEquality();
        if (this.modules.length.status) this.handleLength();
    },

    // Модуль отсутствия меты
    handleMissingMeta: function() {
        const s = this.modules.missing.settings;
        const len = this.modules.length.settings;

        // Title
        if (!this.originalTitle.trim()) {
            const source = this.originalH1 || this.originalDesc;
            let newTitle = source 
                ? this.adjustTextLength(source, len.titleMin, len.titleMax, len.filler) + s.suffixTitle
                : `Title | ${s.defaultDomain}`;
            document.title = newTitle;
        }

        // H1
        if (!this.originalH1) {
            const source = this.originalTitle || this.originalDesc;
            let newH1;
            if (source) {
                const isTitleSource = source === this.originalTitle;
                const min = isTitleSource ? len.titleMin : len.descMin;
                const max = isTitleSource ? len.titleMax : len.descMax;
                newH1 = this.adjustTextLength(source, min, max, len.filler) + s.suffixH1;
            } else {
                newH1 = `H1 | ${s.defaultDomain}`;
            }
            const h1 = document.createElement('h1');
            h1.textContent = newH1;
            h1.style.display = 'none';
            document.body.prepend(h1);
        }

        // Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc || !this.originalDesc.trim()) {
            const source = this.originalTitle || this.originalH1;
            let newDesc = source 
                ? this.adjustTextLength(source, len.descMin, len.descMax, len.filler) + s.suffixDesc
                : `Description | ${s.defaultDomain}`;
            
            if (!metaDesc) {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = newDesc;
                document.head.appendChild(meta);
            } else {
                metaDesc.content = newDesc;
            }
        }
    },

    // Модуль равенства
    handleEquality: function() {
        const s = this.modules.equality.settings;
        let descModified = false;

        // Title == H1
        if (this.originalTitle && this.originalH1 && this.originalTitle === this.originalH1) {
            document.title = this.originalTitle + s.titleSuffix;
        }

        // Title == Description
        if (this.originalTitle && this.originalDesc && this.originalTitle === this.originalDesc && !descModified) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = this.originalDesc + s.descSuffix;
                descModified = true;
            }
        }

        // Description == H1
        if (this.originalDesc && this.originalH1 && this.originalDesc === this.originalH1 && !descModified) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = this.originalDesc + s.descSuffix;
            }
        }
    },

    // Модуль длины
    handleLength: function() {
        const s = this.modules.length.settings;

        // Title
        const currentTitle = document.title;
        const newTitle = this.adjustTextLength(currentTitle, s.titleMin, s.titleMax, s.filler);
        if (newTitle !== currentTitle) document.title = newTitle;

        // Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const currentDesc = metaDesc.content;
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
document.addEventListener('DOMContentLoaded', () => SEOManager.init());
// </Скрипт для исправления SEO-ошибок META тегов>