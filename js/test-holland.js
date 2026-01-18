// Holland 적성검사 JavaScript
// 6가지 직업 적성 검사 (RIASEC)

let currentQuestion = 0;
let answers = [];
let scores = {
    R: 0, // Realistic (실재형)
    I: 0, // Investigative (탐구형)
    A: 0, // Artistic (예술형)
    S: 0, // Social (사회형)
    E: 0, // Enterprising (진취형)
    C: 0  // Conventional (관습형)
};

// 질문 데이터 (60개 질문, 각 유형당 10개)
const questions = [
    // R (실재형) - 10문항
    { q: "기계나 도구를 다루는 것을 좋아합니다.", type: "R" },
    { q: "손으로 무언가를 만드는 것이 즐겁습니다.", type: "R" },
    { q: "야외 활동을 선호합니다.", type: "R" },
    { q: "실용적이고 구체적인 일을 좋아합니다.", type: "R" },
    { q: "운동이나 신체 활동을 즐깁니다.", type: "R" },
    { q: "기술적인 문제를 해결하는 것이 재미있습니다.", type: "R" },
    { q: "물리적인 결과물을 만드는 일을 선호합니다.", type: "R" },
    { q: "기계의 작동 원리에 관심이 많습니다.", type: "R" },
    { q: "정밀한 작업을 잘 합니다.", type: "R" },
    { q: "실습이나 실험을 좋아합니다.", type: "R" },
    
    // I (탐구형) - 10문항
    { q: "복잡한 문제를 분석하는 것을 좋아합니다.", type: "I" },
    { q: "과학이나 수학에 관심이 많습니다.", type: "I" },
    { q: "연구하고 탐구하는 것이 즐겁습니다.", type: "I" },
    { q: "논리적으로 생각하는 것을 선호합니다.", type: "I" },
    { q: "새로운 지식을 배우는 것이 좋습니다.", type: "I" },
    { q: "이론적이고 추상적인 개념에 관심이 있습니다.", type: "I" },
    { q: "관찰하고 분석하는 것을 좋아합니다.", type: "I" },
    { q: "독립적으로 연구하는 것을 선호합니다.", type: "I" },
    { q: "실험과 검증을 중요하게 생각합니다.", type: "I" },
    { q: "호기심이 많고 탐구심이 강합니다.", type: "I" },
    
    // A (예술형) - 10문항
    { q: "창의적인 표현을 즐깁니다.", type: "A" },
    { q: "예술 작품을 감상하는 것이 좋습니다.", type: "A" },
    { q: "상상력을 발휘하는 일을 좋아합니다.", type: "A" },
    { q: "음악이나 미술에 관심이 많습니다.", type: "A" },
    { q: "독특하고 개성적인 것을 추구합니다.", type: "A" },
    { q: "감정을 표현하는 것이 중요합니다.", type: "A" },
    { q: "디자인이나 스타일에 관심이 있습니다.", type: "A" },
    { q: "글쓰기나 창작 활동을 즐깁니다.", type: "A" },
    { q: "자유로운 환경에서 일하는 것을 선호합니다.", type: "A" },
    { q: "미적 감각이 뛰어납니다.", type: "A" },
    
    // S (사회형) - 10문항
    { q: "사람들을 돕는 것이 보람 있습니다.", type: "S" },
    { q: "다른 사람을 가르치는 것을 좋아합니다.", type: "S" },
    { q: "팀으로 일하는 것을 선호합니다.", type: "S" },
    { q: "사람들과 소통하는 것이 즐겁습니다.", type: "S" },
    { q: "봉사활동에 관심이 많습니다.", type: "S" },
    { q: "상담이나 조언을 하는 것을 좋아합니다.", type: "S" },
    { q: "공감 능력이 뛰어납니다.", type: "S" },
    { q: "사회 문제에 관심이 있습니다.", type: "S" },
    { q: "협력하여 문제를 해결하는 것을 선호합니다.", type: "S" },
    { q: "타인의 성장을 돕는 것이 중요합니다.", type: "S" },
    
    // E (진취형) - 10문항
    { q: "리더십을 발휘하는 것을 좋아합니다.", type: "E" },
    { q: "설득하고 영향력을 행사하는 것이 즐겁습니다.", type: "E" },
    { q: "사업이나 경영에 관심이 있습니다.", type: "E" },
    { q: "목표를 달성하고 성공하는 것이 중요합니다.", type: "E" },
    { q: "경쟁적인 환경을 선호합니다.", type: "E" },
    { q: "새로운 프로젝트를 시작하는 것이 흥미롭습니다.", type: "E" },
    { q: "결정을 내리고 책임지는 것을 좋아합니다.", type: "E" },
    { q: "위험을 감수하는 것을 두려워하지 않습니다.", type: "E" },
    { q: "재정적 성공에 관심이 있습니다.", type: "E" },
    { q: "조직을 이끌고 관리하는 것을 선호합니다.", type: "E" },
    
    // C (관습형) - 10문항
    { q: "정확하고 체계적으로 일하는 것을 좋아합니다.", type: "C" },
    { q: "세부사항에 주의를 기울입니다.", type: "C" },
    { q: "규칙과 절차를 따르는 것이 중요합니다.", type: "C" },
    { q: "조직적이고 계획적으로 일합니다.", type: "C" },
    { q: "데이터나 숫자를 다루는 것을 좋아합니다.", type: "C" },
    { q: "문서 작업이나 기록을 잘 합니다.", type: "C" },
    { q: "안정적이고 예측 가능한 환경을 선호합니다.", type: "C" },
    { q: "효율성과 정확성을 중요시합니다.", type: "C" },
    { q: "반복적인 업무도 잘 수행합니다.", type: "C" },
    { q: "체계적인 시스템에서 일하는 것이 편합니다.", type: "C" }
];

