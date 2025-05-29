document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.createElement('footer');
    footerContainer.className = 'page-footer';
    footerContainer.innerHTML = `
        <div class="footer-wrapper">
            <div class="footer-brand">
                <div class="footer-logo">Изобретения, изменившие мир</div>
            </div>
            <div class="footer-social">
                <div class="social-title">Ссылки для связи с нами</div>
                <div class="social-links">
                    <a href="https://www.chsu.ru/" class="social-link" target="_blank" title="ЧГУ">
                        <img src="images/university-icon.png" alt="ЧГУ" class="social-icon">
                    </a>
                    <a href="https://vk.com/chsu35" class="social-link" target="_blank" title="ВКонтакте">
                        <img src="images/vk-icon.png" alt="ВКонтакте" class="social-icon">
                    </a>
                    <a href="https://t.me/chsu_35" class="social-link" target="_blank" title="Telegram">
                        <img src="images/telegram-icon.png" alt="Telegram" class="social-icon">
                    </a>
                </div>
            </div>
            <div class="footer-developer">
                <div class="developer-name">Ефремов Олег Станиславович</div>
                <div class="developer-year">© 2025 Все права защищены</div>
                <div class="tech-badge">Версия 1.0.0</div>
            </div>
        </div>
    `;
    document.body.appendChild(footerContainer);
    const animateSocialIcons = () => {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            link.style.transitionDelay = `${index * 0.1}s`;
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 500 + index * 100);
        });
    };
    const handleFooterVisibility = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const footer = document.querySelector('.page-footer');

        if (scrollPosition >= pageHeight - 100) {
            footer.classList.add('visible');
            animateSocialIcons();
        } else {
            footer.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleFooterVisibility);
    handleFooterVisibility();
});
