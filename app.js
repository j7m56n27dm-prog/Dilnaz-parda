/* STATE MANAGEMENT */
const app = {
    lang: localStorage.getItem('lang') || 'uz',
    theme: localStorage.getItem('theme') || 'light',
    data: null,
    filteredItems: [],
    activeIndex: 0,
    activeTab: 'imperia'
};

/* UI DICTIONARY */
const i18n = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Uyingiz Ko'rkiga Ko'rk Qo'shamiz", hero_desc: "\"Imperia Shtor\" va \"Dilnaz Pardalari\" — sifatli jaluzilar, eksklyuziv dizayn va professional tikuv xizmati.",
        btn_call: "Qo'ng'iroq qilish", btn_catalog: "Katalogni ko'rish",
        stat_clients: "Mamnun mijozlar", stat_years: "Yillik tajriba", stat_quality: "Sifat kafolati",
        sec_services: "Xizmatlarimiz",
        srv_measure: "O'lchov va O'rnatish", srv_measure_desc: "Mutaxassislarimiz manzilingizga borib, aniq o'lchov oladi va tayyor pardalarni o'rnatib beradi.",
        srv_jaluzi: "Tayyor Jaluzi", srv_jaluzi_desc: "Imperia Shtor: Ofis va uylar uchun zamonaviy zebra, rollo va vertikal jaluzilar.",
        srv_design: "Dizayn va Tikish", srv_design_desc: "Dilnaz Pardalari: Har bir xona uchun individual dizayn va yuqori sifatli tikuv.",
        sec_catalog: "Katalog", ph_search: "Qidirish...", no_results: "Hech narsa topilmadi.",
        course_title: "Parda Tikish va Dizayn Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing. Amaliy darslar, andaza olish va bichish sirlari.", btn_course: "Telegramdan Yozish",
        sec_contact: "Biz bilan Bog'lanish", addr_text: "Samarqand sh., Ibn Sino ko'chasi, 23A", btn_map: "Kartada ko'rish"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Уют и Красота Вашего Дома", hero_desc: "\"Imperia Shtor\" и \"Dilnaz Pardalari\" — качественные жалюзи, эксклюзивный дизайн и профессиональный пошив.",
        btn_call: "Позвонить", btn_catalog: "Смотреть каталог",
        stat_clients: "Довольных клиентов", stat_years: "Лет опыта", stat_quality: "Гарантия качества",
        sec_services: "Наши Услуги",
        srv_measure: "Замер и Установка", srv_measure_desc: "Наши специалисты приедут, сделают точный замер и установят готовые шторы.",
        srv_jaluzi: "Готовые Жалюзи", srv_jaluzi_desc: "Imperia Shtor: Современные зебра, ролло и вертикальные жалюзи для офиса и дома.",
        srv_design: "Дизайн и Пошив", srv_design_desc: "Dilnaz Pardalari: Индивидуальный дизайн для каждой комнаты и качественный пошив.",
        sec_catalog: "Каталог", ph_search: "Поиск...", no_results: "Ничего не найдено.",
        course_title: "Курсы Шитья и Дизайна", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой. Практика, кройка и шитье.", btn_course: "Написать в Telegram",
        sec_contact: "Свяжитесь с Нами", addr_text: "г. Самарканд, ул. Ибн Сины, 23А", btn_map: "Посмотреть на карте"
    }
};

/* DOM ELEMENTS */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initLang();
    setupEventListeners();
    
    // Dynamic Year
    $('#year').textContent = new Date().getFullYear();

    // Load Data
    try {
        const response = await fetch('./assets/data/catalog.json');
        if (!response.ok) throw new Error("JSON Fetch Failed");
        app.data = await response.json();
        renderGallery(app.activeTab);
    } catch (error) {
        console.error(error);
        $('#gallery-container').innerHTML = `<p style="text-align:center; padding: 20px;">Ma'lumot yuklashda xatolik. Iltimos sahifani yangilang.</p>`;
    }

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    $$('.fade-in-up').forEach(el => observer.observe(el));
    
    // Scroll Spy (Active Nav)
    window.addEventListener('scroll', scrollSpy);
});

