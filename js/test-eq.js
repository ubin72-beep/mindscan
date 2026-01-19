// 감성지능(EQ) 검사 JavaScript
// Emotional Intelligence Test

let currentQuestion = 0;
let answers = [];
let totalScore = 0;

const questions = [
    {
        question: "나는 내 감정을 정확하게 인식하고 이름 붙일 수 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람의 표정과 몸짓을 보고 그들의 감정을 잘 파악한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "화가 나거나 스트레스를 받아도 감정을 잘 조절할 수 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람의 감정에 공감하고 이해하려고 노력한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "목표를 위해 즉각적인 만족을 미루고 참을 수 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "어려운 상황에서도 긍정적인 면을 찾으려고 노력한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람과 갈등이 생겼을 때 효과적으로 해결한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "나 자신의 강점과 약점을 잘 알고 있다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람들과 쉽게 친해지고 관계를 잘 유지한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "실패나 좌절을 겪어도 빨리 회복하고 다시 도전한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람의 입장에서 생각하고 행동하려고 노력한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "내 감정이 내 행동과 판단에 어떤 영향을 미치는지 안다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "팀이나 그룹에서 분위기를 잘 파악하고 조화롭게 행동한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "비판이나 부정적인 피드백을 받아도 침착하게 대응한다.",
        options: [
            { text: "전혀 그렇지 않다", score: 1 },
            { text: "그렇지 않다", score: 2 },
            { text: "보통이다", score: 3 },
            { text: "그렇다", score: 4 },
            { text: "매우 그렇다", score: 5 }
        ]
    },
    {
        question: "다른 사람을 격려하고 동기부여 하는 것을 잘한다.",
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
        title: "매우 높은 감성지능",
        description: "당신은 탁월한 감성지능을 가지고 있습니다. 자신과 타인의 감정을 깊이 이해하고, 관계를 효과적으로 관리하는 능력이 뛰어납니다.",
        traits: [
            "자기 감정을 정확하게 인식하고 조절한다",
            "타인의 감정을 민감하게 파악하고 공감한다",
            "대인관계를 원만하게 유지하고 발전시킨다",
            "스트레스와 갈등을 건설적으로 해결한다",
            "리더십과 영향력이 뛰어나다"
        ],
        growth: [
            "이 강점을 활용해 다른 사람을 도와주세요",
            "리더십 역할에서 능력을 발휘하세요",
            "감성지능 코칭이나 멘토링을 고려해보세요",
            "지속적인 자기성찰로 더 성장하세요"
        ]
    },
    high: {
        range: [61, 67],
        icon: "✨",
        title: "높은 감성지능",
        description: "당신은 높은 수준의 감성지능을 가지고 있습니다. 감정을 잘 이해하고 관리하며, 대인관계에서 긍정적인 영향을 미칩니다.",
        traits: [
            "자기 감정을 대체로 잘 인식하고 표현한다",
            "타인의 감정에 공감하고 배려한다",
            "관계에서 갈등을 잘 해결한다",
            "스트레스 관리 능력이 좋다",
            "긍정적인 태도를 유지한다"
        ],
        growth: [
            "특정 상황에서 감정 조절을 더 연습하세요",
            "공감 능력을 더 키워보세요",
            "어려운 대화를 나누는 연습을 하세요",
            "감정 일기를 써보세요"
        ]
    },
    average: {
        range: [46, 60],
        icon: "💫",
        title: "평균 감성지능",
        description: "당신은 평균 수준의 감성지능을 가지고 있습니다. 기본적인 감정 이해와 관리는 가능하지만, 더 발전시킬 여지가 있습니다.",
        traits: [
            "기본적인 감정 인식은 가능하다",
            "때때로 감정 조절에 어려움을 겪는다",
            "타인의 감정을 이해하려고 노력한다",
            "관계에서 가끔 갈등을 경험한다",
            "스트레스 상황에서 대처가 쉽지 않다"
        ],
        growth: [
            "감정 인식 연습을 규칙적으로 하세요",
            "공감 능력 향상에 집중하세요",
            "감정 조절 기법을 배워보세요",
            "대인관계 스킬을 개발하세요"
        ]
    },
    low: {
        range: [31, 45],
        icon: "💭",
        title: "낮은 감성지능",
        description: "당신의 감성지능은 개선이 필요한 수준입니다. 감정 이해와 관리, 대인관계에서 어려움을 겪을 수 있습니다.",
        traits: [
            "자신의 감정을 파악하기 어렵다",
            "감정 조절에 자주 실패한다",
            "타인의 감정을 이해하기 힘들다",
            "대인관계에서 갈등이 잦다",
            "스트레스 관리가 어렵다"
        ],
        growth: [
            "감정 인식 훈련을 시작하세요",
            "감정 일기를 쓰며 자기 이해를 높이세요",
            "공감 능력 개발에 집중하세요",
            "전문가의 도움을 받는 것을 고려하세요"
        ]
    },
    veryLow: {
        range: [15, 30],
        icon: "🌱",
        title: "매우 낮은 감성지능",
        description: "당신의 감성지능은 상당한 개선이 필요합니다. 감정과 관계에서 많은 어려움을 겪고 있을 수 있습니다. 전문적인 도움이 필요할 수 있습니다.",
        traits: [
            "감정을 인식하고 표현하기 매우 어렵다",
            "감정 폭발이나 억압이 자주 일어난다",
            "타인의 감정을 거의 이해하지 못한다",
            "관계에서 심각한 문제를 겪는다",
            "만성적인 스트레스 상태이다"
        ],
        growth: [
            "전문 상담사나 심리치료사를 만나보세요",
            "감성지능 교육 프로그램에 참여하세요",
            "작은 변화부터 시작하세요",
            "자기 자신에 대한 연민을 가지세요"
        ]
    }
};

function startTest() {
    console.log('감성지능검사 시작');
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('testScreen').classList.add('active');
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
    
    document.getElementById('testScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    
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
    console.log('감성지능검사 JavaScript 로드 완료');
});
