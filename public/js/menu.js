const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
}