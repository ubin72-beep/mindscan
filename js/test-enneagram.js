// 에니어그램 검사 JavaScript
// 9가지 성격 유형 검사

let currentQuestion = 0;
let answers = [];
let scores = {
    type1: 0, // 개혁가
    type2: 0, // 조력가
    type3: 0, // 성취자
    type4: 0, // 예술가
    type5: 0, // 사색가
    type6: 0, // 충성가
    type7: 0, // 낙천가
    type8: 0, // 도전가
    type9: 0  // 평화주의자
};

// 질문 데이터 (18개 질문, 각 유형당 2개)
const questions = [
    // Type 1 (개혁가) - 완벽주의, 원칙
    { q: "나는 항상 옳은 일을 하려고 노력합니다.", type: "type1" },
    { q: "실수나 결함을 발견하면 바로잡고 싶어집니다.", type: "type1" },
    
    // Type 2 (조력가) - 배려, 도움
    { q: "다른 사람들을 돕는 것이 나에게 큰 기쁨입니다.", type: "type2" },
    { q: "사람들이 나를 필요로 할 때 보람을 느낍니다.", type: "type2" },
    
    // Type 3 (성취자) - 성공, 인정
    { q: "목표를 달성하고 성공하는 것이 매우 중요합니다.", type: "type3" },
    { q: "다른 사람들에게 좋은 인상을 주는 것이 중요합니다.", type: "type3" },
    
    // Type 4 (예술가) - 독특함, 감성
    { q: "나는 특별하고 독특한 사람이 되고 싶습니다.", type: "type4" },
    { q: "깊은 감정과 예술적 표현에 끌립니다.", type: "type4" },
    
    // Type 5 (사색가) - 지식, 관찰
    { q: "혼자만의 시간을 가지며 생각하는 것을 좋아합니다.", type: "type5" },
    { q: "새로운 지식을 배우고 이해하는 것이 즐겁습니다.", type: "type5" },
    
    // Type 6 (충성가) - 안전, 충성
    { q: "미래에 일어날 일들에 대해 걱정하는 편입니다.", type: "type6" },
    { q: "신뢰할 수 있는 사람과 그룹이 중요합니다.", type: "type6" },
    
    // Type 7 (낙천가) - 즐거움, 모험
    { q: "새로운 경험과 모험을 추구합니다.", type: "type7" },
    { q: "재미있고 긍정적인 것들에 끌립니다.", type: "type7" },
    
    // Type 8 (도전가) - 힘, 리더십
    { q: "강하고 독립적인 사람이 되고 싶습니다.", type: "type8" },
    { q: "불공평한 상황을 참지 못하고 맞서 싸웁니다.", type: "type8" },
    
    // Type 9 (평화주의자) - 평화, 조화
    { q: "갈등을 피하고 평화로운 관계를 유지하려 합니다.", type: "type9" },
    { q: "주변 사람들과 조화롭게 지내는 것이 중요합니다.", type: "type9" }
];

