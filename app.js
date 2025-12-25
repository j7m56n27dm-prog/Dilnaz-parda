/* === GLOBAL O'ZGARUVCHILAR === */
const appState = {
    lang: localStorage.getItem('lang') || 'uz',
    theme: localStorage.getItem('theme') || 'light',
    data: null,
    currentImages: [],
    currentIndex: 0
};

/* === TARJIMALAR (DICTIONARY) === */
const translations = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_desc: "Uyingiz ko'rkiga ko'rk qo'shuvchi zamonaviy jaluzilar va eksklyuziv parda dizaynlari.",
        btn_call: "Qo'ng'iroq qilish", btn_catalog: "Katalogni ko'rish",
        services_title: "Bizning Xizmatlar",
        srv_measure: "O'lchov va O'rnatish", srv_measure_desc: "Mutaxassislarimiz bepul o'lchov oladi va tayyor pardalarni o'rnatib beradi.",
        srv_jaluzi: "Tayyor Jaluzi", srv_jaluzi_desc: "\"Imperia Shtor\" do'konida keng assortimentdagi zamonaviy jaluzi va tayyor pardalar.",
        srv_sewing: "Dizayn va Tikish", srv_sewing_desc: "\"Dilnaz Pardalari\" — har bir mijoz uchun individual dizayn va professional tikuv xizmati.",
        catalog_title: "Katalog", search_ph: "Qidirish...",
        course_title: "Parda Tikish va Dizayn Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing. Amaliy darslar.", course_btn: "Telegramdan yozish",
        contact_title: "Bog'lanish", address_text: "Samarqand sh., Ibn Sino ko'chasi, 23A", btn_map: "Yandex Kartada ochish"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Imperia Shtor и Dilnaz Pardalari", hero_desc: "Современные жалюзи и эксклюзивный дизайн штор для уюта вашего дома.",
        btn_call: "Позвонить", btn_catalog: "Смотреть каталог",
        services_title: "Наши Услуги",
        srv_measure: "Замер и Установка", srv_measure_desc: "Наши специалисты бесплатно сделают замер и установят готовые шторы.",
        srv_jaluzi: "Готовые Жалюзи", srv_jaluzi_desc: "Широкий ассортимент современных жалюзи и готовых штор в магазине \"Imperia Shtor\".",
        srv_sewing: "Дизайн и Пошив", srv_sewing_desc: "\"Dilnaz Pardalari\" — индивидуальный дизайн и профессиональный пошив для каждого клиента.",
        catalog_title: "Каталог", search_ph: "Поиск...",
        course_title: "Курсы Дизайна и Шитья", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой. Практические занятия.", course_btn: "Написать в Telegram",
        contact_title: "Контакты", address_text: "г. Самарканд, ул. Ибн Сины, 23А", btn_map: "Открыть в Яндекс Картах"
    }
};

/* === SAYT YUKLANGANDA === */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mavzuni va Tilni sozlash
    applyTheme();
    applyLanguage();

    // 2. Hodisalarni ulash (Events)
    setupEventListeners();

    // 3. Ma'lumotni yuklash (Fetch JSON)
    fetchCatalogData();
});

/* === FUNKSIYALAR === */

// 1. Ma'lumotni olish
async function fetchCatalogData() {
    try {
        const response = await fetch('./assets/data/catalog.json');
        
        // Agar javob xato bo'lsa
        if (!response.ok) throw new Error(`HTTP Xato: ${response.status}`);
        
        appState.data = await response.json();
        
        // Preloaderni o'chirish
        document.getElementById('preloader').style.display = 'none';
        
        // Katalogni chizish (Default: imperia)
        renderGallery('imperia');

    } catch (error) {
        console.error("Katalogni yuklashda xatolik:", error);
        
        // Ekranga xato haqida xabar chiqarish (Foydalanuvchi tushunishi uchun)
        document.getElementById('preloader').innerHTML = `
            <div style="text-align:center; padding:20px; color:red;">
                <h3>Ma'lumot yuklanmadi!</h3>
                <p>Agar bu faylni to'g'ridan-to'g'ri ochgan bo'lsangiz, brauzer JSON faylni o'qiy olmaydi (CORS).</p>
                <p>Iltimos, VS Code "Live Server" ishlating yoki GitHub Pages'ga yuklang.</p>
            </div>
        `;
    }
}

