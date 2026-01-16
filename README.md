# Mentora (멘토라) - 심리검사 플랫폼

**당신 내면의 빛을 찾다**

> 🔄 Last Updated: 2026-01-16 15:35 KST - Navigation Redesign Complete

---

## 📌 프로젝트 개요

**Mentora (멘토라)**는 과학적으로 검증된 12가지 심리검사를 제공하는 종합 심리 분석 플랫폼입니다.  
MBTI, 에니어그램, Big Five 등 다양한 검사를 통해 자신의 성격, 감정, 지능을 깊이 있게 이해하고,  
AI 기반 맞춤형 조언과 프리미엄 기능을 통해 성장할 수 있습니다.

- **런칭일**: 2026년 1월
- **타겟**: 자기 이해와 성장을 원하는 20-40대
- **핵심 가치**: 과학적 검증, AI 분석, 사용자 중심 디자인

---

## 🎨 최신 업데이트 (2026-01-16)

### ✨ 네비게이션 바 전면 개선
- **그린/골드 테마**: 진한 그린 그라디언트 배경 + 골드 강조
- **메인 네비게이션**: 흰색→골드 그라디언트 로고, 밝은 흰색 메뉴
- **검사 페이지 네비게이션**: 통일된 그린/골드 스타일
- **모바일 최적화**: 햄버거 메뉴 + 하단 네비게이션 바
- **호버 효과**: 골드 언더라인 + 부드러운 애니메이션

---

## 🎯 현재 완료된 기능

### ✅ 1. 메인 랜딩 페이지 (index.html)
- **Hero 섹션**: 100만 명 선택 배지, 골드 하이라이트 효과
- **12가지 심리검사**: MBTI, 에니어그램, Big Five, DISC, Holland, 애착유형, EQ, IQ, SQ, 자존감, 우울증, 번아웃
- **검색 및 필터 기능**: 카테고리별 검사 필터링
- **AI 추천 시스템**: 사용자 맞춤 검사 추천
- **프리미엄 기능 섹션**: 6가지 프리미엄 기능 소개
- **실시간 통계**: Chart.js 기반 데이터 시각화
- **사용자 후기**: 실제 사용자 리뷰 카드

### ✅ 2. 심리검사 페이지 (12종)
- `test-mbti.html` - MBTI 성격유형검사
- `test-enneagram.html` - 에니어그램
- `test-bigfive.html` - Big Five 성격검사
- `test-disc.html` - DISC 행동유형검사
- `test-holland.html` - Holland 직업적성검사
- `test-attachment.html` - 애착유형검사
- `test-eq.html` - 감성지능(EQ) 검사
- `test-iq.html` - 지능지수(IQ) 검사
- `test-sq.html` - 사회지능(SQ) 검사
- `test-selfesteem.html` - 자존감 검사
- `test-depression.html` - 우울증 검사
- `test-burnout.html` - 번아웃 증후군 검사

### ✅ 3. 프리미엄 기능
- **AI 맞춤형 성장 로드맵** (roadmap.html)
- **커플/팀 매칭 분석** (couple-analysis.html)
- **AI 코칭 챗봇** (ai-chatbot.html)
- **개인 대시보드** (dashboard.html)
- **B2B 기업 솔루션** (b2b.html)
- **커뮤니티** (community.html)

### ✅ 4. 기타 페이지
- **마이페이지** (mypage.html) - 검사 결과 관리
- **관리자 페이지** (admin/index.html) - 대시보드
- **관리자 설정** (admin/settings.html) - 시스템 설정
- **약관** (terms.html, privacy.html, refund.html)
- **법적 고지** (legal-notice.html)

---

## 🚀 배포 정보

### 🌐 공식 URL
- **프로덕션**: https://mentora.co.kr
- **GitHub Pages**: https://ubin72-beep.github.io/mindscan/

### 📦 배포 방법
1. GitHub 저장소: https://github.com/ubin72-beep/mindscan
2. GitHub Actions 자동 배포
3. Cloudflare Workers 지원

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 그린/골드 테마, 그라디언트, 애니메이션
- **JavaScript**: 인터랙티브 기능
- **Chart.js**: 데이터 시각화

### Design
- **색상 팔레트**:
  - Primary: `#2c5f4f` (진한 그린)
  - Primary Dark: `#1a4838` (다크 그린)
  - Accent: `#d4af37` (골드)
  - Accent Light: `#f0d98c` (라이트 골드)
- **폰트**: Noto Sans KR, Poppins
- **아이콘**: Font Awesome 6.4.0

### SEO
- **구조화 데이터**: JSON-LD (WebSite, ItemList)
- **메타 태그**: OG, Twitter Card
- **사이트맵**: sitemap.xml
- **검색 엔진**: 네이버, 구글 인증 완료

---

## 📂 프로젝트 구조

