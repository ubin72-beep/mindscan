// ================================
// 커뮤니티 JavaScript
// ================================

// Sample Data
const groupsData = [
    {
        id: 1,
        name: 'INFP 감성파 모임',
        category: 'mbti',
        icon: 'fa-heart',
        members: 2480,
        description: 'INFP 성향을 가진 분들이 모여 일상과 고민을 나누는 따뜻한 공간입니다.',
        activity: '오늘 23개 게시글'
    },
    {
        id: 2,
        name: 'ENTJ 리더십 포럼',
        category: 'mbti',
        icon: 'fa-crown',
        members: 1850,
        description: '목표 지향적인 ENTJ들이 모여 리더십과 성장을 논의합니다.',
        activity: '오늘 18개 게시글'
    },
    {
        id: 3,
        name: '에니어그램 4번 아티스트',
        category: 'enneagram',
        icon: 'fa-palette',
        members: 1620,
        description: '독창적이고 감성적인 4번 유형들의 창작 활동 공유 공간.',
        activity: '오늘 15개 게시글'
    },
    {
        id: 4,
        name: '에니어그램 8번 도전자',
        category: 'enneagram',
        icon: 'fa-fire',
        members: 1380,
        description: '강인하고 자신감 넘치는 8번 유형들의 도전과 성장 이야기.',
        activity: '오늘 12개 게시글'
    },
    {
        id: 5,
        name: '직장인 번아웃 극복',
        category: 'topic',
        icon: 'fa-battery-half',
        members: 3200,
        description: '직장생활의 스트레스와 번아웃을 함께 극복하는 커뮤니티.',
        activity: '오늘 35개 게시글'
    },
    {
        id: 6,
        name: '자존감 회복 프로젝트',
        category: 'topic',
        icon: 'fa-smile',
        members: 2850,
        description: '낮은 자존감을 회복하고 자신을 사랑하는 법을 배우는 공간.',
        activity: '오늘 28개 게시글'
    },
    {
        id: 7,
        name: '20대 고민 상담소',
        category: 'topic',
        icon: 'fa-comments',
        members: 4100,
        description: '20대의 진로, 관계, 미래에 대한 고민을 나누는 커뮤니티.',
        activity: '오늘 42개 게시글'
    },
    {
        id: 8,
        name: 'INTJ 전략가 모임',
        category: 'mbti',
        icon: 'fa-chess',
        members: 1950,
        description: '논리적이고 전략적인 INTJ들의 지적 토론 공간.',
        activity: '오늘 16개 게시글'
    }
];

const postsData = [
    {
        id: 1,
        author: '김민지',
        avatar: 'K',
        group: 'INFP 감성파 모임',
        title: 'INFP로서 직장생활이 너무 힘들어요 ㅠㅠ',
        content: '완벽주의 성향 때문에 작은 실수도 너무 오래 끌고 가게 되고, 팀워크보다 혼자 일하는 게 편한데 회사는 협업을 강요하네요...',
        likes: 48,
        comments: 23,
        time: '2시간 전'
    },
    {
        id: 2,
        author: '이준혁',
        avatar: 'L',
        group: '직장인 번아웃 극복',
        title: '번아웃 극복 후기 공유합니다!',
        content: '3개월 전 심각한 번아웃으로 휴직했었는데, 심리 검사와 상담을 통해 많이 회복했어요. 제가 실천한 방법들을 공유합니다.',
        likes: 127,
        comments: 56,
        time: '5시간 전'
    },
    {
        id: 3,
        author: '박서연',
        avatar: 'P',
        group: '자존감 회복 프로젝트',
        title: '매일 아침 자기긍정 문구 적기 챌린지 30일 완료!',
        content: '한 달 동안 매일 아침 거울 보며 긍정 문구를 말하고 노트에 적었더니 정말 자존감이 올라간 것 같아요. 다들 함께 해봐요!',
        likes: 85,
        comments: 34,
        time: '8시간 전'
    },
    {
        id: 4,
        author: '최지우',
        avatar: 'C',
        group: '20대 고민 상담소',
        title: '27살, 아직도 내가 뭘 좋아하는지 모르겠어요',
        content: '친구들은 다 자기 길을 찾아가는데 저만 여전히 방황 중... 적성검사도 해봤는데 여전히 확신이 안 서요.',
        likes: 62,
        comments: 41,
        time: '12시간 전'
    },
    {
        id: 5,
        author: '정민수',
        avatar: 'J',
        group: 'ENTJ 리더십 포럼',
        title: '팀원들과의 소통 방법 조언 구합니다',
        content: 'ENTJ 특성상 직설적으로 말하는 편인데, 팀원들이 상처받는 것 같아요. 효율적이면서도 따뜻한 소통 방법이 있을까요?',
        likes: 73,
        comments: 38,
        time: '1일 전'
    }
];