// 유형별 결과 데이터
const types = {
    type1: {
        name: "Type 1",
        title: "개혁가 (The Reformer)",
        description: "원칙적이고 완벽주의적인 성향을 가진 당신은 항상 옳은 일을 하려고 노력합니다. 높은 기준을 가지고 있으며, 세상을 개선하려는 강한 의지가 있습니다.",
        traits: [
            "높은 도덕성과 윤리 의식",
            "완벽을 추구하는 성향",
            "책임감이 강하고 신뢰할 수 있음",
            "비판적 사고와 분석 능력"
        ],
        advice: [
            "완벽함에 대한 집착을 줄이고 실수를 받아들이세요",
            "자신과 타인에게 더 관대해지세요",
            "이완하는 시간을 가지세요"
        ]
    },
    type2: {
        name: "Type 2",
        title: "조력가 (The Helper)",
        description: "따뜻하고 배려심 깊은 당신은 다른 사람들을 돕는 것에서 큰 보람을 느낍니다. 관계를 중요시하며, 사람들의 필요를 잘 파악합니다.",
        traits: [
            "타인에 대한 깊은 공감과 배려",
            "관계 지향적이고 친절함",
            "봉사 정신이 강함",
            "따뜻하고 다정함"
        ],
        advice: [
            "자신의 필요도 돌보세요",
            "도움을 주는 것에 대한 기대를 줄이세요",
            "거절하는 법을 배우세요"
        ]
    },
    type3: {
        name: "Type 3",
        title: "성취자 (The Achiever)",
        description: "목표 지향적이고 성공을 추구하는 당신은 효율적이고 실용적입니다. 성과를 중요시하며, 인정받는 것을 원합니다.",
        traits: [
            "목표 달성 능력이 뛰어남",
            "효율적이고 생산적",
            "자신감 있고 카리스마 있음",
            "적응력이 높음"
        ],
        advice: [
            "성공이 아닌 자신의 가치를 인정하세요",
            "진정한 자신의 감정을 탐색하세요",
            "과정을 즐기고 성과에만 집착하지 마세요"
        ]
    },
    type4: {
        name: "Type 4",
        title: "예술가 (The Individualist)",
        description: "감성적이고 창의적인 당신은 독특함과 진정성을 추구합니다. 깊은 감정을 느끼며, 자신만의 정체성을 중요시합니다.",
        traits: [
            "창의적이고 예술적 감각",
            "감정 표현이 풍부함",
            "진정성을 중요시함",
            "독특하고 개성적"
        ],
        advice: [
            "현실적인 관점을 유지하세요",
            "부정적 감정에 빠지지 않도록 주의하세요",
            "자신이 가진 것에 감사하세요"
        ]
    },
    type5: {
        name: "Type 5",
        title: "사색가 (The Investigator)",
        description: "지적 호기심이 강하고 분석적인 당신은 지식을 추구하며 독립적입니다. 관찰하고 이해하는 것을 좋아합니다.",
        traits: [
            "분석적이고 논리적",
            "독립적이고 자급자족적",
            "지적 호기심이 강함",
            "집중력이 뛰어남"
        ],
        advice: [
            "감정 표현을 연습하세요",
            "사람들과 더 많은 시간을 보내세요",
            "고립되지 않도록 주의하세요"
        ]
    },
    type6: {
        name: "Type 6",
        title: "충성가 (The Loyalist)",
        description: "신중하고 책임감 있는 당신은 안전과 안정을 추구합니다. 충성스럽고 헌신적이며, 신뢰할 수 있는 사람입니다.",
        traits: [
            "충성스럽고 헌신적",
            "책임감이 강함",
            "신중하고 준비성 있음",
            "협력적이고 지지적"
        ],
        advice: [
            "과도한 걱정을 줄이세요",
            "자신의 판단을 믿으세요",
            "최악의 상황만 생각하지 마세요"
        ]
    },
    type7: {
        name: "Type 7",
        title: "낙천가 (The Enthusiast)",
        description: "활기차고 긍정적인 당신은 즐거움과 새로운 경험을 추구합니다. 열정적이고 모험심이 강합니다.",
        traits: [
            "긍정적이고 낙관적",
            "다재다능하고 활력적",
            "창의적이고 모험적",
            "열정적이고 즐거움을 추구"
        ],
        advice: [
            "깊이 있게 경험하세요",
            "부정적 감정도 받아들이세요",
            "한 가지에 집중하는 연습을 하세요"
        ]
    },
    type8: {
        name: "Type 8",
        title: "도전가 (The Challenger)",
        description: "강하고 자신감 넘치는 당신은 독립적이고 결단력이 있습니다. 정의를 추구하며, 리더십이 강합니다.",
        traits: [
            "강하고 자신감 있음",
            "리더십이 뛰어남",
            "정의롭고 보호적",
            "결단력 있고 직선적"
        ],
        advice: [
            "취약함을 드러내는 것을 두려워하지 마세요",
            "타인의 의견을 존중하세요",
            "부드러운 접근도 필요합니다"
        ]
    },
    type9: {
        name: "Type 9",
        title: "평화주의자 (The Peacemaker)",
        description: "평화롭고 조화로운 당신은 갈등을 피하고 모든 것이 원만하기를 바랍니다. 수용적이고 지지적입니다.",
        traits: [
            "평화롭고 조화로움",
            "수용적이고 지지적",
            "인내심이 강함",
            "중재 능력이 뛰어남"
        ],
        advice: [
            "자신의 의견을 분명히 표현하세요",
            "갈등을 피하지 말고 직면하세요",
            "자신의 우선순위를 정하세요"
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
    console.log('검사 시작 함수 호출됨');
    
    const startScreen = document.querySelector('.start-screen');
    const testScreen = document.querySelector('.test-screen');
    
    if (!startScreen || !testScreen) {
        console.error('화면 요소를 찾을 수 없습니다!');
        alert('페이지 로딩 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    startScreen.style.display = 'none';
    testScreen.style.display = 'block';
    
    currentQuestion = 0;
    answers = [];
    scores = {
        type1: 0, type2: 0, type3: 0, type4: 0, type5: 0,
        type6: 0, type7: 0, type8: 0, type9: 0
    };
    
    console.log('검사 초기화 완료, 첫 질문 표시');
    showQuestion();
}

// 질문 표시
function showQuestion() {
    console.log('질문 표시 함수 호출됨:', currentQuestion);
    
    const question = questions[currentQuestion];
    
    // 요소 확인
    const questionText = document.getElementById('questionText');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    const progressFill = document.getElementById('progressFill');
    const answersContainer = document.getElementById('answersContainer');
    
    // 요소가 없으면 에러 메시지 표시
    if (!questionText || !currentQuestionEl || !totalQuestionsEl || !progressFill || !answersContainer) {
        console.error('필수 요소를 찾을 수 없습니다!');
        console.log('questionText:', questionText);
        console.log('currentQuestionEl:', currentQuestionEl);
        console.log('totalQuestionsEl:', totalQuestionsEl);
        console.log('progressFill:', progressFill);
        console.log('answersContainer:', answersContainer);
        alert('페이지 로딩 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    questionText.textContent = question.q;
    currentQuestionEl.textContent = currentQuestion + 1;
    totalQuestionsEl.textContent = questions.length;
    
    // 진행바 업데이트
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    console.log('진행률:', progress + '%');
    
    // 답변 옵션 생성
    answersContainer.innerHTML = '';
    
    answerOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.onclick = () => selectAnswer(index);
        
        const selectedAnswer = answers[currentQuestion];
        if (selectedAnswer !== undefined && selectedAnswer === index) {
            button.classList.add('selected');
        }
        
        button.innerHTML = `
            <div class="answer-number">${option.value}</div>
            <div class="answer-text">${option.text}</div>
        `;
        
        answersContainer.appendChild(button);
    });
    
    console.log('답변 버튼 생성 완료:', answerOptions.length + '개');
    
    // 버튼 상태 업데이트
    updateButtons();
}

// 답변 선택
function selectAnswer(answerIndex) {
    console.log('답변 선택됨:', answerIndex);
    answers[currentQuestion] = answerIndex;
    
    // 선택된 답변 시각적 표시
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
        console.log('이전 질문으로 이동:', currentQuestion);
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
        console.log('다음 질문으로 이동:', currentQuestion);
        showQuestion();
    } else {
        console.log('마지막 질문 완료, 결과 계산 시작');
        calculateResult();
    }
}

// 버튼 상태 업데이트
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!prevBtn || !nextBtn) {
        console.error('버튼을 찾을 수 없습니다!');
        return;
    }
    
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
    console.log('결과 계산 시작');
    
    // 각 질문의 답변을 해당 유형에 점수로 추가
    questions.forEach((question, index) => {
        const answerValue = answerOptions[answers[index]].value;
        scores[question.type] += answerValue;
        console.log(`질문 ${index + 1}: ${question.type} +${answerValue}점`);
    });
    
    console.log('최종 점수:', scores);
    
    // 가장 높은 점수의 유형 찾기
    let maxScore = 0;
    let resultType = 'type1';
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    }
    
    console.log('결과 유형:', resultType, '점수:', maxScore);
    
    showResult(resultType);
}

