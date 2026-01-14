/* ==============================================
   MindScan V3.0 - Test Data
   심리검사 데이터 및 질문
   ============================================== */

// MBTI 검사 데이터
const mbtiTest = {
    name: 'MBTI 성격유형검사',
    description: '세계에서 가장 신뢰받는 성격 유형 검사',
    category: '성격',
    keywords: 'mbti, 성격, 유형, 성향, 16가지, 외향, 내향',
    time: 15,
    questions: [
        {
            id: 1,
            question: '새로운 사람들과의 만남에서 나는...',
            options: [
                { text: '먼저 다가가서 대화를 시작한다', dimension: 'E', score: 2 },
                { text: '상대방이 먼저 말을 걸기를 기다린다', dimension: 'I', score: 2 }
            ]
        },
        {
            id: 2,
            question: '주말에 나는...',
            options: [
                { text: '친구들과 약속을 잡고 밖에서 활동한다', dimension: 'E', score: 2 },
                { text: '집에서 혼자만의 시간을 보낸다', dimension: 'I', score: 2 }
            ]
        },
        {
            id: 3,
            question: '문제를 해결할 때 나는...',
            options: [
                { text: '구체적인 사실과 경험을 바탕으로 판단한다', dimension: 'S', score: 2 },
                { text: '직관과 전체적인 패턴을 보고 판단한다', dimension: 'N', score: 2 }
            ]
        },
        {
            id: 4,
            question: '대화할 때 나는...',
            options: [
                { text: '구체적이고 현실적인 이야기를 선호한다', dimension: 'S', score: 2 },
                { text: '추상적이고 미래지향적인 이야기를 선호한다', dimension: 'N', score: 2 }
            ]
        },
        {
            id: 5,
            question: '의사결정을 할 때 나는...',
            options: [
                { text: '논리적 분석과 객관적 사실을 중시한다', dimension: 'T', score: 2 },
                { text: '사람들의 감정과 관계를 우선시한다', dimension: 'F', score: 2 }
            ]
        },
        {
            id: 6,
            question: '갈등 상황에서 나는...',
            options: [
                { text: '원칙과 공정함을 지키려 한다', dimension: 'T', score: 2 },
                { text: '상대방의 입장을 이해하고 배려한다', dimension: 'F', score: 2 }
            ]
        },
        {
            id: 7,
            question: '일상생활에서 나는...',
            options: [
                { text: '계획을 세우고 체계적으로 실행한다', dimension: 'J', score: 2 },
                { text: '상황에 따라 유연하게 대처한다', dimension: 'P', score: 2 }
            ]
        },
        {
            id: 8,
            question: '프로젝트를 진행할 때 나는...',
            options: [
                { text: '마감일 전에 미리 끝내려 한다', dimension: 'J', score: 2 },
                { text: '마감 직전에 집중해서 완성한다', dimension: 'P', score: 2 }
            ]
        },
        {
            id: 9,
            question: '여행을 갈 때 나는...',
            options: [
                { text: '상세한 일정표를 만들어 준비한다', dimension: 'J', score: 2 },
                { text: '대략적인 계획만 세우고 즉흥적으로 즐긴다', dimension: 'P', score: 2 }
            ]
        },
        {
            id: 10,
            question: '친구와의 대화에서 나는...',
            options: [
                { text: '많은 사람들과 함께 이야기하는 것을 즐긴다', dimension: 'E', score: 2 },
                { text: '소수의 친한 친구와 깊은 대화를 선호한다', dimension: 'I', score: 2 }
            ]
        },
        {
            id: 11,
            question: '학습할 때 나는...',
            options: [
                { text: '실제 예시와 경험을 통해 배운다', dimension: 'S', score: 2 },
                { text: '이론과 개념을 먼저 이해하려 한다', dimension: 'N', score: 2 }
            ]
        },
        {
            id: 12,
            question: '비판을 받았을 때 나는...',
            options: [
                { text: '객관적으로 분석하고 개선점을 찾는다', dimension: 'T', score: 2 },
                { text: '감정적으로 받아들이고 상처받는다', dimension: 'F', score: 2 }
            ]
        }
    ]
};

