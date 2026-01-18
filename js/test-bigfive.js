// Big Five 성격검사 JavaScript
// 5가지 성격 요인 검사 (OCEAN)

let currentQuestion = 0;
let answers = [];
let scores = {
    openness: 0,           // 개방성
    conscientiousness: 0,  // 성실성
    extraversion: 0,       // 외향성
    agreeableness: 0,      // 친화성
    neuroticism: 0         // 신경성
};

// 질문 데이터 (50개 질문, 각 요인당 10개)
const questions = [
    // Openness (개방성) - 10문항
    { q: "새로운 아이디어와 경험에 열려 있습니다.", type: "openness", reverse: false },
    { q: "상상력이 풍부한 편입니다.", type: "openness", reverse: false },
    { q: "예술과 창의적인 활동을 즐깁니다.", type: "openness", reverse: false },
    { q: "추상적이고 철학적인 대화를 좋아합니다.", type: "openness", reverse: false },
    { q: "새로운 것을 시도하는 것을 좋아합니다.", type: "openness", reverse: false },
    { q: "전통적인 방식을 선호합니다.", type: "openness", reverse: true },
    { q: "호기심이 많은 편입니다.", type: "openness", reverse: false },
    { q: "다양한 취미를 가지고 있습니다.", type: "openness", reverse: false },
    { q: "변화를 즐기는 편입니다.", type: "openness", reverse: false },
    { q: "일상적이고 반복적인 일을 선호합니다.", type: "openness", reverse: true },
    
    // Conscientiousness (성실성) - 10문항
    { q: "항상 준비를 철저히 합니다.", type: "conscientiousness", reverse: false },
    { q: "계획을 세우고 그대로 따릅니다.", type: "conscientiousness", reverse: false },
    { q: "세부사항에 주의를 기울입니다.", type: "conscientiousness", reverse: false },
    { q: "약속을 잘 지킵니다.", type: "conscientiousness", reverse: false },
    { q: "체계적이고 조직적입니다.", type: "conscientiousness", reverse: false },
    { q: "일을 미루는 경향이 있습니다.", type: "conscientiousness", reverse: true },
    { q: "목표를 달성하기 위해 노력합니다.", type: "conscientiousness", reverse: false },
    { q: "정리정돈을 잘 합니다.", type: "conscientiousness", reverse: false },
    { q: "책임감이 강한 편입니다.", type: "conscientiousness", reverse: false },
    { q: "충동적으로 행동하는 편입니다.", type: "conscientiousness", reverse: true },
    
    // Extraversion (외향성) - 10문항
    { q: "사람들과 함께 있는 것이 즐겁습니다.", type: "extraversion", reverse: false },
    { q: "파티나 사교 모임을 좋아합니다.", type: "extraversion", reverse: false },
    { q: "대화를 주도하는 편입니다.", type: "extraversion", reverse: false },
    { q: "활동적이고 에너지가 넘칩니다.", type: "extraversion", reverse: false },
    { q: "많은 친구들과 어울립니다.", type: "extraversion", reverse: false },
    { q: "혼자 있는 시간을 선호합니다.", type: "extraversion", reverse: true },
    { q: "쉽게 흥분하고 열정적입니다.", type: "extraversion", reverse: false },
    { q: "주목받는 것을 좋아합니다.", type: "extraversion", reverse: false },
    { q: "낯선 사람에게 먼저 말을 겁니다.", type: "extraversion", reverse: false },
    { q: "조용한 편입니다.", type: "extraversion", reverse: true },
    
    // Agreeableness (친화성) - 10문항
    { q: "다른 사람들을 도와주는 것을 좋아합니다.", type: "agreeableness", reverse: false },
    { q: "공감 능력이 뛰어납니다.", type: "agreeableness", reverse: false },
    { q: "협력적이고 양보를 잘 합니다.", type: "agreeableness", reverse: false },
    { q: "친절하고 배려심이 많습니다.", type: "agreeableness", reverse: false },
    { q: "다른 사람을 믿는 편입니다.", type: "agreeableness", reverse: false },
    { q: "비판적이고 까다로운 편입니다.", type: "agreeableness", reverse: true },
    { q: "갈등을 피하려고 노력합니다.", type: "agreeableness", reverse: false },
    { q: "겸손한 편입니다.", type: "agreeableness", reverse: false },
    { q: "관대하고 용서를 잘 합니다.", type: "agreeableness", reverse: false },
    { q: "경쟁적인 편입니다.", type: "agreeableness", reverse: true },
    
    // Neuroticism (신경성) - 10문항
    { q: "스트레스를 자주 받습니다.", type: "neuroticism", reverse: false },
    { q: "불안하고 걱정이 많습니다.", type: "neuroticism", reverse: false },
    { q: "감정 기복이 심한 편입니다.", type: "neuroticism", reverse: false },
    { q: "쉽게 짜증이 납니다.", type: "neuroticism", reverse: false },
    { q: "우울한 기분을 자주 느낍니다.", type: "neuroticism", reverse: false },
    { q: "차분하고 안정적입니다.", type: "neuroticism", reverse: true },
    { q: "긴장을 많이 합니다.", type: "neuroticism", reverse: false },
    { q: "사소한 일에도 민감합니다.", type: "neuroticism", reverse: false },
    { q: "쉽게 당황합니다.", type: "neuroticism", reverse: false },
    { q: "감정 조절을 잘 합니다.", type: "neuroticism", reverse: true }
];

