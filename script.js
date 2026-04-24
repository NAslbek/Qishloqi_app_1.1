// Kengaytirilgan bilimlar bazasi
const knowledgeBase = {
    parrandalar: {
        "oziqlanishdagi muammo": { title: "🐔 Parranda oziqlanishi", advice: "To‘liq ratsionli ozuva, vitamin-mineral premikslar qo‘shing. Haftada bir marta probiotik bering.", howTo: "1. Boshlang‘ich ozuva (0-4 hafta)\n2. O‘sish ozuvasi (4-16 hafta)\n3. Tuxum qilish davri uchun maxsus ozuva", expertContact: "Parrandachilik instituti: +998 71 200 55 11 | parranda.uz", svgType: "premium_chicken_feed" },
        "O'sishda ortda qolish": { title: "📉 O'sish sustligi", advice: "Yorug‘lik rejimini 18 soatga yetkazing, ozuvada oqsil miqdorini 22% gacha oshiring.", howTo: "1. Qurt va parazitlarga qarshi dorilash\n2. A, D3, E vitaminlari kursi\n3. Har 2 kunda go‘sht-suyak uni qo‘shing", expertContact: "Vetservis: 1130 | +998 90 777 44 55", svgType: "premium_growth" },
        "emlash": { title: "💉 Emlash kalendari", advice: "Nyukasl, infeksion bronxit, Gumboro kasalligiga qarshi majburiy emlash.", howTo: "1. 1-kun: (marix) vaktsina\n2. 14-kun: Nyukasl\n3. 28-kun: revaktsinatsiya", expertContact: "Vaktsinalar markazi: +998 78 150 88 99", svgType: "premium_vaccine" }
    },
    qoramollar: {
        "oziqlanishdagi muammo": { title: "🐄 Oziqlanish yetishmovchiligi", advice: "Sifatli silos, pichan va konsentratlar balansini tekshiring. Kunlik ratsionda 50-70 g tuz bering.", howTo: "1. Katta qoramol: 10-12 kg pichan\n2. 3-4 kg aralash ozuva\n3. Protein qo‘shimchalar", expertContact: "Qoramolchilar uyushmasi: +998 93 700 11 33", svgType: "premium_cow" },
        "O'sishda ortda qolish": { title: "📊 Yosh qoramol o'smayapti", advice: "Parazitlarga qarshi dorilash va A, D, E vitaminlarini mushak ichiga yuborish kerak.", howTo: "1. Defixatsiya (har 45 kunda)\n2. Kuchaytirilgan energiya\n3. Alohida boqish", expertContact: "Chorva doktori: 1122", svgType: "premium_cow_growth" },
        "emlash": { title: "🩺 Keng qamrovli emlash", advice: "Oyoq va og‘iz kasalligi, brusellyoz, leykozga qarshi emlash zarur.", howTo: "1. Bahor-kuz revaktsinatsiya\n2. Sigirlarni quruq davrda emlash", expertContact: "+998 71 200 88 66", svgType: "premium_cow_vaccine" }
    },
    "qo'y-echkilar": {
        "oziqlanishdagi muammo": { title: "🐑 Mineral tangislik", advice: "Lizunets tuzi va mis, kobalt, sink qo‘shimchalari bering.", howTo: "1. Kunlik 0.3 kg aralash ozuva\n2. Yalovli yaylov", expertContact: "Qo‘ychilik ilmiy markazi: +998 66 234 77 88", svgType: "premium_sheep" },
        "O'sishda ortda qolish": { title: "📉 Qo‘zilar ozib ketdi", advice: "Parazitar invaziyaga tahlil qiling. Ivermektin preparatlari.", howTo: "1. 3 marta degelmintizatsiya\n2. Issiqxona boshpana", expertContact: "Mobil veterinar 90 123 45 67", svgType: "premium_sheep_growth" },
        "emlash": { title: "💉 Qo‘y-echki emlash", advice: "Chechak, enterotoksemiya, qo‘tir kasalligiga qarshi emlash majburiy.", howTo: "1. Bo‘g‘ozlikdan 30 kun oldin\n2. Har yili mart oyida", expertContact: "Emlash punkti 1115", svgType: "premium_sheep_vaccine" }
    }
};

let state = {
    step: 1,          // 1: animal, 2: problem, 3: custom question, 4: result
    animal: null,
    problem: null,
    detailedIssue: null, // 3-savolga javob (variant yoki qo'lda yozilgan)
    solution: null
};

const appDiv = document.getElementById("app");
const mainMenu = document.getElementById("mainMenu");
const homeBtn = document.getElementById("homeBtn");

