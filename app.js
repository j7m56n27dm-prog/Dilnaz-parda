/* STATE */
const state = {
    lang: localStorage.getItem('site_lang') || 'uz',
    theme: localStorage.getItem('site_theme') || 'light',
    catalogData: null,
    currentGallery: [],
    currentImageIndex: 0
};

/* DICTIONARY (STATIC UI) */
const translations = {
    uz: {
        nav_home: "Bosh sahifa",
        nav_services: "Xizmatlar",
        nav_catalog: "Katalog",
        nav_process: "Jarayon",
        nav_contact: "Bog‘lanish",
        hero_title: "Uyingizga Haqiqiy Ko‘rkamlik Baxsh Etamiz",
        hero_subtitle: "\"Imperia Shtor\" va \"Dilnaz Pardalari\" — sifat, dizayn va qulaylik uyg‘unligi. O‘lchashdan tortib o‘rnatishgacha bo‘lgan to‘liq servis.",
        btn_telegram: "Telegramga yozish",
        btn_call: "Qo‘ng‘iroq qilish",
        btn_location: "Lokatsiya",
        section_services_title: "Bizning Xizmatlar",
        section_services_desc: "Professional yondashuv va kafolatlangan sifat",
        serv_jaluzi: "Jaluzi va Pardalar",
        serv_jaluzi_desc: "Bepul o‘lchov, dizayn tanlash va sifatli o‘rnatib berish.",
        serv_sewing: "Tikuv va Dizayn",
        serv_sewing_desc: "Dilnaz Pardalari tomonidan eksklyuziv fasonlar va sifatli tikuv.",
        serv_consult: "Dizayner Maslahati",
        serv_consult_desc: "Interyeringizga mos rang va mato tanlashda professional yordam.",
        course_title: "Parda Tikish va Dizaynerlik Darslari",
        course_point1: "0 dan professional darajagacha",
        course_point2: "Amaliy mashg‘ulotlar",
        course_point3: "Sertifikat va ish bilan ta'minlash",
        course_cta: "Kursga yozilish",
        section_catalog_title: "Kataloglarimiz",
        tab_imperia: "Imperia Shtor",
        tab_homes: "Mijozlar Uyida",
        tab_dilnaz: "Dilnaz Ishlari",
        section_process_title: "Ish Jarayoni",
        step_1: "O‘lchov",
        step_2: "Dizayn",
        step_3: "Tikuv",
        step_4: "O‘rnatish",
        step_5: "Kafolat",
        section_faq_title: "Ko‘p so‘raladigan savollar",
        faq_q1: "O‘lchov olish bepulmi?",
        faq_a1: "Ha, Samarqand shahri ichida o‘lchov olish mutlaqo bepul.",
        faq_q2: "Buyurtma necha kunda tayyor bo‘ladi?",
        faq_a2: "Hajmiga qarab 3 kundan 7 kungacha vaqt oladi.",
        faq_q3: "Toshkentga yetkazib berish bormi?",
        faq_a3: "Ha, Toshkent va boshqa viloyatlarga kelishilgan holda xizmat ko‘rsatamiz.",
        section_contact_title: "Bog‘lanish",
        contact_address: "Samarqand sh., Amir Temur ko'chasi",
        btn_map: "Kartada ko‘rish"
    },
    ru: {
        nav_home: "Главная",
        nav_services: "Услуги",
        nav_catalog: "Каталог",
        nav_process: "Процесс",
        nav_contact: "Контакты",
        hero_title: "Придайте Вашему Дому Истинный Уют",
        hero_subtitle: "\"Imperia Shtor\" и \"Dilnaz Pardalari\" — сочетание качества, дизайна и комфорта. Полный сервис от замера до установки.",
        btn_telegram: "Написать в Telegram",
        btn_call: "Позвонить",
        btn_location: "Локация",
        section_services_title: "Наши Услуги",
        section_services_desc: "Профессиональный подход и гарантированное качество",
        serv_jaluzi: "Жалюзи и Шторы",
        serv_jaluzi_desc: "Бесплатный замер, подбор дизайна и качественная установка.",
        serv_sewing: "Пошив и Дизайн",
        serv_sewing_desc: "Эксклюзивные фасоны и качественный пошив от Dilnaz Pardalari.",
        serv_consult: "Консультация Дизайнера",
        serv_consult_desc: "Профессиональная помощь в подборе цвета и ткани для вашего интерьера.",
        course_title: "Курсы Шитья и Дизайна Штор",
        course_point1: "С 0 до профессионального уровня",
        course_point2: "Практические занятия",
        course_point3: "Сертификат и трудоустройство",
        course_cta: "Записаться на курс",
        section_catalog_title: "Наши Каталоги",
        tab_imperia: "Imperia Shtor",
        tab_homes: "Работы у Клиентов",
        tab_dilnaz: "Работы Dilnaz",
        section_process_title: "Процесс Работы",
        step_1: "Замер",
        step_2: "Дизайн",
        step_3: "Пошив",
        step_4: "Установка",
        step_5: "Гарантия",
        section_faq_title: "Часто задаваемые вопросы",
        faq_q1: "Замер бесплатный?",
        faq_a1: "Да, внутри города Самарканд замер абсолютно бесплатный.",
        faq_q2: "Сколько времени занимает заказ?",
        faq_a2: "В зависимости от объема, от 3 до 7 дней.",
        faq_q3: "Есть ли доставка в Ташкент?",
        faq_a3: "Да, мы обслуживаем Ташкент и другие регионы по договоренности.",
        section_contact_title: "Контакты",
        contact_address: "г. Самарканд, ул. Амира Темура",
        btn_map: "Посмотреть на карте"
    }
};

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    applyLanguage();
    setupEventListeners();
    fetchCatalog();
    setupScrollReveal();
});

