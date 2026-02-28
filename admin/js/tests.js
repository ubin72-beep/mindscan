// ===================================
// Tests Management Page JS
// 검사 관리 페이지
// ===================================

let allTests = [];
let testCompletionChart, satisfactionChart;
let currentTestId = null;

// Initialize Tests Page
async function initTestsPage() {
    await loadTests();
    await loadTestStats();
    await loadCharts();
    renderTestsGrid();
    loadRecentResults();
}

// Load Tests
async function loadTests() {
    try {
        // RESTful Table API에서 실제 검사 데이터 가져오기
        const response = await fetch('/tables/test_results?limit=10000');
        const data = await response.json();
        
        if (data && data.data) {
            // 검사별 통계 계산
            const testStats = {};
            
            data.data.forEach(result => {
                const testName = result.test_name;
                if (!testStats[testName]) {
                    testStats[testName] = {
                        name: testName,
                        completed: 0,
                        satisfaction: 4.5,
                        avgDuration: '15분'
                    };
                }
                testStats[testName].completed++;
            });
            
            allTests = Object.values(testStats);
            
            console.log('✅ 검사 데이터 로드 완료:', allTests);
        } else {
            // 데이터 없으면 기본값
            allTests = AdminUtils.generateMockTests();
        }
    } catch (error) {
        console.error('❌ 검사 데이터 로드 실패:', error);
        
        // 에러 시 Mock 데이터 사용
        allTests = AdminUtils.generateMockTests();
    }
}

// Load Test Stats
async function loadTestStats() {
    const totalCompleted = allTests.reduce((sum, test) => sum + test.completed, 0);
    const avgCompletion = '높음';
    const avgSatisfaction = (allTests.reduce((sum, test) => sum + test.satisfaction, 0) / allTests.length).toFixed(1) + '점';
    const avgDuration = '약 12분';
    
    document.getElementById('totalCompletedTests').textContent = AdminUtils.formatNumber(totalCompleted) + '건';
    document.getElementById('avgCompletionRate').textContent = avgCompletion;
    document.getElementById('avgSatisfaction').textContent = avgSatisfaction;
    document.getElementById('avgDuration').textContent = avgDuration;
}

// Load Charts
async function loadCharts() {
    initTestCompletionChart();
    initSatisfactionChart();
}

function initTestCompletionChart() {
    const ctx = document.getElementById('testCompletionChart');
    if (!ctx) return;
    
    const labels = allTests.map(test => test.name);
    const data = allTests.map(test => test.completed);
    
    testCompletionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '완료 수',
                data: data,
                backgroundColor: '#2c5f4f',
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
                            return AdminUtils.formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

function initSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;
    
    const labels = allTests.map(test => test.name);
    const data = allTests.map(test => test.satisfaction);
    
    satisfactionChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: '만족도',
                data: data,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#d4af37'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Update Chart
function updateTestCompletionChart(days) {
    // Re-generate data based on selected period
    if (testCompletionChart) {
        testCompletionChart.update();
    }
}

// Render Tests Grid
function renderTestsGrid() {
    const grid = document.getElementById('testsGrid');
    if (!grid) return;
    
    grid.innerHTML = allTests.map(test => `
        <div class="test-card" onclick="viewTestDetail('${test.id}')">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0;">
                    ${test.name}
                </h3>
                <span class="status-badge ${test.status}">
                    ${test.status === 'active' ? '활성' : test.status === 'inactive' ? '비활성' : '점검중'}
                </span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px;">
                <div>
                    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">완료 수</p>
                    <p style="font-size: 16px; font-weight: 700; color: #2c5f4f;">${AdminUtils.formatNumber(test.completed)}건</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">만족도</p>
                    <p style="font-size: 16px; font-weight: 700; color: #d4af37;">
                        <i class="fas fa-star"></i> ${test.satisfaction}
                    </p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">소요 시간</p>
                    <p style="font-size: 14px; font-weight: 600; color: #64748b;">${test.avgTime}</p>
                </div>
                <div>
                    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">문항 수</p>
                    <p style="font-size: 14px; font-weight: 600; color: #64748b;">${test.questions}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 8px;">
                <button class="btn-icon" onclick="event.stopPropagation(); openEditTestModal('${test.id}')" style="flex: 1; height: 36px;">
                    <i class="fas fa-edit"></i> 수정
                </button>
                <button class="btn-icon" onclick="event.stopPropagation(); deleteTest('${test.id}')" style="flex: 1; height: 36px;">
                    <i class="fas fa-trash"></i> 삭제
                </button>
            </div>
        </div>
    `).join('');
}

// Search Tests
const searchTests = AdminUtils.debounce(() => {
    const searchTerm = document.getElementById('testSearch').value.toLowerCase();
    const filtered = allTests.filter(test => 
        test.name.toLowerCase().includes(searchTerm)
    );
    
    const grid = document.getElementById('testsGrid');
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="loading-state">검색 결과가 없습니다.</div>';
    } else {
        allTests = filtered;
        renderTestsGrid();
    }
}, 300);