function render() {
    if (state.step === 1) renderAnimal();
    else if (state.step === 2) renderProblem();
    else if (state.step === 3) renderDetailedQuestion();
    else if (state.step === 4) renderFinalResult();

    mainMenu.style.display = (state.step === 4) ? "block" : "none";
}

function renderAnimal() {
    appDiv.innerHTML = `
        <div class="card">
            <h1>🌾 Qishloqi</h1>
            <div class="question">Qaysi turdagi hayvon bilan muammoingiz bor?</div>
            <div class="options-grid">
                <button class="option-btn" data-animal="parrandalar">🐔 Parrandalar</button>
                <button class="option-btn" data-animal="qoramollar">🐄 Qoramollar</button>
                <button class="option-btn" data-animal="qo'y-echkilar">🐑 Qo'y-echkilar</button>
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
    appDiv.innerHTML = `
        <div class="card">
            <h2>${getAnimalIcon()} ${state.animal.toUpperCase()}</h2>
            <div class="question">Muammo turi?</div>
            <div class="options-grid">
                <button class="option-btn" data-problem="oziqlanishdagi muammo">🌾 Oziqlanish muammosi</button>
                <button class="option-btn" data-problem="O'sishda ortda qolish">📉 O'sish sustligi</button>
                <button class="option-btn" data-problem="emlash">💉 Emlash / kasalliklar</button>
            </div>
            <button class="restart-btn" id="resetStep2">⬅️ Ortga</button>
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
        state.animal = null;
        render();
    });
}

function renderDetailedQuestion() {
    // 10 ta variant + 10-chi qo'lda yozish
    const variants = [
        "🥚 Tuxum sifati yomonlashgan / kamaygan",
        "🍂 Tuklari to'kilmoqda, pati xira",
        "🦠 Nafas olish qiyin, aksa urish",
        "📉 Ishtaha yo'qolgan, suv ichmaydi",
        "🦵 Oyoqlarida shish, oqsoqlanish",
        "💩 Ich ketish / rangli najas",
        "🧠 Asabiy alomatlar (bosh aylanish)",
        "🐛 Teri ostida parazitlar / bit",
        "🏠 Noto'g'ri parvarish sharoiti (issiq-sovuq)",
        "✍️ Boshqa (o‘zingiz yozing)"
    ];
    
    let optionsHtml = `<div class="options-grid">`;
    variants.forEach((v, idx) => {
        if (idx === 9) {
            optionsHtml += `<div class="custom-option-btn" data-custom="true" data-val="custom">${v}</div>`;
        } else {
            optionsHtml += `<button class="option-btn" data-val="${v.replace(/[^a-z]/gi, '').slice(0,20)}" data-fulltext="${v}">${v}</button>`;
        }
    });
    optionsHtml += `</div><div id="customInputArea" style="display:none; margin-top:1rem;"></div>
    <button class="restart-btn" id="backStep3">⬅️ Orqaga</button>`;
    
    appDiv.innerHTML = `<div class="card"><div class="question">❓ 3-savol: Muammoni aniq tasvirlang? (AI uchun tahlil)</div>${optionsHtml}</div>`;
    
    document.querySelectorAll(".option-btn:not([data-custom])").forEach(btn => {
        btn.addEventListener("click", (e) => {
            state.detailedIssue = e.currentTarget.getAttribute("data-fulltext");
            processAI();
        });
    });
    const customBtn = document.querySelector("[data-custom='true']");
    if (customBtn) {
        customBtn.addEventListener("click", () => {
            const area = document.getElementById("customInputArea");
            area.style.display = "block";
            area.innerHTML = `<div class="custom-input-group"><input type="text" id="customProblemInput" placeholder="Muammoingizni batafsil yozing..." autocomplete="off"><button id="submitCustom" class="next-btn">Yuborish</button></div>`;
            document.getElementById("submitCustom")?.addEventListener("click", () => {
                const val = document.getElementById("customProblemInput").value.trim();
                if (val) state.detailedIssue = val;
                else state.detailedIssue = "Foydalanuvchi o‘z muammosini yozmagan, umumiy maslahat kerak";
                processAI();
            });
        });
    }
    document.getElementById("backStep3")?.addEventListener("click", () => {
        state.step = 2;
        render();
    });
}

