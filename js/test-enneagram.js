// ========================================
// 에니어그램 성격유형검사 JavaScript
// 90문항, 9가지 성격 유형
// ========================================

// 에니어그램 검사 질문 (90문항)
const enneagramQuestions = [
    // 유형 1 (개혁가) - 10문항
    { id: 1, text: "나는 완벽주의 성향이 있다", type: 1 },
    { id: 2, text: "잘못된 것을 바로잡고 싶은 욕구가 강하다", type: 1 },
    { id: 3, text: "규칙과 원칙을 중요하게 생각한다", type: 1 },
    { id: 4, text: "비판적인 시각으로 사물을 본다", type: 1 },
    { id: 5, text: "높은 기준을 스스로에게 적용한다", type: 1 },
    { id: 6, text: "옳고 그름에 대한 신념이 확고하다", type: 1 },
    { id: 7, text: "정의감이 강하다", type: 1 },
    { id: 8, text: "실수를 하면 자책을 많이 한다", type: 1 },
    { id: 9, text: "세상을 더 나은 곳으로 만들고 싶다", type: 1 },
    { id: 10, text: "질서와 체계를 선호한다", type: 1 },

    // 유형 2 (조력가) - 10문항
    { id: 11, text: "다른 사람을 돕는 것에서 기쁨을 느낀다", type: 2 },
    { id: 12, text: "사람들의 감정 변화를 잘 감지한다", type: 2 },
    { id: 13, text: "친절하고 따뜻한 사람이라는 말을 자주 듣는다", type: 2 },
    { id: 14, text: "다른 사람의 필요를 먼저 생각한다", type: 2 },
    { id: 15, text: "거절하는 것이 어렵다", type: 2 },
    { id: 16, text: "관계에서 인정받고 싶다", type: 2 },
    { id: 17, text: "다른 사람의 문제를 내 일처럼 걱정한다", type: 2 },
    { id: 18, text: "사랑과 애정을 표현하는 것을 좋아한다", type: 2 },
    { id: 19, text: "다른 사람에게 필요한 존재가 되고 싶다", type: 2 },
    { id: 20, text: "나의 감정보다 타인의 감정을 우선시한다", type: 2 },

    // 유형 3 (성취자) - 10문항
    { id: 21, text: "목표 지향적이고 성공을 중시한다", type: 3 },
    { id: 22, text: "경쟁에서 이기는 것을 좋아한다", type: 3 },
    { id: 23, text: "효율성과 생산성을 중요하게 생각한다", type: 3 },
    { id: 24, text: "다른 사람에게 좋은 인상을 주고 싶다", type: 3 },
    { id: 25, text: "성과와 업적으로 평가받는 것을 선호한다", type: 3 },
    { id: 26, text: "실패를 두려워한다", type: 3 },
    { id: 27, text: "항상 바쁘게 무언가를 하고 있다", type: 3 },
    { id: 28, text: "이미지와 외모에 신경을 쓴다", type: 3 },
    { id: 29, text: "목표 달성을 위해 헌신한다", type: 3 },
    { id: 30, text: "성공한 사람으로 보이고 싶다", type: 3 },

    // 유형 4 (예술가) - 10문항
    { id: 31, text: "감정이 풍부하고 예민하다", type: 4 },
    { id: 32, text: "독특하고 특별한 존재가 되고 싶다", type: 4 },
    { id: 33, text: "창의적인 표현을 좋아한다", type: 4 },
    { id: 34, text: "깊은 감정을 경험하는 것을 소중히 여긴다", type: 4 },
    { id: 35, text: "나만의 정체성을 찾고 싶다", type: 4 },
    { id: 36, text: "아름다움과 의미를 추구한다", type: 4 },
    { id: 37, text: "멜랑콜리한 기분에 자주 빠진다", type: 4 },
    { id: 38, text: "평범한 것을 싫어한다", type: 4 },
    { id: 39, text: "나를 이해해주는 사람을 찾고 있다", type: 4 },
    { id: 40, text: "감정의 깊이를 중요하게 생각한다", type: 4 },

    // 유형 5 (관찰자) - 10문항
    { id: 41, text: "지식과 정보를 수집하는 것을 좋아한다", type: 5 },
    { id: 42, text: "혼자 있는 시간이 필요하다", type: 5 },
    { id: 43, text: "관찰하고 분석하는 것을 선호한다", type: 5 },
    { id: 44, text: "감정 표현을 잘하지 않는다", type: 5 },
    { id: 45, text: "복잡한 문제를 이해하고 싶다", type: 5 },
    { id: 46, text: "에너지를 아껴 쓰려고 한다", type: 5 },
    { id: 47, text: "독립적이고 자립적이다", type: 5 },
    { id: 48, text: "사생활을 소중히 여긴다", type: 5 },
    { id: 49, text: "전문가가 되고 싶다", type: 5 },
    { id: 50, text: "생각하는 시간을 많이 가진다", type: 5 },

    // 유형 6 (충성가) - 10문항
    { id: 51, text: "안전과 안정을 중요하게 생각한다", type: 6 },
    { id: 52, text: "최악의 상황을 미리 생각한다", type: 6 },
    { id: 53, text: "신뢰할 수 있는 관계를 원한다", type: 6 },
    { id: 54, text: "불안감을 자주 느낀다", type: 6 },
    { id: 55, text: "책임감이 강하다", type: 6 },
    { id: 56, text: "권위에 대해 양가감정이 있다", type: 6 },
    { id: 57, text: "충성스럽고 헌신적이다", type: 6 },
    { id: 58, text: "의심이 많고 조심스럽다", type: 6 },
    { id: 59, text: "팀과 공동체를 중요하게 생각한다", type: 6 },
    { id: 60, text: "위험을 미리 파악하려고 한다", type: 6 },

    // 유형 7 (열정가) - 10문항
    { id: 61, text: "새로운 경험을 추구한다", type: 7 },
    { id: 62, text: "긍정적이고 낙관적이다", type: 7 },
    { id: 63, text: "재미있고 즐거운 것을 좋아한다", type: 7 },
    { id: 64, text: "여러 가지 계획을 동시에 세운다", type: 7 },
    { id: 65, text: "지루함을 견디기 힘들다", type: 7 },
    { id: 66, text: "자유롭고 제약받지 않는 삶을 원한다", type: 7 },
    { id: 67, text: "모험을 즐긴다", type: 7 },
    { id: 68, text: "고통과 슬픔을 피하려고 한다", type: 7 },
    { id: 69, text: "다양한 옵션을 열어두고 싶다", type: 7 },
    { id: 70, text: "에너지가 넘치고 활동적이다", type: 7 },

    // 유형 8 (도전자) - 10문항
    { id: 71, text: "강하고 자신감 있는 사람이다", type: 8 },
    { id: 72, text: "약자를 보호하고 싶다", type: 8 },
    { id: 73, text: "직설적이고 솔직하다", type: 8 },
    { id: 74, text: "통제력을 유지하고 싶다", type: 8 },
    { id: 75, text: "불의를 보면 참지 못한다", type: 8 },
    { id: 76, text: "취약함을 드러내기 싫다", type: 8 },
    { id: 77, text: "강렬하고 열정적이다", type: 8 },
    { id: 78, text: "리더십을 발휘하는 것을 좋아한다", type: 8 },
    { id: 79, text: "정면 대결을 두려워하지 않는다", type: 8 },
    { id: 80, text: "독립적이고 자립적이다", type: 8 },

    // 유형 9 (평화주의자) - 10문항
    { id: 81, text: "평화와 조화를 중시한다", type: 9 },
    { id: 82, text: "갈등을 피하려고 한다", type: 9 },
    { id: 83, text: "다른 사람의 의견에 쉽게 동의한다", type: 9 },
    { id: 84, text: "느긋하고 여유로운 성격이다", type: 9 },
    { id: 85, text: "모든 사람이 행복하길 바란다", type: 9 },
    { id: 86, text: "결정을 미루는 경향이 있다", type: 9 },
    { id: 87, text: "중재자 역할을 잘한다", type: 9 },
    { id: 88, text: "나의 욕구를 표현하기 어렵다", type: 9 },
    { id: 89, text: "편안함과 안정을 추구한다", type: 9 },
    { id: 90, text: "다양한 관점을 이해할 수 있다", type: 9 }
];

