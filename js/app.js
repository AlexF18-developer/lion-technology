/* =======================================================
   APP.JS
   Menú móvil, header en scroll y link activo
======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       ELEMENTOS
    ========================== */

    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');

    /* ==========================
       MENÚ MÓVIL
    ========================== */

    const openMenu = () => {
        headerNav.classList.add('header__nav--open');
        menuToggle.classList.add('menu-toggle--active');
        menuToggle.querySelector('i').classList.remove('fa-bars');
        menuToggle.querySelector('i').classList.add('fa-xmark');
    };

    const closeMenu = () => {
        headerNav.classList.remove('header__nav--open');
        menuToggle.classList.remove('menu-toggle--active');
        menuToggle.querySelector('i').classList.remove('fa-xmark');
        menuToggle.querySelector('i').classList.add('fa-bars');
    };

    const toggleMenu = () => {
        const isOpen = headerNav.classList.contains('header__nav--open');
        isOpen ? closeMenu() : openMenu();
    };

    if (menuToggle && headerNav) {

        menuToggle.addEventListener('click', toggleMenu);

        // Cerrar el menú al hacer clic en un link (navegación a una sección)

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar el menú al hacer clic fuera de él

        document.addEventListener('click', (e) => {

            const clickedInsideNav = headerNav.contains(e.target);
            const clickedToggle = menuToggle.contains(e.target);

            if (!clickedInsideNav && !clickedToggle) {
                closeMenu();
            }

        });

        // Cerrar el menú si la pantalla vuelve a tamaño de escritorio

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                closeMenu();
            }
        });

    }

    /* ==========================
       HEADER: SOMBRA AL HACER SCROLL
    ========================== */

    const handleHeaderScroll = () => {

        if (window.scrollY > 20) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

    };

    window.addEventListener('scroll', handleHeaderScroll);

    handleHeaderScroll(); // Estado inicial al cargar la página

    /* ==========================
       LINK ACTIVO SEGÚN SECCIÓN VISIBLE
    ========================== */

    const sections = document.querySelectorAll('main section[id]');

    const highlightActiveLink = () => {

        const scrollPosition = window.scrollY + header.offsetHeight + 50;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            const correspondingLink = document.querySelector(
                `.nav__link[href="#${sectionId}"]`
            );

            if (!correspondingLink) return;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                correspondingLink.classList.add('nav__link--active');
            } else {
                correspondingLink.classList.remove('nav__link--active');
            }

        });

    };
    
    /* ==========================
       CONTROL DEL LOADER (PRELOADER SEGURO)
    ========================== */

    const loader = document.getElementById('loader');

    const ocultarLoader = () => {
        if (loader && !loader.classList.contains('loader--hidden')) {
            loader.classList.add('loader--hidden');
        }
    };

    // 1. Quitar el loader cuando cargue la página normalmente
    window.addEventListener('load', () => {
        setTimeout(ocultarLoader, 500); // Pequeño delay de gracia
    });

    // 2. Respaldo de seguridad: si alguna imagen pesada tarda demasiado, 
    // forzamos el cierre del loader a los 1.5 segundos para no bloquear al usuario.
    setTimeout(ocultarLoader, 1500);

    window.addEventListener('scroll', highlightActiveLink);

    highlightActiveLink(); // Estado inicial al cargar la página

});