function processAI() {
    let baseSolution = knowledgeBase[state.animal]?.[state.problem];
    if (!baseSolution) {
        baseSolution = { title: "🌾 Maslahat", advice: "Mutaxassis bilan bog‘lanish tavsiya etiladi.", howTo: "1. Veterinarga murojaat\n2. Mahalliy fermerlar jamoati", expertContact: "Yordam liniyasi: 1180", svgType: "default_premium" };
    }
    // 3-savol tahlili asosida qo'shimcha tavsiya
    let extraAdvice = `<br><br>🔍 Sizning qo‘shimcha ma'lumotingiz: “${state.detailedIssue}”. Shu asosda mutaxassislar aniq tashxis qo‘yishi mumkin.`;
    state.solution = {
        ...baseSolution,
        advice: baseSolution.advice + extraAdvice,
        detailed: state.detailedIssue
    };
    state.step = 4;
    render();
}

function renderFinalResult() {
    const sol = state.solution;
    const svgHtml = getPremiumSvg(sol.svgType);
    appDiv.innerHTML = `
        <div class="card">
            <h2>🤖 AI — QISHLOQI tahlili</h2>
            <div class="info-box">
                <h3>📌 ${sol.title}</h3>
                <p><strong>✅ Nima qilish kerak?</strong><br>${sol.advice}</p>
                <div class="solution-img">
                    <strong>🎨 Vaziyatni tushuntiruvchi rasm:</strong><br>
                    ${svgHtml}
                </div>
                <p><strong>🛠 Qanday qilinadi?</strong><br>${sol.howTo.replace(/\n/g, '<br>')}</p>
                <div class="contact-links">
                    <strong>📞 Expertlar bilan aloqa:</strong><br>
                    <a href="#">${sol.expertContact}</a>
                </div>
            </div>
            <button class="restart-btn" id="finishRestart">➕ Yangi muammo</button>
        </div>
    `;
    document.getElementById("finishRestart")?.addEventListener("click", resetAll);
}

function resetAll() {
    state = { step: 1, animal: null, problem: null, detailedIssue: null, solution: null };
    mainMenu.style.display = "none";
    render();
}
homeBtn.addEventListener("click", () => { if (state.step === 4) resetAll(); else alert("Iltimos avval joriy jarayonni tugating"); });

function getAnimalIcon() { return state.animal === "parrandalar" ? "🐔" : (state.animal === "qoramollar" ? "🐄" : "🐑"); }

function getPremiumSvg(type) {
    const svgMap = {
        premium_chicken_feed: `<svg width="320" height="180" viewBox="0 0 400 200"><rect width="400" height="200" fill="#FDF3E0" rx="20"/><circle cx="90" cy="100" r="40" fill="#E69D3D"/><polygon points="90,50 110,90 70,90" fill="#F4B942"/><rect x="160" y="80" width="100" height="30" fill="#A56B2F" rx="10"/><text x="150" y="150" fill="#2C4B1E" font-weight="bold" font-size="14">Premium ozuva + Vitaminlar</text></svg>`,
        premium_growth: `<svg width="320" height="180"><rect width="400" height="200" fill="#E6F7E6"/><path d="M80,120 L140,50 L200,120" stroke="#3A8C3A" stroke-width="5" fill="none"/><circle cx="140" cy="50" r="18" fill="#FFAA33"/><text x="100" y="160" fill="#1F5E1F" font-size="13">Oʻsish grafigi 📈</text></svg>`,
        premium_vaccine: `<svg width="320" height="180"><rect width="400" height="200" fill="#F0F4FA"/><rect x="70" y="75" width="60" height="40" fill="#B0C4DE" rx="8"/><circle cx="100" cy="70" r="20" fill="#4682B4"/><text x="170" y="100" fill="#D32F2F" font-weight="bold">💉 Emlash kalendari</text></svg>`,
        premium_cow: `<svg width="320" height="180"><rect width="400" height="200" fill="#EBD5B3"/><ellipse cx="100" cy="110" rx="45" ry="30" fill="#8B5E3C"/><rect x="180" y="80" width="90" height="35" fill="#C5853B" rx="10"/><text x="120" y="170" fill="#382110">Sifatli pichan & silos</text></svg>`,
        premium_sheep: `<svg width="320" height="180"><rect width="400" height="200" fill="#FFF2DF"/><circle cx="90" cy="110" r="32" fill="#C2A15B"/><rect x="160" y="90" width="80" height="28" fill="#9B6A3C" rx="14"/><text x="110" y="165" fill="#4A2F1A">Mineral lizunets 🧂</text></svg>`,
        default_premium: `<svg width="320" height="180"><rect width="400" height="200" fill="#F9F7EC"/><text x="80" y="100" fill="#2C6E2C" font-size="15" font-weight="bold">🌟 Qishloqi AI maslahati</text><text x="100" y="140" fill="#D4A017">Veterinar jamoasi</text></svg>`
    };
    return svgMap[type] || svgMap.default_premium;
}

render();