/* FUNCTIONS */

function initTheme() {
    document.documentElement.setAttribute('data-theme', app.theme);
}

function initLang() {
    $('#lang-btn').textContent = app.lang.toUpperCase();
    const t = i18n[app.lang];
    $$('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
    $$('[data-i18n-ph]').forEach(el => el.placeholder = t[el.dataset.i18nPh]);
}

function setupEventListeners() {
    // Theme Toggle
    $('#theme-btn').addEventListener('click', () => {
        app.theme = app.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', app.theme);
        initTheme();
        $('#theme-btn').textContent = app.theme === 'light' ? '🌙' : '☀️';
    });

    // Language Toggle
    $('#lang-btn').addEventListener('click', () => {
        app.lang = app.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('lang', app.lang);
        initLang();
        renderGallery(app.activeTab, $('#search-input').value); // Re-render gallery names
    });

    // Tabs
    $$('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            $$('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            app.activeTab = e.target.dataset.tab;
            renderGallery(app.activeTab, $('#search-input').value);
        });
    });

    // Smart Search
    $('#search-input').addEventListener('input', (e) => {
        renderGallery(app.activeTab, e.target.value.toLowerCase());
    });

    // Mobile Menu
    const toggleMenu = (open) => {
        const menu = $('#mobile-menu');
        if (open) {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Scroll lock
        } else {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    $('#mobile-toggle').addEventListener('click', () => toggleMenu(true));
    $('.close-menu').addEventListener('click', () => toggleMenu(false));
    $$('.mm-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

    // Lightbox
    const lb = $('#lightbox');
    const closeLb = () => {
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };
    $('.lb-close').addEventListener('click', closeLb);
    $('.lightbox-overlay').addEventListener('click', closeLb);
    $('.next').addEventListener('click', () => navigateLightbox(1));
    $('.prev').addEventListener('click', () => navigateLightbox(-1));
    
    document.addEventListener('keydown', (e) => {
        if (lb.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLb();
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
        }
    });
}

function renderGallery(tab, search = '') {
    const container = $('#gallery-container');
    if (!app.data) return;

    // Reset Array
    app.filteredItems = [];
    const albums = app.data[tab] || [];

    // Filter Logic
    albums.forEach(album => {
        const title = app.lang === 'uz' ? album.title_uz : album.title_ru;
        album.images.forEach(img => {
            const alt = app.lang === 'uz' ? img.alt_uz : img.alt_ru;
            const fullText = `${title} ${alt} ${album.tags.join(' ')}`.toLowerCase();
            if (fullText.includes(search)) {
                app.filteredItems.push({ src: img.src, title: title, desc: alt });
            }
        });
    });

    // Render
    container.innerHTML = '';
    if (app.filteredItems.length === 0) {
        $('#empty-state').classList.remove('hidden');
    } else {
        $('#empty-state').classList.add('hidden');
        app.filteredItems.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item fade-in-up visible';
            el.innerHTML = `
                <img src="${item.src}" alt="${item.desc}" loading="lazy">
                <div class="overlay">
                    <h4>${item.title}</h4>
                </div>
            `;
            el.addEventListener('click', () => openLightbox(index));
            container.appendChild(el);
        });
    }
}

function openLightbox(index) {
    app.activeIndex = index;
    updateLightbox();
    const lb = $('#lightbox');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    const item = app.filteredItems[app.activeIndex];
    $('.lb-img').src = item.src;
    $('#lb-title').textContent = item.title;
    $('#lb-desc').textContent = item.desc;
}

function navigateLightbox(dir) {
    const len = app.filteredItems.length;
    app.activeIndex = (app.activeIndex + dir + len) % len;
    updateLightbox();
}

function scrollSpy() {
    const sections = $$('section');
    const navLinks = $$('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}