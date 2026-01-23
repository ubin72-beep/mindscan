# 📘 Mentora PDF 가이드북 브랜딩 가이드

**버전**: 1.0  
**작성일**: 2026-01-22  
**목적**: Mentora 브랜드 정체성을 PDF 가이드북에 일관되게 적용

---

## 🎨 브랜드 컬러

### 주요 컬러
- **Primary Green**: `#2c5f4f` (RGB: 44, 95, 79)
- **Dark Green**: `#1a4838` (RGB: 26, 72, 56)
- **Gold**: `#d4af37` (RGB: 212, 175, 55)
- **Light Gold**: `#f0d98c` (RGB: 240, 217, 140)

### 보조 컬러
- **White**: `#ffffff`
- **Light Gray**: `#f5f7fa`
- **Dark Gray**: `#666666`
- **Black**: `#1a1a1a`

---

## 🖋️ 타이포그래피

### 한글 폰트
- **Primary**: Noto Sans KR (Google Fonts)
  - Heading: Bold (700) / Extra Bold (800)
  - Body: Regular (400) / Medium (500)

### 영문 폰트
- **Primary**: Poppins (Google Fonts)
  - Heading: Bold (700) / Extra Bold (800)
  - Body: Regular (400) / Medium (500)

### 폰트 크기 가이드
- **H1 (대제목)**: 28pt ~ 32pt
- **H2 (중제목)**: 22pt ~ 26pt
- **H3 (소제목)**: 18pt ~ 20pt
- **Body (본문)**: 11pt ~ 12pt
- **Caption (캡션)**: 9pt ~ 10pt

---

## 🏷️ Mentora 브랜딩 요소

### 1. 워터마크 (Watermark)

#### 위치 및 스타일
- **배치**: 모든 페이지 중앙 또는 하단
- **텍스트**: "MENTORA" 또는 "멘토라"
- **불투명도**: 5% ~ 10%
- **각도**: 45도 대각선
- **색상**: Light Gray (`#e0e0e0`)
- **크기**: 페이지 폭의 60%

#### 예시 코드 (CSS)
```css
.watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 120px;
    font-weight: 900;
    color: rgba(224, 224, 224, 0.1);
    z-index: 0;
    user-select: none;
    pointer-events: none;
}
```

---

### 2. 헤더 (Header)

#### 구성 요소
- **왼쪽**: Mentora 로고 (Brain Icon + "Mentora" 텍스트)
- **중앙**: 가이드북 제목 (예: "INTJ 성격 완벽 분석")
- **오른쪽**: 페이지 번호

#### 헤더 스타일
- **배경색**: White with gradient fade
- **하단 라인**: 1px solid `#e0e0e0`
- **높이**: 60px
- **패딩**: 20px

#### 예시 레이아웃
```
[🧠 Mentora]     [INTJ 성격 완벽 분석]     [Page 12]
──────────────────────────────────────────────────────
```

---

### 3. 푸터 (Footer)

