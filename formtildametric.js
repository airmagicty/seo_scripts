document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки URL и выполнения действий
    function checkHash() {
        if (window.location.hash === '#contact_form_success') {
            console.log('Hash найден');
            try {
                ym(98276912, 'reachGoal', 'contacts_click');
                console.log('Событие отправлено в Яндекс.Метрику');
            } catch (e) {
                console.error('Ошибка при отправке события в Яндекс.Метрику:', e);
            }
            window.location.hash = '#contact_form';
        }
    }

    // Проверяем URL каждые 500 миллисекунд
    setInterval(checkHash, 500);
});