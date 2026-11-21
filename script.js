
// LOADER

window.addEventListener("load", function() {
    setTimeout(function() {
        document.getElementById("loader").classList.add("hide");
    }, 1000);
});


// MOBILE MENU

let menuBtn = document.getElementById("menuBtn");
let navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function() {
    navbar.classList.toggle("active");

    menuBtn.textContent = navbar.classList.contains("active")
        ? "✕"
        : "☰";
});

document.querySelectorAll(".navbar a").forEach(function(link) {
    link.addEventListener("click", function() {
        navbar.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


// DARK / LIGHT MODE

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("light");

    themeBtn.textContent =
        document.body.classList.contains("light") ? "☾" : "☀";
});


// SCROLL REVEAL ANIMATION

let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(function(element) {
    observer.observe(element);
});


// TOP BUTTON

let topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function() {
    if(window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// GENETIC CALCULATOR

let calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function() {

    let parent1 = document.getElementById("parent1").value;
    let parent2 = document.getElementById("parent2").value;

    let gametes1 = parent1.split("");
    let gametes2 = parent2.split("");

    let combinations = [];
    let html = "";

    html += `<div>×</div>`;
    html += `<div>${gametes1[0]}</div>`;
    html += `<div>${gametes1[1]}</div>`;

    let countAA = 0;
    let countAa = 0;
    let countaa = 0;

    for(let i = 0; i < 2; i++) {

        html += `<div>${gametes2[i]}</div>`;

        for(let j = 0; j < 2; j++) {

            let gene = gametes2[i] + gametes1[j];

            let result;

            if(gene === "Aa" || gene === "aA") {
                result = "Aa";
            } else if(gene === "AA") {
                result = "AA";
            } else {
                result = "aa";
            }

            combinations.push(result);

            if(result === "AA") countAA++;
            if(result === "Aa") countAa++;
            if(result === "aa") countaa++;

            html += `<div>${result}</div>`;
        }
    }

    document.getElementById("punnett").innerHTML = html;

    let dominant = countAA + countAa;
    let recessive = countaa;

    let dominantPercent = dominant / 4 * 100;
    let recessivePercent = recessive / 4 * 100;

    document.getElementById("result").innerHTML = `
        <h3>Natijalar muvaffaqiyatli hisoblandi!</h3>
        <p>AA genotip: <strong>${countAA * 25}%</strong></p>
        <p>Aa genotip: <strong>${countAa * 25}%</strong></p>
        <p>aa genotip: <strong>${countaa * 25}%</strong></p>
        <br>
        <p>Dominant fenotip: <strong>${dominantPercent}%</strong></p>
        <p>Retsessiv fenotip: <strong>${recessivePercent}%</strong></p>
        <br>
        <p>Avlod genotiplari: <strong>${combinations.join(" | ")}</strong></p>
    `;

    document.getElementById("result").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});


// QUIZ QUESTIONS

let questions = [
    {
        question: "Irsiyat nima?",
        answers: [
            "Organizmlarning belgilarini avlodga o'tkazishi",
            "Organizmning nafas olishi",
            "Hujayraning bo'linishi",
            "Faqat o'simliklarning o'sishi"
        ],
        correct: 0
    },
    {
        question: "Irsiy axborot asosan qaysi molekulada saqlanadi?",
        answers: [
            "Suv",
            "DNK",
            "Kislorod",
            "Glyukoza"
        ],
        correct: 1
    },
    {
        question: "Genetika fanining asoschilaridan biri kim?",
        answers: [
            "Isaac Newton",
            "Albert Einstein",
            "Gregor Mendel",
            "Charles Darwin"
        ],
        correct: 2
    },
    {
        question: "Inson tana hujayralarida odatda nechta xromosoma bo'ladi?",
        answers: [
            "23 ta",
            "44 ta",
            "46 ta",
            "48 ta"
        ],
        correct: 2
    },
    {
        question: "Agar Aa × Aa chatishtirilsa, genotipik nisbat qanday bo'ladi?",
        answers: [
            "3:1",
            "1:2:1",
            "9:3:3:1",
            "1:1"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

let questionNumber = document.getElementById("questionNumber");
let scoreElement = document.getElementById("score");
let questionElement = document.getElementById("question");
let answersElement = document.getElementById("answers");
let feedback = document.getElementById("feedback");
let nextBtn = document.getElementById("nextBtn");
let progress = document.getElementById("progress");

function loadQuestion() {

    answered = false;

    let current = questions[currentQuestion];

    questionNumber.textContent =
        `Savol ${currentQuestion + 1} / ${questions.length}`;

    scoreElement.textContent = `Ball: ${score}`;

    questionElement.textContent = current.question;

    progress.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    answersElement.innerHTML = "";

    feedback.textContent = "";

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Natijani ko'rish"
            : "Keyingi savol →";

    current.answers.forEach(function(answer, index) {

        let button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}


function checkAnswer(index, selectedButton) {

    if(answered) return;

    answered = true;

    let correct = questions[currentQuestion].correct;

    let buttons = document.querySelectorAll(".answer");

    if(index === correct) {

        score++;
        feedback.textContent = "✓ To'g'ri javob! Barakalla!";

        selectedButton.classList.add("correct");

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "✗ Noto'g'ri. To'g'ri javob: " +
            questions[currentQuestion].answers[correct];

        buttons[correct].classList.add("correct");
    }

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    scoreElement.textContent = `Ball: ${score}`;
}


nextBtn.addEventListener("click", function() {

    if(!answered) {
        feedback.textContent = "Avval javob variantini tanlang!";
        return;
    }

    currentQuestion++;

    if(currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showFinalResult();

    }
});


function showFinalResult() {

    let percentage = score / questions.length * 100;

    let message;

    if(percentage === 100) {
        message = "Ajoyib! Siz genetika bilimdoni ekansiz! 🏆";
    } else if(percentage >= 60) {
        message = "Juda yaxshi! Bilimlaringiz yaxshi! 🌟";
    } else {
        message = "Yana bir bor mavzularni takrorlang! 📚";
    }

    document.querySelector(".quiz-box").innerHTML = `
        <div style="text-align:center;padding:25px">
            <div style="font-size:65px">🏆</div>
            <h2 style="margin:20px 0;color:#00e5c0">
                TEST YAKUNLANDI!
            </h2>
            <h1 style="font-size:55px">${score}/${questions.length}</h1>
            <p style="margin:15px 0;color:var(--muted)">
                Natija: ${percentage}%
            </p>
            <h3 style="margin-bottom:25px">${message}</h3>
            <button class="btn primary" id="restartBtn">
                Qayta ishlash ↻
            </button>
        </div>
    `;

    document.getElementById("restartBtn").addEventListener("click", function() {

        currentQuestion = 0;
        score = 0;

        document.querySelector(".quiz-box").innerHTML = `
            <div class="quiz-top">
                <span id="questionNumber"></span>
                <span id="score"></span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" id="progress"></div>
            </div>
            <h3 id="question"></h3>
            <div id="answers" class="answers"></div>
            <p id="feedback"></p>
            <button class="btn primary" id="nextBtn">Keyingi savol →</button>
        `;

        questionNumber = document.getElementById("questionNumber");
        scoreElement = document.getElementById("score");
        questionElement = document.getElementById("question");
        answersElement = document.getElementById("answers");
        feedback = document.getElementById("feedback");
        nextBtn = document.getElementById("nextBtn");
        progress = document.getElementById("progress");

        nextBtn.addEventListener("click", nextQuestion);

        loadQuestion();
    });
}


// NEXT QUESTION FUNCTION FOR RESTART

function nextQuestion() {

    if(!answered) {
        feedback.textContent = "Avval javob variantini tanlang!";
        return;
    }

    currentQuestion++;

    if(currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}


// START QUIZ

loadQuestion();


// ACTIVE NAVIGATION

let sections = document.querySelectorAll("main section[id]");
let navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function() {

    let current = "";

    sections.forEach(function(section) {

        let sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
