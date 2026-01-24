// ================================
// 마이페이지 JavaScript (숫자 없음)
// ================================

// 샘플 데이터
const userData = {
    name: '김민지',
    email: 'minjikim@example.com',
    joinDate: '최근',
    testCount: '여러 개',
    premiumCount: '일부'
};

const testResults = [
    {
        id: 1,
        name: 'MBTI 성격검사',
        icon: 'fa-users',
        result: 'INFP',
        date: '최근',
        description: '중개자형 - 이상주의자이며 개방적이고 유연한 사고를 가진 성격'
    },
    {
        id: 2,
        name: '에니어그램',
        icon: 'fa-compass',
        result: '4번 예술가',
        date: '최근',
        description: '독창적이고 감성적인 성향, 자아 표현을 중시'
    },
    {
        id: 3,
        name: 'EQ 감성지능',
        icon: 'fa-brain',
        result: '우수',
        date: '최근',
        description: '감정을 잘 인식하고 관리하는 능력이 뛰어남'
    }
];

const orders = [
    {
        id: 'ORD001',
        productName: 'MBTI 프리미엄 리포트',
        date: '최근',
        price: '정상가',
        status: 'completed',
        statusText: '결제완료',
        canRefund: true,
        used: false
    },
    {
        id: 'ORD002',
        productName: 'AI 상담 월 구독',
        date: '최근',
        price: '월 구독',
        status: 'completed',
        statusText: '이용중',
        canRefund: true,
        used: true
    },
    {
        id: 'ORD003',
        productName: 'EQ 프리미엄 리포트',
        date: '이전',
        price: '정상가',
        status: 'completed',
        statusText: '완료',
        canRefund: false,
        used: true
    }
];

const refundHistory = [
    {
        id: 'REF001',
        orderId: 'ORD004',
        productName: 'Big Five 프리미엄',
        date: '이전',
        status: 'approved',
        statusText: '환불완료',
        reason: '서비스 미사용'
    },
    {
        id: 'REF002',
        orderId: 'ORD005',
        productName: 'DISC 프리미엄',
        date: '이전',
        status: 'pending',
        statusText: '검토중',
        reason: '중복 결제'
    }
];

// 현재 환불 신청 중인 주문 ID
let currentRefundOrderId = null;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadResults();
    loadOrders();
    loadRefunds();
    setupThemeToggle();
});