// 결과 표시
function showResult(resultType) {
    console.log('결과 표시:', resultType);
    
    const result = types[resultType];
    
    const testScreen = document.querySelector('.test-screen');
    const resultScreen = document.querySelector('.result-screen');
    
    if (!testScreen || !resultScreen) {
        console.error('결과 화면을 찾을 수 없습니다!');
        return;
    }
    
    testScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    const resultTypeEl = document.getElementById('resultType');
    const resultTitleEl = document.getElementById('resultTitle');
    const resultDescriptionEl = document.getElementById('resultDescription');
    
    if (resultTypeEl) resultTypeEl.textContent = result.name;
    if (resultTitleEl) resultTitleEl.textContent = result.title;
    if (resultDescriptionEl) resultDescriptionEl.textContent = result.description;
    
    // 특징 목록
    const traitsContainer = document.getElementById('resultTraits');
    if (traitsContainer) {
        traitsContainer.innerHTML = '';
        result.traits.forEach(trait => {
            const li = document.createElement('li');
            li.textContent = trait;
            traitsContainer.appendChild(li);
        });
    }
    
    // 조언 목록
    const growthContainer = document.getElementById('resultGrowth');
    if (growthContainer) {
        growthContainer.innerHTML = '';
        result.advice.forEach(advice => {
            const li = document.createElement('li');
            li.textContent = advice;
            growthContainer.appendChild(li);
        });
    }
    
    // 결과 저장 (선택적)
    saveResult(resultType, result);
    
    console.log('결과 표시 완료');
}

// 결과 저장
function saveResult(type, result) {
    const testResult = {
        testType: 'enneagram',
        type: type,
        title: result.title,
        date: new Date().toISOString(),
        scores: scores
    };
    
    // 로컬스토리지에 저장
    try {
        let results = JSON.parse(localStorage.getItem('mentora_results') || '[]');
        results.push(testResult);
        localStorage.setItem('mentora_results', JSON.stringify(results));
        console.log('결과 저장 완료');
    } catch (e) {
        console.log('결과 저장 실패:', e);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('에니어그램 검사 JavaScript 로드 완료');
    console.log('질문 수:', questions.length);
    console.log('유형 수:', Object.keys(types).length);
});

// 전역에 함수 노출 (HTML onclick에서 호출하기 위해)
window.startTest = startTest;
window.selectAnswer = selectAnswer;
window.prevQuestion = prevQuestion;
window.nextQuestion = nextQuestion;

console.log('에니어그램 검사 스크립트 초기화 완료');
