// ===================================
// Mentora Admin Panel - Common JS
// 관리자 페이지 공통 기능
// ===================================

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.admin-sidebar');
    sidebar.classList.toggle('active');
}

// Logout
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        // TODO: 실제 로그아웃 로직 구현
        alert('로그아웃되었습니다.');
        window.location.href = '../index.html';
    }
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Format Date
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

// Format Time
function formatTime(date) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Format DateTime
function formatDateTime(date) {
    return `${formatDate(date)} ${formatTime(date)}`;
}

// Format Currency
function formatCurrency(amount) {
    return `₩${amount.toLocaleString('ko-KR')}`;
}

// Format Number
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + '백만';
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '만';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + '천';
    }
    return num.toString();
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Loading Spinner
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'globalLoading';
    loading.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 16px;
                text-align: center;
            ">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #2c5f4f;"></i>
                <p style="margin-top: 20px; color: #64748b; font-weight: 500;">처리 중...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('globalLoading');
    if (loading) {
        document.body.removeChild(loading);
    }
}

// Confirm Dialog
function confirmDialog(message, onConfirm, onCancel) {
    const dialog = document.createElement('div');
    dialog.className = 'modal active';
    dialog.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h2>확인</h2>
            </div>
            <div class="modal-body">
                <p style="font-size: 15px; color: #64748b; line-height: 1.6;">${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" onclick="this.closest('.modal').remove()">취소</button>
                <button class="btn-submit" id="confirmBtn">확인</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    document.getElementById('confirmBtn').addEventListener('click', () => {
        dialog.remove();
        if (onConfirm) onConfirm();
    });
    
    dialog.querySelector('.btn-cancel').addEventListener('click', () => {
        if (onCancel) onCancel();
    });
}

// Export Data
function exportData() {
    showToast('데이터 내보내기 기능은 준비 중입니다.', 'info');
}

// Generate Mock Data (for development)
function generateMockUsers(count = 50) {
    const users = [];
    const names = ['김민준', '이서윤', '박도윤', '최서준', '정지우', '강하준', '조수아', '윤지호', '장서연', '임유나'];
    const plans = ['free', 'premium', 'ai'];
    const statuses = ['active', 'inactive', 'suspended'];
    
    for (let i = 1; i <= count; i++) {
        users.push({
            id: `USER${String(i).padStart(4, '0')}`,
            name: names[Math.floor(Math.random() * names.length)],
            email: `user${i}@example.com`,
            plan: plans[Math.floor(Math.random() * plans.length)],
            joinDate: new Date(2024, 0, Math.floor(Math.random() * 365)),
            lastLogin: new Date(2024, 11, Math.floor(Math.random() * 30)),
            testsCompleted: Math.floor(Math.random() * 20),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }
    
    return users;
}

function generateMockTests() {
    return [
        {
            id: 'TEST001',
            name: 'MBTI 성격유형검사',
            category: 'personality',
            completed: Math.floor(Math.random() * 100000),
            avgTime: '10-15분',
            questions: '20문항',
            status: 'active',
            satisfaction: 4.8
        },
        {
            id: 'TEST002',
            name: '에니어그램',
            category: 'personality',
            completed: Math.floor(Math.random() * 80000),
            avgTime: '15-20분',
            questions: '27문항',
            status: 'active',
            satisfaction: 4.7
        },
        {
            id: 'TEST003',
            name: 'DISC 행동유형검사',
            category: 'personality',
            completed: Math.floor(Math.random() * 70000),
            avgTime: '10-15분',
            questions: '24문항',
            status: 'active',
            satisfaction: 4.6
        },
        {
            id: 'TEST004',
            name: 'Holland 직업적성검사',
            category: 'career',
            completed: Math.floor(Math.random() * 60000),
            avgTime: '15-20분',
            questions: '30문항',
            status: 'active',
            satisfaction: 4.5
        },
        {
            id: 'TEST005',
            name: '애착유형검사',
            category: 'relationship',
            completed: Math.floor(Math.random() * 90000),
            avgTime: '10-15분',
            questions: '18문항',
            status: 'active',
            satisfaction: 4.9
        }
    ];
}

function generateMockRefunds(count = 30) {
    const refunds = [];
    const statuses = ['pending', 'approved', 'rejected', 'completed'];
    const reasons = ['서비스 미사용', '기대와 다름', '중복 결제', '오류 발생'];
    const products = ['MBTI 검사', '에니어그램', 'DISC 검사', 'AI 상담 구독', '프리미엄 검사'];
    const users = ['김민준', '이서윤', '박도윤', '최서준', '정지우'];
    
    for (let i = 1; i <= count; i++) {
        const amount = [9900, 19900, 29900][Math.floor(Math.random() * 3)];
        refunds.push({
            id: `REFUND${String(i).padStart(4, '0')}`,
            orderId: `ORDER${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
            userName: users[Math.floor(Math.random() * users.length)],
            product: products[Math.floor(Math.random() * products.length)],
            amount: amount,
            refundAmount: amount,
            requestDate: new Date(2024, 11, Math.floor(Math.random() * 30)),
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }
    
    return refunds;
}

// Initialize tooltips (if using)
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 9999;
                pointer-events: none;
            `;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            e.target._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', (e) => {
            if (e.target._tooltip) {
                document.body.removeChild(e.target._tooltip);
                delete e.target._tooltip;
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    
    // Active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
});

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global use
window.AdminUtils = {
    toggleSidebar,
    logout,
    openModal,
    closeModal,
    formatDate,
    formatTime,
    formatDateTime,
    formatCurrency,
    formatNumber,
    showToast,
    showLoading,
    hideLoading,
    confirmDialog,
    exportData,
    generateMockUsers,
    generateMockTests,
    generateMockRefunds,
    debounce
};
