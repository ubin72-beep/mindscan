// 인지능력(IQ) 검사 JavaScript
// Cognitive Intelligence Test

let currentQuestion = 0;
let answers = [];
let correctAnswers = 0;

const questions = [
    {
        question: "다음 수열의 빈칸에 들어갈 숫자는? 2, 4, 8, 16, __",
        options: [
            { text: "24", correct: false },
            { text: "32", correct: true },
            { text: "28", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "다음 중 나머지와 다른 하나는?",
        options: [
            { text: "사과", correct: false },
            { text: "바나나", correct: false },
            { text: "당근", correct: true },
            { text: "포도", correct: false }
        ]
    },
    {
        question: "모든 A는 B이다. 모든 B는 C이다. 따라서?",
        options: [
            { text: "모든 A는 C이다", correct: true },
            { text: "모든 C는 A이다", correct: false },
            { text: "일부 A는 C이다", correct: false },
            { text: "알 수 없다", correct: false }
        ]
    },
    {
        question: "책 : 독서 = 음악 : ?",
        options: [
            { text: "악기", correct: false },
            { text: "감상", correct: true },
            { text: "작곡", correct: false },
            { text: "공연", correct: false }
        ]
    },
    {
        question: "한 시계가 3시간에 3번 울린다면, 6시간에는 몇 번 울리는가?",
        options: [
            { text: "6번", correct: true },
            { text: "9번", correct: false },
            { text: "12번", correct: false },
            { text: "18번", correct: false }
        ]
    },
    {
        question: "다음 중 '긍정'의 반대말은?",
        options: [
            { text: "부정", correct: true },
            { text: "거부", correct: false },
            { text: "반대", correct: false },
            { text: "비판", correct: false }
        ]
    },
    {
        question: "5명이 5일 동안 벽을 쌓았다. 10명은 며칠 만에 쌓을 수 있는가? (같은 속도)",
        options: [
            { text: "2일", correct: false },
            { text: "2.5일", correct: true },
            { text: "3일", correct: false },
            { text: "10일", correct: false }
        ]
    },
    {
        question: "다음 중 패턴이 다른 하나는? AAB, BBC, CCD, __",
        options: [
            { text: "DDE", correct: true },
            { text: "EEF", correct: false },
            { text: "DEF", correct: false },
            { text: "EFG", correct: false }
        ]
    },
    {
        question: "어떤 것의 절반의 절반은 8이다. 그것은?",
        options: [
            { text: "16", correct: false },
            { text: "24", correct: false },
            { text: "32", correct: true },
            { text: "40", correct: false }
        ]
    },
    {
        question: "의사 : 병원 = 교사 : ?",
        options: [
            { text: "교실", correct: false },
            { text: "학교", correct: true },
            { text: "학생", correct: false },
            { text: "교과서", correct: false }
        ]
    },
    {
        question: "다음 중 논리적으로 맞는 것은?",
        options: [
            { text: "모든 새는 날 수 있다", correct: false },
            { text: "날 수 있는 것은 모두 새다", correct: false },
            { text: "일부 새는 날 수 있다", correct: true },
            { text: "새가 아니면 날 수 없다", correct: false }
        ]
    },
    {
        question: "12 ÷ 3 + 4 × 2 = ?",
        options: [
            { text: "10", correct: false },
            { text: "12", correct: true },
            { text: "14", correct: false },
            { text: "16", correct: false }
        ]
    },
    {
        question: "다음 단어 중 '빠르다'의 유의어가 아닌 것은?",
        options: [
            { text: "신속하다", correct: false },
            { text: "재빠르다", correct: false },
            { text: "서두르다", correct: true },
            { text: "날쌔다", correct: false }
        ]
    },
    {
        question: "A는 B보다 크고, C는 B보다 작다. 가장 큰 것은?",
        options: [
            { text: "A", correct: true },
            { text: "B", correct: false },
            { text: "C", correct: false },
            { text: "알 수 없다", correct: false }
        ]
    },
    {
        question: "다음 수열에서 빠진 숫자는? 1, 1, 2, 3, 5, 8, __",
        options: [
            { text: "11", correct: false },
            { text: "13", correct: true },
            { text: "15", correct: false },
            { text: "16", correct: false }
        ]
    }
];

const results = {
    genius: {
        range: [14, 15],
        icon: "🧠",
        title: "매우 우수한 인지능력",
        description: "당신은 탁월한 인지능력과 논리적 사고력을 가지고 있습니다. 복잡한 문제를 빠르게 이해하고 해결하는 능력이 뛰어납니다.",
        traits: [
            "논리적, 분석적 사고가 매우 뛰어나다",
            "패턴과 관계를 빠르게 파악한다",
            "복잡한 문제를 효율적으로 해결한다",
            "학습 능력이 탁월하다",
            "추상적 개념을 잘 이해한다"
        ],
        growth: [
            "전문 분야에서 심화 학습을 하세요",
            "복잡한 프로젝트나 연구에 도전하세요",
            "멘사(Mensa) 가입을 고려해보세요",
            "창의적 문제 해결에 능력을 활용하세요"
        ]
    },
    high: {
        range: [11, 13],
        icon: "🎯",
        title: "높은 인지능력",
        description: "당신은 평균 이상의 우수한 인지능력을 가지고 있습니다. 논리적 사고와 문제 해결 능력이 좋습니다.",
        traits: [
            "논리적 사고력이 우수하다",
            "학습과 이해가 빠르다",
            "문제 해결 능력이 좋다",
            "새로운 개념을 잘 습득한다",
            "분석적 접근이 가능하다"
        ],
        growth: [
            "더 도전적인 학습 기회를 찾으세요",
            "논리 퍼즐이나 전략 게임을 즐기세요",
            "전문 분야를 깊이 파고들어 보세요",
            "지속적인 학습으로 능력을 키우세요"
        ]
    },
    average: {
        range: [8, 10],
        icon: "💡",
        title: "평균 인지능력",
        description: "당신은 평균 수준의 인지능력을 가지고 있습니다. 일상적인 문제 해결과 학습에 큰 어려움은 없습니다.",
        traits: [
            "기본적인 논리적 사고가 가능하다",
            "일반적인 학습 속도를 보인다",
            "익숙한 문제는 잘 해결한다",
            "새로운 개념 습득에 시간이 필요하다",
            "실용적인 접근을 선호한다"
        ],
        growth: [
            "논리 훈련 문제를 규칙적으로 풀어보세요",
            "독서를 통해 사고력을 키우세요",
            "새로운 분야 학습에 도전하세요",
            "문제 해결 전략을 배워보세요"
        ]
    },
    belowAverage: {
        range: [5, 7],
        icon: "📚",
        title: "평균 이하 인지능력",
        description: "인지능력 향상이 필요합니다. 논리적 사고와 문제 해결에 어려움을 겪을 수 있습니다.",
        traits: [
            "논리적 사고에 어려움이 있다",
            "새로운 개념 이해가 느리다",
            "복잡한 문제 해결이 힘들다",
            "패턴 인식이 어렵다",
            "학습에 많은 시간이 필요하다"
        ],
        growth: [
            "기초부터 차근차근 학습하세요",
            "간단한 퍼즐부터 시작하세요",
            "반복 학습으로 이해를 높이세요",
            "학습 전략을 개선하세요"
        ]
    },
    low: {
        range: [0, 4],
        icon: "🌱",
        title: "낮은 인지능력",
        description: "인지능력 개발이 필요합니다. 전문적인 교육이나 훈련 프로그램이 도움이 될 수 있습니다.",
        traits: [
            "논리적 사고가 매우 어렵다",
            "개념 이해에 큰 어려움이 있다",
            "문제 해결이 매우 힘들다",
            "학습 속도가 느리다",
            "도움과 지원이 필요하다"
        ],
        growth: [
            "전문가의 도움을 받으세요",
            "인지 훈련 프로그램을 고려하세요",
            "매우 기초적인 것부터 시작하세요",
            "인내심을 가지고 꾸준히 연습하세요"
        ]
    }
};

function startTest() {
    console.log('인지능력검사 시작');
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    document.getElementById('totalQuestions').textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.onclick = () => selectAnswer(index);
        
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        button.innerHTML = `
            <div class="answer-number">${index + 1}</div>
            <div class="answer-text">${option.text}</div>
        `;
        
        answersContainer.appendChild(button);
    });
    
    updateButtons();
}