// 유형별 결과 데이터
const types = {
    R: {
        name: "R형",
        title: "실재형 (Realistic)",
        description: "실용적이고 기술적인 능력이 뛰어나며 손으로 무언가를 만들거나 기계를 다루는 것을 좋아합니다.",
        traits: [
            "실용적이고 구체적",
            "기계나 도구를 잘 다룸",
            "야외 활동을 즐김",
            "신체 활동을 선호"
        ],
        advice: [
            "기술이나 공학 분야 진로 고려",
            "실습 중심 교육 추천",
            "구체적인 목표 설정"
        ],
        careers: ["기계공학자", "건축가", "요리사", "운동선수", "농업인"]
    },
    I: {
        name: "I형",
        title: "탐구형 (Investigative)",
        description: "분석적이고 논리적이며 과학적 호기심이 강합니다. 연구하고 탐구하는 것을 즐깁니다.",
        traits: [
            "분석적이고 논리적",
            "독립적으로 연구",
            "호기심이 많음",
            "이론적 사고"
        ],
        advice: [
            "과학이나 연구 분야 진로 고려",
            "학문적 발전 추구",
            "비판적 사고 능력 개발"
        ],
        careers: ["과학자", "연구원", "의사", "데이터 분석가", "교수"]
    },
    A: {
        name: "A형",
        title: "예술형 (Artistic)",
        description: "창의적이고 표현력이 풍부하며 예술적 감각이 뛰어납니다. 자유로운 환경에서 창작 활동을 즐깁니다.",
        traits: [
            "창의적이고 독창적",
            "감정 표현이 풍부",
            "미적 감각이 뛰어남",
            "자유로운 사고"
        ],
        advice: [
            "예술이나 디자인 분야 진로 고려",
            "창의성을 발휘할 수 있는 환경 찾기",
            "자신만의 스타일 개발"
        ],
        careers: ["디자이너", "작가", "음악가", "배우", "사진작가"]
    },
    S: {
        name: "S형",
        title: "사회형 (Social)",
        description: "사람들을 돕고 가르치는 것을 좋아하며 공감 능력이 뛰어납니다. 팀워크를 중요시합니다.",
        traits: [
            "공감 능력이 뛰어남",
            "협력적이고 친절",
            "소통 능력이 좋음",
            "봉사 정신"
        ],
        advice: [
            "교육이나 상담 분야 진로 고려",
            "대인관계 기술 개발",
            "사회 공헌 활동 참여"
        ],
        careers: ["교사", "상담사", "간호사", "사회복지사", "인사담당자"]
    },
    E: {
        name: "E형",
        title: "진취형 (Enterprising)",
        description: "리더십이 있고 목표 지향적이며 경영과 사업에 관심이 많습니다. 도전과 성공을 추구합니다.",
        traits: [
            "리더십이 있음",
            "설득력이 뛰어남",
            "목표 지향적",
            "경쟁심이 강함"
        ],
        advice: [
            "경영이나 영업 분야 진로 고려",
            "리더십 기술 개발",
            "네트워킹 능력 향상"
        ],
        careers: ["경영자", "영업 관리자", "변호사", "정치인", "기업가"]
    },
    C: {
        name: "C형",
        title: "관습형 (Conventional)",
        description: "체계적이고 정확하며 규칙과 절차를 잘 따릅니다. 안정적인 환경에서 효율적으로 일합니다.",
        traits: [
            "체계적이고 조직적",
            "정확하고 세심",
            "규칙을 잘 따름",
            "안정성을 추구"
        ],
        advice: [
            "회계나 행정 분야 진로 고려",
            "디테일 관리 능력 개발",
            "시스템 이해력 향상"
        ],
        careers: ["회계사", "은행원", "비서", "사서", "데이터 관리자"]
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
    scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
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
    let resultType = 'R';
    
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
    
    // 진로 조언 추가
    result.advice.forEach(advice => {
        const li = document.createElement('li');
        li.textContent = advice;
        growthContainer.appendChild(li);
    });
    
    // 추천 직업 추가
    if (result.careers) {
        const careersTitle = document.createElement('h3');
        careersTitle.innerHTML = '<i class="fas fa-briefcase"></i> 추천 직업';
        careersTitle.style.marginTop = '30px';
        document.querySelector('.result-screen').appendChild(careersTitle);
        
        const careersList = document.createElement('ul');
        careersList.style.listStyle = 'none';
        careersList.style.padding = '0';
        
        result.careers.forEach(career => {
            const li = document.createElement('li');
            li.textContent = career;
            li.style.padding = '15px 20px';
            li.style.background = '#f8f9fa';
            li.style.borderRadius = '12px';
            li.style.marginBottom = '10px';
            li.style.borderLeft = '4px solid #d4af37';
            careersList.appendChild(li);
        });
        
        document.querySelector('.result-screen').appendChild(careersList);
    }
    
    saveResult(resultType, result);
}

// 결과 저장
function saveResult(type, result) {
    const testResult = {
        testType: 'holland',
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
    console.log('Holland 적성검사 준비 완료');
});
