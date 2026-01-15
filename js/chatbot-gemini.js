// Mentora AI 코칭 챗봇 - Gemini API 연동
// 2026-01-16

// 챗봇 상태
let chatHistory = [];
let conversationHistory = []; // Gemini 대화 히스토리
let isTyping = false;

// ⚠️ Gemini API 키 (보안을 위해 환경 변수나 서버에서 관리하세요)
// 실제 배포 시에는 서버 측에서 API 호출을 처리해야 합니다
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // 여기에 실제 API 키 입력
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// 시스템 프롬프트 - Mentora AI 코치 페르소나
const SYSTEM_PROMPT = `당신은 Mentora의 전문 AI 심리 코치입니다.

역할:
- 따뜻하고 공감적인 태도로 사용자의 고민을 경청합니다
- 심리학적 지식을 바탕으로 실용적인 조언을 제공합니다
- 사용자의 성장과 자기이해를 돕는 것이 목표입니다

중요 규칙:
1. 친절하고 존중하는 말투를 사용하세요 (반말 사용, 편안한 톤)
2. 의료 진단은 절대 하지 마세요
3. 심각한 증상(우울, 자살 충동 등)이 보이면 전문가 상담을 권하세요
4. 구체적이고 실천 가능한 조언을 제공하세요
5. 사용자의 감정을 먼저 공감하고 인정해주세요

응답 스타일:
- 2-3문장으로 간결하게
- 이모지 적절히 사용 (😊 💪 🌟 등)
- 질문으로 대화를 이어가세요`;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 초기 메시지 로드
    loadInitialMessages();
    
    // Enter 키 이벤트
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // FAQ 아코디언
    initializeFAQ();
    
    // API 키 확인
    checkAPIKey();
});

// API 키 확인
function checkAPIKey() {
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn('⚠️ Gemini API 키가 설정되지 않았습니다. chatbot-gemini.js 파일에서 API 키를 입력하세요.');
        console.warn('API 키 발급: https://makersuite.google.com/app/apikey');
    }
}

// 초기 메시지 로드
function loadInitialMessages() {
    const savedHistory = localStorage.getItem('mentoraChatHistory');
    if (savedHistory) {
        try {
            chatHistory = JSON.parse(savedHistory);
            chatHistory.forEach(msg => {
                displayMessage(msg.text, msg.isUser, false);
            });
        } catch (e) {
            console.error('채팅 히스토리 로드 실패:', e);
        }
    }
}

// 챗봇 데모 열기
function openChatbot() {
    const chatDemo = document.querySelector('.chatbot-demo');
    if (chatDemo) {
        chatDemo.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }, 800);
    }
}

// 메시지 전송
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '' || isTyping) return;
    
    // 사용자 메시지 표시
    displayMessage(message, true);
    
    // 입력창 초기화
    input.value = '';
    input.style.height = 'auto';
    
    // 채팅 히스토리에 저장
    chatHistory.push({
        text: message,
        isUser: true,
        timestamp: new Date().toISOString()
    });
    saveChatHistory();
    
    // 빠른 질문 숨기기
    hideQuickQuestions();
    
    // Gemini API 호출
    await generateGeminiResponse(message);
}

// 빠른 질문 전송
function sendQuickQuestion(message) {
    const input = document.getElementById('chatInput');
    input.value = message;
    sendMessage();
}

// 빠른 질문 숨기기
function hideQuickQuestions() {
    const quickQuestions = document.querySelector('.quick-questions');
    if (quickQuestions) {
        quickQuestions.style.display = 'none';
    }
}

// 메시지 표시
function displayMessage(text, isUser, animate = true) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    if (animate) {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
    }
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = isUser ? '<i class="fas fa-user-circle"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // 메시지 텍스트 (마크다운 스타일 간단 처리)
    const textP = document.createElement('p');
    textP.innerHTML = formatMessage(text);
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
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 스크롤 하단으로
    scrollToBottom();
}

// 메시지 포맷팅 (간단한 마크다운)
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **굵게**
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // *기울임*
        .replace(/\n/g, '<br>'); // 줄바꿈
}

