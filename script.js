// ========== VILLAGER - 3 TILDA REAL AI ==========

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// ========== TIL MA'LUMOTLARI ==========
const translations = {
    uz: {
        appTitle: "VILLAGER",
        welcome: "Assalomu alaykum, fermer!",
        animalQuestion: "Qaysi turdagi hayvon bilan muammoingiz bor?",
        problemQuestion: "Muammo turi?",
        detailedQuestion: "Muammoni aniq tasvirlang",
        optionFeed: "🌾 Oziqlanish muammosi",
        optionGrowth: "📉 O'sish sustligi",
        optionVaccine: "💉 Emlash / kasalliklar",
        next: "Davom etish",
        back: "Ortga",
        restart: "Yangi muammo",
        loading: "🤖 AI tahlil qilmoqda...",
        contact: "Expertlar bilan aloqa",
        whatToDo: "Nima qilish kerak?",
        howToDo: "Qanday qilinadi?",
        home: "Bosh sahifa",
        footer: "An'anaviy bilim va zamonaviy texnologiya",
        variants: [
            "🥚 Tuxum sifati yomonlashgan",
            "🍂 Tuklari to'kilmoqda",
            "🦠 Nafas olish qiyin",
            "📉 Ishtaha yo'qolgan",
            "🦵 Oyoqlarida shish",
            "💩 Ich ketish",
            "🧠 Asabiy alomatlar",
            "🐛 Parazitlar / bit",
            "🏠 Noto'g'ri parvarish",
            "✍️ Boshqa (o‘zingiz yozing)"
        ]
    },
    ru: {
        appTitle: "VILLAGER",
        welcome: "Здравствуйте, фермер!",
        animalQuestion: "С каким животным у вас проблема?",
        problemQuestion: "Тип проблемы?",
        detailedQuestion: "Опишите проблему подробно",
        optionFeed: "🌾 Проблемы с питанием",
        optionGrowth: "📉 Медленный рост",
        optionVaccine: "💉 Вакцинация / болезни",
        next: "Продолжить",
        back: "Назад",
        restart: "Новая проблема",
        loading: "🤖 AI анализирует...",
        contact: "Связаться с экспертами",
        whatToDo: "Что делать?",
        howToDo: "Как сделать?",
        home: "Главная",
        footer: "Традиционные знания и современные технологии",
        variants: [
            "🥚 Ухудшение качества яиц",
            "🍂 Выпадение перьев",
            "🦠 Затрудненное дыхание",
            "📉 Потеря аппетита",
            "🦵 Опухоль ног",
            "💩 Диарея",
            "🧠 Нервные симптомы",
            "🐛 Паразиты/вши",
            "🏠 Неправильный уход",
            "✍️ Другое (напишите сами)"
        ]
    },
    en: {
        appTitle: "VILLAGER",
        welcome: "Hello, farmer!",
        animalQuestion: "Which animal has a problem?",
        problemQuestion: "Type of problem?",
        detailedQuestion: "Describe the problem in detail",
        optionFeed: "🌾 Nutrition problem",
        optionGrowth: "📉 Slow growth",
        optionVaccine: "💉 Vaccination / diseases",
        next: "Continue",
        back: "Back",
        restart: "New problem",
        loading: "🤖 AI is analyzing...",
        contact: "Contact experts",
        whatToDo: "What to do?",
        howToDo: "How to do it?",
        home: "Home",
        footer: "Traditional knowledge and modern technology",
        variants: [
            "🥚 Poor egg quality",
            "🍂 Feather loss",
            "🦠 Difficulty breathing",
            "📉 Loss of appetite",
            "🦵 Leg swelling",
            "💩 Diarrhea",
            "🧠 Nervous symptoms",
            "🐛 Parasites/lice",
            "🏠 Improper care",
            "✍️ Other (write yourself)"
        ]
    }
};

let currentLang = "uz";
let state = {
    step: 1,
    animal: null,
    problem: null,
    detailedIssue: null,
    solution: null,
    loading: false
};

// ========== DOM ELEMENTLARI ==========
const appDiv = document.getElementById("app");
const contentDiv = document.getElementById("content");
const loadingContainer = document.getElementById("loadingContainer");
const mainMenu = document.getElementById("mainMenu");
const homeBtn = document.getElementById("homeBtn");
const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
const languageMenu = document.getElementById("languageMenu");

// ========== TEMA FUNKSIYALARI ==========
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector("i");
    if (theme === "dark") {
        icon.className = "fas fa-sun";
    } else {
        icon.className = "fas fa-moon";
    }
}

// ========== TIL FUNKSIYALARI ==========
function initLanguage() {
    const savedLang = localStorage.getItem("language") || "uz";
    currentLang = savedLang;
    updateLanguageUI();
}

function updateLanguageUI() {
    document.getElementById("currentLang").innerText = currentLang === "uz" ? "O'zbek" : (currentLang === "ru" ? "Русский" : "English");
    render(); // Sahifani qayta render qilish
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);
    languageMenu.style.display = "none";
    updateLanguageUI();
}

