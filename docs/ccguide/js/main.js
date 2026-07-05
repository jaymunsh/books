/* =========================================================
   Claude Code 가이드 · 동작 스크립트
   - 테마 토글 (localStorage)
   - 사이드바 활성/모바일 토글
   - 코드 언어 탭(Bash/Python/TS) 전환
   - 코드블록 복사 버튼 자동 부착
   - 헤딩 자동 ID + 우측 "On this page" 자동 생성
   - Cmd/Ctrl + K 검색 (클라이언트 사이드 색인)
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Search index (manual, kept tight) ---------- */
  const SEARCH_INDEX = [
    { ch: '랜딩', title: '클로드 코드 완벽 가이드', href: 'index.html', keys: ['소개', '시작', '목차'] },
    { ch: '0장 기초 개념', title: 'LLM 동작 원리 60초 압축', href: 'chapters/00-concepts.html#llm-basics', keys: ['LLM', '토큰', '다음 토큰', '환각', '컨텍스트 윈도우'] },
    { ch: '0장 기초 개념', title: 'Claude의 특징 (다른 LLM 대비)', href: 'chapters/00-concepts.html#claude-features', keys: ['Constitutional AI', 'Claude 특징'] },
    { ch: '0장 기초 개념', title: 'Claude Code 작동 흐름도', href: 'chapters/00-concepts.html#cc-workflow', keys: ['작동 원리', '흐름도', '컨텍스트 조립', 'tool_use'] },
    { ch: '0장 기초 개념', title: '4가지 메탈 모델', href: 'chapters/00-concepts.html#mental-models', keys: ['메탈 모델', '직관', '처음 보는 사람'] },
    { ch: '0장 기초 개념', title: '다른 AI 코딩 도구와의 비교', href: 'chapters/00-concepts.html#vs-others', keys: ['Copilot', 'Cursor', 'Cline', 'Aider', '비교'] },
    { ch: '0장 기초 개념', title: '환각 줄이는 4가지 습관', href: 'chapters/00-concepts.html#hallucination', keys: ['환각', 'hallucination'] },
    { ch: '0장 기초 개념', title: '🔤 LLM 용어 20선 (Context · KV Cache · CoT · RAG ...)', href: 'chapters/00-concepts.html#glossary', keys: ['용어', '용어집', '글로서리', 'glossary'] },
    { ch: '0장 기초 개념', title: '용어 — Context Window / KV Cache / Prompt Caching', href: 'chapters/00-concepts.html#glossary', keys: ['Context Window', 'KV Cache', 'Prompt Caching', '캐시'] },
    { ch: '0장 기초 개념', title: '용어 — Token / Streaming / Temperature / Stop Token', href: 'chapters/00-concepts.html#glossary', keys: ['Token', 'Temperature', 'Streaming', 'EOS'] },
    { ch: '0장 기초 개념', title: '용어 — Pretraining / Fine-tuning / RLHF / Constitutional AI', href: 'chapters/00-concepts.html#glossary', keys: ['Pretraining', 'Fine-tuning', 'RLHF', 'Constitutional'] },
    { ch: '0장 기초 개념', title: '용어 — Zero/Few-shot / CoT / Reasoning Tokens / Tool Use', href: 'chapters/00-concepts.html#glossary', keys: ['Zero-shot', 'Few-shot', 'CoT', 'Chain of Thought', 'Reasoning', 'Function calling'] },
    { ch: '0장 기초 개념', title: '용어 — RAG / Embedding / Multi-modal / Quantization', href: 'chapters/00-concepts.html#glossary', keys: ['RAG', 'Embedding', '임베딩', 'Multi-modal', 'Quantization', '양자화'] },
    { ch: '1장 시작하기', title: '설치 및 인증', href: 'chapters/01-getting-started.html#install', keys: ['install', 'brew', 'login', '설치'] },
    { ch: '1장 시작하기', title: '실행 모드 (interactive · -p · -c · plan · fast · headless)', href: 'chapters/01-getting-started.html#modes', keys: ['모드', 'plan', 'fast', 'headless', 'print'] },
    { ch: '1장 시작하기', title: '첫 세션 워크플로우', href: 'chapters/01-getting-started.html#first-session', keys: ['첫 세션', '시작하기', '예제'] },
    { ch: '1장 시작하기', title: '핵심 단축키', href: 'chapters/01-getting-started.html#shortcuts', keys: ['단축키', 'keybinding', 'shortcut'] },
    { ch: '2장 명령·권한·메모리', title: '자주 쓰는 슬래시 명령어', href: 'chapters/02-commands.html#slash-commands', keys: ['/help', '/clear', '/compact', '/init', '/model', '/agents', '/mcp'] },
    { ch: '2장 명령·권한·메모리', title: '권한 시스템 (allow/ask/deny)', href: 'chapters/02-commands.html#permissions', keys: ['권한', 'permission', 'allow', 'deny'] },
    { ch: '2장 명령·권한·메모리', title: 'settings.json 설정 키', href: 'chapters/02-commands.html#settings', keys: ['settings.json', '설정', 'config'] },
    { ch: '2장 명령·권한·메모리', title: 'CLAUDE.md 메모리 작성법', href: 'chapters/02-commands.html#memory', keys: ['CLAUDE.md', '메모리', 'memory'] },
    { ch: '2장 명령·권한·메모리', title: '훅(hooks) 설정', href: 'chapters/02-commands.html#hooks', keys: ['hooks', '훅', 'PreToolUse'] },
    { ch: '3장 스킬·서브에이전트', title: '스킬 시스템 개요', href: 'chapters/03-skills-agents.html#skills', keys: ['skills', '스킬'] },
    { ch: '3장 스킬·서브에이전트', title: '내장 스킬 목록', href: 'chapters/03-skills-agents.html#builtin-skills', keys: ['code-review', 'deep-research', 'verify', 'run', 'security-review'] },
    { ch: '3장 스킬·서브에이전트', title: '커스텀 스킬 만들기', href: 'chapters/03-skills-agents.html#custom-skill', keys: ['SKILL.md', '커스텀 스킬'] },
    { ch: '3장 스킬·서브에이전트', title: '서브에이전트 (Explore · Plan · 커스텀)', href: 'chapters/03-skills-agents.html#subagents', keys: ['Explore', 'Plan', 'subagent', '서브에이전트'] },
    { ch: '4장 MCP·통합', title: 'MCP 개념과 구조', href: 'chapters/04-mcp-integration.html#mcp', keys: ['MCP', 'Model Context Protocol'] },
    { ch: '4장 MCP·통합', title: 'claude mcp add 명령어', href: 'chapters/04-mcp-integration.html#mcp-add', keys: ['claude mcp', 'mcp add', '.mcp.json'] },
    { ch: '4장 MCP·통합', title: '자주 쓰는 MCP 서버', href: 'chapters/04-mcp-integration.html#mcp-servers', keys: ['github', 'slack', 'sentry', 'playwright', 'notion'] },
    { ch: '4장 MCP·통합', title: 'GitHub CLI 통합', href: 'chapters/04-mcp-integration.html#gh', keys: ['gh', 'github cli', 'PR'] },
    { ch: '4장 MCP·통합', title: 'Git worktree 활용', href: 'chapters/04-mcp-integration.html#worktree', keys: ['worktree', 'git worktree'] },
    { ch: '5장 자동화·CI', title: '/loop 반복 실행', href: 'chapters/05-automation.html#loop', keys: ['loop', '반복'] },
    { ch: '5장 자동화·CI', title: '/schedule 크론 스케줄링', href: 'chapters/05-automation.html#schedule', keys: ['schedule', 'cron', '크론'] },
    { ch: '5장 자동화·CI', title: '헤드리스 모드와 CI/CD', href: 'chapters/05-automation.html#headless', keys: ['headless', 'CI', 'GitHub Actions'] },
    { ch: '5장 자동화·CI', title: '훅으로 자동화', href: 'chapters/05-automation.html#hooks-auto', keys: ['hooks', '자동화', 'PreCommit'] },
    { ch: '6장 Workflow', title: 'Workflow 도구 (예정)', href: 'chapters/06-workflow.html', keys: ['Workflow', 'pipeline', 'parallel'] },
    { ch: '7장 Agent SDK', title: 'Claude Agent SDK (예정)', href: 'chapters/07-agent-sdk.html', keys: ['Agent SDK', 'Python', 'TypeScript'] },
    { ch: '8장 Claude API', title: 'Claude API · 캐싱 · 추론 (예정)', href: 'chapters/08-claude-api.html', keys: ['API', 'cache', 'thinking', 'tool use'] },
    { ch: '9장 실전 시나리오', title: '실전 워크플로우 5종 (예정)', href: 'chapters/09-scenarios.html', keys: ['시나리오', 'PR 리뷰', '리팩터링', 'CI', '문서화'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'superpowers — TDD 강제 SDLC (★233k)', href: 'chapters/10-community.html#superpowers', keys: ['superpowers', 'obra', 'TDD', 'RED GREEN'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'awesome-agent-skills — 1000+ 스킬 (★25.8k)', href: 'chapters/10-community.html#awesome-skills', keys: ['awesome', 'VoltAgent', '큐레이션'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'awesome-claude-code-toolkit — 올인원 (★2.1k)', href: 'chapters/10-community.html#toolkit', keys: ['toolkit', 'rohitg00', '올인원', 'plugin marketplace'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'ccusage — 토큰·비용 모니터링 (★16.4k)', href: 'chapters/10-community.html#ccusage', keys: ['ccusage', '비용', '토큰', 'npx ccusage'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'Claude Code Usage Monitor — 실시간 게이지', href: 'chapters/10-community.html#usage-monitor', keys: ['monitor', '게이지', '실시간', 'Maciek'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'claude-code-action — 공식 GitHub Action', href: 'chapters/10-community.html#claude-code-action', keys: ['github action', 'PR 자동', 'anthropics action'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'anthropics/skills — 공식 레퍼런스', href: 'chapters/10-community.html#anthropics-skills', keys: ['공식', 'anthropics skills'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'awesome-claude-skills — 큐레이션 디렉토리 (★13k)', href: 'chapters/10-community.html#travisvn', keys: ['travisvn', 'awesome-claude-skills'] },
    { ch: '10장 커뮤니티 스킬·툴', title: 'claude-skills — 비즈니스 통합 (337 스킬)', href: 'chapters/10-community.html#alirezarezvani', keys: ['alirezarezvani', '비즈니스', '비엔지니어'] },
    { ch: '10장 커뮤니티 스킬·툴', title: '실전 선택 가이드 & 5가지 안전 체크', href: 'chapters/10-community.html#how-to-choose', keys: ['선택 가이드', '안전 체크'] },
    { ch: '11장 실무 빌딩 스토리', title: '세 스토리 한눈에 비교 (A/B/C)', href: 'chapters/11-real-stories.html#overview', keys: ['스토리', '비교', 'A B C'] },
    { ch: '11장 실무 빌딩 스토리', title: '스토리 A · 결혼식 정적 사이트 (스킬 없이)', href: 'chapters/11-real-stories.html#story-a', keys: ['결혼식', '정적', '미니멀', '스킬 없이'] },
    { ch: '11장 실무 빌딩 스토리', title: '스토리 B · URL 단축 SaaS (스킬 적극)', href: 'chapters/11-real-stories.html#story-b', keys: ['SaaS', 'URL 단축', 'superpowers', 'Cloudflare', '풀 자동화'] },
    { ch: '11장 실무 빌딩 스토리', title: '스토리 C · 가족 소비 트래커 PWA (스킬 최소)', href: 'chapters/11-real-stories.html#story-c', keys: ['PWA', '소비 트래커', '균형', '최소'] },
    { ch: '11장 실무 빌딩 스토리', title: '세 스토리에서 추리는 5가지 교훈', href: 'chapters/11-real-stories.html#lessons', keys: ['교훈', '회고', '도구의 무게'] },
    { ch: '12장 트러블슈팅', title: '권한 프롬프트 무한 반복', href: 'chapters/12-troubleshooting.html#permission-loop', keys: ['권한', '무한', '반복', '와일드카드'] },
    { ch: '12장 트러블슈팅', title: '컨텍스트 폭발 — /compact 효과 없음', href: 'chapters/12-troubleshooting.html#context-explode', keys: ['컨텍스트', 'compact', '폭발', '1M'] },
    { ch: '12장 트러블슈팅', title: '잘못 수정한 파일 복구', href: 'chapters/12-troubleshooting.html#file-recovery', keys: ['복구', 'checkpointing', 'undo', 'git'] },
    { ch: '12장 트러블슈팅', title: '토큰 폭발 진단·예방', href: 'chapters/12-troubleshooting.html#token-explosion', keys: ['토큰 폭발', 'ccusage 세션'] },
    { ch: '12장 트러블슈팅', title: '자주 만나는 에러 메시지', href: 'chapters/12-troubleshooting.html#errors', keys: ['error', 'Rate limit', 'Context window', 'Permission denied'] },
    { ch: '12장 트러블슈팅', title: '/doctor — 첫 진단 명령', href: 'chapters/12-troubleshooting.html#doctor', keys: ['doctor', '진단'] },
    { ch: '13장 프롬프팅 기술', title: '좋은 vs 나쁜 프롬프트 (5요소 공식)', href: 'chapters/13-prompting.html#good-bad', keys: ['프롬프트', '좋은', '나쁜', '공식'] },
    { ch: '13장 프롬프팅 기술', title: '"계획부터 보여줘" 패턴', href: 'chapters/13-prompting.html#plan-first', keys: ['계획부터', 'plan first'] },
    { ch: '13장 프롬프팅 기술', title: '컨텍스트 주는 3가지 방법', href: 'chapters/13-prompting.html#context', keys: ['컨텍스트', '경로', '멘션', '본문'] },
    { ch: '13장 프롬프팅 기술', title: '출력 형식 강제 (표·JSON·체크리스트)', href: 'chapters/13-prompting.html#output-format', keys: ['출력 형식', 'JSON', '표'] },
    { ch: '13장 프롬프팅 기술', title: '모델별 프롬프팅 전략', href: 'chapters/13-prompting.html#by-model', keys: ['모델별', 'Opus Sonnet Haiku'] },
    { ch: '13장 프롬프팅 기술', title: '3대 안티패턴', href: 'chapters/13-prompting.html#anti-patterns', keys: ['안티패턴', '잘 만들어줘'] },
    { ch: '14장 팀·협업 운영', title: '.claude/ 커밋 vs ignore', href: 'chapters/14-team.html#claude-dir', keys: ['claude 폴더', 'gitignore', '커밋'] },
    { ch: '14장 팀·협업 운영', title: '팀 권한 정책 합의 5단계', href: 'chapters/14-team.html#permission-policy', keys: ['팀 권한', 'allow ask deny'] },
    { ch: '14장 팀·협업 운영', title: '모델·비용 정책', href: 'chapters/14-team.html#model-cost-policy', keys: ['모델 정책', '비용 정책'] },
    { ch: '14장 팀·협업 운영', title: 'CLAUDE.md 충돌 관리', href: 'chapters/14-team.html#claude-md-conflict', keys: ['CLAUDE.md 충돌', '오너'] },
    { ch: '14장 팀·협업 운영', title: '신입 온보딩 5일 체크리스트', href: 'chapters/14-team.html#onboarding', keys: ['온보딩', '신입'] },
    { ch: '14장 팀·협업 운영', title: 'AI 코드 리뷰 가이드라인', href: 'chapters/14-team.html#ai-code-review', keys: ['AI 코드', '리뷰'] },
    { ch: '14장 팀·협업 운영', title: '비밀 정보 5가지 절대 규칙', href: 'chapters/14-team.html#secrets', keys: ['비밀', 'secrets', 'API 키'] },
    { ch: '15장 비용 최적화', title: '비싼 패턴 진단 (ccusage)', href: 'chapters/15-cost.html#diagnose', keys: ['비싼', '진단', 'ccusage'] },
    { ch: '15장 비용 최적화', title: '작업 유형별 모델 선택', href: 'chapters/15-cost.html#model-choice', keys: ['모델 선택', 'Opus Sonnet Haiku'] },
    { ch: '15장 비용 최적화', title: '프롬프트 캐싱 활용', href: 'chapters/15-cost.html#caching', keys: ['캐싱', 'cache_read', 'CLAUDE.md'] },
    { ch: '15장 비용 최적화', title: '서브에이전트로 비용 격리', href: 'chapters/15-cost.html#subagent-isolation', keys: ['서브에이전트', '격리', 'Haiku'] },
    { ch: '15장 비용 최적화', title: 'CI 비용 차등화', href: 'chapters/15-cost.html#ci-cost', keys: ['CI 비용', 'effort'] },
    { ch: '15장 비용 최적화', title: '비용 폭주 안티패턴 4가지', href: 'chapters/15-cost.html#anti-patterns', keys: ['안티패턴', '비용 폭주'] },
    { ch: '15장 비용 최적화', title: '5분 안에 적용하는 빠른 절감', href: 'chapters/15-cost.html#quick-wins', keys: ['빠른 절감', 'quick'] },
    { ch: '16장 부록', title: '한 페이지 명령어 치트시트', href: 'chapters/16-cheatsheet.html#commands', keys: ['치트시트', '명령어'] },
    { ch: '16장 부록', title: 'settings.json 템플릿 3종 (미니멀·실무·엔터프라이즈)', href: 'chapters/16-cheatsheet.html#settings-templates', keys: ['settings 템플릿'] },
    { ch: '16장 부록', title: 'CLAUDE.md 템플릿 3종 (개인·팀·오픈소스)', href: 'chapters/16-cheatsheet.html#claude-md-templates', keys: ['CLAUDE.md 템플릿'] },
    { ch: '16장 부록', title: 'SKILL.md 템플릿 3종 (수동·자동·승인)', href: 'chapters/16-cheatsheet.html#skill-templates', keys: ['SKILL.md 템플릿'] },
    { ch: '16장 부록', title: 'hooks 스니펫 10선', href: 'chapters/16-cheatsheet.html#hooks-snippets', keys: ['hooks 스니펫'] },
    { ch: '16장 부록', title: '권한 패턴 카드', href: 'chapters/16-cheatsheet.html#permission-patterns', keys: ['권한 패턴'] },
    { ch: '16장 부록', title: '.mcp.json 템플릿', href: 'chapters/16-cheatsheet.html#mcp-templates', keys: ['mcp 템플릿'] },
    { ch: '16장 부록', title: '자주 쓰는 프롬프트 5종', href: 'chapters/16-cheatsheet.html#prompt-snippets', keys: ['프롬프트 5종', 'snippet'] },
    { ch: '17장 비용 효율화 사례집', title: '절감 사례 4개 한눈 비교', href: 'chapters/17-cost-stories.html#overview', keys: ['사례', '비교', '절감'] },
    { ch: '17장 비용 효율화 사례집', title: '사례 ① 스타트업 — 모델 다운그레이드 70% 절감', href: 'chapters/17-cost-stories.html#case-1', keys: ['스타트업', 'Opus Sonnet 다운그레이드', '기본값'] },
    { ch: '17장 비용 효율화 사례집', title: '사례 ② 오픈소스 — CI 차등화 74% 절감', href: 'chapters/17-cost-stories.html#case-2', keys: ['오픈소스', 'CI 차등', 'effort'] },
    { ch: '17장 비용 효율화 사례집', title: '사례 ③ 솔로 — CLAUDE.md 다이어트 66% 절약', href: 'chapters/17-cost-stories.html#case-3', keys: ['솔로', 'CLAUDE.md 다이어트', '가지치기'] },
    { ch: '17장 비용 효율화 사례집', title: '사례 ④ 데이터팀 — Haiku 서브에이전트 82% 절감', href: 'chapters/17-cost-stories.html#case-4', keys: ['데이터팀', 'Haiku', '분류', '서브에이전트'] },
    { ch: '17장 비용 효율화 사례집', title: '프로젝트 단계별 효율 시나리오 (설계·구축·출시·운영·회고)', href: 'chapters/17-cost-stories.html#lifecycle', keys: ['단계별', 'lifecycle', '설계 구축 운영'] },
    { ch: '17장 비용 효율화 사례집', title: 'AI 활용 일반 원칙 8가지 (Claude 무관)', href: 'chapters/17-cost-stories.html#ai-principles', keys: ['AI 원칙', '일반 원칙', '벤더 무관', '락인'] },
    { ch: '17장 비용 효율화 사례집', title: 'ROI 빠른 계산 — 사람 시간 환산', href: 'chapters/17-cost-stories.html#roi', keys: ['ROI', '환산', '사람 시간'] },
    { ch: '17장 비용 효율화 사례집', title: '팀 규모·예산 가이드라인 표', href: 'chapters/17-cost-stories.html#budget-guide', keys: ['예산', '팀 규모', '가이드라인'] },
    { ch: '18장 직군별 가이드', title: '6가지 직군 한눈 비교 표', href: 'chapters/18-by-role.html#overview', keys: ['직군 비교', '처방전'] },
    { ch: '18장 직군별 가이드', title: '🎨 프론트엔드 (React · Vue · Svelte · Next)', href: 'chapters/18-by-role.html#frontend', keys: ['프론트엔드', 'React', 'Vue', 'Svelte', 'Tailwind'] },
    { ch: '18장 직군별 가이드', title: '⚙️ 백엔드 (Node · Python · Go · Java)', href: 'chapters/18-by-role.html#backend', keys: ['백엔드', 'API', '마이그레이션', 'N+1'] },
    { ch: '18장 직군별 가이드', title: '📊 데이터 엔지니어 · ML 엔지니어', href: 'chapters/18-by-role.html#data-ml', keys: ['데이터', 'ML', 'EDA', 'Jupyter', 'pandas'] },
    { ch: '18장 직군별 가이드', title: '☁️ DevOps · SRE · 플랫폼', href: 'chapters/18-by-role.html#devops', keys: ['DevOps', 'SRE', 'K8s', 'Terraform', '인시던트'] },
    { ch: '18장 직군별 가이드', title: '📱 모바일 (iOS · Android · Flutter · RN)', href: 'chapters/18-by-role.html#mobile', keys: ['모바일', 'iOS', 'Android', 'Flutter', 'React Native', 'Fastlane'] },
    { ch: '18장 직군별 가이드', title: '🎓 신입·주니어 학습자', href: 'chapters/18-by-role.html#junior', keys: ['신입', '주니어', '학습', 'Plan mode'] }
  ];

  /* ---------- Theme ---------- */
  const THEME_KEY = 'ccguide-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
    const btn = document.querySelector('#theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
  }

  function initTheme() {
    let saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (_) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    const btn = document.querySelector('#theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(cur === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ---------- Sidebar (active + mobile toggle) ---------- */
  function initSidebar() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar__link').forEach((a) => {
      const href = a.getAttribute('href') || '';
      const hrefFile = href.split('/').pop().split('#')[0];
      if (hrefFile === path) a.classList.add('is-active');
    });

    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('is-open'));
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
          sidebar.classList.remove('is-open');
        }
      });
    }
  }

  /* ---------- Heading anchors + TOC ---------- */
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  function initHeadingsAndTOC() {
    const content = document.querySelector('.content');
    if (!content) return;
    const headings = content.querySelectorAll('h2, h3');
    const tocList = document.querySelector('.toc__list');

    headings.forEach((h) => {
      if (!h.id) h.id = slugify(h.textContent || '');
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'heading-anchor';
      a.setAttribute('aria-label', 'anchor');
      a.textContent = '#';
      h.appendChild(a);

      if (tocList) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + h.id;
        link.className = 'toc__link' + (h.tagName === 'H3' ? ' toc__link--h3' : '');
        link.textContent = (h.textContent || '').replace('#', '').trim();
        li.appendChild(link);
        tocList.appendChild(li);
      }
    });

    // Scroll spy
    if (tocList && 'IntersectionObserver' in window) {
      const links = tocList.querySelectorAll('.toc__link');
      const map = new Map();
      links.forEach((l) => map.set(l.getAttribute('href').slice(1), l));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const link = map.get(e.target.id);
            if (!link) return;
            if (e.isIntersecting) {
              links.forEach((l) => l.classList.remove('is-active'));
              link.classList.add('is-active');
            }
          });
        },
        { rootMargin: '-80px 0px -70% 0px' }
      );
      headings.forEach((h) => observer.observe(h));
    }
  }

  /* ---------- Copy buttons ---------- */
  function initCopyButtons() {
    document.querySelectorAll('pre').forEach((pre) => {
      // Skip if already wrapped
      if (pre.parentElement && pre.parentElement.classList.contains('code-wrap')) return;
      if (pre.closest('.code-tabs__panel')) {
        // Inside a tab panel — add button directly into panel for visibility
        const wrap = document.createElement('div');
        wrap.className = 'code-wrap';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        attachCopy(wrap, pre);
      } else {
        const wrap = document.createElement('div');
        wrap.className = 'code-wrap';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        attachCopy(wrap, pre);
      }
    });
  }

  function attachCopy(wrap, pre) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = '복사';
    btn.addEventListener('click', () => {
      const text = pre.innerText;
      const done = () => {
        btn.textContent = '복사됨';
        btn.classList.add('is-copied');
        setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('is-copied'); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
    wrap.appendChild(btn);
  }

  function fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (_) {}
    document.body.removeChild(ta);
  }

  /* ---------- Code tabs ---------- */
  function initCodeTabs() {
    document.querySelectorAll('.code-tabs').forEach((tabs) => {
      const nav = tabs.querySelector('.code-tabs__nav');
      const panels = tabs.querySelectorAll('.code-tabs__panel');
      if (!nav || panels.length === 0) return;

      // Activate first by default
      panels[0].classList.add('is-active');
      const btns = nav.querySelectorAll('.code-tabs__btn');
      if (btns.length) btns[0].classList.add('is-active');

      btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          btns.forEach((b) => b.classList.remove('is-active'));
          panels.forEach((p) => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          if (panels[i]) panels[i].classList.add('is-active');
        });
      });
    });
  }

  /* ---------- Search modal ---------- */
  function initSearch() {
    let overlay = document.querySelector('.search-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'search-overlay';
      overlay.innerHTML = `
        <div class="search-modal" role="dialog" aria-modal="true">
          <input type="text" class="search-input" placeholder="제목·키워드 검색 (예: MCP, 권한, 캐싱)" autocomplete="off" />
          <div class="search-results" role="listbox"></div>
          <div class="search-hint">
            <span><span class="kbd">↑↓</span> 이동 · <span class="kbd">Enter</span> 열기</span>
            <span><span class="kbd">Esc</span> 닫기</span>
          </div>
        </div>`;
      document.body.appendChild(overlay);
    }
    const input = overlay.querySelector('.search-input');
    const results = overlay.querySelector('.search-results');
    let activeIdx = 0;

    function open() {
      overlay.classList.add('is-open');
      input.value = '';
      render('');
      setTimeout(() => input.focus(), 0);
    }
    function close() { overlay.classList.remove('is-open'); }

    function basePath() {
      // chapters/ 내부면 ../ 붙이고, 루트면 그대로
      return location.pathname.includes('/chapters/') ? '../' : '';
    }

    function render(q) {
      const query = q.trim().toLowerCase();
      const items = !query
        ? SEARCH_INDEX
        : SEARCH_INDEX.filter((it) => {
            const hay = (it.title + ' ' + it.ch + ' ' + (it.keys || []).join(' ')).toLowerCase();
            return hay.includes(query);
          });
      activeIdx = 0;
      if (items.length === 0) {
        results.innerHTML = '<div class="search-empty">결과가 없습니다.</div>';
        return;
      }
      results.innerHTML = items.map((it, i) =>
        `<a class="search-result${i === 0 ? ' is-active' : ''}" href="${basePath()}${it.href}" data-i="${i}">
           <div class="search-result__chapter">${escapeHTML(it.ch)}</div>
           <div class="search-result__title">${escapeHTML(it.title)}</div>
         </a>`
      ).join('');
    }

    function escapeHTML(s) {
      return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    input.addEventListener('input', () => render(input.value));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    overlay.addEventListener('keydown', (e) => {
      const links = results.querySelectorAll('.search-result');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, links.length - 1);
        updateActive(links);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        updateActive(links);
      } else if (e.key === 'Enter') {
        const link = links[activeIdx];
        if (link) { e.preventDefault(); location.href = link.getAttribute('href'); }
      } else if (e.key === 'Escape') {
        close();
      }
    });

    function updateActive(links) {
      links.forEach((l, i) => l.classList.toggle('is-active', i === activeIdx));
      const el = links[activeIdx];
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    }

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); open();
      } else if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        close();
      }
    });

    const btn = document.querySelector('#search-trigger');
    if (btn) btn.addEventListener('click', open);
  }

  /* ---------- Checklist progress (localStorage) ---------- */
  const TODO_PREFIX = 'ccg-todo:';
  const TODO_RE = /^[\s ]*[☐☑✅✔][\s ]*/;

  function initChecklists() {
    const content = document.querySelector('.content');
    if (!content) return;

    const pageKey = location.pathname.split('/').pop() || 'index.html';
    const items = content.querySelectorAll('li');
    let idx = 0;
    let total = 0;

    items.forEach((li) => {
      const html = li.innerHTML;
      // Only match if the *visible* text starts with a checklist marker.
      // Strip leading whitespace/HTML comments to find the first character.
      const firstText = (li.textContent || '').replace(/^\s+/, '');
      if (!TODO_RE.test(firstText)) return;

      // Remove the marker character from innerHTML, preserving inner tags.
      const newHtml = html.replace(TODO_RE, '');
      const id = `${pageKey}::${idx++}`;
      const saved = localStorage.getItem(TODO_PREFIX + id) === '1';

      li.innerHTML =
        `<label class="todo">` +
        `<input type="checkbox" data-todo-id="${id}"${saved ? ' checked' : ''} />` +
        `<span>${newHtml}</span>` +
        `</label>`;
      total++;
    });

    if (total === 0) return;

    // Wire change handler
    content.querySelectorAll('[data-todo-id]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-todo-id');
        try {
          if (cb.checked) localStorage.setItem(TODO_PREFIX + id, '1');
          else localStorage.removeItem(TODO_PREFIX + id);
        } catch (_) {}
        updateProgress();
      });
    });

    // Inject progress widget above the checklist heading (if found),
    // otherwise prepend to content end.
    const headings = Array.from(content.querySelectorAll('h2'));
    const checklistHeading = headings.find((h) =>
      /체크리스트|checklist|체크 리스트/i.test(h.textContent || '')
    );
    const widget = document.createElement('div');
    widget.className = 'checklist-progress';
    widget.innerHTML =
      `<div class="checklist-progress__text">` +
        `<span>📊 이 페이지 진척도 <strong data-progress-done>0</strong> / <strong data-progress-total>${total}</strong></span>` +
        `<button type="button" class="checklist-progress__reset">초기화</button>` +
      `</div>` +
      `<div class="checklist-progress__bar"><span data-progress-bar></span></div>`;
    if (checklistHeading) {
      checklistHeading.parentNode.insertBefore(widget, checklistHeading);
    } else {
      content.appendChild(widget);
    }

    widget.querySelector('.checklist-progress__reset').addEventListener('click', () => {
      if (!window.confirm('이 페이지의 체크리스트를 모두 초기화할까요?')) return;
      content.querySelectorAll('[data-todo-id]').forEach((cb) => {
        cb.checked = false;
        try { localStorage.removeItem(TODO_PREFIX + cb.getAttribute('data-todo-id')); } catch (_) {}
      });
      updateProgress();
    });

    updateProgress();
  }

  function updateProgress() {
    const cbs = document.querySelectorAll('[data-todo-id]');
    const done = document.querySelectorAll('[data-todo-id]:checked').length;
    const total = cbs.length;
    const doneEl = document.querySelector('[data-progress-done]');
    const totalEl = document.querySelector('[data-progress-total]');
    const bar = document.querySelector('[data-progress-bar]');
    if (doneEl) doneEl.textContent = done;
    if (totalEl) totalEl.textContent = total;
    if (bar) bar.style.width = total ? `${(done / total) * 100}%` : '0%';
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initHeadingsAndTOC();
    initCodeTabs();
    initCopyButtons();
    initSearch();
    initChecklists();
  });
})();
