// ===================================
// Refunds Management Page JS
// 환불 관리 페이지
// ===================================

let allRefunds = [];
let filteredRefunds = [];
let currentPage = 1;
const refundsPerPage = 20;
let currentRefundId = null;

// Initialize Refunds Page
async function initRefundsPage() {
    await loadRefunds();
    updateRefundsStats();
    renderRefundsTable();
}

// Load Refunds
async function loadRefunds() {
    try {
        // RESTful Table API에서 실제 환불 데이터 가져오기
        const response = await fetch('/tables/refunds?limit=1000&sort=-request_date');
        const data = await response.json();
        
        if (data && data.data) {
            // 주문 정보도 함께 가져오기
            const ordersResponse = await fetch('/tables/orders?limit=1000');
            const ordersData = await ordersResponse.json();
            const ordersMap = {};
            if (ordersData && ordersData.data) {
                ordersData.data.forEach(order => {
                    ordersMap[order.id] = order;
                });
            }
            
            // 사용자 정보도 함께 가져오기
            const usersResponse = await fetch('/tables/users?limit=1000');
            const usersData = await usersResponse.json();
            const usersMap = {};
            if (usersData && usersData.data) {
                usersData.data.forEach(user => {
                    usersMap[user.id] = user;
                });
            }
            
            allRefunds = data.data.map(refund => {
                const order = ordersMap[refund.order_id] || {};
                const user = usersMap[refund.user_id] || {};
                
                return {
                    id: refund.id,
                    orderId: refund.order_id,
                    userName: user.name || '알 수 없음',
                    product: order.product_name || '상품명 없음',
                    amount: order.amount || 0,
                    refundAmount: order.amount || 0,
                    requestDate: refund.request_date || refund.created_at,
                    reason: refund.reason || '사유 없음',
                    status: refund.status || 'pending',
                    processedDate: refund.processed_date
                };
            });
            filteredRefunds = [...allRefunds];
            
            console.log('✅ 환불 데이터 로드 완료:', allRefunds.length, '건');
        }
    } catch (error) {
        console.error('❌ 환불 데이터 로드 실패:', error);
        
        // 에러 시 Mock 데이터 사용
        allRefunds = AdminUtils.generateMockRefunds(10);
        filteredRefunds = [...allRefunds];
    }
}

// Update Refunds Stats
function updateRefundsStats() {
    const pendingCount = allRefunds.filter(r => r.status === 'pending').length;
    const approvedCount = allRefunds.filter(r => r.status === 'approved').length;
    const rejectedCount = allRefunds.filter(r => r.status === 'rejected').length;
    
    // Calculate total refund amount for this month
    const thisMonth = new Date().getMonth();
    const totalAmount = allRefunds
        .filter(r => new Date(r.requestDate).getMonth() === thisMonth)
        .reduce((sum, r) => sum + r.refundAmount, 0);
    
    document.getElementById('pendingRefundsCount').textContent = pendingCount + '건';
    document.getElementById('approvedRefundsCount').textContent = approvedCount + '건';
    document.getElementById('rejectedRefundsCount').textContent = rejectedCount + '건';
    document.getElementById('totalRefundAmount').textContent = AdminUtils.formatCurrency(totalAmount);
}

