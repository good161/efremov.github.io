document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.createElement('div');
    navContainer.className = 'page-container';
    navContainer.innerHTML = `
        <header class="page-header">
            <div class="header-wrapper">
                <nav class="main-navigation" id="mainNav">
                    <ul class="nav-menu">
                        <li class="nav-menu__item"><a class="nav-menu__link" href="index.html">ГЛАВНАЯ</a></li>
                        <li class="nav-menu__item">
                            <a class="nav-menu__link" href="scientists.html">УЧЁНЫЕ</a>
                            <ul class="submenu">
                                <li class="submenu__item"><a class="submenu__link" href="scientists.html#oppenheimer">РОБЕРТ ОППЕНГЕЙМЕР</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="scientists.html#tesla">НИКОЛА ТЕСЛА</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="scientists.html#gutenberg">ИОГАНН ГУТЕНБЕРГ</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="scientists.html#haber">ФРИЦ ГАБЕР</a></li>
                            </ul>
                        </li>
                        <li class="nav-menu__item">
                            <a class="nav-menu__link" href="inventions.html">ИЗОБРЕТЕНИЯ</a>
                            <ul class="submenu">
                                <li class="submenu__item"><a class="submenu__link" href="inventions.html#nuclear-bomb">ЯДЕРНАЯ БОМБА</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="inventions.html#ac-current">ПЕРЕМЕННЫЙ ТОК</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="inventions.html#printing-press">ПЕЧАТНЫЙ СТАНОК</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="inventions.html#nitrogen">АЗОТ</a></li>
                            </ul>
                        </li>
                        <li class="nav-menu__item">
                            <a class="nav-menu__link" href="impact.html">ВЛИЯНИЕ</a>
                            <ul class="submenu">
                                <li class="submenu__item"><a class="submenu__link" href="impact.html#nuclear-world">ЯДЕРНЫЙ МИР</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="impact.html#current-war">ПОБЕДА В "ВОЙНЕ ТОКОВ"</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="impact.html#knowledge-preservation">СОХРАНЕНИЕ ЗНАНИЙ</a></li>
                                <li class="submenu__item"><a class="submenu__link" href="impact.html#fertilizers">АЗОТНЫЕ УДОБРЕНИЯ</a></li>
                            </ul>
                        </li>
                        <li class="nav-menu__item"><a class="nav-menu__link" href="registration.html">РЕГИСТРАЦИЯ</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
    document.body.insertBefore(navContainer, document.body.firstChild);
    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('mainNav').classList.toggle('active');
    });
});
