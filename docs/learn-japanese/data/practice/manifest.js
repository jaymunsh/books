(function () {
  window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  window.PRACTICE_META = {
    levels: [
      { id: "n5", label: "N5", title: "기초 문장과 생활 표현", target: "문자·조사·기본 청해 자동화" },
      { id: "n4", label: "N4", title: "문체 전환과 조건 표현", target: "보통체·수수·조건·경어 안정화" },
      { id: "n3", label: "N3", title: "중급 문장 처리", target: "긴 문장 구조와 독해 루틴 형성" },
      { id: "n2", label: "N2", title: "실전 독해와 빠른 청해", target: "기능어·추상어·과제이해 강화" },
      { id: "n1", label: "N1", title: "상급 논리와 함축", target: "장문 논지·완곡한 결론·시간 운영" }
    ],
    sections: [
      { id: "vocab", label: "문자·어휘" },
      { id: "grammar", label: "문법" },
      { id: "reading", label: "독해" },
      { id: "listening", label: "청해" }
    ],
    files: {
      n5: ["data/practice/n5.js", "data/practice/n5-drills.js"],
      n4: ["data/practice/n4.js", "data/practice/n4-drills.js"],
      n3: ["data/practice/n3.js", "data/practice/n3-drills.js"],
      n2: ["data/practice/n2.js", "data/practice/n2-drills.js", "data/practice/n2-mock.js", "data/practice/n2-final.js"],
      n1: ["data/practice/n1.js", "data/practice/n1-drills.js", "data/practice/n1-mock.js", "data/practice/n1-final.js"]
    },
    counts: { n5: 12, n4: 12, n3: 12, n2: 25, n1: 25 }
  };
}());
