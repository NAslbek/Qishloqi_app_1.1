// ========== VILLAGER - 3 TILDA, HISTORY, CHECKLIST ==========

// API sozlamalari (ixtiyoriy)
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

// ========== TIL MA'LUMOTLARI ==========
const translations = {
    uz: {
        appTitle: "VILLAGER", welcome: "Assalomu alaykum, fermer!",
        animalQuestion: "Qaysi turdagi hayvon bilan muammoingiz bor?",
        problemQuestion: "Muammo turi?",
        detailedQuestion: "Muammoni aniq tasvirlang",
        optionFeed: "🌾 Oziqlanish muammosi",
        optionGrowth: "📉 O'sish sustligi",
        optionVaccine: "💉 Emlash / kasalliklar",
        next: "Davom etish", back: "Ortga", restart: "Yangi muammo",
        loading: "🤖 AI tahlil qilmoqda...", contact: "Expertlar bilan aloqa",
        whatToDo: "Nima qilish kerak?", howToDo: "Qanday qilinadi?",
        home: "Bosh sahifa", footer: "An'anaviy bilim va zamonaviy texnologiya",
        save: "Saqlash", download: "Yuklab olish", history: "Tarix"
    },
    ru: {
        appTitle: "VILLAGER", welcome: "Здравствуйте, фермер!",
        animalQuestion: "С каким животным у вас проблема?",
        problemQuestion: "Тип проблемы?",
        detailedQuestion: "Опишите проблему подробно",
        optionFeed: "🌾 Проблемы с питанием",
        optionGrowth: "📉 Медленный рост",
        optionVaccine: "💉 Вакцинация / болезни",
        next: "Продолжить", back: "Назад", restart: "Новая проблема",
        loading: "🤖 AI анализирует...", contact: "Связаться с экспертами",
        whatToDo: "Что делать?", howToDo: "Как сделать?",
        home: "Главная", footer: "Традиционные знания и современные технологии",
        save: "Сохранить", download: "Скачать", history: "История"
    },
    en: {
        appTitle: "VILLAGER", welcome: "Hello, farmer!",
        animalQuestion: "Which animal has a problem?",
        problemQuestion: "Type of problem?",
        detailedQuestion: "Describe the problem in detail",
        optionFeed: "🌾 Nutrition problem",
        optionGrowth: "📉 Slow growth",
        optionVaccine: "💉 Vaccination / diseases",
        next: "Continue", back: "Back", restart: "New problem",
        loading: "🤖 AI is analyzing...", contact: "Contact experts",
        whatToDo: "What to do?", howToDo: "How to do it?",
        home: "Home", footer: "Traditional knowledge and modern technology",
        save: "Save", download: "Download", history: "History"
    }
};

// Hayvon turiga qarab 3-savol variantlari
const dynamicVariants = {
    parrandalar: [
        "🥚 Tuxum sifati yomonlashgan / kamaygan",
        "🍂 Tuklari to'kilmoqda, pati xira",
        "🦠 Nafas olish qiyin, aksa urish",
        "📉 Ishtaha yo'qolgan, suv ichmaydi",
        "🦵 Oyoqlarida shish, oqsoqlanish",
        "💩 Ich ketish / rangli najas",
        "🧠 Asabiy alomatlar (bosh aylanish)",
        "🐛 Teri ostida parazitlar / bit",
        "🏠 Noto'g'ri parvarish sharoiti",
        "✍️ Boshqa (o‘zingiz yozing)"
    ],
    qoramollar: [
        "🐄 Oziq-ovqatni rad etish, ishtaha yo'q",
        "🤒 Tana harorati ko'tarilgan (isitma)",
        "🦷 Tish g'ijirlatish, og'izdan ko'pik kelishi",
        "💩 Qonli ich ketishi yoki qabziyat",
        "🐛 Teri ostida shishlar (parazitlar)",
        "🦵 Oqsoqlanish, oyoqlarda shish",
        "🌡️ Nafas qisishi, yo'tal",
        "🍼 Sut mahsuldorligi keskin kamaygan",
        "🤰 Homiladorlik / tug'ish muammolari",
        "✍️ Boshqa (o‘zingiz yozing)"
    ],
    "qo'y-echkilar": [
        "🐑 Ishtaha yo'qolgan, ozib ketgan",
        "🦷 Tish g'ijirlatish, og'izdan ko'pik",
        "💩 Ich ketishi (yashil yoki qonli)",
        "🐛 Junlari to'kilayotgan, qichima",
        "🦵 Oqsoqlanish, tuyoqlarda yara",
        "🌡️ Isitma, burundan oqindi",
        "🤰 Qo'zilash / tug'ish muammolari",
        "🍼 Sutdan ajratish muammosi",
        "🏔️ Yaylovda zaharlanish",
        "✍️ Boshqa (o‘zingiz yozing)"
    ]
};

