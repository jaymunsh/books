/* =========================================================
   Codex CLI 가이드 · 동작 스크립트
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
    { ch: '랜딩', title: 'Codex CLI 완벽 가이드', href: 'index.html', keys: ['소개', '시작', '목차', 'codex'] },
    /* 0장 */
    { ch: '0장 기초', title: 'LLM 동작 원리 60초', href: 'chapters/00-concepts.html#llm-basics', keys: ['LLM', '토큰', '확률', '컨텍스트 윈도우'] },
    { ch: '0장 기초', title: 'GPT-5.5의 특징', href: 'chapters/00-concepts.html#gpt5-features', keys: ['GPT-5', '특징'] },
    { ch: '0장 기초', title: 'Codex CLI 작동 흐름도', href: 'chapters/00-concepts.html#codex-workflow', keys: ['작동 원리', '3축', '흐름도'] },
    { ch: '0장 기초', title: '4가지 메탈 모델', href: 'chapters/00-concepts.html#mental-models', keys: ['메탈 모델', '직관'] },
    { ch: '0장 기초', title: '다른 AI 도구 비교', href: 'chapters/00-concepts.html#vs-others', keys: ['Claude Code', 'Copilot', 'Cursor', 'Cline', 'Aider'] },
    { ch: '0장 기초', title: '🔤 LLM 용어 16선', href: 'chapters/00-concepts.html#glossary', keys: ['용어', 'KV Cache', 'RAG', 'CoT', 'Reasoning'] },
    /* 1장 */
    { ch: '1장 시작', title: '설치 (brew·curl·npm·PS)', href: 'chapters/01-getting-started.html#install', keys: ['설치', 'install', 'brew', 'npm'] },
    { ch: '1장 시작', title: 'ChatGPT 로그인 vs API 키', href: 'chapters/01-getting-started.html#install', keys: ['인증', 'ChatGPT', 'API key', 'OPENAI_API_KEY'] },
    { ch: '1장 시작', title: '실행 모드 (codex / exec / resume)', href: 'chapters/01-getting-started.html#modes', keys: ['모드', 'exec', 'resume', 'full-auto'] },
    { ch: '1장 시작', title: '첫 세션 워크플로우', href: 'chapters/01-getting-started.html#first-session', keys: ['첫 세션', '/init'] },
    { ch: '1장 시작', title: '핵심 단축키', href: 'chapters/01-getting-started.html#shortcuts', keys: ['단축키', 'shortcut'] },
    { ch: '1장 시작', title: 'IDE 통합', href: 'chapters/01-getting-started.html#ide', keys: ['IDE', 'VS Code', 'JetBrains', 'extension'] },
    /* 2장 */
    { ch: '2장 명령', title: '자주 쓰는 슬래시 명령', href: 'chapters/02-commands.html#slash-commands', keys: ['/help', '/init', '/model', '/approvals', '/sandbox', '/profile', '/mcp', '/status'] },
    { ch: '2장 명령', title: '3축 권한 시스템', href: 'chapters/02-commands.html#permissions', keys: ['권한', 'approval_policy', 'sandbox_mode', 'network_access', '3축'] },
    { ch: '2장 명령', title: 'AGENTS.md + AGENTS.override.md', href: 'chapters/02-commands.html#agents-md', keys: ['AGENTS.md', '메모리', 'override'] },
    { ch: '2장 명령', title: 'config.toml 4계층', href: 'chapters/02-commands.html#config-toml', keys: ['config.toml', '설정'] },
    /* 3장 */
    { ch: '3장 Cloud', title: 'Codex Cloud — 백그라운드·병렬', href: 'chapters/03-cloud-profiles.html#cloud-what', keys: ['Codex Cloud', '클라우드', '백그라운드', '병렬'] },
    { ch: '3장 Cloud', title: 'Cloud vs Local 비교 표', href: 'chapters/03-cloud-profiles.html#cloud-what', keys: ['Cloud vs Local'] },
    { ch: '3장 Cloud', title: 'UI 스크린샷 (GPT-5-Codex)', href: 'chapters/03-cloud-profiles.html#cloud-frontend', keys: ['스크린샷', '프론트엔드 검증'] },
    { ch: '3장 Cloud', title: 'Permission Profiles v0.129+', href: 'chapters/03-cloud-profiles.html#profiles', keys: ['profile', 'permission profile', 'dev', 'review', 'ci', 'danger'] },
    { ch: '3장 Cloud', title: 'Two-layer Security Model', href: 'chapters/03-cloud-profiles.html#profiles', keys: ['two-layer', 'security'] },
    /* 4장 */
    { ch: '4장 MCP', title: 'MCP 개념·구조도', href: 'chapters/04-mcp-integration.html#mcp', keys: ['MCP', 'Model Context Protocol'] },
    { ch: '4장 MCP', title: 'codex mcp add 명령', href: 'chapters/04-mcp-integration.html#mcp-add', keys: ['codex mcp', 'mcp add', 'stdio', 'http'] },
    { ch: '4장 MCP', title: '자주 쓰는 MCP 서버 12선', href: 'chapters/04-mcp-integration.html#mcp-servers', keys: ['github', 'slack', 'sentry', 'playwright', 'notion', 'postgres'] },
    { ch: '4장 MCP', title: 'GitHub CLI(gh) 통합', href: 'chapters/04-mcp-integration.html#gh', keys: ['gh', 'github cli', 'PR'] },
    { ch: '4장 MCP', title: 'Git worktree 활용', href: 'chapters/04-mcp-integration.html#worktree', keys: ['worktree'] },
    /* 5장 */
    { ch: '5장 자동화', title: 'codex exec 헤드리스', href: 'chapters/05-automation.html#headless', keys: ['codex exec', '헤드리스', 'headless'] },
    { ch: '5장 자동화', title: 'GitHub Actions 통합', href: 'chapters/05-automation.html#github-actions', keys: ['GitHub Actions', 'CI'] },
    { ch: '5장 자동화', title: 'Codex Cloud로 이슈 자동 처리', href: 'chapters/05-automation.html#codex-cloud-auto', keys: ['@codex 멘션', '이슈 자동'] },
    { ch: '5장 자동화', title: '크론 정기 작업', href: 'chapters/05-automation.html#cron', keys: ['cron', '크론', '정기'] },
    /* 6장 */
    { ch: '6장 멀티 에이전트', title: '3가지 접근 방식', href: 'chapters/06-orchestration.html#approaches', keys: ['오케스트레이션', '멀티 에이전트'] },
    { ch: '6장 멀티 에이전트', title: '모델 분리 — 비용 격리', href: 'chapters/06-orchestration.html#model-split', keys: ['모델 분리', 'mini', '비용 격리'] },
    { ch: '6장 멀티 에이전트', title: '5가지 패턴', href: 'chapters/06-orchestration.html#patterns', keys: ['pipeline', 'parallel', 'judge', 'loop-until-dry'] },
    /* 7장 */
    { ch: '7장 Agents SDK', title: 'CLI vs SDK 선택', href: 'chapters/07-agents-sdk.html#vs-cli', keys: ['SDK', 'Agents SDK'] },
    { ch: '7장 Agents SDK', title: '도구(Tool) 정의', href: 'chapters/07-agents-sdk.html#tools', keys: ['function_tool', '도구 정의'] },
    { ch: '7장 Agents SDK', title: 'Agent Handoffs — 멀티 에이전트', href: 'chapters/07-agents-sdk.html#multi', keys: ['handoff', 'triage'] },
    { ch: '7장 Agents SDK', title: '실전 — Slack 봇', href: 'chapters/07-agents-sdk.html#scenarios', keys: ['slack', '슬랙봇'] },
    /* 8장 */
    { ch: '8장 OpenAI API', title: '최신 모델 ID (gpt-5.5/mini/spark)', href: 'chapters/08-openai-api.html#models', keys: ['gpt-5.5', 'gpt-5.4-mini', 'spark', '모델 ID'] },
    { ch: '8장 OpenAI API', title: 'Responses API', href: 'chapters/08-openai-api.html#responses-api', keys: ['Responses API'] },
    { ch: '8장 OpenAI API', title: '자동 프롬프트 캐싱', href: 'chapters/08-openai-api.html#caching', keys: ['캐싱', 'cached_tokens', 'caching'] },
    { ch: '8장 OpenAI API', title: 'Reasoning effort', href: 'chapters/08-openai-api.html#reasoning', keys: ['reasoning', 'effort'] },
    { ch: '8장 OpenAI API', title: 'Function Calling', href: 'chapters/08-openai-api.html#tools', keys: ['function calling', 'tool_call'] },
    { ch: '8장 OpenAI API', title: 'Batch API — 50% 절감', href: 'chapters/08-openai-api.html#batch', keys: ['Batch API', '배치'] },
    /* 9장 */
    { ch: '9장 시나리오', title: '5종 한눈 비교', href: 'chapters/09-scenarios.html#overview', keys: ['시나리오', '5종'] },
    { ch: '9장 시나리오', title: 'PR 자동 코드 리뷰', href: 'chapters/09-scenarios.html#pr-review', keys: ['PR 리뷰'] },
    { ch: '9장 시나리오', title: '대규모 리팩터링 (Cloud)', href: 'chapters/09-scenarios.html#refactor', keys: ['리팩터링', 'Cloud 병렬'] },
    { ch: '9장 시나리오', title: '보안 모니터링', href: 'chapters/09-scenarios.html#security', keys: ['보안'] },
    { ch: '9장 시나리오', title: 'CI 자체 최적화', href: 'chapters/09-scenarios.html#ci-opt', keys: ['CI 최적화'] },
    { ch: '9장 시나리오', title: '문서 자동화', href: 'chapters/09-scenarios.html#docs', keys: ['문서 자동화'] },
    /* 10장 */
    { ch: '10장 커뮤니티', title: 'OpenAI 공식 도구 — openai/codex 등', href: 'chapters/10-community.html#official', keys: ['공식', 'openai/codex'] },
    { ch: '10장 커뮤니티', title: 'Codex Action — PR 자동', href: 'chapters/10-community.html#action', keys: ['Codex Action', 'GitHub Action'] },
    { ch: '10장 커뮤니티', title: '사용량·비용 모니터링', href: 'chapters/10-community.html#usage', keys: ['Usage', '비용 모니터링'] },
    { ch: '10장 커뮤니티', title: 'MCP 서버 컬렉션', href: 'chapters/10-community.html#ecosystem', keys: ['mcp 컬렉션', 'modelcontextprotocol/servers'] },
    /* 11장 */
    { ch: '11장 스토리', title: '3개 스토리 비교', href: 'chapters/11-real-stories.html#overview', keys: ['스토리', '비교'] },
    { ch: '11장 스토리', title: 'A · 결혼식 사이트 (기본만)', href: 'chapters/11-real-stories.html#story-a', keys: ['결혼식', '미니멀'] },
    { ch: '11장 스토리', title: 'B · URL 단축 SaaS (풀 자동화)', href: 'chapters/11-real-stories.html#story-b', keys: ['SaaS', 'URL 단축', '풀 자동화'] },
    { ch: '11장 스토리', title: 'C · 가족 PWA (균형)', href: 'chapters/11-real-stories.html#story-c', keys: ['PWA', '균형', '가족'] },
    /* 12장 */
    { ch: '12장 트러블슈팅', title: 'approval 무한 반복', href: 'chapters/12-troubleshooting.html#approval-loop', keys: ['approval', '무한 반복'] },
    { ch: '12장 트러블슈팅', title: 'sandbox 차단 문제', href: 'chapters/12-troubleshooting.html#sandbox-block', keys: ['sandbox 차단', 'network'] },
    { ch: '12장 트러블슈팅', title: '컨텍스트 폭발', href: 'chapters/12-troubleshooting.html#context-explode', keys: ['컨텍스트 폭발'] },
    { ch: '12장 트러블슈팅', title: '파일 복구', href: 'chapters/12-troubleshooting.html#file-recovery', keys: ['파일 복구', 'undo'] },
    { ch: '12장 트러블슈팅', title: '자주 만나는 에러', href: 'chapters/12-troubleshooting.html#errors', keys: ['error', 'Rate limit', '429'] },
    { ch: '12장 트러블슈팅', title: '/status — 첫 진단', href: 'chapters/12-troubleshooting.html#status', keys: ['/status', '진단'] },
    /* 13장 */
    { ch: '13장 프롬프팅', title: '좋은 vs 나쁜 프롬프트', href: 'chapters/13-prompting.html#good-bad', keys: ['프롬프트', '5요소'] },
    { ch: '13장 프롬프팅', title: 'reasoning effort 활용', href: 'chapters/13-prompting.html#reasoning', keys: ['reasoning effort'] },
    { ch: '13장 프롬프팅', title: '세션 이어가기 4가지', href: 'chapters/13-prompting.html#session-handoff', keys: ['codex resume', 'compact', 'handoff.md', '세션 이어가기'] },
    { ch: '13장 프롬프팅', title: 'handoff.md 운영', href: 'chapters/13-prompting.html#session-handoff', keys: ['handoff', '인수인계'] },
    /* 14장 */
    { ch: '14장 팀', title: '.codex/ 커밋 vs ignore', href: 'chapters/14-team.html#codex-dir', keys: ['.codex', 'gitignore', '커밋'] },
    { ch: '14장 팀', title: '팀 profile 정책', href: 'chapters/14-team.html#profile-policy', keys: ['팀 profile', '권한 정책'] },
    { ch: '14장 팀', title: '모델·비용 정책', href: 'chapters/14-team.html#model-policy', keys: ['모델 정책', '비용 정책'] },
    { ch: '14장 팀', title: '신입 온보딩', href: 'chapters/14-team.html#onboarding', keys: ['온보딩', '신입'] },
    { ch: '14장 팀', title: 'AI 코드 리뷰 5규칙', href: 'chapters/14-team.html#ai-code-review', keys: ['AI 코드 리뷰'] },
    { ch: '14장 팀', title: '비밀 정보 5규칙', href: 'chapters/14-team.html#secrets', keys: ['비밀', 'secrets'] },
    /* 15장 */
    { ch: '15장 비용', title: '작업별 모델 선택', href: 'chapters/15-cost.html#model-choice', keys: ['모델 선택', '비용 인덱스'] },
    { ch: '15장 비용', title: '자동 프롬프트 캐싱 활용', href: 'chapters/15-cost.html#caching', keys: ['캐싱', '자동 캐싱'] },
    { ch: '15장 비용', title: 'gpt-5.4-mini 서브에이전트', href: 'chapters/15-cost.html#subagent', keys: ['mini', '서브에이전트', '비용 격리'] },
    { ch: '15장 비용', title: 'CI 비용 차등', href: 'chapters/15-cost.html#ci-cost', keys: ['CI 차등'] },
    { ch: '15장 비용', title: 'ChatGPT Plan vs API 직결', href: 'chapters/15-cost.html#chatgpt-vs-api', keys: ['ChatGPT Plus', 'Pro', 'API 직결'] },
    { ch: '15장 비용', title: '5분 빠른 절감', href: 'chapters/15-cost.html#quick-wins', keys: ['빠른 절감', 'quick'] },
    /* 16장 */
    { ch: '16장 부록', title: '명령어 치트시트', href: 'chapters/16-cheatsheet.html#commands', keys: ['치트시트', '명령어'] },
    { ch: '16장 부록', title: 'config.toml 템플릿 3종', href: 'chapters/16-cheatsheet.html#config-templates', keys: ['config 템플릿'] },
    { ch: '16장 부록', title: 'AGENTS.md 템플릿 3종', href: 'chapters/16-cheatsheet.html#agents-templates', keys: ['AGENTS 템플릿'] },
    { ch: '16장 부록', title: 'MCP 템플릿', href: 'chapters/16-cheatsheet.html#mcp-templates', keys: ['MCP 템플릿'] },
    { ch: '16장 부록', title: 'handoff·일지 템플릿', href: 'chapters/16-cheatsheet.html#handoff-templates', keys: ['handoff', '일지'] },
    { ch: '16장 부록', title: '프롬프트 5종', href: 'chapters/16-cheatsheet.html#prompt-snippets', keys: ['프롬프트 5종'] },
    { ch: '16장 부록', title: 'Claude Code vs Codex 비교', href: 'chapters/16-cheatsheet.html#claude-vs-codex', keys: ['Claude Code 비교', '차이'] },
    /* 17장 */
    { ch: '17장 사례집', title: '절감 사례 4개', href: 'chapters/17-cost-stories.html#overview', keys: ['절감 사례'] },
    { ch: '17장 사례집', title: '① 디폴트 모델 분리', href: 'chapters/17-cost-stories.html#case-1', keys: ['디폴트', '스타트업'] },
    { ch: '17장 사례집', title: '② CI 차등 75%', href: 'chapters/17-cost-stories.html#case-2', keys: ['CI 차등'] },
    { ch: '17장 사례집', title: '③ AGENTS.md 다이어트', href: 'chapters/17-cost-stories.html#case-3', keys: ['AGENTS.md 다이어트'] },
    { ch: '17장 사례집', title: '④ Cloud → Batch API', href: 'chapters/17-cost-stories.html#case-4', keys: ['Batch API', '데이터팀'] },
    { ch: '17장 사례집', title: '단계별 효율 시나리오', href: 'chapters/17-cost-stories.html#lifecycle', keys: ['단계별', 'lifecycle'] },
    { ch: '17장 사례집', title: 'AI 활용 8원칙 (벤더 무관)', href: 'chapters/17-cost-stories.html#ai-principles', keys: ['AI 원칙', '8원칙', '벤더 무관'] },
    /* 18장 */
    { ch: '18장 직군별', title: '6가지 직군 비교', href: 'chapters/18-by-role.html#overview', keys: ['직군 비교'] },
    { ch: '18장 직군별', title: '🎨 프론트엔드', href: 'chapters/18-by-role.html#frontend', keys: ['프론트엔드', 'React'] },
    { ch: '18장 직군별', title: '⚙️ 백엔드', href: 'chapters/18-by-role.html#backend', keys: ['백엔드'] },
    { ch: '18장 직군별', title: '📊 데이터·ML', href: 'chapters/18-by-role.html#data-ml', keys: ['데이터', 'ML', 'Jupyter'] },
    { ch: '18장 직군별', title: '☁️ DevOps·SRE', href: 'chapters/18-by-role.html#devops', keys: ['DevOps', 'SRE', '인시던트'] },
    { ch: '18장 직군별', title: '📱 모바일', href: 'chapters/18-by-role.html#mobile', keys: ['모바일', 'iOS', 'Android', 'RN'] },
    { ch: '18장 직군별', title: '🎓 신입·주니어', href: 'chapters/18-by-role.html#junior', keys: ['신입', '주니어', '학습'] }
  ];

  /* ---------- Theme ---------- */
  const THEME_KEY = 'codexguide-theme';

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
          <input type="text" class="search-input" placeholder="제목·키워드 검색 (예: AGENTS.md, sandbox, MCP)" autocomplete="off" />
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
  const TODO_PREFIX = 'codex-todo:';
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
