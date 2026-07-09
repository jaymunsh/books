const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const subjectToc = document.querySelector(".subject-toc");
const subjectHeaderInner = document.querySelector(".subject-header-inner");
let subjectTocToggle;
let subjectTocBackdrop;
const tocLinks = [...document.querySelectorAll(".subject-toc a[href^='#']")];
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const partLinks = [
  ["1부", "군수직 이해", "learn.html#lesson-1-1"],
  ["2부", "응시 가능 상태", "learn.html#lesson-2-1"],
  ["3부", "채용공고 읽기", "learn.html#lesson-3-1"],
  ["4부", "합격 로드맵", "learn.html#lesson-4-1"],
  ["5부", "국어 전용", "korean.html"],
  ["6부", "행정법 전용", "admin-law.html"],
  ["7부", "경영학 전용", "management.html"],
  ["8부", "기출·모의고사", "learn.html#lesson-8-1"],
  ["9부", "원서접수", "learn.html#lesson-9-1"],
  ["10부", "필기 당일", "learn.html#lesson-10-1"],
  ["11부", "면접 준비", "learn.html#lesson-11-1"],
  ["12부", "임용과 적응", "learn.html#lesson-12-1"]
];

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "라이트 모드 켜기" : "다크 모드 켜기");
  themeToggle.setAttribute("title", isDark ? "라이트 모드" : "다크 모드");
  localStorage.setItem("mw-theme", root.dataset.theme);
}

function updateCurrentSection() {
  if (!sections.length) return;
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) return section;
    return active;
  }, sections[0]);
  tocLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${current.id}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setSubjectToc(open, restoreFocus = true) {
  if (!subjectToc || !subjectTocToggle || !subjectTocBackdrop) return;
  subjectToc.dataset.open = String(open);
  subjectTocBackdrop.dataset.open = String(open);
  subjectToc.setAttribute("aria-hidden", String(!open && window.matchMedia("(max-width: 980px)").matches));
  subjectTocToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("toc-open", open);
  if (!open && restoreFocus) {
    subjectTocToggle.focus();
  }
}

function setupMobileToc() {
  if (!subjectToc || !subjectHeaderInner || subjectTocToggle) return;
  subjectToc.id = subjectToc.id || "subject-toc";
  subjectTocToggle = document.createElement("button");
  subjectTocToggle.className = "subject-toc-toggle";
  subjectTocToggle.type = "button";
  subjectTocToggle.textContent = "목차";
  subjectTocToggle.setAttribute("aria-controls", subjectToc.id);
  subjectTocToggle.setAttribute("aria-expanded", "false");
  subjectTocToggle.setAttribute("aria-label", "목차 열기");

  subjectTocBackdrop = document.createElement("button");
  subjectTocBackdrop.className = "subject-toc-backdrop";
  subjectTocBackdrop.type = "button";
  subjectTocBackdrop.setAttribute("aria-label", "목차 닫기");
  subjectTocBackdrop.dataset.open = "false";

  const topNav = subjectHeaderInner.querySelector(".top-nav");
  subjectHeaderInner.insertBefore(subjectTocToggle, topNav);
  subjectToc.after(subjectTocBackdrop);

  subjectTocToggle.addEventListener("click", () => setSubjectToc(subjectToc.dataset.open !== "true"));
  subjectTocBackdrop.addEventListener("click", () => setSubjectToc(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && subjectToc.dataset.open === "true") {
      setSubjectToc(false);
    }
  });

  const syncHiddenState = () => {
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    subjectToc.setAttribute("aria-hidden", String(isMobile && subjectToc.dataset.open !== "true"));
    if (!isMobile) {
      subjectToc.dataset.open = "false";
      subjectTocBackdrop.dataset.open = "false";
      subjectTocToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("toc-open");
    }
  };
  window.addEventListener("resize", syncHiddenState);
  syncHiddenState();
}

function insertPartJump() {
  if (!subjectToc || subjectToc.querySelector(".part-jump")) return;
  const currentPage = location.pathname.split("/").pop() || "../index.html";
  const wrap = document.createElement("nav");
  wrap.className = "part-jump";
  wrap.setAttribute("aria-label", "다른 부로 이동");
  const heading = document.createElement("h3");
  heading.textContent = "다른 부로 이동";
  const guide = document.createElement("p");
  guide.textContent = "과목 교재에서 통합 리더와 다른 전용 교재로 바로 이동한다.";
  const list = document.createElement("ul");
  partLinks.forEach(([code, title, href]) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
    }
    const number = document.createElement("span");
    number.className = "toc-code";
    number.textContent = code;
    const body = document.createElement("span");
    body.className = "toc-title";
    body.textContent = title;
    link.append(number, body);
    item.append(link);
    list.append(item);
  });
  wrap.append(heading, guide, list);
  subjectToc.append(wrap);
}

applyTheme(localStorage.getItem("mw-theme") || "light");
insertPartJump();
setupMobileToc();

themeToggle?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

tocLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    setSubjectToc(false, false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", link.getAttribute("href"));
  });
});

document.addEventListener("scroll", updateCurrentSection, { passive: true });
window.addEventListener("load", updateCurrentSection);
updateCurrentSection();
