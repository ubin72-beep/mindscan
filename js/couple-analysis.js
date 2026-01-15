// 커플/팀 궁합 분석 JavaScript

// MBTI 궁합도 계산 데이터 (간단한 예시)
const mbtiCompatibility = {
    'ENFP': { 'INTJ': 90, 'INFJ': 85, 'ENTP': 80, 'ENFJ': 75 },
    'INTJ': { 'ENFP': 90, 'ENTP': 85, 'INFP': 80, 'ENTJ': 75 },
    'INFJ': { 'ENFP': 85, 'ENTP': 82, 'INFP': 78, 'ENTJ': 75 },
    'ENTP': { 'INTJ': 85, 'INFJ': 82, 'ENFP': 80, 'ENTJ': 77 },
    // 기본 궁합도
    'default': 70
};

// 폼으로 스크롤
function scrollToAnalysis() {
    document.getElementById('analysisForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 구매하기
function purchase(plan) {
    const plans = {
        'single': {
            name: '1회 분석',
            price: '₩19,900',
            description: '두 사람 궁합 분석 1회'
        },
        'premium': {
            name: '프리미엄 패키지',
            price: '₩49,900',
            description: '3회 분석 + AI 상담 세션'
        },
        'team': {
            name: '팀 분석',
            price: '₩99,900',
            description: '최대 10명 팀 분석'
        }
    };

    const selectedPlan = plans[plan];
    
    if (confirm(`${selectedPlan.name}을 구매하시겠습니까?\n\n${selectedPlan.description}\n가격: ${selectedPlan.price}`)) {
        alert('결제 페이지로 이동합니다.');
        // 실제로는 결제 페이지로 이동
        // window.location.href = `payment/checkout.html?plan=${plan}`;
    }
}

// 궁합도 계산 함수
function calculateCompatibility(mbtiA, mbtiB) {
    // 실제로는 복잡한 알고리즘이 필요하지만, 여기서는 간단히 구현
    
    // 1. 미리 정의된 궁합도 확인
    if (mbtiCompatibility[mbtiA] && mbtiCompatibility[mbtiA][mbtiB]) {
        return mbtiCompatibility[mbtiA][mbtiB];
    }
    if (mbtiCompatibility[mbtiB] && mbtiCompatibility[mbtiB][mbtiA]) {
        return mbtiCompatibility[mbtiB][mbtiA];
    }
    
    // 2. 같은 유형이면 높은 점수
    if (mbtiA === mbtiB) {
        return 85;
    }
    
    // 3. 각 차원별 비교
    let score = 50;
    
    // E/I 비교 (외향/내향)
    const dimEI_A = mbtiA[0];
    const dimEI_B = mbtiB[0];
    if (dimEI_A === dimEI_B) score += 5;
    else score += 10; // 서로 다른 것이 보완적일 수 있음
    
    // S/N 비교 (감각/직관)
    const dimSN_A = mbtiA[1];
    const dimSN_B = mbtiB[1];
    if (dimSN_A === dimSN_B) score += 15; // 정보 처리 방식이 같으면 이해가 쉬움
    
    // T/F 비교 (사고/감정)
    const dimTF_A = mbtiA[2];
    const dimTF_B = mbtiB[2];
    if (dimTF_A === dimTF_B) score += 10;
    else score += 5; // 서로 다르면 균형
    
    // J/P 비교 (판단/인식)
    const dimJP_A = mbtiA[3];
    const dimJP_B = mbtiB[3];
    if (dimJP_A === dimJP_B) score += 5;
    else score += 10; // 서로 다르면 보완
    
    return Math.min(Math.max(score, 50), 95); // 50-95 사이로 제한
}

// 관계 유형별 조언 생성
function getRelationshipAdvice(relationshipType, mbtiA, mbtiB, score) {
    const advice = {
        couple: {
            high: '두 분의 성향이 매우 잘 맞습니다! 서로를 존중하고 소통하면 오래도록 행복한 관계를 유지할 수 있습니다.',
            medium: '서로 다른 점이 있지만, 이해하고 노력한다면 좋은 관계를 만들 수 있습니다.',
            low: '성향 차이가 크지만, 그만큼 서로에게 배울 점이 많습니다. 인내심을 가지고 소통하세요.'
        },
        team: {
            high: '환상의 팀워크! 서로의 강점을 살려 훌륭한 성과를 낼 수 있는 조합입니다.',
            medium: '역할 분담을 명확히 하면 좋은 시너지를 낼 수 있습니다.',
            low: '업무 방식 차이로 갈등이 있을 수 있지만, 명확한 커뮤니케이션으로 극복 가능합니다.'
        },
        friend: {
            high: '평생 친구가 될 수 있는 좋은 궁합입니다!',
            medium: '서로 다른 매력이 있는 좋은 친구 관계입니다.',
            low: '차이를 인정하고 존중하면 특별한 우정을 쌓을 수 있습니다.'
        },
        family: {
            high: '서로를 잘 이해하고 지지할 수 있는 관계입니다.',
            medium: '세대나 성향 차이가 있지만, 사랑으로 극복할 수 있습니다.',
            low: '차이를 인정하고 서로의 공간을 존중하는 것이 중요합니다.'
        }
    };

    const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
    return advice[relationshipType]?.[level] || advice.couple[level];
}

// 강점 분석
function analyzeStrengths(mbtiA, mbtiB) {
    const strengths = [];
    
    // E/I 조합
    if (mbtiA[0] !== mbtiB[0]) {
        strengths.push('외향적 성향과 내향적 성향이 균형을 이룹니다');
    } else if (mbtiA[0] === 'E') {
        strengths.push('두 분 모두 활발하여 에너지 넘치는 관계를 만듭니다');
    } else {
        strengths.push('두 분 모두 차분하여 깊이 있는 대화를 나눌 수 있습니다');
    }
    
    // S/N 조합
    if (mbtiA[1] === mbtiB[1]) {
        if (mbtiA[1] === 'S') {
            strengths.push('현실적이고 실용적인 문제 해결 능력이 뛰어납니다');
        } else {
            strengths.push('창의적이고 미래지향적인 비전을 공유합니다');
        }
    } else {
        strengths.push('현실과 이상의 균형잡힌 관점을 가집니다');
    }
    
    // T/F 조합
    if (mbtiA[2] !== mbtiB[2]) {
        strengths.push('논리와 감성의 조화로운 의사결정이 가능합니다');
    }
    
    return strengths;
}

// 주의사항 분석
function analyzeCautions(mbtiA, mbtiB) {
    const cautions = [];
    
    // J/P 차이
    if (mbtiA[3] !== mbtiB[3]) {
        cautions.push('계획성과 즉흥성의 차이로 인한 갈등 가능성');
    }
    
    // T/F 차이
    if (mbtiA[2] !== mbtiB[2]) {
        cautions.push('감정 표현과 이해 방식의 차이 인지 필요');
    }
    
    // E/I 같을 때
    if (mbtiA[0] === mbtiB[0]) {
        if (mbtiA[0] === 'E') {
            cautions.push('둘 다 말이 많아 경청이 부족할 수 있음');
        } else {
            cautions.push('둘 다 조용해서 대화가 부족할 수 있음');
        }
    }
    
    return cautions;
}

// 궁합 분석
function analyzeCouple(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    
    // 데이터 수집
    const analysisData = {
        personA: {
            name: formData.get('personA_name'),
            mbti: formData.get('personA_mbti'),
            traits: formData.get('personA_traits')
        },
        personB: {
            name: formData.get('personB_name'),
            mbti: formData.get('personB_mbti'),
            traits: formData.get('personB_traits')
        },
        relationshipType: formData.get('relationship_type'),
        specificConcerns: formData.get('specific_concerns'),
        timestamp: new Date().toISOString()
    };

    // 유효성 검사
    if (!analysisData.personA.mbti || !analysisData.personB.mbti) {
        alert('두 사람의 MBTI를 모두 선택해주세요.');
        return;
    }

    if (!analysisData.relationshipType) {
        alert('관계 유형을 선택해주세요.');
        return;
    }

    // 로딩 표시
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 분석 중...';
    submitButton.disabled = true;

    // 궁합도 계산
    const compatibilityScore = calculateCompatibility(
        analysisData.personA.mbti,
        analysisData.personB.mbti
    );

    // 분석 결과 생성
    const result = {
        score: compatibilityScore,
        advice: getRelationshipAdvice(
            analysisData.relationshipType,
            analysisData.personA.mbti,
            analysisData.personB.mbti,
            compatibilityScore
        ),
        strengths: analyzeStrengths(
            analysisData.personA.mbti,
            analysisData.personB.mbti
        ),
        cautions: analyzeCautions(
            analysisData.personA.mbti,
            analysisData.personB.mbti
        )
    };

    // 로컬 스토리지에 저장
    localStorage.setItem('coupleAnalysisData', JSON.stringify(analysisData));
    localStorage.setItem('coupleAnalysisResult', JSON.stringify(result));

    // 시뮬레이션: 2초 후 결과 표시
    setTimeout(() => {
        // 결과 메시지 생성
        let resultMessage = `🎉 분석 완료!\n\n`;
        resultMessage += `${analysisData.personA.name} (${analysisData.personA.mbti}) ❤️ ${analysisData.personB.name} (${analysisData.personB.mbti})\n\n`;
        resultMessage += `궁합도: ${result.score}%\n\n`;
        resultMessage += `${result.advice}\n\n`;
        resultMessage += `강점:\n${result.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n`;
        resultMessage += `주의사항:\n${result.cautions.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\n`;
        resultMessage += `상세 리포트는 이메일로 전송됩니다!`;

        alert(resultMessage);
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // 폼 초기화
        form.reset();
        
        // 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 예시 리포트 애니메이션
    animateExampleReport();

    // 타입 박스 호버 효과
    const typeBoxes = document.querySelectorAll('.type-box');
    typeBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 점수 원형 애니메이션
    animateScoreCircle();
});

// 예시 리포트 애니메이션
function animateExampleReport() {
    const reportSections = document.querySelectorAll('.analysis-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });

    reportSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// 점수 원형 애니메이션
function animateScoreCircle() {
    const circle = document.querySelector('.score-circle circle:last-child');
    if (circle) {
        const score = 85; // 예시 점수
        const circumference = 2 * Math.PI * 45; // r=45
        const offset = circumference - (score / 100) * circumference;
        
        // 초기 상태
        circle.style.strokeDashoffset = circumference;
        
        // 애니메이션
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
            circle.style.strokeDashoffset = offset;
        }, 500);
    }
}

// 데모 분석 함수 (개발용)
function generateDemoAnalysis() {
    return {
        personA: {
            name: '김민수',
            mbti: 'ENFP',
            traits: '활발하고 창의적, 즉흥적'
        },
        personB: {
            name: '이지은',
            mbti: 'INTJ',
            traits: '논리적이고 계획적, 신중함'
        },
        relationshipType: 'couple',
        result: {
            score: 85,
            strengths: [
                'ENFP의 창의성과 INTJ의 전략적 사고가 완벽한 시너지',
                '서로 다른 관점으로 균형잡힌 의사결정',
                '보완적인 성격으로 함께 성장 가능'
            ],
            cautions: [
                '의사결정 속도 차이 주의',
                'ENFP의 즉흥성과 INTJ의 계획성 충돌 가능',
                '감정 표현 방식 차이 이해 필요'
            ],
            communicationTips: {
                forA: 'INTJ 파트너의 신중함을 존중하고 중요한 결정에 충분한 시간을 주세요.',
                forB: 'ENFP 파트너의 열정을 이해하고 때로는 계획에서 벗어나는 것도 즐겨보세요.'
            }
        }
    };
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateCompatibility,
        analyzeCouple,
        purchase,
        generateDemoAnalysis
    };
}
