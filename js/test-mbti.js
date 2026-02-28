// ========================================
// MBTI 성격유형검사 JavaScript
// 60문항, 16가지 성격 유형
// ========================================

// MBTI 검사 질문 (60문항)
const mbtiQuestions = [
    // E (외향) vs I (내향) - 15문항
    { id: 1, text: "새로운 사람을 만나는 것이 즐겁다", dimension: "EI", direction: 1 },
    { id: 2, text: "혼자 있는 시간이 필요하고 소중하다", dimension: "EI", direction: -1 },
    { id: 3, text: "파티나 모임에서 에너지를 얻는다", dimension: "EI", direction: 1 },
    { id: 4, text: "조용한 환경에서 집중이 잘 된다", dimension: "EI", direction: -1 },
    { id: 5, text: "처음 보는 사람에게 먼저 말을 건다", dimension: "EI", direction: 1 },
    { id: 6, text: "깊이 있는 대화를 소수와 나누는 것을 선호한다", dimension: "EI", direction: -1 },
    { id: 7, text: "여러 사람과 함께 있는 것이 편하다", dimension: "EI", direction: 1 },
    { id: 8, text: "생각을 정리한 후에 말하는 편이다", dimension: "EI", direction: -1 },
    { id: 9, text: "사교 활동을 통해 스트레스를 푼다", dimension: "EI", direction: 1 },
    { id: 10, text: "혼자서 취미 활동을 즐긴다", dimension: "EI", direction: -1 },
    { id: 11, text: "말하면서 생각을 정리하는 편이다", dimension: "EI", direction: 1 },
    { id: 12, text: "사람이 많은 곳에서 피곤함을 느낀다", dimension: "EI", direction: -1 },
    { id: 13, text: "새로운 환경에 빠르게 적응한다", dimension: "EI", direction: 1 },
    { id: 14, text: "친한 사람들과 깊은 관계를 유지하는 것을 선호한다", dimension: "EI", direction: -1 },
    { id: 15, text: "활기찬 분위기를 만드는 것을 좋아한다", dimension: "EI", direction: 1 },

    // S (감각) vs N (직관) - 15문항
    { id: 16, text: "현재와 현실에 초점을 맞춘다", dimension: "SN", direction: 1 },
    { id: 17, text: "미래의 가능성에 대해 자주 생각한다", dimension: "SN", direction: -1 },
    { id: 18, text: "세부적인 사실과 데이터를 중요하게 생각한다", dimension: "SN", direction: 1 },
    { id: 19, text: "전체적인 그림과 패턴을 먼저 본다", dimension: "SN", direction: -1 },
    { id: 20, text: "실용적이고 현실적인 해결책을 선호한다", dimension: "SN", direction: 1 },
    { id: 21, text: "창의적이고 독창적인 아이디어를 좋아한다", dimension: "SN", direction: -1 },
    { id: 22, text: "검증된 방법을 따르는 것이 편하다", dimension: "SN", direction: 1 },
    { id: 23, text: "새로운 방식을 시도하는 것을 즐긴다", dimension: "SN", direction: -1 },
    { id: 24, text: "오감으로 경험하는 것을 중요하게 생각한다", dimension: "SN", direction: 1 },
    { id: 25, text: "상징적이고 추상적인 개념에 흥미가 있다", dimension: "SN", direction: -1 },
    { id: 26, text: "단계별로 순서대로 일을 진행한다", dimension: "SN", direction: 1 },
    { id: 27, text: "직관과 통찰에 의존하는 편이다", dimension: "SN", direction: -1 },
    { id: 28, text: "구체적인 사실을 기억하는 것이 쉽다", dimension: "SN", direction: 1 },
    { id: 29, text: "의미와 가능성을 찾는 것을 좋아한다", dimension: "SN", direction: -1 },
    { id: 30, text: "경험을 통해 배우는 것을 선호한다", dimension: "SN", direction: 1 },

    // T (사고) vs F (감정) - 15문항
    { id: 31, text: "논리적이고 객관적인 판단을 중요하게 생각한다", dimension: "TF", direction: 1 },
    { id: 32, text: "사람들의 감정을 먼저 고려한다", dimension: "TF", direction: -1 },
    { id: 33, text: "원칙과 규칙을 지키는 것이 중요하다", dimension: "TF", direction: 1 },
    { id: 34, text: "조화와 관계를 우선시한다", dimension: "TF", direction: -1 },
    { id: 35, text: "비판적으로 분석하는 것을 좋아한다", dimension: "TF", direction: 1 },
    { id: 36, text: "공감하고 위로하는 것이 자연스럽다", dimension: "TF", direction: -1 },
    { id: 37, text: "문제를 해결할 때 효율성을 우선한다", dimension: "TF", direction: 1 },
    { id: 38, text: "결정할 때 다른 사람의 감정을 고려한다", dimension: "TF", direction: -1 },
    { id: 39, text: "사실에 근거한 설명을 선호한다", dimension: "TF", direction: 1 },
    { id: 40, text: "개인적인 가치와 신념을 중요하게 생각한다", dimension: "TF", direction: -1 },
    { id: 41, text: "공정성과 정의를 추구한다", dimension: "TF", direction: 1 },
    { id: 42, text: "사람들과의 관계에서 따뜻함을 중시한다", dimension: "TF", direction: -1 },
    { id: 43, text: "문제를 객관적으로 바라본다", dimension: "TF", direction: 1 },
    { id: 44, text: "감정적인 연결을 소중히 여긴다", dimension: "TF", direction: -1 },
    { id: 45, text: "진실을 말하는 것이 예의보다 중요하다", dimension: "TF", direction: 1 },

    // J (판단) vs P (인식) - 15문항
    { id: 46, text: "계획을 세우고 따르는 것을 선호한다", dimension: "JP", direction: 1 },
    { id: 47, text: "유연하고 자발적으로 행동하는 것을 좋아한다", dimension: "JP", direction: -1 },
    { id: 48, text: "마감 기한을 잘 지킨다", dimension: "JP", direction: 1 },
    { id: 49, text: "마지막 순간까지 선택지를 열어두는 것을 선호한다", dimension: "JP", direction: -1 },
    { id: 50, text: "정리정돈이 잘 되어 있는 환경을 좋아한다", dimension: "JP", direction: 1 },
    { id: 51, text: "즉흥적이고 상황에 따라 대응하는 것이 편하다", dimension: "JP", direction: -1 },
    { id: 52, text: "미리 준비하고 계획하는 것이 안심된다", dimension: "JP", direction: 1 },
    { id: 53, text: "여러 가지를 동시에 진행하는 것을 즐긴다", dimension: "JP", direction: -1 },
    { id: 54, text: "결정을 빠르게 내리는 편이다", dimension: "JP", direction: 1 },
    { id: 55, text: "새로운 정보를 계속 수집하는 것을 선호한다", dimension: "JP", direction: -1 },
    { id: 56, text: "일정이 정해진 것이 편하다", dimension: "JP", direction: 1 },
    { id: 57, text: "변화와 다양성을 즐긴다", dimension: "JP", direction: -1 },
    { id: 58, text: "일을 미리 끝내놓는 것을 좋아한다", dimension: "JP", direction: 1 },
    { id: 59, text: "마감에 맞춰 집중해서 하는 것이 효율적이다", dimension: "JP", direction: -1 },
    { id: 60, text: "체계적이고 조직적인 것을 선호한다", dimension: "JP", direction: 1 }
];