// Checklist ma'lumotlari
const checklistsData = {
    parrandalar: {
        "oziqlanishdagi muammo": [
            "📋 Ozuva namunasini veterinarga tahlilga topshirish",
            "💊 Vitamin D3, E va A qo'shimchalarini sotib olish",
            "⚖️ Ozuva tarkibidagi oqsil miqdorini tekshirish (min 18%)",
            "💧 Suv idishlarini kuniga 2 marta tozalash",
            "📅 7 kundan keyin parrandalar holatini kuzatish"
        ],
        "O'sishda ortda qolish": [
            "🐛 Parazitlarga qarshi dorilash (Ivermektin)",
            "☀️ Yorug'lik vaqtini 16 soatgacha uzaytirish",
            "🍗 Ozuva tarkibidagi oqsilni 22% gacha oshirish",
            "🏠 Har bir parrandaga kamida 0.5 m² maydon ajratish",
            "📊 Haftada bir marta vazn o'lchash"
        ],
        "emlash": [
            "📅 Emlash taqvimini tuzib olish",
            "💉 Nyukasl kasalligiga qarshi vaktsina sotib olish",
            "🧪 Vaktsinani sovuq zanjir buzilmagan holda saqlash",
            "📝 Emlashdan keyin 3 kun kuzatuv olib borish",
            "🔄 30 kundan keyin revaktsinatsiya qilish"
        ]
    },
    qoramollar: {
        "oziqlanishdagi muammo": [
            "🌾 Silos va pichan sifatini tekshirish",
            "🧂 Mineral tuz bloklarini qo'yish",
            "⚖️ Kunlik ratsionni mutaxassis bilan hisoblash",
            "💊 Probiotik qo'shimchalar (7 kunlik kurs)",
            "📈 2 haftadan keyin vazn o'zgarishini kuzatish"
        ],
        "O'sishda ortda qolish": [
            "🐛 Gelmintlarga qarshi dorilash (har 45 kunda)",
            "🥩 Oqsil miqdorini 14% dan 18% gacha oshirish",
            "🏠 Boshpanani izolyatsiya qilish (qishda +5°C dan past bo'lmasligi)",
            "💉 Vitamin A, D, E kompleksini yuborish",
            "📊 Har oy vazn o'lchab borish"
        ],
        "emlash": [
            "📅 Bahor va kuzda revaktsinatsiya qilish",
            "💉 Oyoq va og'iz kasalligiga qarshi emlash",
            "📝 Emlashdan oldin klinik tekshiruv o'tkazish",
            "🩺 Brusellyozga qarshi emlash (yiliga 2 marta)",
            "📋 Emlash dalolatnomasini yuritish"
        ]
    },
    "qo'y-echkilar": {
        "oziqlanishdagi muammo": [
            "🌾 Yaylov sifatini tekshirish",
            "🧂 Mineral lizunets tuzini qo'yish",
            "🍂 Qo'shimcha ozuva (kuniga 0.5 kg)",
            "💧 Toza suv doimiy bo'lishi kerak",
            "📈 2 hafta ichida vazn o'zgarishini kuzatish"
        ],
        "O'sishda ortda qolish": [
            "🐛 Gelmintlarga qarshi dorilash",
            "🥩 Oqsil va energiya miqdorini oshirish",
            "🏠 Qo'ralarni quruq va issiq saqlash",
            "💉 Vitamin qo'shimchalari",
            "📊 Har oy vazn o'lchash"
        ],
        "emlash": [
            "📅 Chechak va enterotoksemiyaga qarshi emlash",
            "💉 Bo'g'ozlikdan 30 kun oldin emlash",
            "📝 Qo'zilarni 3 oyligida revaktsinatsiya",
            "🔄 Har yili bahor va kuzda takrorlash",
            "📋 Emlash jurnalini yuritish"
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

// DOM elementlari
const appDiv = document.getElementById("app");
const contentDiv = document.getElementById("content");
const loadingContainer = document.getElementById("loadingContainer");
const mainMenu = document.getElementById("mainMenu");
const homeBtn = document.getElementById("homeBtn");
const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
const historyBtn = document.getElementById("historyBtn");
const languageMenu = document.getElementById("languageMenu");
const historyModal = document.getElementById("historyModal");

// ========== TEMA FUNKSIYALARI ==========
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    const icon = themeBtn.querySelector("i");
    if (savedTheme === "dark") icon.className = "fas fa-sun";
    else icon.className = "fas fa-moon";
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    const icon = themeBtn.querySelector("i");
    if (newTheme === "dark") icon.className = "fas fa-sun";
    else icon.className = "fas fa-moon";
}

// ========== TIL FUNKSIYALARI ==========
function initLanguage() {
    const savedLang = localStorage.getItem("language") || "uz";
    currentLang = savedLang;
    document.getElementById("currentLang").innerText = currentLang === "uz" ? "O'zbek" : (currentLang === "ru" ? "Русский" : "English");
    render();
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);
    languageMenu.style.display = "none";
    document.getElementById("currentLang").innerText = lang === "uz" ? "O'zbek" : (lang === "ru" ? "Русский" : "English");
    render();
}

function t(key) {
    return translations[currentLang]?.[key] || key;
}

// ========== HISTORY (localStorage) ==========
function saveState() {
    // Checklist progressini olish
    let checklistProgress = [];
    const checks = document.querySelectorAll('.check-item');
    checks.forEach(cb => checklistProgress.push(cb.checked));
    
    const saveData = {
        step: state.step,
        animal: state.animal,
        problem: state.problem,
        detailedIssue: state.detailedIssue,
        solution: state.solution,
        checklistProgress: checklistProgress,
        timestamp: new Date().toISOString(),
        lang: currentLang
    };
    
    // 50 ta eng oxirgi saqlansin
    let history = JSON.parse(localStorage.getItem("villager_history") || "[]");
    history.unshift(saveData);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem("villager_history", JSON.stringify(history));
    
    // Hozirgi holat
    localStorage.setItem("villager_current", JSON.stringify(saveData));
}

function loadCurrentState() {
    const saved = localStorage.getItem("villager_current");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.step = parsed.step;
            state.animal = parsed.animal;
            state.problem = parsed.problem;
            state.detailedIssue = parsed.detailedIssue;
            state.solution = parsed.solution;
            if (parsed.lang) currentLang = parsed.lang;
            render();
            // Checklist progressini tiklash
            if (state.step === 4) {
                setTimeout(() => {
                    const checks = document.querySelectorAll('.check-item');
                    if (parsed.checklistProgress) {
                        checks.forEach((cb, idx) => {
                            if (parsed.checklistProgress[idx]) cb.checked = true;
                        });
                        updateProgress();
                    }
                }, 100);
            }
            return true;
        } catch(e) {}
    }
    return false;
}

function loadHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem("villager_history") || "[]");
    if (history[index]) {
        const item = history[index];
        state.step = item.step;
        state.animal = item.animal;
        state.problem = item.problem;
        state.detailedIssue = item.detailedIssue;
        state.solution = item.solution;
        if (item.lang) currentLang = item.lang;
        render();
        historyModal.style.display = "none";
        if (state.step === 4) {
            setTimeout(() => {
                const checks = document.querySelectorAll('.check-item');
                if (item.checklistProgress) {
                    checks.forEach((cb, idx) => {
                        if (item.checklistProgress[idx]) cb.checked = true;
                    });
                    updateProgress();
                }
            }, 100);
        }
    }
}

function showHistoryModal() {
    const history = JSON.parse(localStorage.getItem("villager_history") || "[]");
    const historyList = document.getElementById("historyList");
    
    if (history.length === 0) {
        historyList.innerHTML = `<p style="text-align:center; padding:2rem;">${currentLang === 'uz' ? 'Hech qanday tarix yo\'q' : (currentLang === 'ru' ? 'История пуста' : 'No history')}</p>`;
    } else {
        historyList.innerHTML = history.map((item, idx) => `
            <div class="history-item" data-idx="${idx}">
                <div class="history-item-title">${item.animal || '?'} - ${item.problem || '?'}</div>
                <div class="history-item-date">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
        
        document.querySelectorAll('.history-item').forEach(el => {
            el.addEventListener('click', () => loadHistoryItem(parseInt(el.dataset.idx)));
        });
    }
    
    historyModal.style.display = "flex";
}

function clearHistory() {
    if (confirm(currentLang === 'uz' ? 'Barcha tarixni o\'chirmoqchimisiz?' : (currentLang === 'ru' ? 'Удалить всю историю?' : 'Clear all history?'))) {
        localStorage.setItem("villager_history", "[]");
        showHistoryModal();
    }
}

// ========== AI FUNKSIYASI ==========
async function processAI() {
    state.loading = true;
    showLoading();
    
    // Offline javob (real API bo'lmaganda)
    const offlineSolutions = {
        parrandalar: {
            uz: `📌 MUAMMO: Parranda ${state.problem}
✅ NIMA QILISH KERAK: Vitamin va mineral qo'shimchalar bering. Parrandalarni alohida ajratib, sifatli ozuva bilan ta'minlang.
🛠 QANDAY QILINADI: 
1. Ozuva sifatini tekshirib, namuna oling
2. Vitamin premiksini qo'shing (1:100 nisbatda)
3. Suv idishlarini kuniga 2 marta tozalang
4. 7 kundan keyin natijani kuzating
📞 ALOQA: Parrandachilar uyushmasi: +998 71 200 55 11`,
            ru: `📌 ПРОБЛЕМА: Птица ${state.problem}
✅ ЧТО ДЕЛАТЬ: Добавьте витаминные и минеральные добавки. Обеспечьте качественным кормом.
🛠 КАК СДЕЛАТЬ:
1. Проверьте качество корма
2. Добавьте витаминный премикс
3. Очищайте поилки 2 раза в день
4. Наблюдайте через 7 дней
📞 КОНТАКТЫ: Союз птицеводов: +998 71 200 55 11`,
            en: `📌 PROBLEM: Poultry ${state.problem}
✅ WHAT TO DO: Add vitamin and mineral supplements.
🛠 HOW TO DO:
1. Check feed quality
2. Add vitamin premix
3. Clean water containers twice daily
4. Observe results after 7 days
📞 CONTACT: Poultry Union: +998 71 200 55 11`
        },
        qoramollar: {
            uz: `📌 MUAMMO: Qoramol ${state.problem}
✅ NIMA QILISH KERAK: Veterinarga murojaat qiling va parvarish sharoitini yaxshlang.
🛠 QANDAY QILINADI:
1. Tana haroratini o'lchang
2. Parazitlarga qarshi dorilash
3. Ozuva sifatini oshiring
4. 3 kundan keyin veterinarga ko'rsating
📞 ALOQA: Chorvachilik instituti: +998 93 700 11 33`,
            ru: `📌 ПРОБЛЕМА: КРС ${state.problem}
✅ ЧТО ДЕЛАТЬ: Обратитесь к ветеринару.
🛠 КАК СДЕЛАТЬ:
1. Измерьте температуру
2. Проведите дегельминтизацию
3. Улучшите качество корма
📞 КОНТАКТЫ: Институт животноводства: +998 93 700 11 33`,
            en: `📌 PROBLEM: Cattle ${state.problem}
✅ WHAT TO DO: Consult a veterinarian.
🛠 HOW TO DO:
1. Check temperature
2. Deworming treatment
3. Improve feed quality
📞 CONTACT: Livestock Institute: +998 93 700 11 33`
        },
        "qo'y-echkilar": {
            uz: `📌 MUAMMO: Qo'y-echki ${state.problem}
✅ NIMA QILISH KERAK: Parazitlarga qarshi chora ko'ring va ovqatlanishni yaxshlang.
🛠 QANDAY QILINADI:
1. Degelmintizatsiya qiling
2. Mineral qo'shimchalar bering
3. Yaylov sifatini tekshiring
📞 ALOQA: Qo'ychilik markazi: +998 66 234 77 88`,
            ru: `📌 ПРОБЛЕМА: Овцы/козы ${state.problem}
✅ ЧТО ДЕЛАТЬ: Проведите дегельминтизацию.
🛠 КАК СДЕЛАТЬ:
1. Дегельминтизация
2. Минеральные добавки
3. Проверьте пастбище
📞 КОНТАКТЫ: Центр овцеводства: +998 66 234 77 88`,
            en: `📌 PROBLEM: Sheep/Goats ${state.problem}
✅ WHAT TO DO: Perform deworming.
🛠 HOW TO DO:
1. Deworming treatment
2. Mineral supplements
3. Check pasture quality
📞 CONTACT: Sheep Breeding Center: +998 66 234 77 88`
        }
    };
    
    state.solution = {
        content: offlineSolutions[state.animal]?.[currentLang] || offlineSolutions.parrandalar[currentLang]
    };
    
    state.loading = false;
    state.step = 4;
    hideLoading();
    render();
    saveState();
}

