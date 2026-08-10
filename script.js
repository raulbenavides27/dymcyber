// Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Funciones del Carrusel
let slideIndex = 1;
showSlides(slideIndex);

// Avance automático x segundos
setInterval(() => {
    moveSlide(1);
}, 3000);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}


// ============================================
// LANGUAGE SWITCHING FUNCTIONALITY
// ============================================

let currentLang = 'es';

function switchLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updatePageLanguage();
    updateLangButton();
    localStorage.setItem('preferredLang', currentLang);
}

function updatePageLanguage() {
    const lang = translations[currentLang];
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update all elements with data-lang-key attribute
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (lang[key]) {
            element.textContent = lang[key];
        }
    });
    
    // Update placeholder for textarea
    const mensajeTextarea = document.getElementById('mensaje');
    if (mensajeTextarea && lang.messagePlaceholder) {
        mensajeTextarea.placeholder = lang.messagePlaceholder;
    }
}

function updateLangButton() {
    const langBtn = document.getElementById('langBtn');
    if (currentLang === 'es') {
        langBtn.innerHTML = '<span class="flag-icon">🇺🇸</span> EN';
    } else {
        langBtn.innerHTML = '<span class="flag-icon">🇪🇸</span> ES';
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        currentLang = savedLang;
        updatePageLanguage();
        updateLangButton();
    }
    
    // Add click event to language button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }

    /*==========================================
ANIMACIONES SCROLL
==========================================*/

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('active');

        }else{

            entry.target.classList.remove('active');

        }

    });

},{
    threshold:.15
});

revealElements.forEach(element=>{

    observer.observe(element);

});
});