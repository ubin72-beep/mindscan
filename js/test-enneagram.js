// ========================================
// 에니어그램 검사 JavaScript
// 90문항, 9가지 성격 유형 (1번~9번)
// ========================================

// 에니어그램 검사 질문 (90문항 - 각 유형당 10문항)
const enneagramQuestions = [
    // 1번 유형: 개혁가 (The Reformer) - 완벽주의자
    { id: 1, question: "나는 모든 일을 올바르게 하려고 노력한다", type: 1 },
    { id: 2, question: "실수나 잘못을 발견하면 바로 고치고 싶다", type: 1 },
    { id: 3, question: "원칙과 규칙을 지키는 것이 중요하다", type: 1 },
    { id: 4, question: "나는 매우 책임감이 강하다", type: 1 },
    { id: 5, question: "비판적으로 사물을 바라보는 편이다", type: 1 },
    { id: 6, question: "정의롭지 못한 일을 보면 참지 못한다", type: 1 },
    { id: 7, question: "나 자신에게 엄격한 기준을 적용한다", type: 1 },
    { id: 8, question: "완벽하지 않으면 불안함을 느낀다", type: 1 },
    { id: 9, question: "일을 할 때 꼼꼼하게 확인한다", type: 1 },
    { id: 10, question: "개선할 점을 찾아내는 것을 잘한다", type: 1 },

    // 2번 유형: 조력가 (The Helper) - 돕는 사람
    { id: 11, question: "다른 사람을 돕는 것에서 기쁨을 느낀다", type: 2 },
    { id: 12, question: "사람들의 필요를 민감하게 알아챈다", type: 2 },
    { id: 13, question: "친구들이 나를 따뜻하고 다정하다고 말한다", type: 2 },
    { id: 14, question: "다른 사람의 문제를 해결해주고 싶어진다", type: 2 },
    { id: 15, question: "사람들과 친밀한 관계를 맺는 것이 중요하다", type: 2 },
    { id: 16, question: "나보다 다른 사람의 필요를 먼저 생각한다", type: 2 },
    { id: 17, question: "인정받고 사랑받는 것이 중요하다", type: 2 },
    { id: 18, question: "감정적으로 지지해주는 것을 잘한다", type: 2 },
    { id: 19, question: "사람들에게 필요한 존재가 되고 싶다", type: 2 },
    { id: 20, question: "관계를 위해 희생하는 것이 자연스럽다", type: 2 },

    // 3번 유형: 성취자 (The Achiever) - 성공 지향적
    { id: 21, question: "목표를 달성하는 것에 집중한다", type: 3 },
    { id: 22, question: "성공하고 인정받는 것이 중요하다", type: 3 },
    { id: 23, question: "효율적이고 생산적인 것을 추구한다", type: 3 },
    { id: 24, question: "경쟁에서 이기는 것을 좋아한다", type: 3 },
    { id: 25, question: "내 이미지와 외모에 신경을 쓴다", type: 3 },
    { id: 26, question: "일을 빠르고 능숙하게 처리한다", type: 3 },
    { id: 27, question: "성취와 결과를 중요하게 생각한다", type: 3 },
    { id: 28, question: "실패하는 것을 두려워한다", type: 3 },
    { id: 29, question: "다재다능하고 적응력이 좋다", type: 3 },
    { id: 30, question: "나의 가치를 성공으로 증명하고 싶다", type: 3 },

    // 4번 유형: 예술가 (The Individualist) - 독특한 개인주의자
    { id: 31, question: "나는 남들과 다르고 독특하다고 느낀다", type: 4 },
    { id: 32, question: "감정이 풍부하고 예민한 편이다", type: 4 },
    { id: 33, question: "아름다움과 의미를 추구한다", type: 4 },
    { id: 34, question: "깊은 감정과 경험을 중요하게 생각한다", type: 4 },
    { id: 35, question: "내 정체성을 표현하는 것이 중요하다", type: 4 },
    { id: 36, question: "멜랑콜리하거나 우울한 감정을 자주 느낀다", type: 4 },
    { id: 37, question: "평범한 것보다 특별한 것을 선호한다", type: 4 },
    { id: 38, question: "나만의 스타일과 취향이 뚜렷하다", type: 4 },
    { id: 39, question: "다른 사람들이 나를 이해하지 못한다고 느낀다", type: 4 },
    { id: 40, question: "창의적이고 예술적인 것에 끌린다", type: 4 },

    // 5번 유형: 탐구자 (The Investigator) - 관찰하는 사람
    { id: 41, question: "지식을 쌓고 배우는 것을 좋아한다", type: 5 },
    { id: 42, question: "혼자 있는 시간이 필요하고 중요하다", type: 5 },
    { id: 43, question: "관찰하고 분석하는 것을 잘한다", type: 5 },
    { id: 44, question: "감정보다 논리적 사고를 선호한다", type: 5 },
    { id: 45, question: "에너지를 아끼고 보존하려는 경향이 있다", type: 5 },
    { id: 46, question: "복잡한 문제를 이해하는 것에 흥미가 있다", type: 5 },
    { id: 47, question: "사람들과의 교류보다 연구를 선호한다", type: 5 },
    { id: 48, question: "전문성과 능력을 중요하게 생각한다", type: 5 },
    { id: 49, question: "프라이버시와 독립성을 중시한다", type: 5 },
    { id: 50, question: "객관적이고 냉정하게 판단한다", type: 5 },

    // 6번 유형: 충성가 (The Loyalist) - 충실한 사람
    { id: 51, question: "안전과 안정을 중요하게 생각한다", type: 6 },
    { id: 52, question: "위험이나 위협을 미리 예상한다", type: 6 },
    { id: 53, question: "충성심이 강하고 책임감이 있다", type: 6 },
    { id: 54, question: "불안하거나 걱정하는 경향이 있다", type: 6 },
    { id: 55, question: "신뢰할 수 있는 사람과 관계를 맺고 싶다", type: 6 },
    { id: 56, question: "규칙과 권위에 대해 양가감정을 느낀다", type: 6 },
    { id: 57, question: "최악의 상황을 대비하는 편이다", type: 6 },
    { id: 58, question: "의심이 많고 조심스럽다", type: 6 },
    { id: 59, question: "공동체와 소속감을 중요하게 생각한다", type: 6 },
    { id: 60, question: "결정을 내리기 전에 많이 고민한다", type: 6 },

    // 7번 유형: 열정가 (The Enthusiast) - 낙천적인 사람
    { id: 61, question: "재미있고 즐거운 것을 추구한다", type: 7 },
    { id: 62, question: "새로운 경험과 가능성에 열려있다", type: 7 },
    { id: 63, question: "긍정적이고 낙관적인 편이다", type: 7 },
    { id: 64, question: "다양한 활동과 자극을 좋아한다", type: 7 },
    { id: 65, question: "제한이나 구속받는 것을 싫어한다", type: 7 },
    { id: 66, question: "아이디어가 많고 창의적이다", type: 7 },
    { id: 67, question: "지루함을 참기 어렵다", type: 7 },
    { id: 68, question: "여러 가지 계획을 동시에 세운다", type: 7 },
    { id: 69, question: "미래의 가능성에 흥분한다", type: 7 },
    { id: 70, question: "부정적인 감정을 피하려고 한다", type: 7 },

    // 8번 유형: 도전가 (The Challenger) - 강한 사람
    { id: 71, question: "강하고 독립적이다", type: 8 },
    { id: 72, question: "약한 모습을 보이기 싫다", type: 8 },
    { id: 73, question: "직접적이고 솔직하게 말한다", type: 8 },
    { id: 74, question: "정의를 위해 싸우는 것을 두려워하지 않는다", type: 8 },
    { id: 75, question: "통제력을 가지고 싶어한다", type: 8 },
    { id: 76, question: "강렬하고 힘이 넘친다", type: 8 },
    { id: 77, question: "약자를 보호하고 싶은 마음이 있다", type: 8 },
    { id: 78, question: "불공정한 일을 보면 분노한다", type: 8 },
    { id: 79, question: "결정을 빠르게 내리는 편이다", type: 8 },
    { id: 80, question: "감정을 억누르는 경향이 있다", type: 8 },

    // 9번 유형: 평화주의자 (The Peacemaker) - 조화로운 사람
    { id: 81, question: "평화롭고 조화로운 것을 선호한다", type: 9 },
    { id: 82, question: "갈등을 피하려고 한다", type: 9 },
    { id: 83, question: "다른 사람의 의견에 쉽게 동의한다", type: 9 },
    { id: 84, question: "느긋하고 여유로운 편이다", type: 9 },
    { id: 85, question: "모든 관점을 이해하려고 노력한다", type: 9 },
    { id: 86, question: "자신의 필요나 의견을 표현하기 어렵다", type: 9 },
    { id: 87, question: "수동적이고 미루는 경향이 있다", type: 9 },
    { id: 88, question: "사람들과 잘 어울리고 편안하다", type: 9 },
    { id: 89, question: "중재하고 화해시키는 것을 잘한다", type: 9 },
    { id: 90, question: "변화를 피하고 현상 유지를 선호한다", type: 9 }
];

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

