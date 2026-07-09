const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const label = document.querySelector("[data-theme-label]");
const progressInputs = document.querySelectorAll("[data-progress]");
const tocGroups = Array.from(document.querySelectorAll(".toc-group"));
const tocLinks = Array.from(document.querySelectorAll('.book-sidebar a[href^="#"]'));
const tocTargets = tocLinks
  .map((link) => {
    const id = link.getAttribute("href")?.slice(1);
    return id ? { link, target: document.getElementById(id) } : null;
  })
  .filter((item) => item?.target);
const portugueseCandidateSelectors = [
  ".inline-code",
  ".example-line",
  ".audio-script p",
  ".phrase-bank p",
  ".answer-sample p",
  ".prompt-sheet p",
  "td[data-label='예시']",
  "td[data-label='예문']",
  "td[data-label='문장 예시']",
  "td[data-label='기본 표현']",
  "td[data-label='조금 더 자연스럽게']",
  "td[data-label='단수']",
  "td[data-label='복수']",
  "td[data-label='명사']",
  "td[data-label='형용사']",
  "td[data-label='완성 문장']",
  "td[data-label='현재']",
  "td[data-label='과거']",
  "td[data-label='과거 perfeito']",
  "td[data-label='포르투갈어 도구']",
  "td[data-label='단어']",
  "td[data-label='표현']",
  "td[data-label='공식 답안 표현']",
  "td[data-label='자연스러운 결합']",
  "td[data-label='답안 예문']",
  "td[data-label='포르투갈어 재료']",
];

function looksPortuguese(text) {
  const normalizedText = text.trim();

  if (!normalizedText || /[가-힣]/.test(normalizedText)) {
    return false;
  }

  return /[áàâãçéêíóôõúü]/i.test(normalizedText)
    || /\b(eu|você|vocês|ele|ela|eles|elas|nós|não|que|de|do|da|dos|das|para|por|com|como|uma|um|os|as|é|são|ser|estar|ter|gostaria|solicito|governo|prefeitura|escola|moradores|acesso|saúde|educação|trabalho|Brasil|português)\b/i.test(normalizedText);
}

function annotatePortugueseText() {
  document.querySelectorAll(portugueseCandidateSelectors.join(",")).forEach((element) => {
    if (element.closest('[lang="pt-BR"]')) {
      return;
    }

    if (looksPortuguese(element.textContent || "")) {
      element.setAttribute("lang", "pt-BR");
    }
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "";
  if (!isDark) {
    root.removeAttribute("data-theme");
  }
  toggle?.setAttribute("aria-pressed", String(isDark));
  if (label) {
    label.textContent = isDark ? "라이트 모드" : "다크 모드";
  }
}

const initialTheme = localStorage.getItem("lp-theme") === "dark" ? "dark" : "light";
applyTheme(initialTheme);
annotatePortugueseText();

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("lp-theme", nextTheme);
  applyTheme(nextTheme);
});

progressInputs.forEach((input) => {
  const key = `lp-progress-${input.dataset.progress}`;
  input.checked = localStorage.getItem(key) === "true";
  input.addEventListener("change", () => {
    localStorage.setItem(key, String(input.checked));
  });
});

let activeTocLink = null;
let tocTicking = false;
let pendingTocTarget = null;
let pendingTocTimer = null;

function setActiveTocLink(nextLink) {
  if (nextLink === activeTocLink) {
    return;
  }

  activeTocLink?.removeAttribute("aria-current");
  if (!nextLink) {
    activeTocLink = null;
    return;
  }

  nextLink.setAttribute("aria-current", "true");
  activeTocLink = nextLink;

  const activeGroup = nextLink.closest(".toc-group");
  if (activeGroup?.classList.contains("is-collapsed")) {
    const toggleButton = activeGroup.querySelector(".toc-toggle");
    activeGroup.classList.remove("is-collapsed");
    toggleButton?.setAttribute("aria-expanded", "true");
    if (toggleButton) {
      toggleButton.textContent = "접기";
    }
  }

  if (nextLink.offsetParent !== null) {
    nextLink.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function setActiveTocLinkById(targetId) {
  const targetLink = tocLinks.find((link) => link.getAttribute("href") === `#${targetId}`);
  setActiveTocLink(targetLink);
}

function updateActiveToc() {
  const marker = 120;
  let current = null;

  if (pendingTocTarget) {
    const pendingTop = pendingTocTarget.getBoundingClientRect().top;
    if (pendingTop < 0 || pendingTop > marker) {
      tocTicking = false;
      return;
    }

    pendingTocTarget = null;
    window.clearTimeout(pendingTocTimer);
    pendingTocTimer = null;
  }

  tocTargets.forEach((item) => {
    if (item.target.getBoundingClientRect().top <= marker) {
      current = item;
    }
  });

  setActiveTocLink(current?.link);
  tocTicking = false;
}

function requestTocUpdate() {
  if (tocTicking || !tocTargets.length) {
    return;
  }

  tocTicking = true;
  window.requestAnimationFrame(updateActiveToc);
}

function scrollHashTargetIntoView() {
  const targetId = window.location.hash.slice(1);
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) {
    return;
  }

  const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(targetTop, 0), left: 0 });
  root.style.scrollBehavior = previousScrollBehavior;
  setActiveTocLinkById(targetId);
}

if (window.location.hash) {
  window.addEventListener("load", () => {
    window.requestAnimationFrame(scrollHashTargetIntoView);
    window.setTimeout(scrollHashTargetIntoView, 700);
  });
}

window.addEventListener("hashchange", scrollHashTargetIntoView);

tocLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.slice(1);
    pendingTocTarget = targetId ? document.getElementById(targetId) : null;
    window.clearTimeout(pendingTocTimer);
    pendingTocTimer = window.setTimeout(() => {
      pendingTocTarget = null;
      requestTocUpdate();
    }, 1800);
    setActiveTocLink(link);
  });
});

tocGroups.forEach((group) => {
  const toggleButton = group.querySelector(".toc-toggle");
  toggleButton?.addEventListener("click", () => {
    const isCollapsed = group.classList.toggle("is-collapsed");
    if (isCollapsed && activeTocLink && group.contains(activeTocLink)) {
      group.classList.remove("is-collapsed");
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.textContent = "접기";
      return;
    }

    toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
    toggleButton.textContent = isCollapsed ? "펼침" : "접기";
  });
});

window.addEventListener("scroll", requestTocUpdate, { passive: true });
window.addEventListener("resize", requestTocUpdate);
requestTocUpdate();