// Filter Tests
function filterTests() {
    const category = document.getElementById('categoryFilter').value;
    
    if (!category) {
        allTests = AdminUtils.generateMockTests();
    } else {
        allTests = AdminUtils.generateMockTests().filter(test => test.category === category);
    }
    
    renderTestsGrid();
}

// Load Recent Results
function loadRecentResults() {
    const tbody = document.getElementById('recentResultsBody');
    if (!tbody) return;
    
    // Mock recent results
    const results = [
        { user: '김민준', test: 'MBTI', result: 'INFP', time: '방금 전', duration: '12분', satisfaction: 5 },
        { user: '이서윤', test: '에니어그램', result: '4번 유형', time: '5분 전', duration: '18분', satisfaction: 5 },
        { user: '박도윤', test: 'DISC', result: 'S 유형', time: '12분 전', duration: '10분', satisfaction: 4 },
        { user: '최서준', test: 'Holland', result: '예술형', time: '25분 전', duration: '16분', satisfaction: 5 },
        { user: '정지우', test: '애착유형', result: '안정형', time: '35분 전', duration: '9분', satisfaction: 5 }
    ];
    
    tbody.innerHTML = results.map(result => `
        <tr>
            <td>${result.user}</td>
            <td>${result.test}</td>
            <td><strong>${result.result}</strong></td>
            <td>${result.time}</td>
            <td>${result.duration}</td>
            <td>
                <div style="color: #d4af37;">
                    ${'<i class="fas fa-star"></i>'.repeat(result.satisfaction)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - result.satisfaction)}
                </div>
            </td>
            <td>
                <button class="btn-icon" onclick="viewResultDetail()">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// View Test Detail
function viewTestDetail(testId) {
    const test = allTests.find(t => t.id === testId);
    if (!test) return;
    
    const modalBody = document.getElementById('testDetailBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">기본 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>검사 ID:</strong> ${test.id}</p>
                    <p style="margin-bottom: 12px;"><strong>검사명:</strong> ${test.name}</p>
                    <p style="margin-bottom: 12px;"><strong>카테고리:</strong> ${test.category}</p>
                    <p><strong>상태:</strong> 
                        <span class="status-badge ${test.status}">
                            ${test.status === 'active' ? '활성' : test.status === 'inactive' ? '비활성' : '점검중'}
                        </span>
                    </p>
                </div>
            </div>
            
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">통계 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>완료 수:</strong> ${AdminUtils.formatNumber(test.completed)}건</p>
                    <p style="margin-bottom: 12px;"><strong>소요 시간:</strong> ${test.avgTime}</p>
                    <p style="margin-bottom: 12px;"><strong>문항 수:</strong> ${test.questions}</p>
                    <p><strong>만족도:</strong> 
                        <span style="color: #d4af37; font-weight: 700;">
                            <i class="fas fa-star"></i> ${test.satisfaction}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    AdminUtils.openModal('testDetailModal');
}

function closeTestDetailModal() {
    AdminUtils.closeModal('testDetailModal');
}

// Test Modal Functions
function openAddTestModal() {
    currentTestId = null;
    document.getElementById('editTestModalTitle').textContent = '검사 추가';
    document.getElementById('editTestForm').reset();
    AdminUtils.openModal('editTestModal');
}

function openEditTestModal(testId) {
    const test = allTests.find(t => t.id === testId);
    if (!test) return;
    
    currentTestId = testId;
    document.getElementById('editTestModalTitle').textContent = '검사 수정';
    document.getElementById('editTestName').value = test.name;
    document.getElementById('editTestCategory').value = test.category;
    document.getElementById('editTestDuration').value = test.avgTime;
    document.getElementById('editTestQuestions').value = test.questions;
    document.getElementById('editTestStatus').value = test.status;
    
    AdminUtils.openModal('editTestModal');
}

function closeEditTestModal() {
    AdminUtils.closeModal('editTestModal');
    currentTestId = null;
}

function saveTest(e) {
    e.preventDefault();
    
    const name = document.getElementById('editTestName').value;
    
    if (currentTestId) {
        // Update existing test
        const testIndex = allTests.findIndex(t => t.id === currentTestId);
        if (testIndex !== -1) {
            allTests[testIndex].name = name;
            // Update other fields...
        }
        AdminUtils.showToast('검사가 수정되었습니다.', 'success');
    } else {
        // Add new test
        AdminUtils.showToast('검사가 추가되었습니다.', 'success');
    }
    
    closeEditTestModal();
    renderTestsGrid();
}

// Delete Test
function deleteTest(testId) {
    AdminUtils.confirmDialog(
        '정말 이 검사를 삭제하시겠습니까?',
        () => {
            const testIndex = allTests.findIndex(t => t.id === testId);
            if (testIndex !== -1) {
                allTests.splice(testIndex, 1);
                renderTestsGrid();
                AdminUtils.showToast('검사가 삭제되었습니다.', 'success');
            }
        }
    );
}

// View Result Detail
function viewResultDetail() {
    AdminUtils.showToast('결과 상세보기 기능은 준비 중입니다.', 'info');
}

// Export Data
function exportSatisfactionData() {
    AdminUtils.showToast('데이터 내보내기 기능은 준비 중입니다.', 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTestsPage();
});
