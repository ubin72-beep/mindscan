// DISC 행동유형검사 JavaScript
// 4가지 행동유형 검사

let currentQuestion = 0;
let answers = [];
let scores = {
    D: 0, // Dominance (주도형)
    I: 0, // Influence (사교형)
    S: 0, // Steadiness (안정형)
    C: 0  // Conscientiousness (신중형)
};

// 질문 데이터 (28개 질문, 각 유형당 7개)
const questions = [
    // D (주도형) - 7문항
    { q: "목표를 달성하기 위해 적극적으로 행동합니다.", type: "D" },
    { q: "도전적인 과제를 선호합니다.", type: "D" },
    { q: "결정을 빠르게 내립니다.", type: "D" },
    { q: "경쟁에서 이기는 것이 중요합니다.", type: "D" },
    { q: "주도적으로 일을 이끌어갑니다.", type: "D" },
    { q: "직접적이고 솔직하게 의견을 말합니다.", type: "D" },
    { q: "결과 중심적으로 생각합니다.", type: "D" },
    
    // I (사교형) - 7문항
    { q: "사람들과 어울리는 것을 즐깁니다.", type: "I" },
    { q: "열정적이고 긍정적입니다.", type: "I" },
    { q: "다른 사람에게 영향을 주는 것을 좋아합니다.", type: "I" },
    { q: "새로운 사람을 만나는 것이 즐겁습니다.", type: "I" },
    { q: "활기차고 표현이 풍부합니다.", type: "I" },
    { q: "팀워크와 협업을 중요시합니다.", type: "I" },
    { q: "인정과 칭찬을 받는 것을 좋아합니다.", type: "I" },
    
    // S (안정형) - 7문항
    { q: "안정적이고 예측 가능한 환경을 선호합니다.", type: "S" },
    { q: "인내심이 많고 차분합니다.", type: "S" },
    { q: "다른 사람을 돕는 것을 좋아합니다.", type: "S" },
    { q: "급격한 변화보다 점진적인 변화를 선호합니다.", type: "S" },
    { q: "신뢰할 수 있고 충성스럽습니다.", type: "S" },
    { q: "조화로운 관계를 유지하려 노력합니다.", type: "S" },
    { q: "일관성 있게 행동합니다.", type: "S" },
    
    // C (신중형) - 7문항
    { q: "세부사항에 주의를 기울입니다.", type: "C" },
    { q: "정확성과 품질을 중요시합니다.", type: "C" },
    { q: "분석적이고 논리적으로 생각합니다.", type: "C" },
    { q: "규칙과 절차를 따르는 것이 중요합니다.", type: "C" },
    { q: "신중하게 결정을 내립니다.", type: "C" },
    { q: "계획을 세우고 준비하는 것을 좋아합니다.", type: "C" },
    { q: "완벽을 추구합니다.", type: "C" }
];