function selectAnswer(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[optionIndex].classList.add('selected');
    
    updateButtons();
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.style.opacity = currentQuestion === 0 ? '0.5' : '1';
    
    const hasAnswer = answers[currentQuestion] !== undefined;
    nextBtn.disabled = !hasAnswer;
    nextBtn.style.opacity = hasAnswer ? '1' : '0.5';
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.innerHTML = '결과 보기 <i class="fas fa-check"></i>';
    } else {
        nextBtn.innerHTML = '다음 <i class="fas fa-arrow-right"></i>';
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    if (answers[currentQuestion] === undefined) {
        alert('답변을 선택해주세요.');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        calculateResult();
    }
}

function calculateResult() {
    correctAnswers = 0;
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        if (question.options[answerIndex].correct) {
            correctAnswers++;
        }
    });
    
    let resultType = 'average';
    
    for (let type in results) {
        const range = results[type].range;
        if (correctAnswers >= range[0] && correctAnswers <= range[1]) {
            resultType = type;
            break;
        }
    }
    
    showResult(resultType);
}

function showResult(type) {
    const result = results[type];
    
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    
    document.getElementById('resultType').textContent = result.icon + ' ' + correctAnswers + '/' + questions.length;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;
    
    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsContainer.appendChild(li);
    });
    
    const growthContainer = document.getElementById('resultGrowth');
    growthContainer.innerHTML = '';
    result.growth.forEach(growth => {
        const li = document.createElement('li');
        li.textContent = growth;
        growthContainer.appendChild(li);
    });
    
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('인지능력검사 JavaScript 로드 완료');
});