// 결과 데이터
const results = {
    openness: {
        high: {
            title: "높은 개방성",
            description: "창의적이고 호기심이 많으며 새로운 경험을 즐깁니다.",
            traits: [
                "상상력이 풍부하고 창의적",
                "예술과 문화에 관심이 많음",
                "새로운 아이디어를 수용함",
                "다양한 경험을 추구함"
            ]
        },
        low: {
            title: "낮은 개방성",
            description: "전통적이고 실용적이며 익숙한 것을 선호합니다.",
            traits: [
                "실용적이고 현실적",
                "전통과 관습을 중시함",
                "익숙한 환경을 선호함",
                "구체적이고 명확한 것을 좋아함"
            ]
        }
    },
    conscientiousness: {
        high: {
            title: "높은 성실성",
            description: "책임감이 강하고 체계적이며 목표 지향적입니다.",
            traits: [
                "조직적이고 계획적",
                "목표 달성 능력이 뛰어남",
                "책임감이 강함",
                "세부사항에 주의를 기울임"
            ]
        },
        low: {
            title: "낮은 성실성",
            description: "유연하고 자발적이며 즉흥적인 경향이 있습니다.",
            traits: [
                "유연하고 적응력이 높음",
                "자발적이고 즉흥적",
                "편안하고 여유로움",
                "형식에 얽매이지 않음"
            ]
        }
    },
    extraversion: {
        high: {
            title: "높은 외향성",
            description: "사교적이고 활동적이며 에너지가 넘칩니다.",
            traits: [
                "사람들과 어울리는 것을 좋아함",
                "활동적이고 에너지가 넘침",
                "열정적이고 긍정적",
                "리더십이 있음"
            ]
        },
        low: {
            title: "낮은 외향성 (내향성)",
            description: "조용하고 신중하며 혼자만의 시간을 즐깁니다.",
            traits: [
                "조용하고 사려 깊음",
                "독립적이고 자기 성찰적",
                "깊이 있는 관계를 선호함",
                "차분하고 안정적"
            ]
        }
    },
    agreeableness: {
        high: {
            title: "높은 친화성",
            description: "친절하고 협력적이며 타인을 배려합니다.",
            traits: [
                "친절하고 배려심이 많음",
                "협력적이고 양보를 잘 함",
                "공감 능력이 뛰어남",
                "신뢰하고 믿음직함"
            ]
        },
        low: {
            title: "낮은 친화성",
            description: "독립적이고 경쟁적이며 객관적인 판단을 합니다.",
            traits: [
                "독립적이고 자기주장이 강함",
                "객관적이고 분석적",
                "경쟁력이 있음",
                "비판적 사고 능력이 뛰어남"
            ]
        }
    },
    neuroticism: {
        high: {
            title: "높은 신경성",
            description: "감정적이고 민감하며 스트레스에 영향을 받습니다.",
            traits: [
                "감정이 풍부하고 민감함",
                "스트레스에 민감함",
                "공감 능력이 뛰어남",
                "세심하고 주의 깊음"
            ]
        },
        low: {
            title: "낮은 신경성 (정서적 안정성)",
            description: "차분하고 안정적이며 스트레스에 잘 대처합니다.",
            traits: [
                "차분하고 안정적",
                "스트레스에 잘 대처함",
                "감정 조절 능력이 뛰어남",
                "낙관적이고 긍정적"
            ]
        }
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
    scores = {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
    };
    showQuestion();
}

// 질문 표시
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.q;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // 진행바 업데이트
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // 답변 옵션 생성
    const answersContainer = document.getElementById('answersContainer');
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
        let answerValue = answerOptions[answers[index]].value;
        
        // 역채점 문항 처리
        if (question.reverse) {
            answerValue = 6 - answerValue;
        }
        
        scores[question.type] += answerValue;
    });
    
    showResult();
}

// 결과 표시
function showResult() {
    document.querySelector('.test-screen').style.display = 'none';
    document.querySelector('.result-screen').style.display = 'block';
    
    // 각 요인별 결과 분석
    const factorNames = {
        openness: '개방성',
        conscientiousness: '성실성',
        extraversion: '외향성',
        agreeableness: '친화성',
        neuroticism: '신경성'
    };
    
    let resultHTML = '<div class="bigfive-results">';
    
    for (let factor in scores) {
        const score = scores[factor];
        const maxScore = 50; // 각 요인당 10문항 × 5점
        const percentage = (score / maxScore) * 100;
        const level = percentage >= 60 ? 'high' : 'low';
        const result = results[factor][level];
        
        resultHTML += `
            <div class="factor-result">
                <h3>${factorNames[factor]}: ${result.title}</h3>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${percentage}%"></div>
                </div>
                <p>${result.description}</p>
                <ul>
                    ${result.traits.map(trait => `<li>${trait}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    resultHTML += '</div>';
    
    document.getElementById('resultType').textContent = 'Big Five 성격 프로필';
    document.getElementById('resultTitle').textContent = '5가지 성격 요인 분석 결과';
    document.getElementById('resultDescription').innerHTML = resultHTML;
    
    // 특징과 성장 섹션 숨기기 (Big Five는 별도 표시)
    document.getElementById('resultTraits').style.display = 'none';
    document.getElementById('resultGrowth').style.display = 'none';
    document.querySelector('.result-section').style.display = 'none';
    document.querySelectorAll('.result-section')[1].style.display = 'none';
    
    saveResult();
}

// 결과 저장
function saveResult() {
    const testResult = {
        testType: 'bigfive',
        scores: scores,
        date: new Date().toISOString()
    };
    
    try {
        let results = JSON.parse(localStorage.getItem('mentora_results') || '[]');
        results.push(testResult);
        localStorage.setItem('mentora_results', JSON.stringify(results));
    } catch (e) {
        console.log('결과 저장 실패:', e);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('Big Five 성격검사 준비 완료');
});
