/* =========================================
   AQLLI DATA TIZIMI (CORS XATOSINI YO'QOTISH)
   Agar JSON fayl yuklanmasa, mana shu ichki
   ma'lumotlardan foydalaniladi.
========================================= */
const BACKUP_DATA = {
    imperia: [
        {
            title_uz: "Premium Zebra Parda", title_ru: "Премиум Зебра",
            tags: ["zebra", "ofis"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNkNGFmMzciLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlplYnJhIFN0eWxlPC90ZXh0Pjwvc3ZnPg==", alt_uz: "Sariq ofis parda", alt_ru: "Желтая штора" },
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsYWNrIEVkaXRpb248L3RleHQ+PC9zdmc+", alt_uz: "Qora zebra", alt_ru: "Черная зебра" }
            ]
        }
    ],
    dilnaz: [
        {
            title_uz: "Dizaynerlik Ishi", title_ru: "Дизайнерская Работа",
            tags: ["dizayn", "uy"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM4MDAwMDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdilnazIERlc2lnbjwvdGV4dD48L3N2Zz4=", alt_uz: "Baxmal parda", alt_ru: "Бархат" }
            ]
        }
    ],
    homes: [
        {
            title_uz: "Mijoz Uyida", title_ru: "У Клиента",
            tags: ["mijoz", "samarqand"],
            images: [
                { src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiM1NTUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhvbWUgV29yazwvdGV4dD48L3N2Zz4=", alt_uz: "O'rnatilgan parda", alt_ru: "Установлено" }
            ]
        }
    ]
};

/* STATE MANAGEMENT */
const state = {
    lang: localStorage.getItem('lang') || 'uz',
    theme: localStorage.getItem('theme') || 'light',
    data: null,
    gallery: [],
    index: 0
};

/* TARJIMALAR */
const i18n = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_desc: "Uyingiz ko'rkiga ko'rk qo'shuvchi zamonaviy jaluzilar va eksklyuziv parda dizaynlari.",
        btn_call: "Qo'ng'iroq qilish", btn_catalog: "Katalogni ko'rish",
        services_title: "Bizning Xizmatlar",
        srv_measure: "O'lchov va O'rnatish", srv_measure_desc: "Mutaxassislarimiz bepul o'lchov oladi va tayyor pardalarni o'rnatib beradi.",
        srv_jaluzi: "Tayyor Jaluzi", srv_jaluzi_desc: "\"Imperia Shtor\" — ofis va uylar uchun keng assortimentdagi zamonaviy jaluzi va pardalar.",
        srv_sewing: "Dizayn va Tikish", srv_sewing_desc: "\"Dilnaz Pardalari\" — har bir mijoz uchun individual dizayn va professional tikuv xizmati.",
        catalog_title: "Katalog", search_ph: "Qidirish...", no_results: "Hech narsa topilmadi.",
        course_title: "Parda Tikish va Dizayn Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing.", course_btn: "Telegramdan yozish",
        contact_title: "Bog'lanish", address_text: "Samarqand sh., Ibn Sino ko'chasi, 23A", btn_map: "Yandex Kartada ochish"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Imperia Shtor и Dilnaz Pardalari", hero_desc: "Современные жалюзи и эксклюзивный дизайн штор. Качество и гарантия.",
        btn_call: "Позвонить", btn_catalog: "Смотреть каталог",
        services_title: "Наши Услуги",
        srv_measure: "Замер и Установка", srv_measure_desc: "Бесплатный замер и профессиональная установка.",
        srv_jaluzi: "Готовые Жалюзи", srv_jaluzi_desc: "Широкий ассортимент современных жалюзи и штор в \"Imperia Shtor\".",
        srv_sewing: "Дизайн и Пошив", srv_sewing_desc: "\"Dilnaz Pardalari\" — индивидуальный дизайн и пошив для каждого клиента.",
        catalog_title: "Каталог", search_ph: "Поиск...", no_results: "Ничего не найдено.",
        course_title: "Курсы Дизайна и Шитья", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой.", course_btn: "Написать в Telegram",
        contact_title: "Контакты", address_text: "г. Самарканд, ул. Ибн Сины, 23А", btn_map: "Открыть в Яндекс Картах"
    }
};

