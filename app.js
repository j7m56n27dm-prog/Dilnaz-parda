/* =========================================
   IMPERIA & DILNAZ SAYTI UCHUN ASOSIY SKRIPT
   Muallif: Muhammad Daler
   Sana: 2025
========================================= */

/* --- GLOBAL O'ZGARUVCHILAR --- */
const appState = {
    lang: localStorage.getItem('site_lang') || 'uz',
    theme: localStorage.getItem('site_theme') || 'light',
    catalogData: null,
    currentGallery: [],
    slideIndex: 0
};

/* --- TARJIMALAR (UI Labels) --- */
const i18n = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_desc: "Uyingiz ko'rkiga ko'rk qo'shuvchi zamonaviy jaluzilar va eksklyuziv parda dizaynlari.",
        btn_call: "Qo'ng'iroq: +998 97 921 65 00", btn_catalog: "Katalogni ko'rish",
        stat_exp: "Yillik Tajriba", stat_clients: "Mamnun Mijozlar", stat_quality: "Sifat Kafolati",
        services_title: "Bizning Xizmatlar",
        srv_measure: "O'lchov va O'rnatish", srv_measure_desc: "Mutaxassislarimiz bepul o'lchov oladi va tayyor pardalarni o'rnatib beradi.",
        srv_jaluzi: "Tayyor Jaluzi", srv_jaluzi_desc: "\"Imperia Shtor\" — Ofis va uylar uchun keng assortimentdagi zamonaviy jaluzi va pardalar.",
        srv_design: "Dizayn va Tikish", srv_design_desc: "\"Dilnaz Pardalari\" — Har bir mijoz uchun individual dizayn va professional tikuv xizmati.",
        catalog_title: "Ishlarimiz Katalogi", search_ph: "Qidirish...", no_results: "Hech narsa topilmadi.",
        course_title: "Parda Tikish va Dizayn Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing. Amaliy darslar.", course_btn: "Telegramdan yozish",
        contact_title: "Bog'lanish", addr_text: "Samarqand sh., Ibn Sino ko'chasi, 23A", btn_map: "Yandex Kartada ochish"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Imperia Shtor и Dilnaz Pardalari", hero_desc: "Современные жалюзи и эксклюзивный дизайн штор. Качество и гарантия.",
        btn_call: "Позвонить: +998 97 921 65 00", btn_catalog: "Смотреть каталог",
        stat_exp: "Лет Опыта", stat_clients: "Довольных Клиентов", stat_quality: "Гарантия Качества",
        services_title: "Наши Услуги",
        srv_measure: "Замер и Установка", srv_measure_desc: "Бесплатный замер и профессиональная установка.",
        srv_jaluzi: "Готовые Жалюзи", srv_jaluzi_desc: "Широкий ассортимент жалюзи и штор в \"Imperia Shtor\".",
        srv_design: "Дизайн и Пошив", srv_design_desc: "\"Dilnaz Pardalari\" — индивидуальный дизайн и пошив для каждого клиента.",
        catalog_title: "Каталог Работ", search_ph: "Поиск...", no_results: "Ничего не найдено.",
        course_title: "Курсы Дизайна и Шитья", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой.", course_btn: "Написать в Telegram",
        contact_title: "Контакты", addr_text: "г. Самарканд, ул. Ибн Сины, 23А", btn_map: "Открыть в Яндекс Картах"
    }
};

/* --- DOM ELEMENTLARINI TANLASH --- */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* --- DASTUR BOSHLANISHI --- */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    setupEventListeners();
    fetchCatalog();
    setupScrollAnimation();
});

/* --- 1. SOZLAMALAR (THEME & LANG) --- */
function initTheme() {
    document.body.setAttribute('data-theme', appState.theme);
    $('#theme-toggle').textContent = appState.theme === 'light' ? '🌙' : '☀️';
}