function t(key, fallback = "") {
    return translations[currentLang]?.[key] || fallback || key;
}

// ========== REAL AI FUNKSIYASI ==========
async function callGeminiAPI(prompt) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        return null;
    }
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${prompt}\n\nJavobni quyidagi tillarda bering: O'zbek, Rus, Ingliz. Har bir til uchun alohida bo'lim yarating.` }]
                }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0]) {
            return data.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (error) {
        console.error("API xatosi:", error);
        return null;
    }
}

async function processAI() {
    state.loading = true;
    showLoading();
    
    const prompt = `
Siz "VILLAGER" qishloq xo'jaligi ekspertisiz.
Hayvon: ${state.animal}
Muammo turi: ${state.problem}
Batafsil: ${state.detailedIssue}

3 tilda (O'zbek, Rus, Ingliz) quyidagi formatda javob bering:

【O'zbek】
📌 MUAMMO: 
✅ NIMA QILISH KERAK:
🛠 QANDAY QILINADI:
📞 ALOQA:

【Русский】
📌 ПРОБЛЕМА:
✅ ЧТО ДЕЛАТЬ:
🛠 КАК СДЕЛАТЬ:
📞 КОНТАКТЫ:

【English】
📌 PROBLEM:
✅ WHAT TO DO:
🛠 HOW TO DO:
📞 CONTACT:
`;
    
    const aiResponse = await callGeminiAPI(prompt);
    
    if (aiResponse) {
        state.solution = {
            title: "AI maslahati",
            content: aiResponse,
            svgType: "ai_premium"
        };
    } else {
        state.solution = {
            title: t("welcome", "🌾 AI Maslahat"),
            content: getOfflineSolution(),
            svgType: "ai_premium"
        };
    }
    
    state.loading = false;
    state.step = 4;
    hideLoading();
    render();
}

function getOfflineSolution() {
    const solutions = {
        parrandalar: {
            uz: "📌 MUAMMO: Parranda oziqlanishi\n✅ NIMA QILISH KERAK: Vitamin va mineral qo'shimchalar bering\n🛠 QANDAY QILINADI: 1. Ozuva sifatini tekshiring\n2. Premiks qo'shing\n📞 ALOQA: +998 71 200 55 11",
            ru: "📌 ПРОБЛЕМА: Питание птицы\n✅ ЧТО ДЕЛАТЬ: Добавьте витамины и минералы\n🛠 КАК СДЕЛАТЬ: 1. Проверьте качество корма\n2. Добавьте премикс\n📞 КОНТАКТЫ: +998 71 200 55 11",
            en: "📌 PROBLEM: Poultry nutrition\n✅ WHAT TO DO: Add vitamins and minerals\n🛠 HOW TO DO: 1. Check feed quality\n2. Add premix\n📞 CONTACT: +998 71 200 55 11"
        }
    };
    return solutions[state.animal]?.[currentLang] || solutions.parrandalar[currentLang];
}

// ========== RENDER FUNKSIYALARI ==========
function showLoading() {
    loadingContainer.style.display = "block";
    contentDiv.style.display = "none";
}

function hideLoading() {
    loadingContainer.style.display = "none";
    contentDiv.style.display = "block";
}

function render() {
    if (state.loading) return;
    
    if (state.step === 1) renderAnimal();
    else if (state.step === 2) renderProblem();
    else if (state.step === 3) renderDetailedQuestion();
    else if (state.step === 4) renderResult();
    
    mainMenu.style.display = (state.step === 4) ? "flex" : "none";
}

function renderAnimal() {
    contentDiv.innerHTML = `
        <div class="card">
            <h1>🏘️ ${t("appTitle")}</h1>
            <div class="question">${t("animalQuestion")}</div>
            <div class="options-grid">
                <button class="option-btn" data-animal="parrandalar">🐔 ${currentLang === 'uz' ? 'Parrandalar' : (currentLang === 'ru' ? 'Птица' : 'Poultry')}</button>
                <button class="option-btn" data-animal="qoramollar">🐄 ${currentLang === 'uz' ? 'Qoramollar' : (currentLang === 'ru' ? 'Крупный рогатый скот' : 'Cattle')}</button>
                <button class="option-btn" data-animal="qo'y-echkilar">🐑 ${currentLang === 'uz' ? 'Qo\'y-echkilar' : (currentLang === 'ru' ? 'Овцы и козы' : 'Sheep & Goats')}</button>
            </div>
        </div>
    `;
    
    document.querySelectorAll("[data-animal]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            state.animal = e.currentTarget.getAttribute("data-animal");
            state.step = 2;
            render();
        });
    });
}

function renderProblem() {
    contentDiv.innerHTML = `
        <div class="card">
            <h2>${state.animal === "parrandalar" ? "🐔" : (state.animal === "qoramollar" ? "🐄" : "🐑")}</h2>
            <div class="question">${t("problemQuestion")}</div>
            <div class="options-grid">
                <button class="option-btn" data-problem="oziqlanishdagi muammo">${t("optionFeed")}</button>
                <button class="option-btn" data-problem="O'sishda ortda qolish">${t("optionGrowth")}</button>
                <button class="option-btn" data-problem="emlash">${t("optionVaccine")}</button>
            </div>
            <button class="restart-btn" id="resetStep2">⬅️ ${t("back")}</button>
        </div>
    `;
    
    document.querySelectorAll("[data-problem]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            state.problem = e.currentTarget.getAttribute("data-problem");
            state.step = 3;
            render();
        });
    });
    
    document.getElementById("resetStep2")?.addEventListener("click", () => {
        state.step = 1;
        render();
    });
}

function renderDetailedQuestion() {
    const variants = t("variants");
    let optionsHtml = `<div class="options-grid">`;
    variants.forEach((v, idx) => {
        if (idx === 9) {
            optionsHtml += `<div class="custom-option-btn" data-custom="true">${v}</div>`;
        } else {
            optionsHtml += `<button class="option-btn" data-val="${idx}">${v}</button>`;
        }
    });
    optionsHtml += `</div><div id="customInputArea" style="display:none; margin-top:1rem;"></div>
    <button class="restart-btn" id="backStep3">⬅️ ${t("back")}</button>`;
    
    contentDiv.innerHTML = `<div class="card"><div class="question">❓ ${t("detailedQuestion")}</div>${optionsHtml}</div>`;
    
    document.querySelectorAll(".option-btn:not([data-custom])").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.currentTarget.getAttribute("data-val");
            state.detailedIssue = variants[idx];
            processAI();
        });
    });
    
    const customBtn = document.querySelector("[data-custom='true']");
    if (customBtn) {
        customBtn.addEventListener("click", () => {
            const area = document.getElementById("customInputArea");
            area.style.display = "block";
            area.innerHTML = `<div class="custom-input-group"><input type="text" id="customProblemInput" placeholder="${currentLang === 'uz' ? 'Muammoingizni yozing...' : (currentLang === 'ru' ? 'Напишите вашу проблему...' : 'Write your problem...')}" autocomplete="off"><button id="submitCustom" class="next-btn">${t("next")}</button></div>`;
            document.getElementById("submitCustom")?.addEventListener("click", () => {
                const val = document.getElementById("customProblemInput").value.trim();
                state.detailedIssue = val || "Umumiy maslahat kerak";
                processAI();
            });
        });
    }
    
    document.getElementById("backStep3")?.addEventListener("click", () => {
        state.step = 2;
        render();
    });
}

function renderResult() {
    contentDiv.innerHTML = `
        <div class="card">
            <h2>🤖 VILLAGER AI</h2>
            <div class="info-box">
                <div style="white-space: pre-wrap; line-height: 1.6;">${state.solution.content}</div>
                <div class="solution-img">
                    <strong>🎨 ${currentLang === 'uz' ? 'Vaziyat sxemasi' : (currentLang === 'ru' ? 'Схема ситуации' : 'Situation diagram')}</strong><br>
                    ${getPremiumSvg()}
                </div>
            </div>
            <button class="restart-btn" id="finishRestart">➕ ${t("restart")}</button>
        </div>
    `;
    
    document.getElementById("finishRestart")?.addEventListener("click", resetAll);
}

function resetAll() {
    state = { step: 1, animal: null, problem: null, detailedIssue: null, solution: null, loading: false };
    render();
}

function getPremiumSvg() {
    return `<svg width="100%" height="180" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid meet">
        <rect width="400" height="180" fill="url(#grad)" rx="20"/>
        <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4a017;stop-opacity:0.2"/>
            <stop offset="100%" style="stop-color:#2d6a2d;stop-opacity:0.2"/>
        </linearGradient></defs>
        <text x="200" y="80" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">🏘️ VILLAGER</text>
        <text x="200" y="110" text-anchor="middle" fill="currentColor" font-size="12">${currentLang === 'uz' ? 'Qishloq donishmandi' : (currentLang === 'ru' ? 'Деревенский мудрец' : 'Village sage')}</text>
        <text x="200" y="140" text-anchor="middle" fill="currentColor" font-size="11">⚘ ${currentLang === 'uz' ? 'An\'anaviy bilim' : (currentLang === 'ru' ? 'Традиционные знания' : 'Traditional wisdom')} ⚘</text>
    </svg>`;
}

// ========== EVENT LISTENERS ==========
homeBtn.addEventListener("click", () => {
    if (state.step === 4) resetAll();
});

langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    languageMenu.style.display = languageMenu.style.display === "none" ? "block" : "none";
});

themeBtn.addEventListener("click", toggleTheme);

document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        setLanguage(e.currentTarget.getAttribute("data-lang"));
    });
});

document.addEventListener("click", () => {
    languageMenu.style.display = "none";
});

// ========== BOSHLASH ==========
initTheme();
initLanguage();
render();