// ========== CHECKLIST FUNKSIYALARI ==========
function generateChecklist() {
    const items = checklistsData[state.animal]?.[state.problem];
    if (!items) {
        return `<p>${currentLang === 'uz' ? 'Tavsiyalar tayyorlanmoqda' : (currentLang === 'ru' ? 'Рекомендации готовятся' : 'Recommendations in progress')}</p>`;
    }
    
    return items.map((item, idx) => `
        <label class="checklist-item">
            <input type="checkbox" class="check-item" data-idx="${idx}">
            <span>${item}</span>
        </label>
    `).join('');
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.check-item');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    if (!checkboxes.length || !progressFill) return;
    
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
    progressFill.style.width = `${percent}%`;
    progressPercent.innerText = `${percent}%`;
    
    if (percent === 100 && total > 0) {
        setTimeout(() => {
            alert(currentLang === 'uz' ? '🎉 Tabriklaymiz! Barcha vazifalarni bajardingiz!' : 
                  (currentLang === 'ru' ? '🎉 Поздравляем! Вы выполнили все задачи!' : 
                  '🎉 Congratulations! You completed all tasks!'));
        }, 100);
    }
}

function attachChecklistListeners() {
    const checkboxes = document.querySelectorAll('.check-item');
    checkboxes.forEach(cb => {
        cb.removeEventListener('change', updateProgress);
        cb.addEventListener('change', () => {
            updateProgress();
            saveState();
        });
    });
    updateProgress();
}

