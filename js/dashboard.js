// ================================
// 대시보드 JavaScript
// ================================

// Sample User Data
const userData = {
    name: '김민지',
    joinDate: '2025-11-15',
    testsCompleted: 8,
    totalTests: 12,
    premium: true
};

// Test Results Data
const testResults = [
    {
        id: 1,
        name: 'MBTI',
        result: 'INFP',
        date: '2026-01-10',
        score: 92,
        category: 'personality'
    },
    {
        id: 2,
        name: '에니어그램',
        result: '4번 예술가',
        date: '2026-01-08',
        score: 88,
        category: 'personality'
    },
    {
        id: 3,
        name: 'Big Five',
        result: '개방성 높음',
        date: '2026-01-05',
        score: 85,
        category: 'personality'
    },
    {
        id: 4,
        name: 'EQ',
        result: '감성지능 우수',
        date: '2026-01-03',
        score: 90,
        category: 'intelligence'
    },
    {
        id: 5,
        name: 'IQ',
        result: '지능지수 128',
        date: '2025-12-28',
        score: 128,
        category: 'intelligence'
    },
    {
        id: 6,
        name: 'SQ',
        result: '사회지능 보통',
        date: '2025-12-25',
        score: 75,
        category: 'intelligence'
    },
    {
        id: 7,
        name: '자존감',
        result: '보통 수준',
        date: '2025-12-20',
        score: 68,
        category: 'mental'
    },
    {
        id: 8,
        name: '번아웃',
        result: '경증',
        date: '2025-12-15',
        score: 45,
        category: 'mental'
    }
];

// Strengths & Weaknesses
const strengthsData = [
    { name: '창의성', score: 95 },
    { name: '공감능력', score: 92 },
    { name: '직관력', score: 88 },
    { name: '예술적 감각', score: 90 },
    { name: '심미안', score: 87 }
];

const weaknessesData = [
    { name: '실용성', score: 45 },
    { name: '대인관계', score: 52 },
    { name: '자기주장', score: 48 },
    { name: '스트레스 관리', score: 50 },
    { name: '계획성', score: 55 }
];

// Goals Data
const goalsData = [
    {
        id: 1,
        title: '자존감 향상',
        progress: 65,
        target: '2026-03-15',
        status: 'active'
    },
    {
        id: 2,
        title: '대인관계 개선',
        progress: 40,
        target: '2026-04-01',
        status: 'active'
    },
    {
        id: 3,
        title: '스트레스 관리',
        progress: 80,
        target: '2026-02-28',
        status: 'active'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    loadTestHistory();
    loadStrengthsWeaknesses();
    loadGoals();
    createRadarChart();
    createProgressChart();
    setupThemeToggle();
});

// Load User Info
function loadUserInfo() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('joinDate').textContent = `가입일: ${userData.joinDate}`;
    document.getElementById('testsCompleted').textContent = userData.testsCompleted;
    document.getElementById('totalTests').textContent = userData.totalTests;
    
    const progressPercent = Math.round((userData.testsCompleted / userData.totalTests) * 100);
    document.getElementById('completionRate').textContent = `${progressPercent}%`;
}

// Load Test History
function loadTestHistory() {
    const tbody = document.getElementById('testHistoryBody');
    tbody.innerHTML = testResults.map(test => `
        <tr>
            <td>${test.name}</td>
            <td><strong>${test.result}</strong></td>
            <td>${test.date}</td>
            <td>
                <div class="score-badge score-${getScoreLevel(test.score)}">
                    ${test.score}점
                </div>
            </td>
            <td>
                <button class="btn-sm btn-primary" onclick="viewTestDetail(${test.id})">
                    <i class="fas fa-eye"></i> 보기
                </button>
            </td>
        </tr>
    `).join('');
}

function getScoreLevel(score) {
    if (score >= 85) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
}

// Load Strengths & Weaknesses
function loadStrengthsWeaknesses() {
    const strengthsList = document.getElementById('strengthsList');
    strengthsList.innerHTML = strengthsData.map(item => `
        <div class="strength-item">
            <div class="strength-header">
                <span class="strength-name">${item.name}</span>
                <span class="strength-score">${item.score}점</span>
            </div>
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${item.score}%"></div>
            </div>
        </div>
    `).join('');

    const weaknessesList = document.getElementById('weaknessesList');
    weaknessesList.innerHTML = weaknessesData.map(item => `
        <div class="weakness-item">
            <div class="weakness-header">
                <span class="weakness-name">${item.name}</span>
                <span class="weakness-score">${item.score}점</span>
            </div>
            <div class="weakness-bar">
                <div class="weakness-fill" style="width: ${item.score}%"></div>
            </div>
        </div>
    `).join('');
}

// Load Goals
function loadGoals() {
    const container = document.getElementById('goalsContainer');
    container.innerHTML = goalsData.map(goal => `
        <div class="goal-card">
            <div class="goal-header">
                <h4>${goal.title}</h4>
                <span class="goal-progress-percent">${goal.progress}%</span>
            </div>
            <div class="goal-progress-bar">
                <div class="goal-progress-fill" style="width: ${goal.progress}%"></div>
            </div>
            <div class="goal-footer">
                <span class="goal-target">목표일: ${goal.target}</span>
                <button class="btn-sm btn-secondary" onclick="updateGoal(${goal.id})">
                    <i class="fas fa-edit"></i> 수정
                </button>
            </div>
        </div>
    `).join('');
}

// Create Radar Chart
function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['창의성', '공감능력', '논리력', '리더십', '소통능력', '자기관리'],
            datasets: [{
                label: '나의 능력',
                data: [95, 92, 70, 65, 75, 68],
                backgroundColor: 'rgba(44, 95, 79, 0.2)',
                borderColor: '#2c5f4f',
                borderWidth: 2,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 12 }
                    },
                    pointLabels: {
                        font: { size: 14, weight: '600' }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Create Progress Chart
function createProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['11월', '12월', '1월'],
            datasets: [
                {
                    label: '자존감',
                    data: [50, 58, 68],
                    borderColor: '#2c5f4f',
                    backgroundColor: 'rgba(44, 95, 79, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'EQ',
                    data: [75, 82, 90],
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '번아웃',
                    data: [65, 55, 45],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Actions
function viewTestDetail(id) {
    alert(`검사 ${id}의 상세 결과를 보는 중...`);
}

function updateGoal(id) {
    alert(`목표 ${id}를 수정합니다.`);
}

function addNewGoal() {
    alert('새 목표를 추가합니다!');
}

function exportData() {
    alert('데이터를 PDF로 내보내는 중...');
}

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
