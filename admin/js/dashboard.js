// ===================================
// Dashboard Page JS
// 대시보드 통계 및 차트 관리
// ===================================

let testTrendChart, popularTestsChart, revenueChart, userStatsChart;

// Initialize Dashboard
async function initDashboard() {
    await loadDashboardStats();
    await loadCharts();
    await loadRecentActivities();
}

// Load Dashboard Stats
async function loadDashboardStats() {
    // Mock data - 실제로는 API에서 데이터를 가져옴
    const stats = {
        totalUsers: 145832,
        totalTests: 1247596,
        totalRevenue: 142850000,
        pendingRefunds: 23
    };
    
    document.getElementById('totalUsers').textContent = AdminUtils.formatNumber(stats.totalUsers) + '명';
    document.getElementById('totalTests').textContent = AdminUtils.formatNumber(stats.totalTests) + '건';
    document.getElementById('totalRevenue').textContent = AdminUtils.formatCurrency(stats.totalRevenue);
    document.getElementById('pendingRefunds').textContent = stats.pendingRefunds + '건';
}

// Load Charts
async function loadCharts() {
    initTestTrendChart();
    initPopularTestsChart();
    initRevenueChart();
    initUserStatsChart();
}

// Test Trend Chart
function initTestTrendChart() {
    const ctx = document.getElementById('testTrendChart');
    if (!ctx) return;
    
    // Generate mock data for last 30 days
    const labels = [];
    const data = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push((date.getMonth() + 1) + '/' + date.getDate());
        data.push(Math.floor(Math.random() * 5000) + 3000);
    }
    
    testTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '검사 완료',
                data: data,
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
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('ko-KR');
                        }
                    }
                }
            }
        }
    });
}

// Popular Tests Chart
function initPopularTestsChart() {
    const ctx = document.getElementById('popularTestsChart');
    if (!ctx) return;
    
    popularTestsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['MBTI', '에니어그램', 'DISC', 'Holland', '애착유형', '기타'],
            datasets: [{
                data: [28, 22, 18, 15, 12, 5],
                backgroundColor: [
                    '#2c5f4f',
                    '#3a7a65',
                    '#d4af37',
                    '#10b981',
                    '#3b82f6',
                    '#94a3b8'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Revenue Chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    const labels = [];
    const data = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push((date.getMonth() + 1) + '/' + date.getDate());
        data.push(Math.floor(Math.random() * 2000000) + 3000000);
    }
    
    revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '매출',
                data: data,
                backgroundColor: '#d4af37',
                borderRadius: 6
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
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₩' + (value / 10000).toFixed(0) + '만';
                        }
                    }
                }
            }
        }
    });
}

// User Stats Chart
function initUserStatsChart() {
    const ctx = document.getElementById('userStatsChart');
    if (!ctx) return;
    
    userStatsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['10대', '20대', '30대', '40대', '50대 이상'],
            datasets: [{
                label: '사용자 수',
                data: [8500, 45200, 52800, 28300, 11000],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#2c5f4f',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderRadius: 6
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
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 10000).toFixed(0) + '만';
                        }
                    }
                }
            }
        }
    });
}

// Load Recent Activities
async function loadRecentActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    // Mock activities
    const activities = [
        { icon: 'user-plus', text: '신규 사용자 가입: 김민준', time: '방금 전', color: '#10b981' },
        { icon: 'check-circle', text: 'MBTI 검사 완료: 이서윤', time: '5분 전', color: '#3b82f6' },
        { icon: 'dollar-sign', text: '프리미엄 구매: 박도윤', time: '12분 전', color: '#d4af37' },
        { icon: 'undo', text: '환불 신청: 최서준', time: '25분 전', color: '#f59e0b' },
        { icon: 'check-circle', text: '에니어그램 검사 완료: 정지우', time: '35분 전', color: '#3b82f6' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div style="
            padding: 16px;
            background: white;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 16px;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: ${activity.color}15;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${activity.color};
            ">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div style="flex: 1;">
                <p style="font-size: 14px; color: #1e293b; font-weight: 500; margin-bottom: 4px;">
                    ${activity.text}
                </p>
                <p style="font-size: 12px; color: #94a3b8;">
                    ${activity.time}
                </p>
            </div>
        </div>
    `).join('');
}

// Update Chart Functions
function updateTestChart(days) {
    if (!testTrendChart) return;
    
    const labels = [];
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push((date.getMonth() + 1) + '/' + date.getDate());
        data.push(Math.floor(Math.random() * 5000) + 3000);
    }
    
    testTrendChart.data.labels = labels;
    testTrendChart.data.datasets[0].data = data;
    testTrendChart.update();
}

function updateRevenueChart(days) {
    if (!revenueChart) return;
    
    const labels = [];
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push((date.getMonth() + 1) + '/' + date.getDate());
        data.push(Math.floor(Math.random() * 2000000) + 3000000);
    }
    
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = data;
    revenueChart.update();
}

// View Details
function viewTestDetails() {
    window.location.href = 'tests.html';
}

function viewUserDetails() {
    window.location.href = 'users.html';
}

// Refresh Dashboard
function refreshDashboard() {
    AdminUtils.showLoading();
    
    setTimeout(() => {
        initDashboard();
        AdminUtils.hideLoading();
        AdminUtils.showToast('대시보드가 새로고침되었습니다.', 'success');
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});
