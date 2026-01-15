// 심리 데이터 대시보드 JavaScript

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadDashboardData();
});

// 대시보드로 스크롤
function scrollToDashboard() {
    document.getElementById('dashboardDemo').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 차트 초기화
function initializeCharts() {
    // 성장 추이 차트
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
                datasets: [{
                    label: '성장 점수',
                    data: [65, 70, 75, 78, 82, 85],
                    borderColor: '#2c5f4f',
                    backgroundColor: 'rgba(44, 95, 79, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100
                    }
                }
            }
        });
    }

    // 검사 분포 차트
    const distributionCtx = document.getElementById('testDistributionChart');
    if (distributionCtx) {
        new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['MBTI', 'EQ', '에니어그램', 'DISC', '기타'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#2c5f4f',
                        '#d4af37',
                        '#5c7cfa',
                        '#4caf50',
                        '#9c27b0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// 대시보드 데이터 로드
function loadDashboardData() {
    // LocalStorage에서 저장된 데이터 불러오기
    const savedData = localStorage.getItem('dashboardData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        updateDashboard(data);
    } else {
        // 기본 데이터 생성
        const defaultData = {
            tests: 8,
            goals: 5,
            score: 85,
            streak: 12,
            activities: [],
            goals: []
        };
        saveDashboardData(defaultData);
    }
}

// 대시보드 데이터 저장
function saveDashboardData(data) {
    localStorage.setItem('dashboardData', JSON.stringify(data));
}

// 대시보드 업데이트
function updateDashboard(data) {
    // 통계 카드 업데이트
    // 실제 구현에서는 DOM 조작으로 숫자 업데이트
    console.log('Dashboard updated:', data);
}

// 대시보드 새로고침
function refreshDashboard() {
    const button = event.target.closest('.btn-icon');
    button.classList.add('rotating');
    
    setTimeout(() => {
        button.classList.remove('rotating');
        loadDashboardData();
        alert('대시보드가 새로고침되었습니다!');
    }, 1000);
}

// 리포트 다운로드
function downloadReport() {
    alert('리포트를 다운로드합니다.\n\nPDF 형식으로 저장됩니다.');
    // 실제 구현: PDF 생성 및 다운로드
}

// 무료 시작
function startFree() {
    alert('무료 대시보드를 시작합니다!');
    window.location.href = 'mypage.html';
}

// 프리미엄 구독
function subscribePremium() {
    if (confirm('프리미엄 대시보드를 구독하시겠습니까?\n\n월 9,900원')) {
        alert('결제 페이지로 이동합니다.');
        // window.location.href = 'payment/checkout.html?plan=dashboard-premium';
    }
}

// 목표 추가
function addGoal(goalData) {
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData')) || {};
    
    if (!dashboardData.goals) {
        dashboardData.goals = [];
    }
    
    dashboardData.goals.push({
        ...goalData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        progress: 0
    });
    
    saveDashboardData(dashboardData);
    updateDashboard(dashboardData);
}

// 목표 업데이트
function updateGoal(goalId, progress) {
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));
    
    const goal = dashboardData.goals.find(g => g.id === goalId);
    if (goal) {
        goal.progress = progress;
        goal.updatedAt = new Date().toISOString();
        
        saveDashboardData(dashboardData);
        updateDashboard(dashboardData);
    }
}

// 활동 기록 추가
function logActivity(activityType, activityData) {
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData')) || {};
    
    if (!dashboardData.activities) {
        dashboardData.activities = [];
    }
    
    dashboardData.activities.unshift({
        type: activityType,
        data: activityData,
        timestamp: new Date().toISOString()
    });
    
    // 최근 20개만 유지
    dashboardData.activities = dashboardData.activities.slice(0, 20);
    
    saveDashboardData(dashboardData);
}

// 통계 계산
function calculateStats() {
    const dashboardData = JSON.parse(localStorage.getItem('dashboardData')) || {};
    
    return {
        totalTests: dashboardData.tests || 0,
        completedGoals: dashboardData.goals?.filter(g => g.progress === 100).length || 0,
        currentScore: dashboardData.score || 0,
        streak: dashboardData.streak || 0,
        averageProgress: dashboardData.goals?.reduce((acc, g) => acc + g.progress, 0) / (dashboardData.goals?.length || 1) || 0
    };
}

// 데이터 내보내기
function exportData() {
    const dashboardData = localStorage.getItem('dashboardData');
    
    if (!dashboardData) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(dashboardData);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "mentora-dashboard-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    alert('데이터가 다운로드되었습니다!');
}

// 데이터 가져오기
function importData(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('dashboardData', JSON.stringify(data));
            loadDashboardData();
            alert('데이터를 성공적으로 불러왔습니다!');
        } catch (error) {
            alert('데이터 형식이 올바르지 않습니다.');
        }
    };
    
    reader.readAsText(file);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes rotating {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .rotating {
        animation: rotating 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadDashboardData,
        refreshDashboard,
        downloadReport,
        startFree,
        subscribePremium,
        addGoal,
        updateGoal,
        logActivity,
        calculateStats,
        exportData,
        importData
    };
}
