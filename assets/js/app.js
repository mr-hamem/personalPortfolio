// Init AOS
AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
}

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '14px 60px';
    } else {
        nav.style.padding = '20px 60px';
    }
});