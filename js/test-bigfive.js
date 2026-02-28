// ========================================
// Big Five 성격검사 JavaScript
// 50문항, 5가지 성격 요인
// ========================================

// Big Five 검사 질문 (50문항)
const bigFiveQuestions = [
    // 개방성 (Openness) - 10문항
    { id: 1, text: "새로운 아이디어와 경험에 개방적이다", factor: 'O', direction: 1 },
    { id: 2, text: "상상력이 풍부하고 창의적이다", factor: 'O', direction: 1 },
    { id: 3, text: "예술과 문화에 관심이 많다", factor: 'O', direction: 1 },
    { id: 4, text: "지적 호기심이 강하다", factor: 'O', direction: 1 },
    { id: 5, text: "변화를 즐기고 새로운 것을 시도한다", factor: 'O', direction: 1 },
    { id: 6, text: "전통적이고 보수적인 가치를 선호한다", factor: 'O', direction: -1 },
    { id: 7, text: "추상적인 개념을 이해하는 것을 좋아한다", factor: 'O', direction: 1 },
    { id: 8, text: "일상적이고 단순한 것을 선호한다", factor: 'O', direction: -1 },
    { id: 9, text: "다양한 관점에서 생각하는 것을 즐긴다", factor: 'O', direction: 1 },
    { id: 10, text: "실용적이고 현실적인 것을 중시한다", factor: 'O', direction: -1 },

    // 성실성 (Conscientiousness) - 10문항
    { id: 11, text: "계획을 세우고 체계적으로 일한다", factor: 'C', direction: 1 },
    { id: 12, text: "책임감이 강하고 신뢰할 수 있다", factor: 'C', direction: 1 },
    { id: 13, text: "목표를 설정하고 끝까지 완수한다", factor: 'C', direction: 1 },
    { id: 14, text: "정리정돈을 잘하고 깔끔하다", factor: 'C', direction: 1 },
    { id: 15, text: "마감 기한을 잘 지킨다", factor: 'C', direction: 1 },
    { id: 16, text: "즉흥적이고 자발적으로 행동한다", factor: 'C', direction: -1 },
    { id: 17, text: "세부 사항에 주의를 기울인다", factor: 'C', direction: 1 },
    { id: 18, text: "일을 미루는 경향이 있다", factor: 'C', direction: -1 },
    { id: 19, text: "효율적이고 생산적이다", factor: 'C', direction: 1 },
    { id: 20, text: "융통성 있게 상황에 대응한다", factor: 'C', direction: -1 },

    // 외향성 (Extraversion) - 10문항
    { id: 21, text: "사교적이고 외향적이다", factor: 'E', direction: 1 },
    { id: 22, text: "많은 사람들과 함께 있는 것을 즐긴다", factor: 'E', direction: 1 },
    { id: 23, text: "에너지가 넘치고 활동적이다", factor: 'E', direction: 1 },
    { id: 24, text: "주목받는 것을 좋아한다", factor: 'E', direction: 1 },
    { id: 25, text: "새로운 사람을 만나는 것을 즐긴다", factor: 'E', direction: 1 },
    { id: 26, text: "조용하고 내성적이다", factor: 'E', direction: -1 },
    { id: 27, text: "파티나 모임에서 활기를 띤다", factor: 'E', direction: 1 },
    { id: 28, text: "혼자 있는 시간을 선호한다", factor: 'E', direction: -1 },
    { id: 29, text: "대화를 주도하는 편이다", factor: 'E', direction: 1 },
    { id: 30, text: "말보다 듣는 것을 선호한다", factor: 'E', direction: -1 },

    // 친화성 (Agreeableness) - 10문항
    { id: 31, text: "다른 사람을 배려하고 친절하다", factor: 'A', direction: 1 },
    { id: 32, text: "협력적이고 타협을 잘한다", factor: 'A', direction: 1 },
    { id: 33, text: "공감 능력이 뛰어나다", factor: 'A', direction: 1 },
    { id: 34, text: "다른 사람을 돕는 것을 좋아한다", factor: 'A', direction: 1 },
    { id: 35, text: "갈등을 피하려고 노력한다", factor: 'A', direction: 1 },
    { id: 36, text: "경쟁적이고 자기주장이 강하다", factor: 'A', direction: -1 },
    { id: 37, text: "관대하고 용서를 잘한다", factor: 'A', direction: 1 },
    { id: 38, text: "비판적이고 의심이 많다", factor: 'A', direction: -1 },
    { id: 39, text: "다른 사람의 감정에 민감하다", factor: 'A', direction: 1 },
    { id: 40, text: "독립적이고 객관적이다", factor: 'A', direction: -1 },

    // 신경성 (Neuroticism) - 10문항
    { id: 41, text: "스트레스를 자주 받는다", factor: 'N', direction: 1 },
    { id: 42, text: "불안하고 걱정이 많다", factor: 'N', direction: 1 },
    { id: 43, text: "감정 기복이 심하다", factor: 'N', direction: 1 },
    { id: 44, text: "쉽게 화가 나고 짜증이 난다", factor: 'N', direction: 1 },
    { id: 45, text: "부정적인 생각을 자주 한다", factor: 'N', direction: 1 },
    { id: 46, text: "침착하고 감정적으로 안정되어 있다", factor: 'N', direction: -1 },
    { id: 47, text: "자신감이 부족하다", factor: 'N', direction: 1 },
    { id: 48, text: "여유롭고 긴장을 잘 풀다", factor: 'N', direction: -1 },
    { id: 49, text: "작은 일에도 쉽게 동요된다", factor: 'N', direction: 1 },
    { id: 50, text: "정서적으로 회복력이 강하다", factor: 'N', direction: -1 }
];