const mentorsData = [
    {
        id: 1,
        name: '김영희',
        avatar: 'K',
        title: '심리상담사 · 10년 경력',
        bio: '우울증, 불안장애 전문. 따뜻하고 공감적인 상담으로 500명 이상 회복 지원.',
        tags: ['우울증', '불안', '자존감']
    },
    {
        id: 2,
        name: '이철수',
        avatar: 'L',
        title: '커리어 코치 · 8년 경력',
        bio: '진로 탐색, 이직 준비 전문. 300명 이상의 커리어 전환 성공 지원.',
        tags: ['진로', '이직', '적성']
    },
    {
        id: 3,
        name: '박지은',
        avatar: 'P',
        title: 'MBTI 전문가 · 7년 경력',
        bio: 'MBTI 16가지 유형 깊이 분석. 성격 이해와 관계 개선 멘토링.',
        tags: ['MBTI', '성격분석', '관계']
    },
    {
        id: 4,
        name: '최민준',
        avatar: 'C',
        title: '리더십 코치 · 12년 경력',
        bio: '기업 임원 및 팀장급 리더십 코칭. 조직문화 개선 컨설팅.',
        tags: ['리더십', '팀빌딩', '조직문화']
    }
];

const workshopsData = [
    {
        id: 1,
        title: '자존감 회복 워크샵',
        badge: '모집 중',
        description: '낮은 자존감의 원인을 찾고 실질적인 회복 방법을 배우는 2주 과정.',
        date: '2026년 2월 15일 (토)',
        time: '오후 2시 - 6시',
        location: '서울 강남구 (오프라인)',
        icon: 'fa-smile'
    },
    {
        id: 2,
        title: 'MBTI 깊이 이해하기',
        badge: '마감 임박',
        description: '단순한 유형 분류를 넘어 MBTI의 심리학적 배경과 실생활 활용법.',
        date: '2026년 2월 20일 (목)',
        time: '오후 7시 - 9시',
        location: '온라인 ZOOM',
        icon: 'fa-brain'
    },
    {
        id: 3,
        title: '번아웃 예방과 회복',
        badge: '모집 중',
        description: '직장인 번아웃 자가진단부터 체계적인 회복 전략까지.',
        date: '2026년 2월 25일 (화)',
        time: '오후 7시 - 9시',
        location: '온라인 ZOOM',
        icon: 'fa-battery-full'
    },
    {
        id: 4,
        title: '감정 조절 마스터',
        badge: '모집 중',
        description: 'EQ를 높이고 감정을 건강하게 표현하고 조절하는 방법.',
        date: '2026년 3월 5일 (수)',
        time: '오후 7시 - 9시',
        location: '온라인 ZOOM',
        icon: 'fa-heart-pulse'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadGroups('all');
    loadPosts(1);
    loadMentors();
    loadWorkshops();
    setupThemeToggle();
});

// Load Groups
function loadGroups(filter) {
    const grid = document.getElementById('groupsGrid');
    const filteredGroups = filter === 'all' 
        ? groupsData 
        : groupsData.filter(g => g.category === filter);

    grid.innerHTML = filteredGroups.map(group => `
        <div class="group-card" onclick="viewGroup(${group.id})">
            <div class="group-header">
                <div class="group-icon">
                    <i class="fas ${group.icon}"></i>
                </div>
                <div class="group-info">
                    <h3>${group.name}</h3>
                    <div class="members">${group.members.toLocaleString()}명 참여</div>
                </div>
            </div>
            <p class="group-description">${group.description}</p>
            <div class="group-footer">
                <div class="group-activity">${group.activity}</div>
                <button class="btn-join-group" onclick="joinGroup(event, ${group.id})">가입하기</button>
            </div>
        </div>
    `).join('');
}

