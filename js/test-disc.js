// ========================================
// DISC 행동유형검사 JavaScript  
// 28문항, 4가지 유형
// D: Dominance (주도형)
// I: Influence (사교형)
// S: Steadiness (안정형)
// C: Conscientiousness (신중형)
// ========================================

// DISC 검사 질문 (28문항 - 각 유형당 7문항)
const discQuestions = [
    // D: Dominance (주도형) - 7문항
    { id: 1, question: "목표를 달성하기 위해 적극적으로 행동한다", type: "D" },
    { id: 2, question: "경쟁적이고 승부욕이 강하다", type: "D" },
    { id: 3, question: "빠른 결정을 내리고 실행한다", type: "D" },
    { id: 4, question: "리더 역할을 맡는 것을 선호한다", type: "D" },
    { id: 5, question: "직접적이고 솔직하게 의사를 표현한다", type: "D" },
    { id: 6, question: "도전적인 목표를 좋아한다", type: "D" },
    { id: 7, question: "상황을 통제하고 주도하는 것을 선호한다", type: "D" },

    // I: Influence (사교형) - 7문항
    { id: 8, question: "사람들과 어울리는 것을 즐긴다", type: "I" },
    { id: 9, question: "열정적이고 낙관적이다", type: "I" },
    { id: 10, question: "말하기를 좋아하고 설득력이 있다", type: "I" },
    { id: 11, question: "새로운 사람을 만나는 것에 거부감이 없다", type: "I" },
    { id: 12, question: "분위기를 밝고 즐겁게 만든다", type: "I" },
    { id: 13, question: "인정받고 칭찬받는 것을 좋아한다", type: "I" },
    { id: 14, question: "창의적이고 아이디어가 풍부하다", type: "I" },

    // S: Steadiness (안정형) - 7문항
    { id: 15, question: "안정적이고 일관성있게 행동한다", type: "S" },
    { id: 16, question: "협력적이고 팀워크를 중시한다", type: "S" },
    { id: 17, question: "인내심이 있고 끈기있게 일한다", type: "S" },
    { id: 18, question: "갑작스러운 변화보다 안정을 선호한다", type: "S" },
    { id: 19, question: "경청을 잘하고 다른 사람을 지지한다", type: "S" },
    { id: 20, question: "조화롭고 평화로운 환경을 선호한다", type: "S" },
    { id: 21, question: "신뢰할 수 있고 충실하다", type: "S" },

    // C: Conscientiousness (신중형) - 7문항
    { id: 22, question: "세심하고 정확하게 일을 처리한다", type: "C" },
    { id: 23, question: "논리적이고 분석적으로 생각한다", type: "C" },
    { id: 24, question: "규칙과 절차를 중요하게 여긴다", type: "C" },
    { id: 25, question: "품질과 완성도를 추구한다", type: "C" },
    { id: 26, question: "신중하게 계획하고 준비한다", type: "C" },
    { id: 27, question: "객관적인 사실과 데이터를 중시한다", type: "C" },
    { id: 28, question: "체계적이고 조직적으로 일한다", type: "C" }
];

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { D: 0, I: 0, S: 0, C: 0 };

// 테스트 시작
function startTest() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { D: 0, I: 0, S: 0, C: 0 };
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = discQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    document.getElementById('questionNumber').textContent = `질문 ${questionNum}`;
    document.getElementById('questionText').textContent = question.question;
    
    // 진행률 업데이트
    const progress = (questionNum / discQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${questionNum} / ${discQuestions.length}`;
    
    // 이전 답변 초기화
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 답변 선택
function selectAnswer(value) {
    const question = discQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산 (1~5점)
    scores[question.type] += value;
    
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
    
    if (currentQuestion < discQuestions.length) {
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
        const question = discQuestions[currentQuestion];
        const prevAnswer = answers[currentQuestion];
        scores[question.type] -= prevAnswer;
        
        loadQuestion();
    }
}

// 결과 표시
function showResult() {
    // 각 유형별 점수를 백분율로 변환
    const totalScore = scores.D + scores.I + scores.S + scores.C;
    const percentages = {
        D: Math.round((scores.D / totalScore) * 100),
        I: Math.round((scores.I / totalScore) * 100),
        S: Math.round((scores.S / totalScore) * 100),
        C: Math.round((scores.C / totalScore) * 100)
    };
    
    // 가장 높은 점수의 유형 찾기
    let maxScore = 0;
    let primaryType = 'D';
    let secondaryType = '';
    
    // 유형을 점수 순으로 정렬
    const sortedTypes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
    
    primaryType = sortedTypes[0];
    secondaryType = sortedTypes[1];
    
    // 주 유형과 부 유형 조합 (예: DI, DS, DC, ID, IS, IC 등)
    const combinedType = primaryType + secondaryType;
    
    // 로컬 스토리지에 결과 저장
    const result = {
        primaryType: primaryType,
        secondaryType: secondaryType,
        combinedType: combinedType,
        scores: scores,
        percentages: percentages,
        date: new Date().toISOString(),
        testName: 'DISC'
    };
    
    localStorage.setItem('discResult', JSON.stringify(result));
    
    // 결과 페이지로 이동
    window.location.href = `result-disc.html?type=${combinedType}`;
}

// 테스트 재시작
function restartTest() {
    if (confirm('테스트를 처음부터 다시 시작하시겠습니까?')) {
        currentQuestion = 0;
        answers = [];
        scores = { D: 0, I: 0, S: 0, C: 0 };
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
    
    console.log('💼 DISC 검사 준비 완료! 총 ' + discQuestions.length + '문항');
});
