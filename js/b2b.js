// ================================
// B2B JavaScript
// ================================

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupFormValidation();
    animateOnScroll();
});

// Theme Toggle
function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const companyName = document.getElementById('companyName').value.trim();
        const contactName = document.getElementById('contactName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!companyName || !contactName || !email || !phone || !message) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        if (!isValidPhone(phone)) {
            alert('올바른 전화번호를 입력해주세요. (예: 010-1234-5678)');
            return;
        }

        submitContactForm({
            companyName,
            contactName,
            email,
            phone,
            message
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(phone);
}

function submitContactForm(data) {
    console.log('제출 데이터:', data);
    
    // 실제 구현 시 API 호출
    alert(`문의가 접수되었습니다!\n\n담당자가 영업일 기준 1-2일 내에 연락드리겠습니다.\n\n회사명: ${data.companyName}\n담당자: ${data.contactName}\n이메일: ${data.email}`);
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Animate on Scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .case-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Actions
function requestDemo() {
    alert('데모 신청 페이지로 이동합니다!');
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function downloadBrochure() {
    alert('회사 소개서를 다운로드합니다...');
}

function requestPlan(planName) {
    alert(`${planName} 플랜 문의를 시작합니다!`);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('message').value = `${planName} 플랜에 대해 문의드립니다.`;
}

function viewCaseStudy(caseId) {
    alert(`케이스 스터디 ${caseId}의 상세 내용을 확인합니다.`);
}

// Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