function downloadChecklist() {
    const items = document.querySelectorAll('.checklist-item span');
    let content = `VILLAGER - ${new Date().toLocaleDateString()}\n`;
    content += `Hayvon: ${state.animal}\n`;
    content += `Muammo: ${state.problem}\n`;
    content += `Batafsil: ${state.detailedIssue}\n`;
    content += `\n✅ AMALIY QO'LLANMA:\n`;
    content += `─────────────────\n`;
    
    items.forEach((item, idx) => {
        const checked = document.querySelector(`.check-item[data-idx="${idx}"]`)?.checked ? '[✓]' : '[ ]';
        content += `${checked} ${item.innerText}\n`;
    });
    
    content += `\n─────────────────\n`;
    content += `📅 Sana: ${new Date().toLocaleString()}\n`;
    content += `🌾 VILLAGER - qishloq donishmandi\n`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `villager_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
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
    historyBtn.style.display = (state.step === 4) ? "flex" : "none";
}

function renderAnimal() {
    contentDiv.innerHTML = `
        <div class="card">
            <h1>🏘️ ${t("appTitle")}</h1>
            <div class="question">${t("animalQuestion")}</div>
            <div class="options-grid">
                <button class="option-btn" data-animal="parrandalar">🐔 ${currentLang === 'uz' ? 'Parrandalar' : (currentLang === 'ru' ? 'Птица' : 'Poultry')}</button>
                <button class="option-btn" data-animal="qoramollar">🐄 ${currentLang === 'uz' ? 'Qoramollar' : (currentLang === 'ru' ? 'КРС' : 'Cattle')}</button>
                <button class="option-btn" data-animal="qo'y-echkilar">🐑 ${currentLang === 'uz' ? "Qo'y-echkilar" : (currentLang === 'ru' ? 'Овцы и козы' : 'Sheep & Goats')}</button>
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
    const variants = dynamicVariants[state.animal] || dynamicVariants.parrandalar;
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
            const idx = parseInt(e.currentTarget.getAttribute("data-val"));
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
    const checklistHtml = generateChecklist();
    
    contentDiv.innerHTML = `
        <div class="card">
            <h2>🤖 VILLAGER AI</h2>
            <div class="info-box">
                <div style="white-space: pre-wrap; line-height: 1.6;">${state.solution.content}</div>
                
                <div class="checklist-container">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <h3><i class="fas fa-clipboard-list"></i> ${currentLang === 'uz' ? 'Amaliy qo\'llanma' : (currentLang === 'ru' ? 'Практическое руководство' : 'Practical Guide')}</h3>
                        <button id="downloadChecklistBtn" class="small-btn">
                            <i class="fas fa-download"></i> ${t("download")}
                        </button>
                    </div>
                    ${checklistHtml}
                </div>
                
                <div class="progress-section">
                    <span><i class="fas fa-tasks"></i> ${currentLang === 'uz' ? 'Bugungi vazifalar' : (currentLang === 'ru' ? 'Задачи на сегодня' : "Today's tasks")}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                    <span id="progressPercent" class="progress-percent">0%</span>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <button class="restart-btn" id="finishRestart">➕ ${t("restart")}</button>
                <button class="save-progress-btn" id="saveProgressBtn">
                    <i class="fas fa-save"></i> ${t("save")}
                </button>
            </div>
        </div>
    `;
    
    attachChecklistListeners();
    
    document.getElementById("finishRestart")?.addEventListener("click", resetAll);
    document.getElementById("downloadChecklistBtn")?.addEventListener("click", downloadChecklist);
    document.getElementById("saveProgressBtn")?.addEventListener("click", () => {
        saveState();
        alert(currentLang === 'uz' ? '✅ Vazifalar saqlandi!' : (currentLang === 'ru' ? '✅ Задачи сохранены!' : '✅ Tasks saved!'));
    });
    
    saveState();
}