// 2. Galereyani chizish
function renderGallery(category, searchTerm = "") {
    const container = document.getElementById('gallery-container');
    const noDataMsg = document.getElementById('no-data-message');
    container.innerHTML = ""; // Tozalash
    appState.currentImages = []; // Rasmlar ro'yxatini yangilash

    if (!appState.data || !appState.data[category]) return;

    // Tanlangan kategoriyadagi barcha albomlarni yig'ish
    appState.data[category].forEach(album => {
        const title = appState.lang === 'uz' ? album.title_uz : album.title_ru;
        
        album.images.forEach(img => {
            const alt = appState.lang === 'uz' ? img.alt_uz : img.alt_ru;
            
            // Qidiruv (Search) logikasi
            const fullText = (title + " " + alt + " " + album.tags.join(" ")).toLowerCase();
            if (fullText.includes(searchTerm.toLowerCase())) {
                
                // Rasm obyekti
                const imageObj = { src: img.src, title: title, desc: alt };
                appState.currentImages.push(imageObj);
                
                // HTML element yaratish
                const index = appState.currentImages.length - 1;
                const div = document.createElement('div');
                div.className = "gallery-item";
                div.innerHTML = `
                    <img src="${img.src}" alt="${alt}" loading="lazy">
                    <div class="gallery-overlay">
                        <h4>${title}</h4>
                    </div>
                `;
                div.onclick = () => openLightbox(index);
                container.appendChild(div);
            }
        });
    });

    // Agar rasm topilmasa
    if (appState.currentImages.length === 0) {
        noDataMsg.style.display = "block";
    } else {
        noDataMsg.style.display = "none";
    }
}

// 3. Lightbox (Rasm kattalashtirish)
function openLightbox(index) {
    appState.currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox-modal').style.display = "block";
}

function closeLightbox() {
    document.getElementById('lightbox-modal').style.display = "none";
}

function updateLightbox() {
    const img = appState.currentImages[appState.currentIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = img.src;
    caption.innerText = `${img.title} - ${img.desc}`;
}

function changeSlide(n) {
    const len = appState.currentImages.length;
    appState.currentIndex = (appState.currentIndex + n + len) % len;
    updateLightbox();
}

// 4. Sozlamalar va Hodisalar
function setupEventListeners() {
    // Tilni o'zgartirish
    document.getElementById('lang-switch').addEventListener('click', () => {
        appState.lang = appState.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('lang', appState.lang);
        applyLanguage();
        // Katalogni qayta yuklash (tarjimalar o'zgarishi uchun)
        const activeCat = document.querySelector('.filter-btn.active').getAttribute('data-category');
        renderGallery(activeCat, document.getElementById('search-input').value);
    });

    // Mavzuni o'zgartirish (Dark/Light)
    document.getElementById('theme-switch').addEventListener('click', () => {
        appState.theme = appState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', appState.theme);
        applyTheme();
    });

    // Mobil menyu
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
    });
    document.getElementById('close-menu-btn').addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
    // Link bosilganda yopish
    document.querySelectorAll('.m-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });

    // Filtr tugmalari
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.getAttribute('data-category'));
        });
    });

    // Qidiruv
    document.getElementById('search-input').addEventListener('input', (e) => {
        const activeCat = document.querySelector('.filter-btn.active').getAttribute('data-category');
        renderGallery(activeCat, e.target.value);
    });

    // Lightbox yopish
    document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
}

// 5. Yordamchi funksiyalar
function applyTheme() {
    document.documentElement.setAttribute('data-theme', appState.theme);
    document.getElementById('theme-switch').innerText = appState.theme === 'light' ? '🌙' : '☀️';
}

function applyLanguage() {
    document.getElementById('lang-switch').innerText = appState.lang.toUpperCase();
    const texts = translations[appState.lang];
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (texts[key]) el.innerText = texts[key];
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (texts[key]) el.placeholder = texts[key];
    });
}