// 유형별 결과 데이터
const types = {
    D: {
        name: "D형",
        title: "주도형 (Dominance)",
        description: "목표 지향적이고 결단력이 있으며 도전을 즐깁니다. 빠르게 결정을 내리고 적극적으로 행동하는 리더형입니다.",
        traits: [
            "결과 중심적이고 목표 지향적",
            "빠른 의사결정 능력",
            "도전과 경쟁을 즐김",
            "자신감 있고 주도적"
        ],
        advice: [
            "다른 사람의 의견을 경청하세요",
            "인내심을 가지세요",
            "세부사항도 살펴보세요"
        ]
    },
    I: {
        name: "I형",
        title: "사교형 (Influence)",
        description: "열정적이고 사교적이며 다른 사람에게 영향을 주는 것을 좋아합니다. 긍정적이고 활기차며 팀워크를 중요시합니다.",
        traits: [
            "사교적이고 열정적",
            "긍정적이고 낙관적",
            "설득력이 있음",
            "창의적이고 표현력이 풍부"
        ],
        advice: [
            "계획을 세우고 따르세요",
            "세부사항에도 주의를 기울이세요",
            "약속을 지키세요"
        ]
    },
    S: {
        name: "S형",
        title: "안정형 (Steadiness)",
        description: "차분하고 인내심 있으며 안정적인 환경을 선호합니다. 협조적이고 충성스러우며 조화로운 관계를 중요시합니다.",
        traits: [
            "인내심이 많고 차분함",
            "협조적이고 도움을 줌",
            "신뢰할 수 있고 충성스러움",
            "일관성 있고 안정적"
        ],
        advice: [
            "변화를 두려워하지 마세요",
            "자신의 의견을 표현하세요",
            "새로운 것을 시도해보세요"
        ]
    },
    C: {
        name: "C형",
        title: "신중형 (Conscientiousness)",
        description: "분석적이고 세심하며 정확성을 추구합니다. 논리적이고 체계적으로 일하며 품질을 중요시합니다.",
        traits: [
            "분석적이고 논리적",
            "정확하고 세심함",
            "체계적이고 조직적",
            "높은 기준을 가짐"
        ],
        advice: [
            "완벽주의를 조절하세요",
            "결정을 더 빠르게 내리세요",
            "유연성을 가지세요"
        ]
    }
};

// 답변 옵션
const answerOptions = [
    { text: "전혀 아니다", value: 1 },
    { text: "아니다", value: 2 },
    { text: "보통이다", value: 3 },
    { text: "그렇다", value: 4 },
    { text: "매우 그렇다", value: 5 }
];

// 검사 시작
function startTest() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.test-screen').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { D: 0, I: 0, S: 0, C: 0 };
    showQuestion();
}

// 질문 표시
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.q;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    answerOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.onclick = () => selectAnswer(index);
        
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        button.innerHTML = `
            <div class="answer-number">${option.value}</div>
            <div class="answer-text">${option.text}</div>
        `;
        
        answersContainer.appendChild(button);
    });
    
    updateButtons();
}

// 답변 선택
function selectAnswer(answerIndex) {
    answers[currentQuestion] = answerIndex;
    
    document.querySelectorAll('.answer-btn').forEach((btn, idx) => {
        if (idx === answerIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    updateButtons();
}

// 이전 질문
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// 다음 질문
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

// 버튼 상태 업데이트
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.style.opacity = currentQuestion === 0 ? '0.5' : '1';
    
    const isAnswered = answers[currentQuestion] !== undefined;
    nextBtn.disabled = !isAnswered;
    nextBtn.style.opacity = isAnswered ? '1' : '0.5';
    
    if (currentQuestion === questions.length - 1 && isAnswered) {
        nextBtn.innerHTML = '결과 보기 <i class="fas fa-check"></i>';
    } else {
        nextBtn.innerHTML = '다음 <i class="fas fa-arrow-right"></i>';
    }
}

// 결과 계산
function calculateResult() {
    questions.forEach((question, index) => {
        const answerValue = answerOptions[answers[index]].value;
        scores[question.type] += answerValue;
    });
    
    let maxScore = 0;
    let resultType = 'D';
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    }
    
    showResult(resultType);
}

// 결과 표시
function showResult(resultType) {
    const result = types[resultType];
    
    document.querySelector('.test-screen').style.display = 'none';
    document.querySelector('.result-screen').style.display = 'block';
    
    document.getElementById('resultType').textContent = result.name;
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
    result.advice.forEach(advice => {
        const li = document.createElement('li');
        li.textContent = advice;
        growthContainer.appendChild(li);
    });
    
    saveResult(resultType, result);
}

// 결과 저장
function saveResult(type, result) {
    const testResult = {
        testType: 'disc',
        type: type,
        title: result.title,
        date: new Date().toISOString(),
        scores: scores
    };
    
    try {
        let results = JSON.parse(localStorage.getItem('mentora_results') || '[]');
        results.push(testResult);
        localStorage.setItem('mentora_results', JSON.stringify(results));
    } catch (e) {
        console.log('결과 저장 실패:', e);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DISC 행동유형검사 준비 완료');
});