// MBTI 유형별 설명
const mbtiTypes = {
    'ISTJ': {
        title: '청렴결백한 논리주의자',
        description: '사실에 대하여 정확하고 체계적으로 기억하며 일 처리에 있어서도 신중하고 책임감이 강한 유형',
        strengths: '책임감, 신뢰성, 체계성, 실용성',
        weaknesses: '융통성 부족, 감정 표현 어려움',
        careers: '회계사, 법률가, 의사, 공무원',
        famous: '조지 워싱턴, 앤절라 메르켈'
    },
    'ISFJ': {
        title: '용감한 수호자',
        description: '온화하고 친절하며 현실적이고 책임감이 강한 유형',
        strengths: '헌신적, 신뢰성, 꼼꼼함, 배려심',
        weaknesses: '자기주장 부족, 변화 회피',
        careers: '간호사, 교사, 상담사, 사서',
        famous: '마더 테레사, 로사 파크스'
    },
    'INFJ': {
        title: '선의의 옹호자',
        description: '인내심이 많고 통찰력과 직관력이 뛰어나며 양심이 바르고 화합을 추구하는 유형',
        strengths: '통찰력, 이상주의, 헌신, 창의성',
        weaknesses: '완벽주의, 번아웃 취약',
        careers: '상담가, 작가, 심리학자, 예술가',
        famous: '마틴 루터 킹, 넬슨 만델라'
    },
    'INTJ': {
        title: '용의주도한 전략가',
        description: '독립적이고 창의적이며 분석적이고 비판적인 사고를 가진 유형',
        strengths: '전략적 사고, 독립성, 창의성, 결단력',
        weaknesses: '감정 표현 어려움, 독단적',
        careers: '과학자, 엔지니어, 전략가, CEO',
        famous: '일론 머스크, 마크 저커버그'
    },
    'ISTP': {
        title: '만능 재주꾼',
        description: '논리적이고 상황 판단이 뛰어나며 실용적이고 분석적인 유형',
        strengths: '문제해결력, 적응력, 실용성, 분석력',
        weaknesses: '감정 표현 부족, 계획성 약함',
        careers: '기술자, 엔지니어, 조종사, 운동선수',
        famous: '클린트 이스트우드, 마이클 조던'
    },
    'ISFP': {
        title: '호기심 많은 예술가',
        description: '온화하고 겸손하며 상황 판단력이 뛰어나고 융통성이 있는 유형',
        strengths: '예술적 감각, 유연성, 섬세함, 공감능력',
        weaknesses: '장기 계획 약함, 비판에 민감',
        careers: '예술가, 디자이너, 음악가, 요리사',
        famous: '마이클 잭슨, 프린스'
    },
    'INFP': {
        title: '열정적인 중재자',
        description: '이상적이고 충성심이 강하며 개인의 가치를 중시하는 유형',
        strengths: '창의성, 공감능력, 이상주의, 적응력',
        weaknesses: '현실감각 부족, 우유부단',
        careers: '작가, 상담가, 심리학자, 예술가',
        famous: '윌리엄 셰익스피어, J.R.R. 톨킨'
    },
    'INTP': {
        title: '논리적인 사색가',
        description: '논리적이고 분석적이며 지적 호기심이 강한 유형',
        strengths: '논리적 사고, 창의성, 독립성, 분석력',
        weaknesses: '실행력 부족, 사회성 약함',
        careers: '과학자, 철학자, 프로그래머, 연구원',
        famous: '알버트 아인슈타인, 빌 게이츠'
    },
    'ESTP': {
        title: '모험을 즐기는 사업가',
        description: '현실적이고 관대하며 개방적이고 사교적인 유형',
        strengths: '행동력, 사교성, 적응력, 문제해결력',
        weaknesses: '충동적, 계획성 부족',
        careers: '영업, 기업가, 운동선수, 응급구조사',
        famous: '도널드 트럼프, 어니스트 헤밍웨이'
    },
    'ESFP': {
        title: '자유로운 영혼의 연예인',
        description: '사교적이고 활동적이며 수용적이고 친절한 유형',
        strengths: '사교성, 낙천성, 유연성, 창의성',
        weaknesses: '집중력 부족, 장기 계획 약함',
        careers: '연예인, 코치, 이벤트 기획자, 영업',
        famous: '엘튼 존, 마릴린 먼로'
    },
    'ENFP': {
        title: '재기발랄한 활동가',
        description: '열정적이고 창의적이며 즉흥적이고 상상력이 풍부한 유형',
        strengths: '창의성, 열정, 소통능력, 공감능력',
        weaknesses: '집중력 부족, 우유부단',
        careers: '마케터, 기자, 배우, 상담사',
        famous: '월트 디즈니, 로빈 윌리엄스'
    },
    'ENTP': {
        title: '뜨거운 논쟁을 즐기는 변론가',
        description: '독창적이고 창의적이며 논리적이고 분석적인 유형',
        strengths: '창의성, 논리력, 빠른 사고, 도전정신',
        weaknesses: '논쟁적, 실행력 부족',
        careers: '변호사, 기업가, 발명가, 마케터',
        famous: '스티브 잡스, 토마스 에디슨'
    },
    'ESTJ': {
        title: '엄격한 관리자',
        description: '사실적이고 실용적이며 조직적이고 분석적인 유형',
        strengths: '리더십, 조직력, 결단력, 책임감',
        weaknesses: '융통성 부족, 감정 표현 어려움',
        careers: '경영자, 군인, 경찰, 판사',
        famous: '헨리 포드, 미셸 오바마'
    },
    'ESFJ': {
        title: '사교적인 외교관',
        description: '친절하고 사교적이며 협조적이고 책임감이 강한 유형',
        strengths: '공감능력, 사교성, 책임감, 협조성',
        weaknesses: '비판에 민감, 자기주장 부족',
        careers: '교사, 간호사, 이벤트 플래너, 상담사',
        famous: '테일러 스위프트, 빌 클린턴'
    },
    'ENFJ': {
        title: '정의로운 사회운동가',
        description: '따뜻하고 적극적이며 책임감이 강하고 사교적인 유형',
        strengths: '리더십, 공감능력, 소통능력, 카리스마',
        weaknesses: '과도한 헌신, 비판 회피',
        careers: '정치가, 교사, 상담사, HR 전문가',
        famous: '버락 오바마, 오프라 윈프리'
    },
    'ENTJ': {
        title: '대담한 통솔자',
        description: '솔직하고 단호하며 논리적이고 계획적인 리더형 유형',
        strengths: '리더십, 전략적 사고, 결단력, 효율성',
        weaknesses: '독단적, 감정 표현 부족',
        careers: 'CEO, 경영 컨설턴트, 변호사, 정치가',
        famous: '스티브 잡스, 마가렛 대처'
    }
};

// 검사 데이터 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mbtiTest, mbtiTypes };
}