// Render Refunds Table
function renderRefundsTable() {
    const tbody = document.getElementById('refundsTableBody');
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * refundsPerPage;
    const endIndex = startIndex + refundsPerPage;
    const pageRefunds = filteredRefunds.slice(startIndex, endIndex);
    
    if (pageRefunds.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 60px; color: #94a3b8;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                    검색 결과가 없습니다.
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pageRefunds.map(refund => `
        <tr>
            <td><strong>${refund.id}</strong></td>
            <td>${refund.orderId}</td>
            <td>${refund.userName}</td>
            <td>${refund.product}</td>
            <td>${AdminUtils.formatCurrency(refund.amount)}</td>
            <td><strong>${AdminUtils.formatCurrency(refund.refundAmount)}</strong></td>
            <td>${AdminUtils.formatDateTime(refund.requestDate)}</td>
            <td>
                <div style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${refund.reason}
                </div>
            </td>
            <td>
                <span class="status-badge ${refund.status}">
                    ${getStatusText(refund.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewRefundDetail('${refund.id}')" data-tooltip="상세보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${refund.status === 'pending' ? `
                        <button class="btn-icon" onclick="openApproveModal('${refund.id}')" data-tooltip="승인" style="color: #10b981;">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon danger" onclick="openRejectModal('${refund.id}')" data-tooltip="거부">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

function getStatusText(status) {
    const statusMap = {
        'pending': '처리 대기',
        'approved': '승인됨',
        'rejected': '거부됨',
        'completed': '완료'
    };
    return statusMap[status] || status;
}

// Search Refunds
const searchRefunds = AdminUtils.debounce(() => {
    const searchTerm = document.getElementById('refundSearch').value.toLowerCase();
    
    filteredRefunds = allRefunds.filter(refund => 
        refund.orderId.toLowerCase().includes(searchTerm) ||
        refund.userName.toLowerCase().includes(searchTerm) ||
        refund.id.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    renderRefundsTable();
}, 300);

// Filter Refunds
function filterRefunds() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = parseInt(document.getElementById('dateFilter').value);
    
    const now = new Date();
    const filterDate = new Date(now.getTime() - (dateFilter * 24 * 60 * 60 * 1000));
    
    filteredRefunds = allRefunds.filter(refund => {
        const statusMatch = !statusFilter || refund.status === statusFilter;
        const dateMatch = new Date(refund.requestDate) >= filterDate;
        return statusMatch && dateMatch;
    });
    
    currentPage = 1;
    renderRefundsTable();
}

// Reset Filters
function resetFilters() {
    document.getElementById('refundSearch').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('dateFilter').value = '30';
    
    filteredRefunds = [...allRefunds];
    currentPage = 1;
    renderRefundsTable();
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredRefunds.length / refundsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    
    if (!pageNumbers) return;
    
    let html = '';
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        html += `
            <button class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    pageNumbers.innerHTML = html;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderRefundsTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredRefunds.length / refundsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderRefundsTable();
    }
}

function goToPage(page) {
    currentPage = page;
    renderRefundsTable();
}

// View Refund Detail
function viewRefundDetail(refundId) {
    const refund = allRefunds.find(r => r.id === refundId);
    if (!refund) return;
    
    const modalBody = document.getElementById('refundDetailBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">환불 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>환불 ID:</strong> ${refund.id}</p>
                    <p style="margin-bottom: 12px;"><strong>주문번호:</strong> ${refund.orderId}</p>
                    <p style="margin-bottom: 12px;"><strong>신청일:</strong> ${AdminUtils.formatDateTime(refund.requestDate)}</p>
                    <p><strong>상태:</strong> 
                        <span class="status-badge ${refund.status}">
                            ${getStatusText(refund.status)}
                        </span>
                    </p>
                </div>
            </div>
            
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">결제 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>사용자:</strong> ${refund.userName}</p>
                    <p style="margin-bottom: 12px;"><strong>상품명:</strong> ${refund.product}</p>
                    <p style="margin-bottom: 12px;"><strong>결제금액:</strong> ${AdminUtils.formatCurrency(refund.amount)}</p>
                    <p><strong>환불금액:</strong> <span style="color: #ef4444; font-weight: 700;">${AdminUtils.formatCurrency(refund.refundAmount)}</span></p>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 24px;">
            <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">환불 사유</h3>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                <p style="color: #1e293b; line-height: 1.6;">${refund.reason}</p>
            </div>
        </div>
    `;
    
    const actionsDiv = document.getElementById('refundDetailActions');
    if (refund.status === 'pending') {
        actionsDiv.innerHTML = `
            <button class="btn-cancel" onclick="closeRefundDetailModal()">닫기</button>
            <button class="btn-submit danger" onclick="closeRefundDetailModal(); openRejectModal('${refund.id}')">거부</button>
            <button class="btn-submit success" onclick="closeRefundDetailModal(); openApproveModal('${refund.id}')">승인</button>
        `;
    } else {
        actionsDiv.innerHTML = `
            <button class="btn-submit" onclick="closeRefundDetailModal()">닫기</button>
        `;
    }
    
    AdminUtils.openModal('refundDetailModal');
}

function closeRefundDetailModal() {
    AdminUtils.closeModal('refundDetailModal');
}

// Approve Refund Modal
function openApproveModal(refundId) {
    const refund = allRefunds.find(r => r.id === refundId);
    if (!refund) return;
    
    currentRefundId = refundId;
    document.getElementById('approveRefundAmount').value = AdminUtils.formatCurrency(refund.refundAmount);
    document.getElementById('approveRefundMemo').value = '';
    
    AdminUtils.openModal('approveRefundModal');
}

function closeApproveModal() {
    AdminUtils.closeModal('approveRefundModal');
    currentRefundId = null;
}

function approveRefund(e) {
    e.preventDefault();
    
    if (!currentRefundId) return;
    
    const refundIndex = allRefunds.findIndex(r => r.id === currentRefundId);
    if (refundIndex === -1) return;
    
    AdminUtils.showLoading();
    
    // Simulate API call
    setTimeout(() => {
        allRefunds[refundIndex].status = 'approved';
        
        closeApproveModal();
        renderRefundsTable();
        updateRefundsStats();
        
        AdminUtils.hideLoading();
        AdminUtils.showToast('환불이 승인되었습니다.', 'success');
    }, 1000);
}

// Reject Refund Modal
function openRejectModal(refundId) {
    const refund = allRefunds.find(r => r.id === refundId);
    if (!refund) return;
    
    currentRefundId = refundId;
    document.getElementById('rejectReason').value = '';
    document.getElementById('rejectReasonDetail').value = '';
    
    AdminUtils.openModal('rejectRefundModal');
}

function closeRejectModal() {
    AdminUtils.closeModal('rejectRefundModal');
    currentRefundId = null;
}

function rejectRefund(e) {
    e.preventDefault();
    
    if (!currentRefundId) return;
    
    const reason = document.getElementById('rejectReason').value;
    const detail = document.getElementById('rejectReasonDetail').value;
    
    if (!reason || !detail) {
        AdminUtils.showToast('거부 사유를 입력해주세요.', 'error');
        return;
    }
    
    const refundIndex = allRefunds.findIndex(r => r.id === currentRefundId);
    if (refundIndex === -1) return;
    
    AdminUtils.showLoading();
    
    // Simulate API call
    setTimeout(() => {
        allRefunds[refundIndex].status = 'rejected';
        
        closeRejectModal();
        renderRefundsTable();
        updateRefundsStats();
        
        AdminUtils.hideLoading();
        AdminUtils.showToast('환불이 거부되었습니다.', 'warning');
    }, 1000);
}

// Export Refund Data
function exportRefundData() {
    AdminUtils.showToast('환불 데이터 내보내기 기능은 준비 중입니다.', 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initRefundsPage();
});
