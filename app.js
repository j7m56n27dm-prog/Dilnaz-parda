/* --- MA'LUMOTLAR BAZASI (Buzilmas tizim) --- */
const catalogDB = {
    imperia: [
        {
            title: "Premium Zebra (Oq)", 
            tags: "zebra ofis",
            // Rasm o'rniga rangli blok (ishlashini tekshirish uchun)
            // Keyinroq o'z rasmingizga almashtiring: "./assets/images/zebra1.jpg"
            src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2Q0YWYzNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+WmVicmEgMTwvdGV4dD48L3N2Zz4=" 
        },
        {
            title: "Rollo Pardalar", 
            tags: "rollo ofis",
            src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Um9sbG8gMjwvdGV4dD48L3N2Zz4="
        }
    ],
    dilnaz: [
        {
            title: "Baxmal Parda (Zal uchun)", 
            tags: "dizayn uy",
            src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzgwMDAwMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RGlsbmF6IERlc2lnbjwvdGV4dD48L3N2Zz4="
        }
    ],
    homes: [
        {
            title: "Ibn Sino ko'chasida o'rnatilgan", 
            tags: "mijoz samarqand",
            src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzU1NSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TWlqb3ogVXlpPC90ZXh0Pjwvc3ZnPg=="
        }
    ]
};

/* --- TARJIMALAR --- */
const texts = {
    uz: {
        nav_home: "Bosh sahifa", nav_services: "Xizmatlar", nav_catalog: "Katalog", nav_course: "Kurslar", nav_contact: "Aloqa",
        hero_title: "Imperia Shtor va Dilnaz Pardalari", hero_desc: "Sifat, kafolat va eksklyuziv dizayn. Uyingiz ko'rkiga ko'rk qo'shamiz.",
        btn_call: "Qo'ng'iroq qilish", services_title: "Xizmatlarimiz",
        srv_1: "O'lchov va O'rnatish", srv_1_desc: "Mutaxassislarimiz bepul o'lchov oladi va tayyor pardalarni o'rnatib beradi.",
        srv_2: "Imperia Shtor", srv_2_desc: "Keng turdagi tayyor jaluzi va pardalar savdosi.",
        srv_3: "Dilnaz Pardalari", srv_3_desc: "Individual dizayn va sifatli tikuv xizmati.",
        catalog_title: "Katalog", course_title: "Parda Tikish Kurslari", course_desc: "Dilnoza Fayzieva bilan 0 dan professional darajagacha o'rganing.", course_btn: "Kursga Yozilish",
        contact_title: "Bog'lanish", addr: "Samarqand, Ibn Sino ko'chasi, 23A"
    },
    ru: {
        nav_home: "Главная", nav_services: "Услуги", nav_catalog: "Каталог", nav_course: "Курсы", nav_contact: "Контакты",
        hero_title: "Imperia Shtor и Dilnaz Pardalari", hero_desc: "Качество, гарантия и эксклюзивный дизайн. Уют вашего дома.",
        btn_call: "Позвонить", services_title: "Наши Услуги",
        srv_1: "Замер и Установка", srv_1_desc: "Бесплатный замер и профессиональная установка.",
        srv_2: "Imperia Shtor", srv_2_desc: "Широкий ассортимент жалюзи и штор.",
        srv_3: "Dilnaz Pardalari", srv_3_desc: "Индивидуальный дизайн и качественный пошив.",
        catalog_title: "Каталог", course_title: "Курсы Шитья", course_desc: "Обучение с нуля до профессионала с Дильнозой Файзиевой.", course_btn: "Записаться на курс",
        contact_title: "Контакты", addr: "Самарканд, ул. Ибн Сины, 23А"
    }
};

/* --- LOGIKA --- */
let currentLang = 'uz';
let currentTheme = 'light';
let activeCategory = 'imperia';
let currentGallery = [];
let slideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dastlabki yuklash
    renderGallery(activeCategory);
    
    // 2. Tablar (Imperia / Dilnaz / Homes)
    document.querySelectorAll('.tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = e.target.dataset.cat;
            renderGallery(activeCategory);
        });
    });

    // 3. Tilni o'zgartirish
    document.getElementById('lang-btn').addEventListener('click', () => {
        currentLang = currentLang === 'uz' ? 'ru' : 'uz';
        document.getElementById('lang-btn').textContent = currentLang.toUpperCase();
        updateTexts();
    });

    // 4. Qora/Oq mavzu
    document.getElementById('theme-btn').addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', currentTheme);
    });

    // 5. Mobil menyu
    const menu = document.getElementById('mobile-menu');
    document.getElementById('menu-btn').addEventListener('click', () => menu.classList.add('active'));
    document.querySelector('.close-menu').addEventListener('click', () => menu.classList.remove('active'));
    document.querySelectorAll('.m-link').forEach(l => l.addEventListener('click', () => menu.classList.remove('active')));

    // 6. Qidiruv
    document.getElementById('search').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        renderGallery(activeCategory, val);
    });

    // 7. Lightbox
    const lb = document.getElementById('lightbox');
    document.querySelector('.close-lb').addEventListener('click', () => lb.classList.remove('active'));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
});

function renderGallery(cat, filter = "") {
    const container = document.getElementById('gallery');
    container.innerHTML = "";
    currentGallery = [];

    const items = catalogDB[cat];
    items.forEach(item => {
        if(item.title.toLowerCase().includes(filter) || item.tags.includes(filter)) {
            currentGallery.push(item);
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${item.src}" alt="${item.title}">
                <div class="overlay">${item.title}</div>
            `;
            div.onclick = () => openLightbox(currentGallery.length - 1);
            container.appendChild(div);
        }
    });
}

function updateTexts() {
    const t = texts[currentLang];
    document.querySelectorAll('[data-key]').forEach(el => {
        el.textContent = t[el.dataset.key];
    });
}

function openLightbox(idx) {
    slideIndex = idx;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}

function updateLightbox() {
    const item = currentGallery[slideIndex];
    document.getElementById('lb-img').src = item.src;
    document.getElementById('lb-caption').textContent = item.title;
}

function changeSlide(n) {
    slideIndex = (slideIndex + n + currentGallery.length) % currentGallery.length;
    updateLightbox();
}