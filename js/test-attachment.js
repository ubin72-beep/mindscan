// 애착유형검사 JavaScript
// 4가지 애착 유형 검사

let currentQuestion = 0;
let answers = [];
let scores = {
    secure: 0,      // 안정형
    anxious: 0,     // 불안형
    avoidant: 0,    // 회피형
    fearful: 0      // 두려움형
};

const questions = [
    {
        question: "새로운 사람을 만날 때 나는...",
        options: [
            { text: "편안하게 다가가서 대화를 시작한다", type: "secure", score: 3 },
            { text: "상대방이 먼저 다가오길 기다린다", type: "avoidant", score: 3 },
            { text: "거부당할까 봐 걱정되지만 다가간다", type: "anxious", score: 3 },
            { text: "관심은 있지만 가까워지는 게 불편하다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "연인/가까운 사람과 갈등이 생기면...",
        options: [
            { text: "침착하게 대화로 해결하려고 노력한다", type: "secure", score: 3 },
            { text: "혼자 있고 싶어서 거리를 둔다", type: "avoidant", score: 3 },
            { text: "버림받을까 봐 불안해서 계속 연락한다", type: "anxious", score: 3 },
            { text: "화가 나지만 표현하지 못하고 멀어진다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "사랑하는 사람이 바쁘다고 연락이 뜸해지면...",
        options: [
            { text: "이해하고 기다린다. 바쁠 수 있다", type: "secure", score: 3 },
            { text: "오히려 편하다. 혼자 시간도 필요하다", type: "avoidant", score: 3 },
            { text: "불안해서 자꾸 확인하고 연락한다", type: "anxious", score: 3 },
            { text: "거리를 두는 건지 의심하고 먼저 멀어진다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "누군가에게 도움을 청해야 할 때...",
        options: [
            { text: "편하게 부탁하고 감사함을 표현한다", type: "secure", score: 3 },
            { text: "혼자 해결하려고 노력한다", type: "avoidant", score: 3 },
            { text: "거절당할까 봐 망설이다가 부탁한다", type: "anxious", score: 3 },
            { text: "부탁하고 싶지만 거절당할까 봐 안 한다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "친한 사람이 갑자기 연락을 안 하면...",
        options: [
            { text: "바쁜가 보다 생각하고 자연스럽게 기다린다", type: "secure", score: 3 },
            { text: "별로 신경 안 쓰인다", type: "avoidant", score: 3 },
            { text: "내가 뭘 잘못했나 계속 생각한다", type: "anxious", score: 3 },
            { text: "화가 나고 서운해서 먼저 연락 안 한다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "나에 대한 타인의 평가에 대해...",
        options: [
            { text: "참고하되 내 판단을 신뢰한다", type: "secure", score: 3 },
            { text: "별로 신경 쓰지 않는다", type: "avoidant", score: 3 },
            { text: "굉장히 중요하고 신경이 많이 쓰인다", type: "anxious", score: 3 },
            { text: "신경 쓰이지만 모른 척한다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "친밀한 관계에서 나는...",
        options: [
            { text: "가까워지는 게 편하고 자연스럽다", type: "secure", score: 3 },
            { text: "너무 가까워지면 답답하고 불편하다", type: "avoidant", score: 3 },
            { text: "더 가까워지고 싶고 확인받고 싶다", type: "anxious", score: 3 },
            { text: "가까워지고 싶지만 상처받을까 두렵다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "연인이 다른 이성과 친하게 지내면...",
        options: [
            { text: "믿고 존중한다. 문제없다", type: "secure", score: 3 },
            { text: "별로 신경 안 쓰인다", type: "avoidant", score: 3 },
            { text: "불안하고 질투가 난다", type: "anxious", score: 3 },
            { text: "배신당할까 봐 두렵고 거리를 둔다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "감정적으로 힘들 때 나는...",
        options: [
            { text: "가까운 사람에게 터놓고 이야기한다", type: "secure", score: 3 },
            { text: "혼자 있으면서 스스로 해결한다", type: "avoidant", score: 3 },
            { text: "누군가 알아주고 위로해주길 바란다", type: "anxious", score: 3 },
            { text: "힘들지만 표현하지 못하고 혼자 삭인다", type: "fearful", score: 3 }
        ]
    },
    {
        question: "사랑한다는 말을 들으면...",
        options: [
            { text: "행복하고 감사하다", type: "secure", score: 3 },
            { text: "부담스럽고 불편하다", type: "avoidant", score: 3 },
            { text: "더 자주 듣고 싶고 확인하고 싶다", type: "anxious", score: 3 },
            { text: "진심인지 의심되고 믿기 어렵다", type: "fearful", score: 3 }
        ]
    }
];

const results = {
    secure: {
        icon: "💚",
        title: "안정형 애착",
        description: "당신은 건강하고 안정적인 애착 유형을 가지고 있습니다. 관계에서 편안함과 신뢰를 느끼며, 적절한 거리와 친밀감을 유지합니다.",
        traits: [
            "타인을 쉽게 믿고 의지할 수 있다",
            "거부나 버림받는 것에 대한 과도한 걱정이 없다",
            "친밀함과 독립성의 균형을 잘 유지한다",
            "감정을 건강하게 표현하고 소통한다",
            "갈등을 건설적으로 해결한다"
        ],
        growth: [
            "현재의 건강한 애착 패턴을 잘 유지하세요",
            "불안정한 애착을 가진 사람을 이해하고 도와주세요",
            "새로운 관계에서도 안정감을 나눠주세요",
            "자기 성찰을 통해 더 성장하세요"
        ]
    },
    anxious: {
        icon: "💛",
        title: "불안형 애착",
        description: "관계에서 버림받거나 거부당할까 봐 불안해하는 경향이 있습니다. 사랑과 인정에 대한 욕구가 강하며, 상대방의 반응에 민감합니다.",
        traits: [
            "연인의 사랑을 계속 확인하고 싶어 한다",
            "거부나 무시에 매우 민감하다",
            "혼자 있는 것을 힘들어한다",
            "상대방의 작은 변화에도 불안해한다",
            "관계에 과도하게 집착하는 경향이 있다"
        ],
        growth: [
            "자기 자신에 대한 확신과 자존감을 키우세요",
            "상대방도 독립적인 시간이 필요함을 이해하세요",
            "불안할 때 즉각 반응하지 말고 한 박자 쉬세요",
            "상담이나 심리치료를 고려해보세요"
        ]
    },
    avoidant: {
        icon: "💙",
        title: "회피형 애착",
        description: "독립성과 자율성을 매우 중요하게 여기며, 지나친 친밀함을 불편해합니다. 감정 표현이나 의존을 어려워합니다.",
        traits: [
            "너무 가까워지는 것을 불편해한다",
            "감정 표현이나 취약함을 보이기 어렵다",
            "혼자 있는 시간을 선호한다",
            "타인에게 의지하는 것을 싫어한다",
            "관계에서 거리를 두려는 경향이 있다"
        ],
        growth: [
            "친밀함도 건강한 관계의 일부임을 인식하세요",
            "감정을 표현하는 연습을 해보세요",
            "타인에게 의지하는 것도 괜찮다는 걸 배우세요",
            "관계에서 균형을 찾아가세요"
        ]
    },
    fearful: {
        icon: "💜",
        title: "두려움형 애착 (혼란형)",
        description: "친밀감을 원하면서도 동시에 두려워하는 양가감정을 느낍니다. 과거의 상처로 인해 관계에서 혼란을 경험할 수 있습니다.",
        traits: [
            "가까워지고 싶지만 상처받을까 두렵다",
            "관계에 대한 양가감정이 크다",
            "신뢰하기 어렵고 의심이 많다",
            "감정 기복이 심할 수 있다",
            "친밀함과 거리두기 사이에서 갈등한다"
        ],
        growth: [
            "과거의 상처를 인식하고 치유하세요",
            "전문적인 심리상담을 고려해보세요",
            "안전한 관계 경험을 통해 신뢰를 회복하세요",
            "자기 자신에 대한 연민을 가지세요"
        ]
    }
};

function startTest() {
    console.log('애착유형검사 시작');
    const startScreen = document.getElementById('startScreen');
    const testScreen = document.getElementById('testScreen');
    
    if (!startScreen || !testScreen) {
        console.error('화면 요소를 찾을 수 없습니다!');
        alert('오류가 발생했습니다. 페이지를 새로고침 해주세요.');
        return;
    }
    
    startScreen.style.display = 'none';
    testScreen.style.display = 'block';
    testScreen.style.visibility = 'visible';
    testScreen.style.opacity = '1';
    
    document.getElementById('totalQuestions').textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    
    // 질문 텍스트 업데이트
    document.getElementById('questionText').textContent = question.question;
    
    // 진행 상황 업데이트
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // 답변 옵션 생성
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.onclick = () => selectAnswer(index);
        
        // 이전에 선택한 답변이 있으면 표시
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
    
    // 모든 버튼의 선택 상태 초기화
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // 선택한 버튼 활성화
    buttons[optionIndex].classList.add('selected');
    
    updateButtons();
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // 이전 버튼
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.style.opacity = currentQuestion === 0 ? '0.5' : '1';
    
    // 다음 버튼
    const hasAnswer = answers[currentQuestion] !== undefined;
    nextBtn.disabled = !hasAnswer;
    nextBtn.style.opacity = hasAnswer ? '1' : '0.5';
    
    // 마지막 질문이면 버튼 텍스트 변경
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
    // 점수 계산
    scores = {
        secure: 0,
        anxious: 0,
        avoidant: 0,
        fearful: 0
    };
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        const selectedOption = question.options[answerIndex];
        scores[selectedOption.type] += selectedOption.score;
    });
    
    // 가장 높은 점수의 유형 찾기
    let maxScore = 0;
    let resultType = 'secure';
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    }
    
    showResult(resultType);
}

function showResult(type) {
    const result = results[type];
    
    // 화면 전환
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    
    // 결과 내용 업데이트
    document.getElementById('resultType').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;
    
    // 주요 특징
    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        traitsContainer.appendChild(li);
    });
    
    // 성장 방향
    const growthContainer = document.getElementById('resultGrowth');
    growthContainer.innerHTML = '';
    result.growth.forEach(growth => {
        const li = document.createElement('li');
        li.textContent = growth;
        growthContainer.appendChild(li);
    });
    
    // 상단으로 스크롤
    window.scrollTo(0, 0);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('애착유형검사 JavaScript 로드 완료');
});