// 테스트 시작
function startTest() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = enneagramQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    document.getElementById('questionNumber').textContent = `질문 ${questionNum}`;
    document.getElementById('questionText').textContent = question.question;
    
    // 진행률 업데이트
    const progress = (questionNum / enneagramQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${questionNum} / ${enneagramQuestions.length}`;
    
    // 이전 답변 초기화
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 답변 선택
function selectAnswer(value) {
    const question = enneagramQuestions[currentQuestion];
    
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
    
    if (currentQuestion < enneagramQuestions.length) {
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
        const question = enneagramQuestions[currentQuestion];
        const prevAnswer = answers[currentQuestion];
        scores[question.type] -= prevAnswer;
        
        loadQuestion();
    }
}

// 결과 표시
function showResult() {
    // 가장 높은 점수의 유형 찾기
    let maxScore = 0;
    let resultType = 1;
    
    for (let type = 1; type <= 9; type++) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = type;
        }
    }
    
    // 각 유형별 점수를 백분율로 변환
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const percentages = {};
    for (let type = 1; type <= 9; type++) {
        percentages[type] = Math.round((scores[type] / totalScore) * 100);
    }
    
    // 로컬 스토리지에 결과 저장
    const result = {
        type: resultType,
        scores: scores,
        percentages: percentages,
        date: new Date().toISOString(),
        testName: 'Enneagram'
    };
    
    localStorage.setItem('enneagramResult', JSON.stringify(result));
    
    // 결과 페이지로 이동
    window.location.href = `result-enneagram.html?type=${resultType}`;
}

// 테스트 재시작
function restartTest() {
    if (confirm('테스트를 처음부터 다시 시작하시겠습니까?')) {
        currentQuestion = 0;
        answers = [];
        scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
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
    
    console.log('✨ 에니어그램 검사 준비 완료! 총 ' + enneagramQuestions.length + '문항');
});
