// AI 코칭 챗봇 JavaScript

// 챗봇 상태
let chatHistory = [];
let isTyping = false;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 초기 메시지 로드
    loadInitialMessages();
    
    // Enter 키 이벤트
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // FAQ 아코디언
    initializeFAQ();
});

// 초기 메시지 로드
function loadInitialMessages() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        chatHistory.forEach(msg => {
            displayMessage(msg.text, msg.isUser, false);
        });
    }
}

// 챗봇 데모 열기
function openChatDemo() {
    document.getElementById('chatbotDemo').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
    
    setTimeout(() => {
        document.getElementById('chatInput').focus();
    }, 800);
}

// 메시지 전송
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '' || isTyping) return;
    
    // 사용자 메시지 표시
    displayMessage(message, true);
    
    // 입력창 초기화
    input.value = '';
    
    // 채팅 히스토리에 저장
    chatHistory.push({
        text: message,
        isUser: true,
        timestamp: new Date().toISOString()
    });
    saveChatHistory();
    
    // 빠른 답변 숨기기
    hideQuickReplies();
    
    // AI 응답 생성
    setTimeout(() => {
        generateAIResponse(message);
    }, 1000);
}

// 빠른 답변 전송
function sendQuickReply(message) {
    const input = document.getElementById('chatInput');
    input.value = message;
    sendMessage();
}

// 빠른 답변 숨기기
function hideQuickReplies() {
    const quickReplies = document.getElementById('quickReplies');
    if (quickReplies) {
        quickReplies.style.display = 'none';
    }
}

// 메시지 표시
function displayMessage(text, isUser, animate = true) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    if (animate) {
        messageDiv.style.opacity = '0';
    }
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textP = document.createElement('p');
    textP.textContent = text;
    contentDiv.appendChild(textP);
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = '방금 전';
    contentDiv.appendChild(timeSpan);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    
    // 애니메이션
    if (animate) {
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 100);
    }
    
    // 스크롤 하단으로
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// AI 응답 생성
function generateAIResponse(userMessage) {
    isTyping = true;
    
    // 타이핑 표시
    showTypingIndicator();
    
    // 키워드 기반 응답 생성
    let response = getResponseByKeyword(userMessage);
    
    setTimeout(() => {
        hideTypingIndicator();
        displayMessage(response, false);
        
        // 채팅 히스토리에 저장
        chatHistory.push({
            text: response,
            isUser: false,
            timestamp: new Date().toISOString()
        });
        saveChatHistory();
        
        isTyping = false;
    }, 1500);
}

// 키워드 기반 응답
function getResponseByKeyword(message) {
    const lowerMessage = message.toLowerCase();
    
    // 진로 관련
    if (lowerMessage.includes('진로') || lowerMessage.includes('직업') || lowerMessage.includes('취업')) {
        return '진로 고민을 하고 계시는군요. 😊\n\n먼저 자신의 강점과 관심사를 파악하는 것이 중요합니다. Mentora의 Holland 적성검사나 MBTI 검사를 통해 자신에게 맞는 직업군을 찾아보시는 건 어떨까요?\n\n구체적으로 어떤 부분이 가장 고민되시나요?';
    }
    
    // 대인관계 관련
    if (lowerMessage.includes('관계') || lowerMessage.includes('친구') || lowerMessage.includes('소통')) {
        return '대인관계는 많은 분들이 어려워하시는 부분이에요. 😌\n\n좋은 관계를 만들기 위해서는:\n1. 적극적 경청하기\n2. 공감적 태도 보이기\n3. 명확한 의사소통\n4. 적절한 경계 설정\n\n이 중에서 특히 어떤 부분이 어려우신가요?';
    }
    
    // 감정 관련
    if (lowerMessage.includes('우울') || lowerMessage.includes('불안') || lowerMessage.includes('스트레스')) {
        return '힘든 감정을 겪고 계시는군요. 그 마음을 표현해주셔서 감사합니다. 💙\n\n감정을 건강하게 다루는 방법:\n1. 감정을 인정하고 받아들이기\n2. 규칙적인 운동과 수면\n3. 신뢰할 수 있는 사람과 대화\n4. 전문가 상담 고려\n\n증상이 심하거나 지속된다면 전문 상담을 받으시는 것을 권장드립니다.';
    }
    
    // 자존감 관련
    if (lowerMessage.includes('자존감') || lowerMessage.includes('자신감') || lowerMessage.includes('자기계발')) {
        return '자기 성장을 위해 노력하시는 모습이 멋지네요! ⭐\n\n자존감 향상을 위한 실천 방법:\n1. 작은 성공 경험 쌓기\n2. 자기 긍정 메시지 반복\n3. 강점 발견하고 활용하기\n4. 자기 돌봄 실천하기\n\nMentora의 자존감검사로 현재 상태를 확인해보시는 것도 좋을 것 같아요!';
    }
    
    // 결정/선택 관련
    if (lowerMessage.includes('선택') || lowerMessage.includes('결정') || lowerMessage.includes('고민')) {
        return '중요한 선택 앞에서 고민이 많으시군요. 🤔\n\n의사결정을 도울 수 있는 방법:\n1. 장단점 리스트 작성\n2. 가치관 우선순위 확인\n3. 10-10-10 규칙 (10분, 10개월, 10년 후 영향)\n4. 신뢰하는 사람과 상의\n\n어떤 부분에서 결정을 내리기 어려우신가요?';
    }
    
    // 기본 응답
    return '말씀해주신 내용을 잘 들었습니다. 😊\n\n더 구체적으로 도와드리기 위해 조금 더 자세히 말씀해주실 수 있을까요?\n\n또는 Mentora의 심리검사를 통해 자신을 더 깊이 이해하는 것도 도움이 될 것 같습니다!';
}

// 타이핑 표시
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<p>입력중<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>';
    
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 타이핑 표시 제거
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// 채팅 히스토리 저장
function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// 채팅 히스토리 삭제
function clearChatHistory() {
    if (confirm('대화 기록을 모두 삭제하시겠습니까?')) {
        chatHistory = [];
        localStorage.removeItem('chatHistory');
        
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = '';
        
        // 초기 메시지 다시 표시
        displayMessage('안녕하세요! 😊 Mentora AI 코치입니다.\n\n무엇을 도와드릴까요? 편하게 말씀해주세요.', false);
        
        // 빠른 답변 다시 표시
        document.getElementById('quickReplies').style.display = 'flex';
    }
}

// FAQ 아코디언
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 모든 FAQ 닫기
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // 클릭한 항목만 열기 (이미 열려있었다면 닫기)
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// FAQ 토글 (HTML에서 직접 호출용)
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// 무료 체험 시작
function startFreeTrial() {
    alert('무료 체험을 시작합니다!\n\n지금 바로 AI 코치와 대화해보세요.');
    openChatDemo();
}

// 프리미엄 구독
function subscribe(plan) {
    if (confirm('프리미엄 구독을 시작하시겠습니까?\n\n월 29,900원 / 무제한 대화')) {
        alert('결제 페이지로 이동합니다.');
        // window.location.href = `payment/checkout.html?plan=${plan}`;
    }
}

// 기업 문의
function contactEnterprise() {
    alert('기업/단체 문의\n\n전화: 0502-1909-7788\n이메일: enterprise@mentora.co.kr\n\n담당자가 연락드리겠습니다.');
}

// Enter 키 핸들러
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendMessage,
        sendQuickReply,
        generateAIResponse,
        clearChatHistory,
        toggleFAQ,
        subscribe,
        startFreeTrial,
        contactEnterprise
    };
}