/* DOM ELEMENTLARI */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* INIT */
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initLang();
    setupEvents();
    
    // Gibrid Ma'lumot Yuklash (Smart Load)
    try {
        const res = await fetch('./assets/data/catalog.json');
        if(!res.ok) throw new Error("JSON Fetch Failed");
        state.data = await res.json();
    } catch (e) {
        console.warn("JSON yuklanmadi, zaxira ma'lumot ishlatilmoqda:", e);
        state.data = BACKUP_DATA;
    }
    
    // Preloaderni o'chirish
    setTimeout(() => {
        $('#preloader').style.opacity = '0';
        setTimeout(() => $('#preloader').remove(), 500);
    }, 500);

    renderGallery('imperia');
    setupObserver();
});

/* FUNKSIYALAR */
function setupEvents() {
    // Theme
    $('#theme-btn').addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        initTheme();
    });

    // Lang
    $('#lang-btn').addEventListener('click', () => {
        state.lang = state.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('lang', state.lang);
        initLang();
        const activeCat = $('.tab-btn.active').dataset.category;
        renderGallery(activeCat, $('#search-input').value);
    });

    // Mobil Menu
    const menu = $('#mobile-menu');
    const toggleMenu = (show) => {
        if(show) menu.classList.add('active');
        else menu.classList.remove('active');
    };
    $('#mobile-menu-btn').addEventListener('click', () => toggleMenu(true));
    $('#close-menu').addEventListener('click', () => toggleMenu(false));
    $$('.m-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

    // Tabs
    $$('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            $$('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.category);
        });
    });

    // Search
    $('#search-input').addEventListener('input', (e) => {
        const activeCat = $('.tab-btn.active').dataset.category;
        renderGallery(activeCat, e.target.value);
    });

    // Lightbox
    $('.lb-close').addEventListener('click', closeLightbox);
    $('.lightbox-overlay').addEventListener('click', closeLightbox);
    $('.lb-next').addEventListener('click', () => changeSlide(1));
    $('.lb-prev').addEventListener('click', () => changeSlide(-1));
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    $('#theme-btn').textContent = state.theme === 'light' ? '🌙' : '☀️';
}

function initLang() {
    $('#lang-btn').textContent = state.lang.toUpperCase();
    const t = i18n[state.lang];
    $$('[data-lang]').forEach(el => el.textContent = t[el.dataset.lang]);
    $$('[data-lang-ph]').forEach(el => el.placeholder = t[el.dataset.langPh]);
}

function renderGallery(cat, search = "") {
    const grid = $('#gallery-grid');
    grid.innerHTML = "";
    state.gallery = [];
    
    const albums = state.data[cat] || [];
    
    albums.forEach(album => {
        const title = state.lang === 'uz' ? album.title_uz : album.title_ru;
        album.images.forEach(img => {
            const alt = state.lang === 'uz' ? img.alt_uz : img.alt_ru;
            const fullStr = (title + " " + alt + " " + (album.tags || []).join(" ")).toLowerCase();
            
            if(fullStr.includes(search.toLowerCase())) {
                state.gallery.push({ src: img.src, title: title, desc: alt });
                
                const div = document.createElement('div');
                div.className = 'gallery-item fade-up visible';
                div.innerHTML = `
                    <img src="${img.src}" alt="${alt}" loading="lazy">
                    <div class="item-overlay">
                        <h4>${title}</h4>
                    </div>
                `;
                div.onclick = () => openLightbox(state.gallery.length - 1);
                grid.appendChild(div);
            }
        });
    });

    if(state.gallery.length === 0) $('#no-results').classList.remove('hidden');
    else $('#no-results').classList.add('hidden');
}

function openLightbox(idx) {
    state.index = idx;
    updateLightbox();
    $('#lightbox').classList.add('active');
}

function closeLightbox() {
    $('#lightbox').classList.remove('active');
}

function updateLightbox() {
    const item = state.gallery[state.index];
    $('.lb-img').src = item.src;
    $('.lb-caption').textContent = `${item.title} - ${item.desc}`;
}

function changeSlide(d) {
    const len = state.gallery.length;
    state.index = (state.index + d + len) % len;
    updateLightbox();
}

function setupObserver() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, {threshold: 0.1});
    $$('.fade-up').forEach(el => obs.observe(el));
}