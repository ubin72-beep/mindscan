// AI 맞춤형 성장 로드맵 JavaScript

// 현재 단계 추적
let currentStep = 1;

// 폼으로 스크롤
function scrollToForm() {
    document.getElementById('roadmapForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 다음 단계로 이동
function nextStep(step) {
    // 현재 단계 유효성 검사
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#e8ecef';
        }
    });

    if (!isValid) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // 단계 전환
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    
    // 진행 표시 업데이트
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
    
    // 진행바 업데이트
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${(step / 3) * 100}%`;
    
    currentStep = step;

    // 폼 상단으로 스크롤
    document.getElementById('roadmapForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 이전 단계로 이동
function prevStep(step) {
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${(step / 3) * 100}%`;
    
    currentStep = step;

    document.getElementById('roadmapForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 로드맵 생성
function generateRoadmap(event) {
    event.preventDefault();

    // 폼 데이터 수집
    const form = event.target;
    const formData = new FormData(form);
    
    // 체크박스 값들 수집
    const goals = [];
    const goalCheckboxes = form.querySelectorAll('input[name="goals"]:checked');
    goalCheckboxes.forEach(checkbox => {
        goals.push(checkbox.value);
    });

    if (goals.length === 0) {
        alert('최소 1개 이상의 목표를 선택해주세요.');
        return;
    }

    if (goals.length > 3) {
        alert('최대 3개까지 선택 가능합니다.');
        return;
    }

    // 데이터 객체 생성
    const roadmapData = {
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age'),
        goals: goals,
        additionalGoals: formData.get('additionalGoals'),
        testResult: formData.get('testResult'),
        testSummary: formData.get('testSummary'),
        timestamp: new Date().toISOString()
    };

    // 로컬 스토리지에 저장
    localStorage.setItem('roadmapData', JSON.stringify(roadmapData));

    // 로딩 표시
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 로드맵 생성 중...';
    submitButton.disabled = true;

    // 시뮬레이션: 2초 후 결과 페이지로 이동
    setTimeout(() => {
        // 실제로는 서버에 데이터를 전송하고 결과를 받아야 합니다
        alert(`${roadmapData.name}님의 맞춤형 로드맵이 생성되었습니다!\n\n목표: ${goals.join(', ')}\n\n이메일로 상세 로드맵이 전송됩니다.`);
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // 폼 초기화
        form.reset();
        currentStep = 1;
        document.querySelector('.form-step.active').classList.remove('active');
        document.querySelector('.form-step[data-step="1"]').classList.add('active');
        document.getElementById('progressBar').style.width = '33.33%';
        
        // 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// 구독하기
function subscribe(plan) {
    const plans = {
        '3months': {
            name: '3개월 플랜',
            price: '₩49,900',
            period: '3개월'
        },
        '6months': {
            name: '6개월 플랜',
            price: '₩79,900',
            period: '6개월'
        }
    };

    const selectedPlan = plans[plan];
    
    if (confirm(`${selectedPlan.name}을 구독하시겠습니까?\n\n가격: ${selectedPlan.price}\n기간: ${selectedPlan.period}`)) {
        // 실제로는 결제 페이지로 이동
        alert('결제 페이지로 이동합니다.');
        // window.location.href = `payment/checkout.html?plan=${plan}`;
    }
}

// 타임라인 애니메이션 (스크롤 시)
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 타임라인 애니메이션 초기화
    animateTimeline();

    // 기능 카드 호버 효과
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 체크박스 개수 제한 (최대 3개)
    const goalCheckboxes = document.querySelectorAll('input[name="goals"]');
    goalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="goals"]:checked');
            if (checkedBoxes.length > 3) {
                this.checked = false;
                alert('최대 3개까지 선택 가능합니다.');
            }
        });
    });

    // 스크롤 진행률 표시
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / docHeight) * 100;
        
        // 추후 진행률 바 추가 가능
    });
});

// 데모 데이터 생성 함수 (개발용)
function generateDemoRoadmap() {
    const demoData = {
        name: '김멘토',
        email: 'demo@mentora.co.kr',
        age: '30s',
        goals: ['communication', 'leadership', 'confidence'],
        additionalGoals: '팀 리더로서 효과적으로 소통하고 싶습니다.',
        testResult: 'mbti',
        testSummary: 'ENFP - 외향적이고 직관적인 성향',
        timestamp: new Date().toISOString()
    };

    // 생성된 로드맵 예시
    const roadmap = {
        user: demoData,
        phases: [
            {
                week: 1,
                title: '자기 인식 강화',
                description: 'ENFP 유형의 강점인 열정과 창의성을 인식하고, 개선이 필요한 체계성을 파악합니다.',
                missions: [
                    '매일 아침 5분 자기성찰 시간 갖기',
                    '강점 3가지를 구체적인 사례와 함께 기록하기',
                    '개선 목표 우선순위 정하기'
                ],
                resources: [
                    'ENFP 성향 심화 가이드',
                    '리더십 자가진단 체크리스트'
                ]
            },
            {
                week: '2-4',
                title: '소통 습관 형성',
                description: '효과적인 소통 기술을 학습하고 일상에서 실천합니다.',
                missions: [
                    '적극적 경청 연습 (주 3회)',
                    '피드백 주고받기 훈련',
                    '회의 진행 스킬 향상'
                ],
                resources: [
                    '소통 스킬 온라인 강의',
                    '피드백 템플릿 모음'
                ]
            },
            {
                week: '5-8',
                title: '리더십 실전',
                description: '소규모 프로젝트를 리드하며 실전 경험을 쌓습니다.',
                missions: [
                    '팀 프로젝트 주도하기',
                    '주간 팀 미팅 운영',
                    '갈등 상황 대처 연습'
                ],
                resources: [
                    '리더십 케이스 스터디',
                    '갈등 관리 가이드'
                ]
            },
            {
                week: '9-12',
                title: '자신감 강화 & 유지',
                description: '성과를 점검하고 지속 가능한 성장 시스템을 구축합니다.',
                missions: [
                    '성과 리뷰 및 축하',
                    '장기 목표 재설정',
                    '멘토링 시스템 구축'
                ],
                resources: [
                    '성과 측정 도구',
                    '지속 성장 체크리스트'
                ]
            }
        ],
        achievements: [
            { week: 4, title: '소통 달인', description: '4주간 소통 미션 완수' },
            { week: 8, title: '프로젝트 리더', description: '첫 프로젝트 성공적 완수' },
            { week: 12, title: '성장 완료', description: '12주 로드맵 완주' }
        ],
        nextSteps: [
            '고급 리더십 과정 도전',
            '멘토로 다른 사람 돕기',
            '새로운 목표 설정하기'
        ]
    };

    console.log('데모 로드맵:', roadmap);
    return roadmap;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateRoadmap,
        subscribe,
        nextStep,
        prevStep,
        generateDemoRoadmap
    };
}
