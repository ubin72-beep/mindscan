// 사회지능(SQ) 검사 JavaScript
// Social Intelligence Test

let currentQuestion = 0;
let answers = [];
let totalScore = 0;

const questions = [
    {
        question: "처음 만난 사람과도 쉽게 대화를 이어갈 수 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "모임이나 파티에서 사람들과 어울리는 것이 편하다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람의 비언어적 신호(표정, 몸짓)를 잘 읽는다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "사회적 상황에서 적절하게 행동하는 방법을 안다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다양한 유형의 사람들과 잘 지낸다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "그룹 내 분위기나 역학관계를 빠르게 파악한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "어색한 사회적 상황을 잘 해결할 수 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람들이 나를 편안하게 느끼도록 만든다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "사람들과의 네트워킹이나 관계 형성을 잘한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "타인의 관점에서 상황을 이해하려고 노력한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "사회적 규범과 예절을 잘 지킨다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "갈등 상황에서 중재자 역할을 잘 수행한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람들에게 긍정적인 영향을 미친다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "팀 프로젝트나 협업을 즐긴다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "사회적으로 민감한 이슈에 대해 신중하게 말한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    }
];

const results = {
    veryHigh: {
        range: [68, 75],
        icon: "🌟",
        title: "매우 높은 사회지능",
        description: "당신은 탁월한 사회지능을 가지고 있습니다. 사람들과의 관계를 자연스럽게 형성하고 유지하며, 사회적 상황을 매우 잘 다룹니다.",
        traits: [
            "대인관계 능력이 탁월하다",
            "사회적 신호를 정확하게 읽는다",
            "다양한 사람들과 쉽게 소통한다",
            "그룹 역학을 잘 이해하고 활용한다",
            "리더십과 영향력이 뛰어나다"
        ],
        growth: [
            "리더십 역할을 맡아보세요",
            "멘토링이나 코칭을 고려하세요",
            "네트워킹 이벤트를 주도하세요",
            "사회적 기술을 다른 사람에게 가르치세요"
        ]
    },
    high: {
        range: [61, 67],
        icon: "✨",
        title: "높은 사회지능",
        description: "당신은 높은 수준의 사회지능을 가지고 있습니다. 대부분의 사회적 상황을 잘 다루며, 관계 형성에 능숙합니다.",
        traits: [
            "대인관계가 원만하다",
            "사회적 상황을 잘 이해한다",
            "의사소통이 효과적이다",
            "공감 능력이 좋다",
            "협업을 잘한다"
        ],
        growth: [
            "더 다양한 사람들과 교류하세요",
            "리더십 기회를 찾아보세요",
            "갈등 해결 기술을 더 연마하세요",
            "사회적 네트워크를 확장하세요"
        ]
    },
    average: {
        range: [46, 60],
        icon: "💫",
        title: "평균 사회지능",
        description: "당신은 평균 수준의 사회지능을 가지고 있습니다. 일반적인 사회적 상황은 다룰 수 있지만, 더 발전시킬 여지가 있습니다.",
        traits: [
            "친한 사람들과는 편하다",
            "새로운 사람을 만나는 것이 때때로 부담스럽다",
            "사회적 신호를 가끔 놓친다",
            "그룹에서 적극적이지 않을 수 있다",
            "갈등 상황이 불편하다"
        ],
        growth: [
            "사회적 기술 교육에 참여하세요",
            "다양한 모임에 참석하세요",
            "적극적으로 대화를 시작하는 연습을 하세요",
            "비언어적 신호 읽기를 연습하세요"
        ]
    },
    low: {
        range: [31, 45],
        icon: "💭",
        title: "낮은 사회지능",
        description: "사회지능 개발이 필요합니다. 사회적 상황에서 어려움을 겪을 수 있으며, 관계 형성이 쉽지 않을 수 있습니다.",
        traits: [
            "사회적 상황이 매우 불편하다",
            "대인관계 형성이 어렵다",
            "사회적 신호를 이해하기 힘들다",
            "그룹 활동을 피하는 경향이 있다",
            "의사소통에 어려움이 있다"
        ],
        growth: [
            "소규모 모임부터 시작하세요",
            "사회 기술 훈련을 받아보세요",
            "신뢰할 수 있는 친구와 연습하세요",
            "사회적 상황 노출을 점진적으로 늘리세요"
        ]
    },
    veryLow: {
        range: [15, 30],
        icon: "🌱",
        title: "매우 낮은 사회지능",
        description: "사회지능이 많이 부족한 상태입니다. 사회적 상황과 대인관계에서 상당한 어려움을 겪고 있을 수 있습니다. 전문적인 도움이 필요할 수 있습니다.",
        traits: [
            "사회적 상황을 극도로 회피한다",
            "대인관계가 거의 없다",
            "의사소통이 매우 어렵다",
            "사회적 신호를 전혀 이해하지 못한다",
            "고립감을 느낀다"
        ],
        growth: [
            "전문 상담사의 도움을 받으세요",
            "사회 기술 치료 프로그램을 고려하세요",
            "온라인 커뮤니티부터 시작하세요",
            "작은 성공부터 쌓아가세요"
        ]
    }
};

function startTest() {
    console.log('사회지능검사 시작');
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
    totalScore = 0;
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        totalScore += question.options[answerIndex].score;
    });
    
    let resultType = 'average';
    
    for (let type in results) {
        const range = results[type].range;
        if (totalScore >= range[0] && totalScore <= range[1]) {
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
    
    document.getElementById('resultType').textContent = result.icon + ' ' + totalScore + '점';
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
    console.log('사회지능검사 JavaScript 로드 완료');
});