// MBTI 유형별 설명
const mbtiTypes = {
    'ISTJ': { 
        icon: '🏛️', 
        nickname: '현실주의자', 
        description: '책임감이 강하고 신뢰할 수 있는 현실주의자입니다. 체계적이고 조직적이며, 전통과 질서를 중시합니다. 논리적이고 사실에 근거하여 판단하며, 맡은 일은 끝까지 완수합니다.' 
    },
    'ISFJ': { 
        icon: '🛡️', 
        nickname: '수호자', 
        description: '따뜻하고 헌신적인 수호자입니다. 사람들을 돌보는 것을 좋아하며, 세심하고 책임감이 강합니다. 조화로운 환경을 만들기 위해 노력하며, 다른 사람의 필요를 잘 파악합니다.' 
    },
    'INFJ': { 
        icon: '🔮', 
        nickname: '옹호자', 
        description: '통찰력 있고 이상주의적인 옹호자입니다. 깊이 있는 생각을 하며, 사람들을 이해하고 돕고자 합니다. 강한 신념과 가치관을 가지고 있으며, 의미 있는 변화를 추구합니다.' 
    },
    'INTJ': { 
        icon: '🧠', 
        nickname: '전략가', 
        description: '독립적이고 전략적인 사고를 하는 전략가입니다. 혁신적인 아이디어를 추구하며, 복잡한 문제를 해결하는 것을 즐깁니다. 높은 기준을 가지고 있으며, 효율성을 중시합니다.' 
    },
    'ISTP': { 
        icon: '🔧', 
        nickname: '장인', 
        description: '논리적이고 실용적인 장인입니다. 문제 해결 능력이 뛰어나며, 손으로 무언가를 만들거나 고치는 것을 좋아합니다. 독립적이고 융통성이 있으며, 현재에 집중합니다.' 
    },
    'ISFP': { 
        icon: '🎨', 
        nickname: '예술가', 
        description: '부드럽고 감성적인 예술가입니다. 아름다움을 추구하며, 조화로운 환경을 선호합니다. 다른 사람의 감정에 민감하며, 자유로운 표현을 중요하게 생각합니다.' 
    },
    'INFP': { 
        icon: '🌈', 
        nickname: '중재자', 
        description: '이상주의적이고 열정적인 중재자입니다. 자신의 가치관에 충실하며, 진실성을 중시합니다. 창의적이고 상상력이 풍부하며, 사람들과 깊은 관계를 맺고자 합니다.' 
    },
    'INTP': { 
        icon: '🧪', 
        nickname: '논리학자', 
        description: '분석적이고 창의적인 논리학자입니다. 이론과 개념에 흥미를 느끼며, 끊임없이 배우고 탐구합니다. 독립적이고 객관적이며, 논리적 일관성을 중시합니다.' 
    },
    'ESTP': { 
        icon: '⚡', 
        nickname: '모험가', 
        description: '활동적이고 현실적인 모험가입니다. 즉흥적으로 행동하며, 위험을 감수하는 것을 두려워하지 않습니다. 실용적인 해결책을 빠르게 찾으며, 에너지가 넘칩니다.' 
    },
    'ESFP': { 
        icon: '🎭', 
        nickname: '연예인', 
        description: '사교적이고 즐거움을 추구하는 연예인입니다. 사람들과 함께 있는 것을 좋아하며, 분위기를 밝게 만듭니다. 현재 순간을 즐기며, 자발적이고 관대합니다.' 
    },
    'ENFP': { 
        icon: '🎪', 
        nickname: '활동가', 
        description: '열정적이고 창의적인 활동가입니다. 새로운 가능성에 흥미를 느끼며, 사람들에게 영감을 줍니다. 자유로운 영혼이며, 진정성 있는 관계를 중시합니다.' 
    },
    'ENTP': { 
        icon: '💡', 
        nickname: '변론가', 
        description: '재치 있고 논쟁을 즐기는 변론가입니다. 지적 호기심이 왕성하며, 새로운 아이디어를 탐구합니다. 혁신적이고 독창적이며, 기존의 방식에 도전합니다.' 
    },
    'ESTJ': { 
        icon: '👔', 
        nickname: '경영자', 
        description: '조직적이고 실용적인 경영자입니다. 질서와 구조를 중시하며, 효율적으로 일을 처리합니다. 책임감이 강하고 결단력이 있으며, 전통과 규칙을 존중합니다.' 
    },
    'ESFJ': { 
        icon: '💝', 
        nickname: '집정관', 
        description: '따뜻하고 협조적인 집정관입니다. 사람들과의 관계를 소중히 여기며, 조화로운 환경을 만들기 위해 노력합니다. 책임감이 강하고 헌신적이며, 다른 사람을 돕는 것을 좋아합니다.' 
    },
    'ENFJ': { 
        icon: '🌟', 
        nickname: '주인공', 
        description: '카리스마 있고 영향력 있는 주인공입니다. 사람들을 이끌고 영감을 주는 것을 좋아합니다. 공감 능력이 뛰어나며, 다른 사람의 성장을 돕고자 합니다.' 
    },
    'ENTJ': { 
        icon: '👑', 
        nickname: '통솔자', 
        description: '대담하고 결단력 있는 통솔자입니다. 리더십이 강하며, 장기적인 목표를 세우고 달성합니다. 효율성과 논리를 중시하며, 어려운 결정도 주저 없이 내립니다.' 
    }
};

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

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
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    showScreen('test');
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = mbtiQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    // 질문 텍스트 업데이트
    document.getElementById('questionText').textContent = question.text;
    
    // 진행률 업데이트
    const progress = (questionNum / mbtiQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `질문 ${questionNum} / 60`;
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
    const question = mbtiQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산
    const [letter1, letter2] = question.dimension.split('');
    
    if (question.direction === 1) {
        // direction이 1이면: 동의할수록 첫 번째 글자 점수 증가
        scores[letter1] += value;
        scores[letter2] += (6 - value);
    } else {
        // direction이 -1이면: 동의할수록 두 번째 글자 점수 증가
        scores[letter1] += (6 - value);
        scores[letter2] += value;
    }
    
    // 다음 질문으로 이동 (0.3초 딜레이)
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

// 결과 표시
function showResult() {
    // MBTI 유형 결정
    const type = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');
    
    const typeInfo = mbtiTypes[type];
    
    // 결과 화면 업데이트
    document.getElementById('resultIcon').textContent = typeInfo.icon;
    document.getElementById('resultType').textContent = type;
    document.getElementById('resultNickname').textContent = typeInfo.nickname;
    document.getElementById('resultDescription').textContent = typeInfo.description;
    
    // 로컬 스토리지에 결과 저장
    const result = {
        type: type,
        nickname: typeInfo.nickname,
        icon: typeInfo.icon,
        description: typeInfo.description,
        scores: scores,
        date: new Date().toISOString(),
        testName: 'MBTI'
    };
    
    localStorage.setItem('mbtiResult', JSON.stringify(result));
    
    // RESTful Table API에도 저장
    saveToAPI(result);
    
    // 결과 화면 표시
    showScreen('result');
}

// RESTful Table API에 결과 저장
async function saveToAPI(result) {
    try {
        const response = await fetch('/tables/test_results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                test_name: 'MBTI',
                test_type: result.type,
                result_nickname: result.nickname,
                result_icon: result.icon,
                result_description: result.description,
                scores: JSON.stringify(result.scores),
                completed_at: result.date,
                user_email: localStorage.getItem('user_email') || 'anonymous@example.com',
                user_name: localStorage.getItem('user_name') || '익명'
            })
        });
        
        if (response.ok) {
            console.log('✅ MBTI 검사 결과가 서버에 저장되었습니다.');
        } else {
            console.warn('⚠️ 서버 저장 실패 (로컬 저장은 완료됨)');
        }
    } catch (error) {
        console.error('❌ API 저장 오류:', error);
        // 에러 발생해도 로컬 저장은 유지
    }
}

// 결과 저장
function saveResult() {
    const result = localStorage.getItem('mbtiResult');
    if (result) {
        alert('✅ 결과가 저장되었습니다!\n\n마이페이지에서 확인할 수 있습니다.');
        // 추후 마이페이지로 이동하는 기능 추가 가능
        // window.location.href = 'mypage.html';
    }
}

// 콘솔 로그
console.log('🧠 MBTI 검사 준비 완료! 총 ' + mbtiQuestions.length + '문항');
