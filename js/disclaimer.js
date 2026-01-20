// 면책 조항 HTML 생성 함수
function createDisclaimerBanner() {
    return `
        <div class="disclaimer-banner">
            <div class="disclaimer-header">
                <span class="disclaimer-icon">⚠️</span>
                <h3 class="disclaimer-title">중요 안내사항</h3>
            </div>
            <div class="disclaimer-content">
                <ul>
                    <li><strong>본 서비스는 심리 상담이나 의료 행위가 아닙니다.</strong></li>
                    <li>성격 유형 정보 제공 및 자기 이해를 돕기 위한 콘텐츠입니다.</li>
                    <li>전문적인 심리 상담이 필요한 경우 전문가와 상담하시기 바랍니다.</li>
                    <li>검사 결과는 참고 자료이며 절대적 기준이 아닙니다.</li>
                    <li>검사 결과에 대한 해석은 개인차가 있을 수 있습니다.</li>
                </ul>
            </div>
            <div class="disclaimer-footer">
                이 검사는 자기 이해와 성장을 돕기 위한 도구입니다. 심각한 정신 건강 문제가 있다면 전문가의 도움을 받으세요.
            </div>
        </div>
    `;
}

// 페이지 로드 시 면책 조항 자동 삽입
function insertDisclaimer(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
        const disclaimerHTML = createDisclaimerBanner();
        target.insertAdjacentHTML('afterbegin', disclaimerHTML);
    }
}

// 결제 전 동의 체크박스
function createPaymentDisclaimer() {
    return `
        <div class="payment-disclaimer">
            <div class="disclaimer-box">
                <h4 style="color: #e65100; margin-bottom: 15px;">
                    <i class="fas fa-exclamation-triangle"></i> 구매 전 필독사항
                </h4>
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #333;">
                        본 프리미엄 서비스는:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #666;">
                        <li>성격 유형 분석 정보 제공 서비스입니다</li>
                        <li>심리 상담, 진단, 치료가 아닙니다</li>
                        <li>의료 행위를 대체할 수 없습니다</li>
                        <li>참고 자료로만 활용하시기 바랍니다</li>
                    </ul>
                </div>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="disclaimerAgree" required style="width: 18px; height: 18px; cursor: pointer;">
                    <span style="font-size: 14px; color: #333;">
                        위 내용을 확인했으며 이에 동의합니다 <span style="color: #e74c3c;">*</span>
                    </span>
                </label>
            </div>
        </div>
    `;
}

// 결제 버튼 활성화/비활성화
function setupPaymentDisclaimerCheck() {
    const checkbox = document.getElementById('disclaimerAgree');
    const paymentButton = document.querySelector('.btn-payment, .btn-checkout');
    
    if (checkbox && paymentButton) {
        paymentButton.disabled = true;
        paymentButton.style.opacity = '0.5';
        paymentButton.style.cursor = 'not-allowed';
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                paymentButton.disabled = false;
                paymentButton.style.opacity = '1';
                paymentButton.style.cursor = 'pointer';
            } else {
                paymentButton.disabled = true;
                paymentButton.style.opacity = '0.5';
                paymentButton.style.cursor = 'not-allowed';
            }
        });
    }
}