function resetAll() {
    state = { step: 1, animal: null, problem: null, detailedIssue: null, solution: null, loading: false };
    localStorage.removeItem("villager_current");
    render();
}

// ========== EVENT LISTENERS ==========
homeBtn.addEventListener("click", () => {
    if (state.step === 4) resetAll();
    else if (confirm(currentLang === 'uz' ? 'Bosh sahifaga qaytilsa, jarayon tozalanadi. Davom etilsinmi?' : (currentLang === 'ru' ? 'При возврате на главную процесс очистится. Продолжить?' : 'Going back will clear the process. Continue?'))) {
        resetAll();
    }
});

langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    languageMenu.style.display = languageMenu.style.display === "none" ? "block" : "none";
});

themeBtn.addEventListener("click", toggleTheme);
historyBtn.addEventListener("click", showHistoryModal);

document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        setLanguage(e.currentTarget.getAttribute("data-lang"));
    });
});

document.addEventListener("click", () => {
    languageMenu.style.display = "none";
});

document.getElementById("closeHistoryBtn")?.addEventListener("click", () => {
    historyModal.style.display = "none";
});
document.getElementById("closeHistoryModalBtn")?.addEventListener("click", () => {
    historyModal.style.display = "none";
});
document.getElementById("clearHistoryBtn")?.addEventListener("click", clearHistory);

// ========== BOSHLASH ==========
initTheme();
initLanguage();
if (!loadCurrentState()) {
    render();
}