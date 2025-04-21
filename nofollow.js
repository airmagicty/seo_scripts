// Создаем объект LinkProcessor с методом для обработки ссылок
const LinkProcessor = {
    // Метод для добавления rel="nofollow" к внешним ссылкам
    addNoFollowToExternalLinks: function(domain) {
      // Счётчик добавленных nofollow ссылок
      let nofollowCount = 0;
  
      // Получаем все элементы <a> на странице
      const links = document.querySelectorAll('a');
  
      // Проходимся по каждой ссылке
      links.forEach(link => {
        const href = link.getAttribute('href');
  
        // Если href не задан или является якорем, пропускаем эту ссылку
        if (!href || href.startsWith('#') || href.match(/^\/.*#.*$/)) {
          return;
        }
  
        // Проверяем, является ли ссылка внутренней (в пределах сайта)
        const isInternalLink = href.startsWith(domain) || href.startsWith('/') || href.startsWith('./');
  
        // Если ссылка не является внутренней, добавляем rel="nofollow"
        if (!isInternalLink) {
          link.setAttribute('rel', 'nofollow');
          nofollowCount++;
        }
      });
  
      // Выводим сообщение в консоль о количестве добавленных nofollow
      console.log(`Количество добавленных тегов rel="nofollow": ${nofollowCount}`);
    }
  };
  
  // Пример вызова метода с доменом
  LinkProcessor.addNoFollowToExternalLinks('https://residence888.ru');
  