function initLanguage() {
    $('#lang-toggle').textContent = appState.lang.toUpperCase();
    const t = i18n[appState.lang];
    $$('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
    $$('[data-i18n-ph]').forEach(el => el.placeholder = t[el.dataset.i18nPh]);
}

/* --- 2. KATALOGNI YUKLASH (FETCH) --- */
async function fetchCatalog() {
    try {
        const response = await fetch('./assets/data/catalog.json');
        
        if (!response.ok) {
            throw new Error("JSON faylini yuklab bo'lmadi");
        }
        
        appState.catalogData = await response.json();
        renderGallery('imperia'); // Default kategoriya
        
    } catch (error) {
        console.error("Xatolik:", error);
        $('#gallery-container').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: red;">
                <h3>Ma'lumot yuklanmadi!</h3>
                <p>Iltimos, saytni GitHub Pages yoki Live Server orqali oching.</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}

/* --- 3. GALEREYANI CHIZISH --- */
function renderGallery(category, searchTerm = "") {
    const container = $('#gallery-container');
    const noResults = $('#no-results');
    
    // Tozalash
    container.innerHTML = "";
    appState.currentGallery = [];

    if (!appState.catalogData) return;

    const albums = appState.catalogData[category] || [];

    albums.forEach(album => {
        const title = appState.lang === 'uz' ? album.title_uz : album.title_ru;
        
        album.images.forEach(img => {
            const alt = appState.lang === 'uz' ? img.alt_uz : img.alt_ru;
            const fullSearchText = (title + " " + alt + " " + (album.tags || []).join(" ")).toLowerCase();

            if (fullSearchText.includes(searchTerm.toLowerCase())) {
                appState.currentGallery.push({ src: img.src, title: title, desc: alt });
                
                const div = document.createElement('div');
                div.className = 'gallery-item fade-on-scroll visible';
                div.innerHTML = `
                    <img src="${img.src}" alt="${alt}" loading="lazy">
                    <div class="item-overlay">
                        <h4>${title}</h4>
                    </div>
                `;
                div.addEventListener('click', () => openLightbox(appState.currentGallery.length - 1));
                container.appendChild(div);
            }
        });
    });

    // Natija bormi?
    if (appState.currentGallery.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

/* --- 4. HODISALAR (EVENT LISTENERS) --- */
function setupEventListeners() {
    // Tilni o'zgartirish
    $('#lang-toggle').addEventListener('click', () => {
        appState.lang = appState.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('site_lang', appState.lang);
        initLanguage();
        // Katalogni qayta chizish
        const activeTab = $('.tab-btn.active').dataset.category;
        renderGallery(activeTab, $('#search-input').value);
    });

    // Mavzuni o'zgartirish
    $('#theme-toggle').addEventListener('click', () => {
        appState.theme = appState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('site_theme', appState.theme);
        initTheme();
    });

    // Mobil Menyu
    const menu = $('#mobile-menu');
    const toggleMenu = (show) => {
        if(show) menu.classList.add('active');
        else menu.classList.remove('active');
    };
    $('#mobile-menu-toggle').addEventListener('click', () => toggleMenu(true));
    $('#close-menu').addEventListener('click', () => toggleMenu(false));
    $$('.mobile-link').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // Katalog Tablari
    $$('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            $$('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.category);
        });
    });

    // Qidiruv
    $('#search-input').addEventListener('input', (e) => {
        const activeTab = $('.tab-btn.active').dataset.category;
        renderGallery(activeTab, e.target.value);
    });

    // Lightbox boshqaruvi
    const lb = $('#lightbox');
    $('.lb-close').addEventListener('click', closeLightbox);
    $('.lightbox-overlay').addEventListener('click', closeLightbox);
    $('.lb-next').addEventListener('click', () => changeSlide(1));
    $('.lb-prev').addEventListener('click', () => changeSlide(-1));
    
    // Klaviatura
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
    });
}

/* --- 5. LIGHTBOX FUNKSIYALARI --- */
function openLightbox(index) {
    appState.slideIndex = index;
    updateLightbox();
    $('#lightbox').classList.add('active');
}

function closeLightbox() {
    $('#lightbox').classList.remove('active');
}

function updateLightbox() {
    const item = appState.currentGallery[appState.slideIndex];
    $('.lb-img').src = item.src;
    $('.lb-title').textContent = item.title;
}

function changeSlide(n) {
    const len = appState.currentGallery.length;
    appState.slideIndex = (appState.slideIndex + n + len) % len;
    updateLightbox();
}

/* --- 6. ANIMATSIYA --- */
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    $$('.fade-on-scroll').forEach(el => observer.observe(el));
}