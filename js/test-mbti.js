// ========================================
// MBTI 성격유형검사 JavaScript
// 60문항, 16가지 성격 유형 (ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTJ)
// ========================================

// MBTI 검사 질문 (60문항)
const mbtiQuestions = [
    // E (외향) vs I (내향) - 15문항
    { id: 1, question: "새로운 사람을 만나는 것이 즐겁다", dimension: "EI", direction: 1 },
    { id: 2, question: "혼자 있는 시간이 필요하고 소중하다", dimension: "EI", direction: -1 },
    { id: 3, question: "파티나 모임에서 에너지를 얻는다", dimension: "EI", direction: 1 },
    { id: 4, question: "조용한 환경에서 집중이 잘 된다", dimension: "EI", direction: -1 },
    { id: 5, question: "처음 보는 사람에게 먼저 말을 건다", dimension: "EI", direction: 1 },
    { id: 6, question: "깊이 있는 대화를 소수와 나누는 것을 선호한다", dimension: "EI", direction: -1 },
    { id: 7, question: "여러 사람과 함께 있는 것이 편하다", dimension: "EI", direction: 1 },
    { id: 8, question: "생각을 정리한 후에 말하는 편이다", dimension: "EI", direction: -1 },
    { id: 9, question: "사교 활동을 통해 스트레스를 푼다", dimension: "EI", direction: 1 },
    { id: 10, question: "혼자서 취미 활동을 즐긴다", dimension: "EI", direction: -1 },
    { id: 11, question: "말하면서 생각을 정리하는 편이다", dimension: "EI", direction: 1 },
    { id: 12, question: "사람이 많은 곳에서 피곤함을 느낀다", dimension: "EI", direction: -1 },
    { id: 13, question: "새로운 환경에 빠르게 적응한다", dimension: "EI", direction: 1 },
    { id: 14, question: "친한 사람들과 깊은 관계를 유지하는 것을 선호한다", dimension: "EI", direction: -1 },
    { id: 15, question: "활기찬 분위기를 만드는 것을 좋아한다", dimension: "EI", direction: 1 },

    // S (감각) vs N (직관) - 15문항
    { id: 16, question: "현재와 현실에 초점을 맞춘다", dimension: "SN", direction: 1 },
    { id: 17, question: "미래의 가능성에 대해 자주 생각한다", dimension: "SN", direction: -1 },
    { id: 18, question: "세부적인 사실과 데이터를 중요하게 생각한다", dimension: "SN", direction: 1 },
    { id: 19, question: "전체적인 그림과 패턴을 먼저 본다", dimension: "SN", direction: -1 },
    { id: 20, question: "실용적이고 현실적인 해결책을 선호한다", dimension: "SN", direction: 1 },
    { id: 21, question: "창의적이고 독창적인 아이디어를 좋아한다", dimension: "SN", direction: -1 },
    { id: 22, question: "검증된 방법을 따르는 것이 편하다", dimension: "SN", direction: 1 },
    { id: 23, question: "새로운 방식을 시도하는 것을 즐긴다", dimension: "SN", direction: -1 },
    { id: 24, question: "오감으로 경험하는 것을 중요하게 생각한다", dimension: "SN", direction: 1 },
    { id: 25, question: "상징적이고 추상적인 개념에 흥미가 있다", dimension: "SN", direction: -1 },
    { id: 26, question: "단계별로 순서대로 일을 진행한다", dimension: "SN", direction: 1 },
    { id: 27, question: "직관과 통찰에 의존하는 편이다", dimension: "SN", direction: -1 },
    { id: 28, question: "구체적인 사실을 기억하는 것이 쉽다", dimension: "SN", direction: 1 },
    { id: 29, question: "의미와 가능성을 찾는 것을 좋아한다", dimension: "SN", direction: -1 },
    { id: 30, question: "경험을 통해 배우는 것을 선호한다", dimension: "SN", direction: 1 },

    // T (사고) vs F (감정) - 15문항
    { id: 31, question: "논리적이고 객관적인 판단을 중요하게 생각한다", dimension: "TF", direction: 1 },
    { id: 32, question: "사람들의 감정을 먼저 고려한다", dimension: "TF", direction: -1 },
    { id: 33, question: "원칙과 규칙을 지키는 것이 중요하다", dimension: "TF", direction: 1 },
    { id: 34, question: "조화와 관계를 우선시한다", dimension: "TF", direction: -1 },
    { id: 35, question: "비판적으로 분석하는 것을 좋아한다", dimension: "TF", direction: 1 },
    { id: 36, question: "공감하고 위로하는 것이 자연스럽다", dimension: "TF", direction: -1 },
    { id: 37, question: "문제를 해결할 때 효율성을 우선한다", dimension: "TF", direction: 1 },
    { id: 38, question: "결정할 때 다른 사람의 감정을 고려한다", dimension: "TF", direction: -1 },
    { id: 39, question: "사실에 근거한 설명을 선호한다", dimension: "TF", direction: 1 },
    { id: 40, question: "개인적인 가치와 신념을 중요하게 생각한다", dimension: "TF", direction: -1 },
    { id: 41, question: "공정성과 정의를 추구한다", dimension: "TF", direction: 1 },
    { id: 42, question: "사람들과의 관계에서 따뜻함을 중시한다", dimension: "TF", direction: -1 },
    { id: 43, question: "문제를 객관적으로 바라본다", dimension: "TF", direction: 1 },
    { id: 44, question: "감정적인 연결을 소중히 여긴다", dimension: "TF", direction: -1 },
    { id: 45, question: "진실을 말하는 것이 예의보다 중요하다", dimension: "TF", direction: 1 },

    // J (판단) vs P (인식) - 15문항
    { id: 46, question: "계획을 세우고 따르는 것을 선호한다", dimension: "JP", direction: 1 },
    { id: 47, question: "유연하고 자발적으로 행동하는 것을 좋아한다", dimension: "JP", direction: -1 },
    { id: 48, question: "마감 기한을 잘 지킨다", dimension: "JP", direction: 1 },
    { id: 49, question: "마지막 순간까지 선택지를 열어두는 것을 선호한다", dimension: "JP", direction: -1 },
    { id: 50, question: "정리정돈이 잘 되어 있는 환경을 좋아한다", dimension: "JP", direction: 1 },
    { id: 51, question: "즉흥적이고 상황에 따라 대응하는 것이 편하다", dimension: "JP", direction: -1 },
    { id: 52, question: "미리 준비하고 계획하는 것이 안심된다", dimension: "JP", direction: 1 },
    { id: 53, question: "여러 가지를 동시에 진행하는 것을 즐긴다", dimension: "JP", direction: -1 },
    { id: 54, question: "결정을 빠르게 내리는 편이다", dimension: "JP", direction: 1 },
    { id: 55, question: "새로운 정보를 계속 수집하는 것을 선호한다", dimension: "JP", direction: -1 },
    { id: 56, question: "일정이 정해진 것이 편하다", dimension: "JP", direction: 1 },
    { id: 57, question: "변화와 다양성을 즐긴다", dimension: "JP", direction: -1 },
    { id: 58, question: "일을 미리 끝내놓는 것을 좋아한다", dimension: "JP", direction: 1 },
    { id: 59, question: "마감에 맞춰 집중해서 하는 것이 효율적이다", dimension: "JP", direction: -1 },
    { id: 60, question: "체계적이고 조직적인 것을 선호한다", dimension: "JP", direction: 1 }
];

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 테스트 시작
function startTest() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = mbtiQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    document.getElementById('questionNumber').textContent = `질문 ${questionNum}`;
    document.getElementById('questionText').textContent = question.question;
    
    // 진행률 업데이트
    const progress = (questionNum / mbtiQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${questionNum} / ${mbtiQuestions.length}`;
    
    // 이전 답변 초기화
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 답변 선택
function selectAnswer(value) {
    const question = mbtiQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산
    const [letter1, letter2] = question.dimension.split('');
    
    if (question.direction === 1) {
        // direction이 1이면: 동의할수록 첫 번째 글자(E, S, T, J) 점수 증가
        scores[letter1] += value;
        scores[letter2] += (5 - value);
    } else {
        // direction이 -1이면: 동의할수록 두 번째 글자(I, N, F, P) 점수 증가
        scores[letter1] += (5 - value);
        scores[letter2] += value;
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
    
    if (currentQuestion < mbtiQuestions.length) {
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
        const question = mbtiQuestions[currentQuestion];
        const prevAnswer = answers[currentQuestion];
        const [letter1, letter2] = question.dimension.split('');
        
        if (question.direction === 1) {
            scores[letter1] -= prevAnswer;
            scores[letter2] -= (5 - prevAnswer);
        } else {
            scores[letter1] -= (5 - prevAnswer);
            scores[letter2] -= prevAnswer;
        }
        
        loadQuestion();
    }
}

// 결과 표시
function showResult() {
    // MBTI 유형 결정
    const type = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');
    
    // 각 차원별 점수 계산 (백분율)
    const dimensions = {
        EI: Math.round((scores.E / (scores.E + scores.I)) * 100),
        SN: Math.round((scores.S / (scores.S + scores.N)) * 100),
        TF: Math.round((scores.T / (scores.T + scores.F)) * 100),
        JP: Math.round((scores.J / (scores.J + scores.P)) * 100)
    };
    
    // 로컬 스토리지에 결과 저장
    const result = {
        type: type,
        dimensions: dimensions,
        scores: scores,
        date: new Date().toISOString(),
        testName: 'MBTI'
    };
    
    localStorage.setItem('mbtiResult', JSON.stringify(result));
    
    // 결과 페이지로 이동
    window.location.href = `result-mbti.html?type=${type}`;
}

// 테스트 재시작
function restartTest() {
    if (confirm('테스트를 처음부터 다시 시작하시겠습니까?')) {
        currentQuestion = 0;
        answers = [];
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
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
    
    console.log('🧠 MBTI 검사 준비 완료! 총 ' + mbtiQuestions.length + '문항');
});
