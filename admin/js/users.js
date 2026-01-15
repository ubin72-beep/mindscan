// ===================================
// Users Management Page JS
// 사용자 관리 페이지
// ===================================

let allUsers = [];
let filteredUsers = [];
let currentPage = 1;
const usersPerPage = 20;
let currentUserId = null;

// Initialize Users Page
async function initUsersPage() {
    await loadUsers();
    updateUsersStats();
    renderUsersTable();
}

// Load Users
async function loadUsers() {
    // Mock data - 실제로는 API에서 데이터를 가져옴
    allUsers = AdminUtils.generateMockUsers(150);
    filteredUsers = [...allUsers];
}

// Update Users Stats
function updateUsersStats() {
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(u => u.status === 'active').length;
    const premiumUsers = allUsers.filter(u => u.plan !== 'free').length;
    
    // Get new users this month
    const thisMonth = new Date().getMonth();
    const newUsers = allUsers.filter(u => new Date(u.joinDate).getMonth() === thisMonth).length;
    
    document.getElementById('totalUsersCount').textContent = AdminUtils.formatNumber(totalUsers) + '명';
    document.getElementById('activeUsersCount').textContent = AdminUtils.formatNumber(activeUsers) + '명';
    document.getElementById('premiumUsersCount').textContent = AdminUtils.formatNumber(premiumUsers) + '명';
    document.getElementById('newUsersCount').textContent = AdminUtils.formatNumber(newUsers) + '명';
}

// Render Users Table
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const pageUsers = filteredUsers.slice(startIndex, endIndex);
    
    if (pageUsers.length === 0) {
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
    
    tbody.innerHTML = pageUsers.map(user => `
        <tr>
            <td><input type="checkbox" data-user-id="${user.id}"></td>
            <td><strong>${user.id}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <span class="status-badge ${user.plan}">
                    ${user.plan === 'free' ? '무료' : user.plan === 'premium' ? '프리미엄' : 'AI 상담'}
                </span>
            </td>
            <td>${AdminUtils.formatDate(user.joinDate)}</td>
            <td>${AdminUtils.formatDateTime(user.lastLogin)}</td>
            <td>${user.testsCompleted}건</td>
            <td>
                <span class="status-badge ${user.status}">
                    ${user.status === 'active' ? '활성' : user.status === 'inactive' ? '비활성' : '정지'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewUserDetail('${user.id}')" data-tooltip="상세보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="openEditUserModal('${user.id}')" data-tooltip="수정">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon danger" onclick="deleteUser('${user.id}')" data-tooltip="삭제">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

// Search Users
const searchUsers = AdminUtils.debounce(() => {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    
    filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    renderUsersTable();
}, 300);

// Filter Users
function filterUsers() {
    const statusFilter = document.getElementById('statusFilter').value;
    const planFilter = document.getElementById('planFilter').value;
    
    filteredUsers = allUsers.filter(user => {
        const statusMatch = !statusFilter || user.status === statusFilter;
        const planMatch = !planFilter || user.plan === planFilter;
        return statusMatch && planMatch;
    });
    
    currentPage = 1;
    renderUsersTable();
}

// Reset Filters
function resetFilters() {
    document.getElementById('userSearch').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('planFilter').value = '';
    
    filteredUsers = [...allUsers];
    currentPage = 1;
    renderUsersTable();
}

// Toggle Select All
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('input[data-user-id]');
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
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
        renderUsersTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderUsersTable();
    }
}

function goToPage(page) {
    currentPage = page;
    renderUsersTable();
}

// View User Detail
function viewUserDetail(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    const modalBody = document.getElementById('userDetailBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">기본 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>사용자 ID:</strong> ${user.id}</p>
                    <p style="margin-bottom: 12px;"><strong>이름:</strong> ${user.name}</p>
                    <p style="margin-bottom: 12px;"><strong>이메일:</strong> ${user.email}</p>
                    <p><strong>플랜:</strong> 
                        <span class="status-badge ${user.plan}">
                            ${user.plan === 'free' ? '무료' : user.plan === 'premium' ? '프리미엄' : 'AI 상담'}
                        </span>
                    </p>
                </div>
            </div>
            
            <div>
                <h3 style="font-size: 14px; color: #64748b; margin-bottom: 8px;">활동 정보</h3>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                    <p style="margin-bottom: 12px;"><strong>가입일:</strong> ${AdminUtils.formatDateTime(user.joinDate)}</p>
                    <p style="margin-bottom: 12px;"><strong>마지막 접속:</strong> ${AdminUtils.formatDateTime(user.lastLogin)}</p>
                    <p style="margin-bottom: 12px;"><strong>검사 완료:</strong> ${user.testsCompleted}건</p>
                    <p><strong>상태:</strong> 
                        <span class="status-badge ${user.status}">
                            ${user.status === 'active' ? '활성' : user.status === 'inactive' ? '비활성' : '정지'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    `;
    
    AdminUtils.openModal('userDetailModal');
}

function closeUserDetailModal() {
    AdminUtils.closeModal('userDetailModal');
}

// Edit User Modal
function openAddUserModal() {
    AdminUtils.showToast('사용자 추가 기능은 준비 중입니다.', 'info');
}

function openEditUserModal(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;
    
    currentUserId = userId;
    
    document.getElementById('editUserName').value = user.name;
    document.getElementById('editUserEmail').value = user.email;
    document.getElementById('editUserPlan').value = user.plan;
    document.getElementById('editUserStatus').value = user.status;
    
    AdminUtils.openModal('editUserModal');
}

function closeEditUserModal() {
    AdminUtils.closeModal('editUserModal');
    currentUserId = null;
}

// Update User
function updateUser(e) {
    e.preventDefault();
    
    if (!currentUserId) return;
    
    const userIndex = allUsers.findIndex(u => u.id === currentUserId);
    if (userIndex === -1) return;
    
    allUsers[userIndex].name = document.getElementById('editUserName').value;
    allUsers[userIndex].email = document.getElementById('editUserEmail').value;
    allUsers[userIndex].plan = document.getElementById('editUserPlan').value;
    allUsers[userIndex].status = document.getElementById('editUserStatus').value;
    
    closeEditUserModal();
    renderUsersTable();
    
    AdminUtils.showToast('사용자 정보가 업데이트되었습니다.', 'success');
}

// Delete User
function deleteUser(userId) {
    AdminUtils.confirmDialog(
        '정말 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        () => {
            const userIndex = allUsers.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                allUsers.splice(userIndex, 1);
                filteredUsers = [...allUsers];
                renderUsersTable();
                updateUsersStats();
                AdminUtils.showToast('사용자가 삭제되었습니다.', 'success');
            }
        }
    );
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initUsersPage();
});
