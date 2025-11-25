document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    scrollProgress.style.width = `${progress}%`;
}

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sideNav = document.querySelector('.side-nav');
const menuOverlay = document.querySelector('.menu-overlay');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    mobileMenuToggle.classList.remove('active');
    sideNav.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function openMenu() {
    mobileMenuToggle.classList.add('active');
    sideNav.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (mobileMenuToggle && sideNav && menuOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
        if (sideNav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    menuOverlay.addEventListener('click', () => {
        closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
}

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const typewriter = new Typewriter(typewriterElement, {
        loop: true,
        delay: 75,
        deleteSpeed: 50,
        cursor: '_',
        cursorClassName: 'typewriter-cursor'
    });

    typewriter
        .typeString('elegant solutions.')
        .pauseFor(2000)
        .deleteAll()
        .typeString('secure systems.')
        .pauseFor(2000)
        .deleteAll()
        .typeString('innovative software.')
        .pauseFor(2000)
        .deleteAll()
        .typeString('cybersecurity defenses.')
        .pauseFor(2000)
        .deleteAll()
        .start();
}

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    updateScrollProgress();
    initTypewriter();
});