// Gemini API로 응답 생성
async function generateGeminiResponse(userMessage) {
    isTyping = true;
    
    // 타이핑 표시
    showTypingIndicator();
    
    try {
        // Gemini API 호출
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: SYSTEM_PROMPT }
                        ]
                    },
                    ...conversationHistory,
                    {
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API 오류: ${response.status}`);
        }

        const data = await response.json();
        
        // Gemini 응답 추출
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // 대화 히스토리에 추가
        conversationHistory.push(
            { parts: [{ text: userMessage }] },
            { parts: [{ text: aiResponse }] }
        );
        
        // 히스토리가 너무 길어지면 앞부분 제거 (최근 10개 대화만 유지)
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        // 타이핑 표시 숨기기
        hideTypingIndicator();
        
        // AI 응답 표시
        displayMessage(aiResponse, false);
        
        // 채팅 히스토리에 저장
        chatHistory.push({
            text: aiResponse,
            isUser: false,
            timestamp: new Date().toISOString()
        });
        saveChatHistory();
        
    } catch (error) {
        console.error('Gemini API 오류:', error);
        
        // 타이핑 표시 숨기기
        hideTypingIndicator();
        
        // 폴백 응답
        const fallbackResponse = getFallbackResponse(userMessage);
        displayMessage(fallbackResponse, false);
        
        chatHistory.push({
            text: fallbackResponse,
            isUser: false,
            timestamp: new Date().toISOString()
        });
        saveChatHistory();
    }
    
    isTyping = false;
}

// 폴백 응답 (API 오류 시)
function getFallbackResponse(userMessage) {
    // 키워드 기반 간단 응답
    const message = userMessage.toLowerCase();
    
    if (message.includes('스트레스') || message.includes('힘들') || message.includes('우울')) {
        return '힘든 시간을 보내고 계시는군요 😔 스트레스는 누구에게나 찾아오는 자연스러운 반응이에요. 깊은 호흡, 산책, 좋아하는 활동을 하는 것이 도움이 될 수 있어요. 만약 증상이 2주 이상 지속된다면 전문가 상담을 받아보시는 것을 권장드려요. 정신건강상담전화 1577-0199로 연락하실 수 있습니다 💚';
    }
    
    if (message.includes('관계') || message.includes('친구') || message.includes('소통')) {
        return '대인관계는 정말 복잡하고 어려울 수 있어요 😊 상대방의 입장에서 생각해보고, 솔직하게 감정을 표현하는 것이 중요해요. "나 전달법"을 사용해보는 건 어떨까요? 예를 들어 "나는 ~했을 때 ~하게 느꼈어"라고 말하는 거예요. 어떤 상황인지 더 자세히 말씀해주시겠어요?';
    }
    
    if (message.includes('진로') || message.includes('직업') || message.includes('적성')) {
        return '진로 고민은 누구에게나 어려운 문제예요 🤔 자신의 강점, 흥미, 가치관을 먼저 파악하는 것이 중요해요. Mentora의 Holland 적성검사나 MBTI 검사를 해보시면 도움이 될 거예요! 어떤 분야에 관심이 있으신가요?';
    }
    
    return '죄송해요, 지금 일시적으로 응답이 어려워요 😅 조금 다르게 질문해주시거나, 잠시 후 다시 시도해주세요. 급한 상담이 필요하시면 전문가 상담전화 1577-0199로 연락하실 수 있어요!';
}

// 타이핑 표시
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'typing-dots';
    contentDiv.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// 타이핑 표시 숨기기
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 스크롤 하단으로
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// 채팅 히스토리 저장
function saveChatHistory() {
    try {
        localStorage.setItem('mentoraChatHistory', JSON.stringify(chatHistory));
    } catch (e) {
        console.error('채팅 히스토리 저장 실패:', e);
    }
}

// 채팅 히스토리 초기화
function clearChatHistory() {
    if (confirm('모든 대화 내역을 삭제하시겠습니까?')) {
        chatHistory = [];
        conversationHistory = [];
        localStorage.removeItem('mentoraChatHistory');
        
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>안녕하세요! 저는 Mentora AI 코치입니다. 😊</p>
                        <p>어떤 고민이 있으신가요? 편하게 말씀해주세요!</p>
                        <span class="message-time">방금 전</span>
                    </div>
                </div>
            `;
        }
        
        // 빠른 질문 다시 표시
        const quickQuestions = document.querySelector('.quick-questions');
        if (quickQuestions) {
            quickQuestions.style.display = 'flex';
        }
    }
}

// FAQ 아코디언 초기화
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // 다른 아이템 닫기
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // 현재 아이템 토글
                item.classList.toggle('active');
            });
        }
    });
}

// 프리미엄 업그레이드 안내
function showPremiumUpgrade() {
    alert('프리미엄 플랜으로 업그레이드하면 무제한 AI 상담을 이용하실 수 있습니다!\n\n₩29,900/월 | 7일 무료 체험');
    window.location.href = 'index.html#pricing';
}