// Filter Groups
document.querySelectorAll('.groups-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.groups-filter .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadGroups(btn.dataset.filter);
    });
});

// Load Posts
function loadPosts(page) {
    const container = document.getElementById('postsContainer');
    container.innerHTML = postsData.map(post => `
        <div class="post-card" onclick="viewPost(${post.id})">
            <div class="post-header">
                <div class="post-avatar">${post.avatar}</div>
                <div class="post-user">
                    <h4>${post.author}</h4>
                    <div class="post-meta">${post.group} • ${post.time}</div>
                </div>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <div class="post-footer">
                <span><i class="far fa-heart"></i> ${post.likes}</span>
                <span><i class="far fa-comment"></i> ${post.comments}</span>
            </div>
        </div>
    `).join('');

    // Pagination
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>다음 <i class="fas fa-chevron-right"></i></button>
    `;
}

// Load Mentors
function loadMentors() {
    const grid = document.getElementById('mentoringGrid');
    grid.innerHTML = mentorsData.map(mentor => `
        <div class="mentor-card">
            <div class="mentor-avatar">${mentor.avatar}</div>
            <h3 class="mentor-name">${mentor.name}</h3>
            <p class="mentor-title">${mentor.title}</p>
            <p class="mentor-bio">${mentor.bio}</p>
            <div class="mentor-tags">
                ${mentor.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="btn-request-mentoring" onclick="requestMentoring(${mentor.id})">
                멘토링 신청
            </button>
        </div>
    `).join('');
}

// Load Workshops
function loadWorkshops() {
    const grid = document.getElementById('workshopsGrid');
    grid.innerHTML = workshopsData.map(workshop => `
        <div class="workshop-card">
            <div class="workshop-image">
                <i class="fas ${workshop.icon}"></i>
            </div>
            <div class="workshop-body">
                <span class="workshop-badge">${workshop.badge}</span>
                <h3 class="workshop-title">${workshop.title}</h3>
                <p class="workshop-description">${workshop.description}</p>
                <div class="workshop-info">
                    <span><i class="far fa-calendar"></i> ${workshop.date}</span>
                    <span><i class="far fa-clock"></i> ${workshop.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${workshop.location}</span>
                </div>
                <button class="btn-register-workshop" onclick="registerWorkshop(${workshop.id})">
                    신청하기
                </button>
            </div>
        </div>
    `).join('');
}

// Actions
function viewGroup(id) {
    alert(`그룹 ${id}를 보는 중...`);
}

function joinGroup(event, id) {
    event.stopPropagation();
    alert(`그룹 ${id}에 가입했습니다! 🎉`);
}

function viewPost(id) {
    alert(`게시글 ${id}를 보는 중...`);
}

function requestMentoring(id) {
    alert(`멘토 ${id}에게 멘토링을 신청했습니다! ✅`);
}

function registerWorkshop(id) {
    alert(`워크샵 ${id}에 신청했습니다! 🎓`);
}

function joinCommunity() {
    alert('커뮤니티 가입 페이지로 이동합니다! 🎉');
}

// Modal
function openCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    const select = document.getElementById('postGroup');
    
    // Populate groups
    select.innerHTML = '<option value="">그룹을 선택하세요</option>' +
        groupsData.map(g => `<option value="${g.id}">${g.name}</option>`).join('');
    
    modal.classList.add('active');
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    modal.classList.remove('active');
    
    // Clear form
    document.getElementById('postGroup').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
}

function createPost() {
    const group = document.getElementById('postGroup').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    if (!group || !title || !content) {
        alert('모든 항목을 입력해주세요!');
        return;
    }
    
    alert('게시글이 등록되었습니다! 🎉');
    closeCreatePostModal();
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
