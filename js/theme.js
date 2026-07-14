/* =======================================================
   THEME.JS
   Cambio entre tema oscuro (por defecto) y tema claro
======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       ELEMENTOS
    ========================== */

    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const STORAGE_KEY = 'lion-technology-theme';

    /* ==========================
       APLICAR TEMA
    ========================== */

    const applyTheme = (theme) => {

        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

    };

    /* ==========================
       TEMA INICIAL
       1. Preferencia guardada por el usuario
       2. Si no hay, preferencia del sistema operativo
       3. Si no hay ninguna, oscuro (por defecto)
    ========================== */

    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {

        const prefersLight = window.matchMedia(
            '(prefers-color-scheme: light)'
        ).matches;

        applyTheme(prefersLight ? 'light' : 'dark');

    }

    /* ==========================
       CLIC EN EL BOTÓN
    ========================== */

    themeToggle.addEventListener('click', () => {

        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';

        applyTheme(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);

    });

});