// 에니어그램 유형별 설명
const enneagramTypes = {
    1: {
        icon: '⚖️',
        nickname: '개혁가',
        title: '완벽을 추구하는 개혁가',
        description: '원칙적이고 목적 의식이 뚜렷하며, 자기 통제력이 강합니다. 높은 기준을 가지고 있으며, 세상을 개선하려는 열망이 있습니다. 정의롭고 윤리적이며, 옳은 일을 하려고 노력합니다.'
    },
    2: {
        icon: '💝',
        nickname: '조력가',
        title: '사람을 돕는 조력가',
        description: '따뜻하고 배려심이 많으며, 다른 사람의 필요에 민감합니다. 관계 지향적이고 공감 능력이 뛰어나며, 사랑받고 인정받고 싶어 합니다. 다른 사람을 위해 자신을 희생하는 경향이 있습니다.'
    },
    3: {
        icon: '🏆',
        nickname: '성취자',
        title: '성공을 추구하는 성취자',
        description: '성공 지향적이고 적응력이 뛰어나며, 목표 달성에 집중합니다. 이미지를 중시하고 효율적이며, 다른 사람에게 긍정적인 인상을 주려고 노력합니다. 경쟁력이 있고 야심찹니다.'
    },
    4: {
        icon: '🎨',
        nickname: '예술가',
        title: '개성을 표현하는 예술가',
        description: '감정이 풍부하고 창의적이며, 독특함을 추구합니다. 자기 인식이 강하고 내성적이며, 아름다움과 의미를 중시합니다. 감수성이 예민하고 자신만의 정체성을 찾으려 합니다.'
    },
    5: {
        icon: '🔍',
        nickname: '관찰자',
        title: '지식을 탐구하는 관찰자',
        description: '분석적이고 통찰력이 있으며, 지식을 추구합니다. 독립적이고 혁신적이며, 복잡한 아이디어를 이해하려 합니다. 사생활을 중시하고 에너지를 아껴 쓰려는 경향이 있습니다.'
    },
    6: {
        icon: '🛡️',
        nickname: '충성가',
        title: '신뢰를 중시하는 충성가',
        description: '책임감이 강하고 신뢰할 수 있으며, 안전을 추구합니다. 충성스럽고 헌신적이며, 최악의 상황에 대비합니다. 불안감을 느끼지만 용기 있게 맞서며, 공동체를 중시합니다.'
    },
    7: {
        icon: '🎉',
        nickname: '열정가',
        title: '즐거움을 추구하는 열정가',
        description: '활기차고 다재다능하며, 새로운 경험을 추구합니다. 긍정적이고 낙관적이며, 자유롭고 모험적입니다. 고통을 피하고 즐거움을 추구하며, 여러 가지 흥미를 동시에 가집니다.'
    },
    8: {
        icon: '💪',
        nickname: '도전자',
        title: '강함을 추구하는 도전자',
        description: '자신감 있고 결단력이 있으며, 직설적입니다. 강력하고 지배적이며, 약자를 보호합니다. 독립적이고 자기 주장이 강하며, 통제력을 유지하려 합니다. 정의를 추구합니다.'
    },
    9: {
        icon: '☮️',
        nickname: '평화주의자',
        title: '평화를 사랑하는 평화주의자',
        description: '수용적이고 신뢰하며, 안정을 추구합니다. 평화롭고 편안하며, 갈등을 피합니다. 조화를 중시하고 타인의 관점을 이해하며, 느긋하고 여유롭습니다. 모두가 행복하길 바랍니다.'
    }
};

