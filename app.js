/* =========================================
   ZAXIRA MA'LUMOTLAR (Backup Data)
   Agar kompyuterda fayl ochilganda JSON 
   o'qilmasa, bu ma'lumotlar ishlatiladi.
========================================= */
const BACKUP_CATALOG = {
    imperia: [
        {
            title_uz: "Premium Zebra (Oq)", title_ru: "Премиум Зебра (Белая)",
            tags: ["zebra", "ofis"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNkNGFmMzciLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlplYnJhIFN0eWxlPC90ZXh0Pjwvc3ZnPg==", alt_uz: "Zebra parda", alt_ru: "Зебра штора" },
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsYWNrIFplYnJhPC90ZXh0Pjwvc3ZnPg==", alt_uz: "Qora zebra", alt_ru: "Черная зебра" }
            ]
        }
    ],
    dilnaz: [
        {
            title_uz: "Dizaynerlik Ishi", title_ru: "Дизайнерская Работа",
            tags: ["dizayn", "uy"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM4MDAwMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdilnazIERlc2lnbjwvdGV4dD48L3N2Zz4=", alt_uz: "Baxmal parda", alt_ru: "Бархат" }
            ]
        }
    ],
    homes: [
        {
            title_uz: "Mijoz Uyida", title_ru: "У Клиента",
            tags: ["mijoz", "samarqand"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM1NTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhvbWUgV29yazwvdGV4dD48L3N2Zz4=", alt_uz: "O'rnatilgan parda", alt_ru: "Установлено" }
            ]
        }
    ]
};

/* --- ASOSIY KOD --- */
const app = {
    lang: localStorage.getItem('lang') || 'uz',
    theme: localStorage.getItem('theme') || 'light',
    data: null, // JSON ma'lumot shu yerga tushadi
    currentGallery: [],
    slideIndex: 0
};

/* --- TARJIMALAR --- */
const translations = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_desc: "Uyingiz ko'rkiga ko'rk qo'shuvchi zamonaviy jaluzilar va eksklyuziv parda dizaynlari.",
        btn_call: "Qo'ng'iroq qilish", btn_catalog: "Katalogni ko'rish",
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
        btn_call: "Позвонить", btn_catalog: "Смотреть каталог",
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

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initLang();
    setupEvents();
    
    // Ma'lumotlarni yuklash (Fetch + Fallback)
    await loadData();
    
    // Preloaderni o'chirish
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);

    // Birinchi render
    renderGallery('imperia');
    setupObserver();
});

/* --- FUNKSIYALAR --- */

// 1. Ma'lumot yuklash (Aqlli Tizim)
async function loadData() {
    try {
        const response = await fetch('./assets/data/catalog.json');
        if (!response.ok) throw new Error("JSON fayl topilmadi");
        app.data = await response.json();
    } catch (error) {
        console.warn("JSON o'qilmadi (CORS yoki fayl yo'q). Zaxira ma'lumot ishlatilmoqda.");
        app.data = BACKUP_CATALOG; // Zaxiradan foydalanish
    }
}

// 2. Hodisalar (Events)
function setupEvents() {
    // Til
    document.getElementById('lang-toggle').addEventListener('click', () => {
        app.lang = app.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('lang', app.lang);
        initLang();
        const activeCat = document.querySelector('.tab-btn.active').dataset.category;
        renderGallery(activeCat, document.getElementById('search-input').value);
    });

    // Mavzu (Dark Mode)
    document.getElementById('theme-toggle').addEventListener('click', () => {
        app.theme = app.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', app.theme);
        initTheme();
    });

    // Mobil Menyu
    const menu = document.getElementById('mobile-menu');
    const toggleMenu = (open) => {
        if(open) menu.classList.add('active');
        else menu.classList.remove('active');
    };
    document.getElementById('mobile-menu-toggle').addEventListener('click', () => toggleMenu(true));
    document.getElementById('close-menu').addEventListener('click', () => toggleMenu(false));
    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // Tablar (Katalog)
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.category);
        });
    });

    // Qidiruv
    document.getElementById('search-input').addEventListener('input', (e) => {
        const activeCat = document.querySelector('.tab-btn.active').dataset.category;
        renderGallery(activeCat, e.target.value);
    });

    // Lightbox
    const lb = document.getElementById('lightbox');
    document.querySelector('.lb-close').addEventListener('click', () => lb.classList.remove('active'));
    document.querySelector('.lightbox-overlay').addEventListener('click', () => lb.classList.remove('active'));
    document.querySelector('.lb-next').addEventListener('click', () => changeSlide(1));
    document.querySelector('.lb-prev').addEventListener('click', () => changeSlide(-1));
}

// 3. UI yangilash
function initTheme() {
    document.body.setAttribute('data-theme', app.theme);
    document.getElementById('theme-toggle').textContent = app.theme === 'light' ? '🌙' : '☀️';
}

function initLang() {
    document.getElementById('lang-toggle').textContent = app.lang.toUpperCase();
    const t = translations[app.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
    document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t[el.dataset.i18nPh]);
}

// 4. Galereya
function renderGallery(cat, filter = "") {
    const grid = document.getElementById('gallery-container');
    const noRes = document.getElementById('no-results');
    grid.innerHTML = "";
    app.currentGallery = [];

    const items = app.data[cat] || [];
    
    items.forEach(album => {
        const title = app.lang === 'uz' ? album.title_uz : album.title_ru;
        album.images.forEach(img => {
            const alt = app.lang === 'uz' ? img.alt_uz : img.alt_ru;
            const fullStr = (title + " " + alt + " " + (album.tags || []).join(" ")).toLowerCase();

            if (fullStr.includes(filter.toLowerCase())) {
                app.currentGallery.push({ src: img.src, title: title, desc: alt });
                
                const div = document.createElement('div');
                div.className = 'gallery-item fade-up visible';
                div.innerHTML = `
                    <img src="${img.src}" alt="${alt}" loading="lazy">
                    <div class="item-overlay">
                        <h4>${title}</h4>
                    </div>
                `;
                div.onclick = () => openLightbox(app.currentGallery.length - 1);
                grid.appendChild(div);
            }
        });
    });

    if (app.currentGallery.length === 0) noRes.classList.remove('hidden');
    else noRes.classList.add('hidden');
}

// 5. Lightbox
function openLightbox(index) {
    app.slideIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}

function updateLightbox() {
    const item = app.currentGallery[app.slideIndex];
    document.querySelector('.lb-img').src = item.src;
    document.querySelector('.lb-title').textContent = item.title;
    document.querySelector('.lb-desc').textContent = item.desc;
}

function changeSlide(n) {
    const len = app.currentGallery.length;
    app.slideIndex = (app.slideIndex + n + len) % len;
    updateLightbox();
}

// 6. Animatsiya Observer
function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}