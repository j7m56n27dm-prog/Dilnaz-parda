/* STATE */
const app = {
    lang: localStorage.getItem('lang') || 'uz',
    theme: localStorage.getItem('theme') || 'light',
    data: null,
    currentImages: [], // Filtered images
    currentIndex: 0
};

/* TRANSLATIONS */
const i18n = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_subtitle: "Uyingiz ko'rkiga ko'rk qo'shuvchi zamonaviy jaluzilar va eksklyuziv parda dizaynlari. Sifat va kafolat birlashgan manzil.",
        btn_call: "Qo'ng'iroq qilish", btn_catalog: "Katalogni ko'rish",
        sec_services: "Bizning Xizmatlar",
        srv_1_title: "O'lchov va O'rnatish", srv_1_desc: "Mutaxassislarimiz bepul o'lchov oladi va tayyor pardalarni sifatli o'rnatib beradi.",
        srv_2_title: "Tayyor Jaluzi va Pardalar", srv_2_desc: "\"Imperia Shtor\" do'konida keng assortimentdagi zamonaviy jaluzi va tayyor pardalar.",
        srv_3_title: "Dizayn va Tikish", srv_3_desc: "\"Dilnaz Pardalari\" — har bir mijoz uchun individual dizayn va professional tikuv xizmati.",
        sec_catalog: "Ishlarimiz Katalogi", search_ph: "Qidirish... (Masalan: zal, yotoqxona)", no_results: "Hech narsa topilmadi.",
        course_title: "Parda Tikish va Dizayn Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing. Amaliy darslar.",
        btn_course: "Kursga yozilish (Telegram)",
        sec_contact: "Bog'lanish", addr_text: "Samarqand sh., Ibn Sino ko'chasi, 23A", btn_map: "Yandex Kartada Ochish"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Imperia Shtor и Dilnaz Pardalari", hero_subtitle: "Современные жалюзи и эксклюзивный дизайн штор. Качество и гарантия в одном месте.",
        btn_call: "Позвонить", btn_catalog: "Смотреть каталог",
        sec_services: "Наши Услуги",
        srv_1_title: "Замер и Установка", srv_1_desc: "Наши специалисты бесплатно сделают замер и качественно установят готовые шторы.",
        srv_2_title: "Готовые Жалюзи и Шторы", srv_2_desc: "Широкий ассортимент современных жалюзи и готовых штор в магазине \"Imperia Shtor\".",
        srv_3_title: "Дизайн и Пошив", srv_3_desc: "\"Dilnaz Pardalari\" — индивидуальный дизайн и профессиональный пошив для каждого клиента.",
        sec_catalog: "Каталог Работ", search_ph: "Поиск... (Например: зал, спальня)", no_results: "Ничего не найдено.",
        course_title: "Курсы Дизайна и Шитья", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой. Практические занятия.",
        btn_course: "Записаться на курс (Telegram)",
        sec_contact: "Контакты", addr_text: "г. Самарканд, ул. Ибн Сины, 23А", btn_map: "Открыть в Яндекс Картах"
    }
};

/* INIT */
document.addEventListener('DOMContentLoaded', async () => {
    // Setup Theme & Lang
    applyTheme();
    applyLang();

    // Fetch Data
    try {
        const res = await fetch('./assets/data/catalog.json');
        app.data = await res.json();
        renderGallery('imperia');
    } catch (err) {
        console.error("Data error:", err);
    }

    // Event Listeners
    setupEvents();
    
    // Animations
    setupScrollObserver();

    // Remove preloader
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 500);
});

/* FUNCTIONS */
function setupEvents() {
    // Theme
    document.getElementById('theme-toggle').addEventListener('click', () => {
        app.theme = app.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', app.theme);
        applyTheme();
    });

    // Lang
    document.getElementById('lang-toggle').addEventListener('click', () => {
        app.lang = app.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('lang', app.lang);
        applyLang();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderGallery(activeFilter);
    });

    // Mobile Menu
    const menu = document.getElementById('mobile-menu');
    document.getElementById('menu-toggle').addEventListener('click', () => menu.classList.add('active'));
    document.querySelector('.close-menu').addEventListener('click', () => menu.classList.remove('active'));
    document.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => menu.classList.remove('active')));

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.filter);
        });
    });

    // Search
    document.getElementById('gallery-search').addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderGallery(activeFilter, e.target.value.toLowerCase());
    });

    // Lightbox Controls
    document.querySelector('.lb-close').addEventListener('click', closeLightbox);
    document.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
    document.querySelector('.next').addEventListener('click', () => navLightbox(1));
    document.querySelector('.prev').addEventListener('click', () => navLightbox(-1));
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('lightbox').classList.contains('active')) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navLightbox(1);
        if (e.key === "ArrowLeft") navLightbox(-1);
    });
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', app.theme);
    document.getElementById('theme-toggle').textContent = app.theme === 'light' ? '🌙' : '☀️';
}

function applyLang() {
    document.getElementById('lang-toggle').textContent = app.lang.toUpperCase();
    const t = i18n[app.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = t[el.dataset.i18nPlaceholder]);
}

function renderGallery(filterKey, searchTerm = '') {
    if (!app.data) return;
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    
    app.currentImages = [];
    const albums = app.data[filterKey] || [];

    albums.forEach(album => {
        const title = app.lang === 'uz' ? album.title_uz : album.title_ru;
        album.images.forEach(img => {
            const alt = app.lang === 'uz' ? img.alt_uz : img.alt_ru;
            const searchable = (title + ' ' + alt + ' ' + (album.tags || []).join(' ')).toLowerCase();
            
            if (searchable.includes(searchTerm)) {
                app.currentImages.push({ src: img.src, title: title, alt: alt });
            }
        });
    });

    if (app.currentImages.length === 0) {
        document.getElementById('no-results').classList.remove('hidden');
    } else {
        document.getElementById('no-results').classList.add('hidden');
        app.currentImages.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            el.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <div class="g-overlay"><span class="g-title">${item.title}</span></div>
            `;
            el.addEventListener('click', () => openLightbox(idx));
            grid.appendChild(el);
        });
    }
}

/* LIGHTBOX */
function openLightbox(idx) {
    app.currentIndex = idx;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const item = app.currentImages[app.currentIndex];
    document.querySelector('.lb-img').src = item.src;
    document.querySelector('.lb-title').textContent = item.title;
}

function navLightbox(dir) {
    const len = app.currentImages.length;
    app.currentIndex = (app.currentIndex + dir + len) % len;
    updateLightbox();
}

/* SCROLL REVEAL */
function setupScrollObserver() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}