// Big Five 요인 설명
const bigFiveFactors = {
    'O': { name: '개방성', icon: '🎨', high: '창의적이고 호기심이 많음', low: '전통적이고 실용적' },
    'C': { name: '성실성', icon: '📋', high: '조직적이고 책임감이 강함', low: '자발적이고 유연함' },
    'E': { name: '외향성', icon: '🎉', high: '사교적이고 활동적', low: '내성적이고 신중함' },
    'A': { name: '친화성', icon: '💝', high: '협력적이고 공감능력이 높음', low: '독립적이고 경쟁적' },
    'N': { name: '신경성', icon: '😰', high: '감정적이고 예민함', low: '안정적이고 침착함' }
};

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };

// 화면 전환
function showScreen(screenName) {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';
    
    if (screenName === 'start') {
        document.getElementById('startScreen').style.display = 'block';
    } else if (screenName === 'test') {
        document.getElementById('testScreen').style.display = 'block';
    } else if (screenName === 'result') {
        document.getElementById('resultScreen').style.display = 'block';
    }
}

// 테스트 시작
function startTest() {
    currentQuestion = 0;
    answers = [];
    scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    showScreen('test');
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = bigFiveQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    // 질문 텍스트 업데이트
    document.getElementById('questionText').textContent = question.text;
    
    // 진행률 업데이트
    const progress = (questionNum / bigFiveQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `질문 ${questionNum} / 50`;
    document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
    
    // 답변 옵션 생성
    const answerOptions = document.getElementById('answerOptions');
    answerOptions.innerHTML = '';
    
    const options = [
        { text: '전혀 아니다', value: 1 },
        { text: '아니다', value: 2 },
        { text: '보통이다', value: 3 },
        { text: '그렇다', value: 4 },
        { text: '매우 그렇다', value: 5 }
    ];
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option.text;
        btn.onclick = () => selectAnswer(option.value);
        answerOptions.appendChild(btn);
    });
}

// 답변 선택
function selectAnswer(value) {
    const question = bigFiveQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산
    if (question.direction === 1) {
        scores[question.factor] += value;
    } else {
        scores[question.factor] += (6 - value);
    }
    
    // 다음 질문으로 이동
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

// 결과 표시
function showResult() {
    // 각 요인별 백분율 계산 (10문항 * 5점 = 50점 만점)
    const percentages = {};
    for (let factor in scores) {
        percentages[factor] = Math.round((scores[factor] / 50) * 100);
    }
    
    // 결과 텍스트 생성
    let resultText = '당신의 Big Five 성격 프로필:\n\n';
    
    for (let factor in bigFiveFactors) {
        const info = bigFiveFactors[factor];
        const percentage = percentages[factor];
        const level = percentage >= 60 ? info.high : percentage <= 40 ? info.low : '중간 수준';
        
        resultText += `${info.icon} ${info.name}: ${percentage}% (${level})\n`;
    }
    
    // 결과 화면 업데이트
    document.getElementById('resultIcon').textContent = '📊';
    document.getElementById('resultType').textContent = 'Big Five 성격 분석 완료';
    document.getElementById('resultDescription').textContent = resultText;
    
    // 로컬 스토리지에 결과 저장
    const result = {
        scores: scores,
        percentages: percentages,
        date: new Date().toISOString(),
        testName: 'BigFive'
    };
    
    localStorage.setItem('bigFiveResult', JSON.stringify(result));
    
    // 결과 화면 표시
    showScreen('result');
}

// 결과 저장
function saveAndView() {
    const result = localStorage.getItem('bigFiveResult');
    if (result) {
        alert('✅ 결과가 저장되었습니다!\n\n마이페이지에서 확인할 수 있습니다.');
    }
}

// 콘솔 로그
console.log('📊 Big Five 검사 준비 완료! 총 ' + bigFiveQuestions.length + '문항');
