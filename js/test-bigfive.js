// ========================================
// Big Five 성격검사 JavaScript
// 50문항, 5가지 성격 요인 (OCEAN)
// O: Openness (개방성)
// C: Conscientiousness (성실성)
// E: Extraversion (외향성)
// A: Agreeableness (친화성)
// N: Neuroticism (신경성)
// ========================================

// Big Five 검사 질문 (50문항 - 각 요인당 10문항)
const bigFiveQuestions = [
    // O: Openness (개방성) - 10문항
    { id: 1, question: "새로운 아이디어와 경험에 열려있다", trait: "O", direction: 1 },
    { id: 2, question: "상상력이 풍부하고 창의적이다", trait: "O", direction: 1 },
    { id: 3, question: "예술과 문화에 관심이 많다", trait: "O", direction: 1 },
    { id: 4, question: "복잡하고 추상적인 개념을 즐긴다", trait: "O", direction: 1 },
    { id: 5, question: "새로운 방식을 시도하는 것을 좋아한다", trait: "O", direction: 1 },
    { id: 6, question: "전통적인 방법을 선호한다", trait: "O", direction: -1 },
    { id: 7, question: "호기심이 많고 탐구적이다", trait: "O", direction: 1 },
    { id: 8, question: "변화보다 안정을 선호한다", trait: "O", direction: -1 },
    { id: 9, question: "철학적인 질문에 관심이 있다", trait: "O", direction: 1 },
    { id: 10, question: "실용적이고 현실적인 것을 중시한다", trait: "O", direction: -1 },

    // C: Conscientiousness (성실성) - 10문항
    { id: 11, question: "계획을 세우고 체계적으로 일한다", trait: "C", direction: 1 },
    { id: 12, question: "책임감이 강하고 신뢰할 수 있다", trait: "C", direction: 1 },
    { id: 13, question: "목표를 향해 끈기있게 노력한다", trait: "C", direction: 1 },
    { id: 14, question: "정리정돈을 잘하고 깔끔하다", trait: "C", direction: 1 },
    { id: 15, question: "일을 미루는 경향이 있다", trait: "C", direction: -1 },
    { id: 16, question: "세부사항에 주의를 기울인다", trait: "C", direction: 1 },
    { id: 17, question: "즉흥적이고 자발적이다", trait: "C", direction: -1 },
    { id: 18, question: "시간 약속을 잘 지킨다", trait: "C", direction: 1 },
    { id: 19, question: "업무를 철저하게 완수한다", trait: "C", direction: 1 },
    { id: 20, question: "대충대충 하는 편이다", trait: "C", direction: -1 },

    // E: Extraversion (외향성) - 10문항
    { id: 21, question: "사교적이고 활동적이다", trait: "E", direction: 1 },
    { id: 22, question: "사람들과 어울리는 것을 즐긴다", trait: "E", direction: 1 },
    { id: 23, question: "파티에서 에너지를 얻는다", trait: "E", direction: 1 },
    { id: 24, question: "혼자 있는 시간을 선호한다", trait: "E", direction: -1 },
    { id: 25, question: "말이 많고 수다스럽다", trait: "E", direction: 1 },
    { id: 26, question: "조용하고 내성적이다", trait: "E", direction: -1 },
    { id: 27, question: "리더 역할을 즐긴다", trait: "E", direction: 1 },
    { id: 28, question: "주목받는 것을 좋아한다", trait: "E", direction: 1 },
    { id: 29, question: "조용한 환경을 선호한다", trait: "E", direction: -1 },
    { id: 30, question: "활기차고 열정적이다", trait: "E", direction: 1 },

    // A: Agreeableness (친화성) - 10문항
    { id: 31, question: "다른 사람을 신뢰하는 편이다", trait: "A", direction: 1 },
    { id: 32, question: "협력적이고 타협을 잘한다", trait: "A", direction: 1 },
    { id: 33, question: "다정하고 배려심이 많다", trait: "A", direction: 1 },
    { id: 34, question: "경쟁적이고 도전적이다", trait: "A", direction: -1 },
    { id: 35, question: "사람들을 쉽게 용서한다", trait: "A", direction: 1 },
    { id: 36, question: "비판적으로 평가하는 편이다", trait: "A", direction: -1 },
    { id: 37, question: "다른 사람의 감정에 공감한다", trait: "A", direction: 1 },
    { id: 38, question: "냉정하고 객관적이다", trait: "A", direction: -1 },
    { id: 39, question: "갈등을 피하려고 노력한다", trait: "A", direction: 1 },
    { id: 40, question: "자신의 의견을 강하게 주장한다", trait: "A", direction: -1 },

    // N: Neuroticism (신경성) - 10문항
    { id: 41, question: "걱정을 많이 하는 편이다", trait: "N", direction: 1 },
    { id: 42, question: "스트레스를 쉽게 받는다", trait: "N", direction: 1 },
    { id: 43, question: "감정 기복이 있다", trait: "N", direction: 1 },
    { id: 44, question: "침착하고 안정적이다", trait: "N", direction: -1 },
    { id: 45, question: "불안을 자주 느낀다", trait: "N", direction: 1 },
    { id: 46, question: "감정적으로 잘 흔들리지 않는다", trait: "N", direction: -1 },
    { id: 47, question: "우울하거나 슬픈 감정을 자주 느낀다", trait: "N", direction: 1 },
    { id: 48, question: "스트레스 상황을 잘 견딘다", trait: "N", direction: -1 },
    { id: 49, question: "예민하고 민감한 편이다", trait: "N", direction: 1 },
    { id: 50, question: "긍정적이고 낙관적이다", trait: "N", direction: -1 }
];

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
let counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };

// 테스트 시작
function startTest() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = bigFiveQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    document.getElementById('questionNumber').textContent = `질문 ${questionNum}`;
    document.getElementById('questionText').textContent = question.question;
    
    // 진행률 업데이트
    const progress = (questionNum / bigFiveQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${questionNum} / ${bigFiveQuestions.length}`;
    
    // 이전 답변 초기화
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 답변 선택
function selectAnswer(value) {
    const question = bigFiveQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산
    const trait = question.trait;
    counts[trait]++;
    
    if (question.direction === 1) {
        // 긍정 문항: 점수 그대로 더함
        scores[trait] += value;
    } else {
        // 부정 문항: 역산 (6-value)
        scores[trait] += (6 - value);
    }
    
    // 버튼 시각적 피드백
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // 다음 질문으로 (0.3초 딜레이)
    setTimeout(() => {
        nextQuestion();
    }, 300);
}

// 다음 질문
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < bigFiveQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// 이전 질문
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        
        // 이전 답변 점수 취소
        const question = bigFiveQuestions[currentQuestion];
        const prevAnswer = answers[currentQuestion];
        const trait = question.trait;
        
        counts[trait]--;
        
        if (question.direction === 1) {
            scores[trait] -= prevAnswer;
        } else {
            scores[trait] -= (6 - prevAnswer);
        }
        
        loadQuestion();
    }
}

// 결과 표시
function showResult() {
    // 각 요인별 평균 점수 계산 (1~5점)
    const averages = {};
    const percentages = {};
    
    for (let trait in scores) {
        averages[trait] = scores[trait] / counts[trait];
        // 백분율로 변환 (1~5점 → 0~100%)
        percentages[trait] = Math.round(((averages[trait] - 1) / 4) * 100);
    }
    
    // 로컬 스토리지에 결과 저장
    const result = {
        scores: scores,
        averages: averages,
        percentages: percentages,
        counts: counts,
        date: new Date().toISOString(),
        testName: 'Big Five'
    };
    
    localStorage.setItem('bigFiveResult', JSON.stringify(result));
    
    // 결과 페이지로 이동
    const params = new URLSearchParams();
    params.append('O', percentages.O);
    params.append('C', percentages.C);
    params.append('E', percentages.E);
    params.append('A', percentages.A);
    params.append('N', percentages.N);
    
    window.location.href = `result-bigfive.html?${params.toString()}`;
}

// 테스트 재시작
function restartTest() {
    if (confirm('테스트를 처음부터 다시 시작하시겠습니까?')) {
        currentQuestion = 0;
        answers = [];
        scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
        counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
        document.getElementById('startScreen').style.display = 'block';
        document.getElementById('questionScreen').style.display = 'none';
    }
}

// 페이지 로드 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 시작 버튼
    const startBtn = document.getElementById('startTestBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startTest);
    }
    
    // 답변 버튼들
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // 1: 전혀 아니다, 2: 아니다, 3: 보통, 4: 그렇다, 5: 매우 그렇다
            selectAnswer(index + 1);
        });
    });
    
    // 이전 버튼
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }
    
    // 재시작 버튼
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartTest);
    }
    
    console.log('📊 Big Five 검사 준비 완료! 총 ' + bigFiveQuestions.length + '문항');
});