#### 구성 요소
- **왼쪽**: © 2026 Mentora. All rights reserved.
- **중앙**: 웹사이트 URL (https://mentora.co.kr)
- **오른쪽**: 연락처 (mentora@gmail.com)

#### 푸터 스타일
- **배경색**: Light Gray (`#f5f7fa`)
- **상단 라인**: 1px solid `#e0e0e0`
- **높이**: 50px
- **텍스트 크기**: 9pt
- **텍스트 색상**: Dark Gray (`#666666`)

#### 예시 레이아웃
```
──────────────────────────────────────────────────────
© 2026 Mentora    https://mentora.co.kr    mentora@gmail.com
```

---

### 4. 도장 (Stamp)

#### 사용 위치
- 섹션 구분선
- 중요 인사이트 박스
- 체크리스트 완료 표시

#### 도장 디자인
1. **인증 도장** (Certification Stamp)
   - 원형 도장
   - 텍스트: "MENTORA CERTIFIED" 또는 "멘토라 인증"
   - 색상: Gold (`#d4af37`)
   - 크기: 80px × 80px
   - 불투명도: 80%

2. **체크 도장** (Check Stamp)
   - 원형 체크마크
   - 아이콘: ✓
   - 색상: Primary Green (`#2c5f4f`)
   - 크기: 40px × 40px

3. **중요 도장** (Important Stamp)
   - 육각형 또는 원형
   - 텍스트: "IMPORTANT" 또는 "중요"
   - 색상: Gold (`#d4af37`)
   - 크기: 60px × 60px

#### 예시 CSS
```css
.stamp-certified {
    width: 80px;
    height: 80px;
    border: 3px solid #d4af37;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    color: #d4af37;
    opacity: 0.8;
    transform: rotate(-15deg);
}
```

---

### 5. 인사이트 박스 (Insight Box)

#### 디자인 가이드
- **배경색**: Light Gold (`#f0d98c`) with 20% opacity
- **테두리**: 2px solid Gold (`#d4af37`)
- **아이콘**: 💡 (Lightbulb)
- **제목**: "Mentora Insight" 또는 "멘토라 인사이트"
- **패딩**: 20px
- **모서리**: 10px border-radius

#### 예시 레이아웃
```
┌──────────────────────────────────────┐
│ 💡 Mentora Insight                   │
├──────────────────────────────────────┤
│ INTJ는 전략적 사고를 통해...          │
│                                      │
└──────────────────────────────────────┘
```

---

### 6. 체크리스트 (Checklist)

#### 디자인 가이드
- **배경색**: White with Light Green border
- **체크박스**: ☐ (미완료) / ☑ (완료)
- **체크 색상**: Primary Green (`#2c5f4f`)
- **항목 간격**: 15px

#### 예시 레이아웃
```
┌──────────────────────────────────────┐
│ ☑ 성격 유형 이해하기                  │
│ ☑ 강점과 약점 파악하기                │
│ ☐ 성장 계획 수립하기                  │
│ ☐ 실행 계획 작성하기                  │
└──────────────────────────────────────┘
```

---

## 📄 페이지 레이아웃

### 표지 (Cover Page)

#### 구성 요소
1. **배경**: Gradient (Primary Green → Dark Green)
2. **로고**: 중앙 상단 (Large Brain Icon + "Mentora")
3. **제목**: 중앙 (예: "INTJ 성격 완벽 분석 가이드")
4. **부제**: 하단 (예: "전략가를 위한 완벽 가이드북")
5. **도장**: "MENTORA CERTIFIED" 우측 하단
6. **발행 정보**: 하단 중앙

#### 예시 레이아웃
```
┌──────────────────────────────────────┐
│                                      │
│        🧠 Mentora                    │
│                                      │
│         INTJ 성격 완벽 분석           │
│        전략가를 위한 완벽 가이드북      │
│                                      │
│                             [도장]   │
│                                      │
│    © 2026 Mentora | 60 Pages        │
└──────────────────────────────────────┘
```

---

### 목차 (Table of Contents)

#### 구성 요소
1. **제목**: "목차" (H1)
2. **섹션 리스트**: 페이지 번호 포함
3. **색상**: Primary Green for section titles

#### 예시 레이아웃
```
목차

01. INTJ 성격 소개 .......................... 3
02. 핵심 특징 분석 .......................... 8
03. 강점과 약점 ............................ 15
04. 직업 추천 30가지 ....................... 22
05. 연애와 궁합 ............................ 35
06. 성장 로드맵 ............................ 45
07. 유명인 사례 ............................ 52
08. 실천 가이드 ............................ 58
```

---

### 본문 (Content Pages)

#### 레이아웃 구조
1. **여백 (Margins)**
   - 상단: 80px
   - 하단: 70px
   - 좌측: 60px
   - 우측: 60px

2. **컬럼**
   - 단일 컬럼 (One Column)
   - 텍스트 정렬: Justified

3. **이미지**
   - 최대 폭: 페이지 폭의 80%
   - 캡션: 하단 중앙, 9pt, Dark Gray

---

### 섹션 구분 (Section Divider)

#### 디자인
- **라인**: 2px solid Primary Green
- **아이콘**: Brain Icon (🧠) 또는 Mentora Logo
- **도장**: MENTORA 인증 도장 (선택사항)

#### 예시 레이아웃
```
━━━━━━━━━━━━━━━━━ 🧠 ━━━━━━━━━━━━━━━━━

02. 핵심 특징 분석

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🖼️ 이미지 및 그래픽

### 아이콘 사용
- **출처**: Font Awesome 6.4.0
- **스타일**: Solid / Regular
- **색상**: Primary Green 또는 Gold

### 차트 및 그래프
- **색상 팔레트**: Primary Green, Gold, Light Gold
- **스타일**: Clean, Modern, Minimalist

### 일러스트레이션
- **스타일**: Flat Design
- **색상**: Brand Colors

---

## 📐 그리드 시스템

### A4 페이지 기준
- **페이지 크기**: 210mm × 297mm (A4)
- **해상도**: 300 DPI
- **컬럼**: 1 Column
- **거터 (Gutter)**: 20px

---

## ✅ 체크리스트

### PDF 제작 전 확인사항

#### 브랜딩
- [ ] 모든 페이지에 워터마크 적용
- [ ] 헤더와 푸터 일관성 확인
- [ ] Mentora 로고 정확히 배치
- [ ] 브랜드 컬러 정확히 적용

#### 콘텐츠
- [ ] 목차 페이지 번호 정확성 확인
- [ ] 오타 및 문법 검토
- [ ] 이미지 해상도 확인 (300 DPI)
- [ ] 하이퍼링크 작동 확인

#### 레이아웃
- [ ] 여백 일관성 확인
- [ ] 폰트 크기 일관성 확인
- [ ] 섹션 구분 명확성 확인
- [ ] 인사이트 박스 스타일 일관성

#### 최종 확인
- [ ] PDF 파일 크기 적정성 (< 10MB)
- [ ] 모바일 뷰어 호환성 확인
- [ ] 인쇄 품질 확인
- [ ] 메타데이터 입력 (제목, 저자, 키워드)

---

## 📦 파일 명명 규칙

### 파일명 형식
```
Mentora_[검사유형]_[타입]_Guide_v[버전].pdf
```

### 예시
- `Mentora_MBTI_INTJ_Guide_v1.0.pdf`
- `Mentora_Enneagram_Type1_Guide_v1.0.pdf`
- `Mentora_BigFive_Complete_Guide_v1.0.pdf`

---

## 🎯 브랜드 메시지

### 핵심 가치
- **전문성 (Expertise)**: 심리학 전문가 감수
- **실용성 (Practical)**: 실생활 적용 가능
- **신뢰성 (Trust)**: Mentora 인증 콘텐츠
- **접근성 (Accessible)**: 누구나 쉽게 이해

### 톤앤매너 (Tone & Manner)
- **친근하지만 전문적인**: 존댓말 사용, 친절한 설명
- **구체적이고 실용적인**: 이론 + 실천 가이드
- **긍정적이고 격려하는**: 성장 지향적 메시지

---

## 📞 문의

제작 과정에서 질문이 있으면:
- **이메일**: mentora@gmail.com
- **전화**: 0502-1909-7788
- **웹사이트**: https://mentora.co.kr

---

© 2026 Mentora (큐브박스 CubeBox). All rights reserved.