// 전역 변수
let currentQuestion = 0;
let answers = [];
let scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

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
    scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    showScreen('test');
    loadQuestion();
}

// 질문 로드
function loadQuestion() {
    const question = enneagramQuestions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    // 질문 텍스트 업데이트
    document.getElementById('questionText').textContent = question.text;
    
    // 진행률 업데이트
    const progress = (questionNum / enneagramQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `질문 ${questionNum} / 90`;
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
    const question = enneagramQuestions[currentQuestion];
    
    // 답변 저장
    answers[currentQuestion] = value;
    
    // 점수 계산
    scores[question.type] += value;
    
    // 다음 질문으로 이동
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

// 결과 표시
function showResult() {
    // 가장 높은 점수의 유형 찾기
    let maxScore = 0;
    let resultType = 1;
    
    for (let type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            resultType = parseInt(type);
        }
    }
    
    const typeInfo = enneagramTypes[resultType];
    
    // 결과 화면 업데이트
    document.getElementById('resultIcon').textContent = typeInfo.icon;
    document.getElementById('resultType').textContent = `유형 ${resultType}`;
    document.getElementById('resultNickname').textContent = typeInfo.nickname;
    document.getElementById('resultTitle').textContent = typeInfo.title;
    document.getElementById('resultDescription').textContent = typeInfo.description;
    
    // 로컬 스토리지에 결과 저장
    const result = {
        type: resultType,
        nickname: typeInfo.nickname,
        title: typeInfo.title,
        icon: typeInfo.icon,
        description: typeInfo.description,
        scores: scores,
        date: new Date().toISOString(),
        testName: 'Enneagram'
    };
    
    localStorage.setItem('enneagramResult', JSON.stringify(result));
    
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
                test_name: 'Enneagram',
                test_type: `유형 ${result.type}`,
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
            console.log('✅ 에니어그램 검사 결과가 서버에 저장되었습니다.');
        } else {
            console.warn('⚠️ 서버 저장 실패 (로컬 저장은 완료됨)');
        }
    } catch (error) {
        console.error('❌ API 저장 오류:', error);
        // 에러 발생해도 로컬 저장은 유지
    }
}

// 결과 저장
function saveAndView() {
    const result = localStorage.getItem('enneagramResult');
    if (result) {
        alert('✅ 결과가 저장되었습니다!\n\n마이페이지에서 확인할 수 있습니다.');
    }
}

// 콘솔 로그
console.log('🌟 에니어그램 검사 준비 완료! 총 ' + enneagramQuestions.length + '문항');