/* FUNCTIONS */

function setupEventListeners() {
    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    langBtn.addEventListener('click', () => {
        state.lang = state.lang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('site_lang', state.lang);
        langBtn.textContent = state.lang === 'uz' ? 'RU' : 'UZ';
        applyLanguage();
        renderGallery(document.querySelector('.tab-btn.active').dataset.target); // Re-render gallery for titles
    });
    langBtn.textContent = state.lang === 'uz' ? 'RU' : 'UZ';

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('site_theme', state.theme);
        applyTheme();
    });

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.target);
        });
    });

    // Lightbox Controls
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    document.querySelector('.next').addEventListener('click', nextImage);
    document.querySelector('.prev').addEventListener('click', prevImage);
    
    // Keyboard Nav
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('lightbox').classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function applyLanguage() {
    const t = translations[state.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
}

async function fetchCatalog() {
    try {
        const response = await fetch('./assets/data/catalog.json');
        state.catalogData = await response.json();
        renderGallery('imperia'); // Default tab
    } catch (error) {
        console.error('Error loading catalog:', error);
        document.getElementById('gallery-container').innerHTML = '<p style="text-align:center">Katalogni yuklashda xatolik yuz berdi. Iltimos qayta urinib ko\'ring.</p>';
    }
}

function renderGallery(category) {
    const container = document.getElementById('gallery-container');
    if (!state.catalogData || !state.catalogData[category]) return;

    container.innerHTML = '';
    state.currentGallery = []; // Reset current flattened gallery list

    // Flatten logic: Iterate through albums in category and grab all images
    state.catalogData[category].forEach(album => {
        album.images.forEach(img => {
            // Add album context to image object
            const imgObj = {
                src: img.src,
                alt: state.lang === 'uz' ? img.alt_uz : img.alt_ru,
                albumTitle: state.lang === 'uz' ? album.title_uz : album.title_ru
            };
            state.currentGallery.push(imgObj);

            // Create DOM
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${imgObj.src}" alt="${imgObj.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <p>${imgObj.albumTitle}</p>
                </div>
            `;
            item.addEventListener('click', () => openLightbox(state.currentGallery.indexOf(imgObj)));
            container.appendChild(item);
        });
    });
}

/* LIGHTBOX LOGIC */
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    state.currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const imgData = state.currentGallery[state.currentImageIndex];
    const imgEl = document.querySelector('.lightbox-img');
    const capEl = document.querySelector('.lightbox-caption');
    
    imgEl.src = imgData.src;
    imgEl.alt = imgData.alt;
    capEl.textContent = imgData.albumTitle;
}

function nextImage() {
    state.currentImageIndex = (state.currentImageIndex + 1) % state.currentGallery.length;
    updateLightboxContent();
}

function prevImage() {
    state.currentImageIndex = (state.currentImageIndex - 1 + state.currentGallery.length) % state.currentGallery.length;
    updateLightboxContent();
}

/* SCROLL ANIMATION */
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}
