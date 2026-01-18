/* ==============================================
   MindScan V3.0 - Main JavaScript
   큐브박스(CubeBox) - AI 기반 심리검사 플랫폼
   ============================================== */

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 MindScan V3.0 초기화...');
    
    initCounterAnimation();
    initSearchFilter();
    initFAQ();
    initSmoothScroll();
    initMobileMenu();
    
    console.log('✅ MindScan V3.0 준비 완료!');
});

// ==================== 카운터 애니메이션 ====================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2초
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = formatNumber(target);
                        clearInterval(timer);
                    } else {
                        counter.textContent = formatNumber(Math.floor(current));
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    counters.forEach(counter => observer.observe(counter));
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// ==================== 검색 및 필터 ====================
function initSearchFilter() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-button');
    const testCards = document.querySelectorAll('.test-card');
    
    // 검색 기능
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterTests(searchTerm, getCurrentFilter());
        });
    }
    
    // 필터 버튼
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성 버튼 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 필터 적용
            const filter = this.getAttribute('data-filter');
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterTests(searchTerm, filter);
        });
    });
    
    function filterTests(searchTerm, filter) {
        let visibleCount = 0;
        
        testCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.test-description').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            const keywords = card.getAttribute('data-keywords') || '';
            
            // 검색어 매칭
            const matchesSearch = !searchTerm || 
                                 title.includes(searchTerm) || 
                                 description.includes(searchTerm) ||
                                 keywords.toLowerCase().includes(searchTerm);
            
            // 카테고리 필터 매칭
            const matchesFilter = filter === 'all' || category === filter;
            
            // 결과 표시
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 결과 없음 메시지
        showEmptyState(visibleCount === 0);
    }
    
    function getCurrentFilter() {
        const activeButton = document.querySelector('.filter-button.active');
        return activeButton ? activeButton.getAttribute('data-filter') : 'all';
    }
    
    function showEmptyState(show) {
        let emptyState = document.querySelector('.empty-state');
        
        if (show) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <div class="empty-state-icon">🔍</div>
                    <h3>검색 결과가 없습니다</h3>
                    <p>다른 키워드로 검색해보세요</p>
                `;
                document.querySelector('.tests-grid').appendChild(emptyState);
            }
        } else {
            if (emptyState) {
                emptyState.remove();
            }
        }
    }
}

// ==================== FAQ 토글 ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 다른 FAQ 닫기
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 현재 FAQ 토글
            item.classList.toggle('active');
        });
    });
}

// ==================== 부드러운 스크롤 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== 모바일 메뉴 ====================
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // 메뉴 항목 클릭 시 닫기
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }
}

// ==================== 검사 시작 ====================
function startTest(testType) {
    console.log('검사 시작:', testType);
    
    // 검사 페이지로 이동
    window.location.href = `test-${testType}.html`;
}

// ==================== 추천 검사 시작 ====================
function startRecommendedTest() {
    console.log('추천 검사 시작');
    
    // MBTI 검사로 이동 (가장 인기있는 검사)
    startTest('mbti');
}

// ==================== 로그인 확인 ====================
function checkAuth() {
    const user = localStorage.getItem('mindscan_user');
    return user ? JSON.parse(user) : null;
}

// ==================== 프리미엄 결제 ====================
function upgradeToPremium(plan) {
    console.log('프리미엄 업그레이드:', plan);
    
    const user = checkAuth();
    
    if (!user) {
        // 로그인 필요
        if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
            window.location.href = 'auth/login.html';
        }
        return;
    }
    
    // 결제 페이지로 이동
    window.location.href = `payment/checkout.html?plan=${plan}`;
}

// ==================== 로컬스토리지 관리 ====================
function saveTestResult(testType, result) {
    const results = getTestResults();
    results.push({
        id: Date.now(),
        testType: testType,
        result: result,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('mindscan_results', JSON.stringify(results));
    console.log('검사 결과 저장 완료');
}

function getTestResults() {
    const results = localStorage.getItem('mindscan_results');
    return results ? JSON.parse(results) : [];
}

function deleteTestResult(id) {
    let results = getTestResults();
    results = results.filter(result => result.id !== id);
    localStorage.setItem('mindscan_results', JSON.stringify(results));
    console.log('검사 결과 삭제 완료');
}

// ==================== 공유 기능 ====================
function shareResult(platform) {
    const url = window.location.href;
    const text = 'MindScan에서 심리검사를 받아보세요!';
    
    switch(platform) {
        case 'kakao':
            shareToKakao(url, text);
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
            break;
        case 'copy':
            copyToClipboard(url);
            break;
    }
}

function shareToKakao(url, text) {
    // 카카오톡 공유는 별도 SDK 필요
    console.log('카카오톡 공유:', url, text);
    alert('카카오톡 공유 기능은 준비 중입니다.');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('링크가 복사되었습니다!');
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

// ==================== 전역 함수 노출 ====================
window.startTest = startTest;
window.startRecommendedTest = startRecommendedTest;
window.upgradeToPremium = upgradeToPremium;
window.shareResult = shareResult;
window.deleteTestResult = deleteTestResult;