// 탭 전환
function switchTab(tabName) {
    // 탭 버튼 활성화
    document.querySelectorAll('.mypage-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // 콘텐츠 활성화
    document.querySelectorAll('.mypage-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-content`).classList.add('active');
}

// 사용자 프로필 로드
function loadUserProfile() {
    document.getElementById('profileAvatar').textContent = userData.name[0];
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('joinDate').textContent = userData.joinDate;
    document.getElementById('testCount').textContent = userData.testCount;
    document.getElementById('premiumCount').textContent = userData.premiumCount;

    // 설정 페이지에도 반영
    document.getElementById('settingName').value = userData.name;
    document.getElementById('settingEmail').value = userData.email;
}

// 검사 결과 로드
function loadResults() {
    const grid = document.getElementById('resultsGrid');
    
    if (testResults.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>아직 완료한 검사가 없습니다</h3>
                <p>첫 심리검사를 시작해보세요!</p>
                <button class="btn btn-primary" onclick="location.href='index.html#tests'">
                    검사 시작하기
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = testResults.map(test => `
        <div class="result-card">
            <div class="result-header">
                <div class="result-icon">
                    <i class="fas ${test.icon}"></i>
                </div>
                <div class="result-info">
                    <h3>${test.name}</h3>
                    <div class="result-date">${test.date}</div>
                </div>
            </div>
            <div class="result-score">${test.result}</div>
            <p class="result-description">${test.description}</p>
            <div class="result-actions">
                <button class="btn-result btn-view" onclick="viewResult(${test.id})">
                    <i class="fas fa-eye"></i> 결과 보기
                </button>
                <button class="btn-result btn-download" onclick="downloadResult(${test.id})">
                    <i class="fas fa-download"></i> PDF
                </button>
            </div>
        </div>
    `).join('');
}

// 구매 내역 로드
function loadOrders() {
    const container = document.getElementById('ordersContainer');
    
    // 로컬스토리지에서 가이드북 구매 내역 불러오기
    const guidebookPurchases = JSON.parse(localStorage.getItem('guidebook_purchases') || '[]');
    
    // 기존 주문 + 가이드북 주문 합치기
    const allOrders = [...orders];
    
    guidebookPurchases.forEach(purchase => {
        allOrders.push({
            id: purchase.orderId,
            productName: purchase.productName,
            date: new Date(purchase.paymentDate).toLocaleDateString('ko-KR'),
            price: `₩${purchase.amount.toLocaleString()}`,
            status: 'completed',
            statusText: '결제완료',
            canRefund: true,
            used: false,
            isGuidebook: true,
            downloadUrl: purchase.downloadUrl || '#'
        });
    });
    
    if (allOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <h3>구매 내역이 없습니다</h3>
                <p>프리미엄 서비스를 이용해보세요!</p>
                <button class="btn btn-primary" onclick="location.href='guides.html'" style="margin-top: 20px;">
                    <i class="fas fa-book"></i> 가이드북 보러가기
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = allOrders.map(order => `
        <div class="order-item ${order.isGuidebook ? 'guidebook-order' : ''}">
            <div class="order-header">
                <span class="order-number">주문번호: ${order.id}</span>
                <span class="order-status ${order.status === 'completed' ? 'completed' : 'pending'}">
                    ${order.isGuidebook ? '📘 가이드북' : ''} ${order.statusText}
                </span>
            </div>
            <div class="order-body">
                <div class="order-info">
                    <h3>${order.productName}</h3>
                    <p class="order-date">결제일: ${order.date}</p>
                </div>
                <div class="order-price">${order.price}</div>
            </div>
            <div class="order-actions">
                ${order.isGuidebook ? `
                    <button class="btn btn-primary" onclick="downloadGuidebook('${order.downloadUrl}', '${order.productName}')">
                        <i class="fas fa-download"></i> PDF 다운로드
                    </button>
                ` : `
                    <button class="btn btn-secondary" onclick="viewOrderDetail('${order.id}')">
                        <i class="fas fa-file-invoice"></i> 상세보기
                    </button>
                `}
                ${order.canRefund && !order.used ? `
                    <button class="btn btn-outline" onclick="openRefundModal('${order.id}')">
                        <i class="fas fa-undo"></i> 환불 신청
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// 가이드북 다운로드
function downloadGuidebook(url, productName) {
    if (url === '#') {
        alert(`${productName} PDF가 준비 중입니다.\n\n이메일로 다운로드 링크를 보내드렸습니다.\n받은편지함을 확인해주세요!`);
        return;
    }
    
    // 실제 다운로드
    window.open(url, '_blank');
    alert(`${productName} 다운로드를 시작합니다!`);
}

// 환불 관리 로드
function loadRefunds() {
    const refundList = document.getElementById('refundList');
    const refundHistoryContainer = document.getElementById('refundHistory');

    // 환불 가능한 항목
    const canRefundOrders = orders.filter(o => o.canRefund && !o.used);
    
    if (canRefundOrders.length === 0) {
        refundList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <h3>환불 가능한 주문이 없습니다</h3>
                <p>모든 서비스가 정상적으로 이용되었습니다.</p>
            </div>
        `;
    } else {
        refundList.innerHTML = canRefundOrders.map(order => `
            <div class="refund-item can-refund">
                <div class="refund-item-header">
                    <div>
                        <h4>${order.productName}</h4>
                        <p>주문번호: ${order.id} | 결제일: ${order.date}</p>
                    </div>
                    <span class="refund-badge success">환불 가능</span>
                </div>
                <p style="font-size: 14px; color: #666; margin: 10px 0;">
                    결제 금액: ${order.price}
                </p>
                <button class="btn btn-primary" onclick="openRefundModal('${order.id}')" style="margin-top: 10px;">
                    <i class="fas fa-hand-holding-usd"></i> 환불 신청하기
                </button>
            </div>
        `).join('');
    }

    // 환불 신청 내역
    if (refundHistory.length === 0) {
        refundHistoryContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>환불 신청 내역이 없습니다.</p>
            </div>
        `;
    } else {
        refundHistoryContainer.innerHTML = refundHistory.map(refund => `
            <div class="refund-history-item">
                <div class="refund-history-status ${refund.status}">
                    상태: ${refund.statusText}
                </div>
                <p><strong>${refund.productName}</strong></p>
                <p>주문번호: ${refund.orderId} | 신청일: ${refund.date}</p>
                <p>사유: ${refund.reason}</p>
            </div>
        `).join('');
    }
}

// 환불 모달 열기
function openRefundModal(orderId) {
    currentRefundOrderId = orderId;
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;

    const modal = document.getElementById('refundModal');
    const itemInfo = document.getElementById('refundItemInfo');

    itemInfo.innerHTML = `
        <h4>${order.productName}</h4>
        <p>주문번호: ${order.id}</p>
        <p>결제일: ${order.date}</p>
        <p>결제 금액: ${order.price}</p>
    `;

    modal.classList.add('active');
}

// 환불 모달 닫기
function closeRefundModal() {
    const modal = document.getElementById('refundModal');
    modal.classList.remove('active');
    currentRefundOrderId = null;

    // 폼 초기화
    document.getElementById('refundReason').value = '';
    document.getElementById('refundDetail').value = '';
    document.getElementById('refundBank').value = '';
    document.getElementById('refundAccount').value = '';
    document.getElementById('refundAccountHolder').value = '';
}

// 환불 신청 제출
function submitRefund() {
    const reason = document.getElementById('refundReason').value;
    const detail = document.getElementById('refundDetail').value;
    const bank = document.getElementById('refundBank').value;
    const account = document.getElementById('refundAccount').value;
    const holder = document.getElementById('refundAccountHolder').value;

    if (!reason || !detail) {
        alert('환불 사유를 모두 입력해주세요.');
        return;
    }

    if (!bank || !account || !holder) {
        alert('환불 계좌 정보를 모두 입력해주세요.');
        return;
    }

    // 실제 구현 시 API 호출
    console.log('환불 신청:', {
        orderId: currentRefundOrderId,
        reason,
        detail,
        bank,
        account,
        holder
    });

    alert(`환불 신청이 완료되었습니다!\n\n주문번호: ${currentRefundOrderId}\n검토까지 며칠이 소요될 수 있습니다.\n\n결과는 이메일로 안내드리겠습니다.`);

    closeRefundModal();
    
    // 환불 목록 새로고침
    loadRefunds();
}

// 검사 결과 보기
function viewResult(testId) {
    alert(`검사 ${testId} 결과를 보는 중...`);
    // 실제로는 결과 페이지로 이동
    // window.location.href = `result.html?test=${testId}`;
}

// 결과 다운로드
function downloadResult(testId) {
    alert(`검사 ${testId} PDF를 다운로드합니다...`);
    // 실제로는 PDF 다운로드 API 호출
}

// 주문 상세보기
function viewOrderDetail(orderId) {
    alert(`주문 ${orderId}의 상세 정보를 보는 중...`);
}

// 프로필 저장
function saveProfile() {
    const name = document.getElementById('settingName').value;
    const email = document.getElementById('settingEmail').value;
    const phone = document.getElementById('settingPhone').value;

    if (!name || !email) {
        alert('이름과 이메일은 필수입니다.');
        return;
    }

    console.log('프로필 저장:', { name, email, phone });
    alert('프로필이 저장되었습니다!');

    // 화면 업데이트
    userData.name = name;
    userData.email = email;
    loadUserProfile();
}

// 비밀번호 변경
function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPwd = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!current || !newPwd || !confirm) {
        alert('모든 항목을 입력해주세요.');
        return;
    }

    if (newPwd !== confirm) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
    }

    console.log('비밀번호 변경 요청');
    alert('비밀번호가 변경되었습니다!');

    // 폼 초기화
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// 알림 설정 저장
function saveNotificationSettings() {
    const email = document.getElementById('emailNotification').checked;
    const sms = document.getElementById('smsNotification').checked;
    const marketing = document.getElementById('marketingConsent').checked;

    console.log('알림 설정:', { email, sms, marketing });
    alert('알림 설정이 저장되었습니다!');
}

// 회원 탈퇴
function confirmDeleteAccount() {
    const confirmed = confirm('정말로 회원 탈퇴를 하시겠습니까?\n\n모든 데이터가 삭제되며 복구할 수 없습니다.');
    
    if (confirmed) {
        const doubleConfirm = prompt('탈퇴하려면 "탈퇴"를 입력하세요.');
        
        if (doubleConfirm === '탈퇴') {
            alert('회원 탈퇴가 완료되었습니다.\n그동안 Mentora를 이용해주셔서 감사합니다.');
            // 실제로는 로그아웃 및 메인 페이지로 이동
            // window.location.href = 'index.html';
        } else {
            alert('탈퇴가 취소되었습니다.');
        }
    }
}

// 테마 토글
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
