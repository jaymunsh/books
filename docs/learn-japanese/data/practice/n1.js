(function () {
  var bank = window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  bank.sets.push(
    {
  id: "n1-vocab-01",
  level: "n1",
  section: "vocab",
  title: "N1 추상어와 시사어",
  time: "10분",
  goal: "상급 지문에서 평가 방향을 결정하는 추상어를 고른다.",
  questions: [
    {
      id: "q1",
      prompt: "懸念의 뜻은?",
      choices: [
        "축하",
        "예약",
        "완성",
        "우려"
      ],
      answer: 3,
      explanation: "懸念은 위험 가능성에 대한 우려다."
    },
    {
      id: "q2",
      prompt: "是正의 뜻은?",
      choices: [
        "시정",
        "축소",
        "방치",
        "찬성"
      ],
      answer: 0,
      explanation: "제도나 격차를 바로잡는 맥락에서 쓰인다."
    },
    {
      id: "q3",
      prompt: "不可欠의 뜻은?",
      choices: [
        "불편",
        "불가결",
        "불가능",
        "불규칙"
      ],
      answer: 1,
      explanation: "없어서는 안 된다는 강한 필요성을 나타낸다."
    },
    {
      id: "q4",
      prompt: "一見의 기능은?",
      choices: [
        "반드시",
        "오히려",
        "언뜻 보기에",
        "결국"
      ],
      answer: 2,
      explanation: "겉보기와 실제 판단을 대비할 때 자주 나온다."
    },
    {
      id: "q5",
      prompt: "裏を返せば의 뜻은?",
      choices: [
        "그대로 두면",
        "곧장 말하면",
        "예를 들면",
        "뒤집어 말하면"
      ],
      answer: 3,
      explanation: "앞 논리를 반대로 재해석하는 표현이다."
    }
  ]
},
    {
  id: "n1-grammar-01",
  level: "n1",
  section: "grammar",
  title: "N1 고급 기능어",
  time: "13분",
  goal: "고급 문형을 뜻이 아니라 논리 기능으로 판정한다.",
  questions: [
    {
      id: "q1",
      prompt: "子どもから高齢者 ___ 利用できます. 범위 끝점을 나타내는 것은?",
      choices: [
        "に至るまで",
        "べく",
        "まじき",
        "に足る"
      ],
      answer: 0,
      explanation: "に至るまで는 에 이르기까지라는 범위 표현이다."
    },
    {
      id: "q2",
      prompt: "計画の変更を ___ . 선택지가 없는 상황은?",
      choices: [
        "に足った",
        "余儀なくされた",
        "べくした",
        "ともなくした"
      ],
      answer: 1,
      explanation: "余儀なくされる는 어쩔 수 없이 하게 되다."
    },
    {
      id: "q3",
      prompt: "信頼 ___ 資料. 평가 기준을 만드는 것은?",
      choices: [
        "まじき",
        "べく",
        "に足る",
        "に至る"
      ],
      answer: 2,
      explanation: "信頼に足る는 신뢰할 만한이라는 뜻이다."
    },
    {
      id: "q4",
      prompt: "真相を明らかにする ___ 調査した. 목적 문어체는?",
      choices: [
        "ともなく",
        "に足る",
        "まじき",
        "べく"
      ],
      answer: 3,
      explanation: "べく는 하기 위해라는 격식 있는 목적 표현이다."
    },
    {
      id: "q5",
      prompt: "専門家にある ___ 発言. 비난 표현은?",
      choices: [
        "まじき",
        "べく",
        "に至る",
        "ともなく"
      ],
      answer: 0,
      explanation: "あるまじき는 지위에 맞지 않는 행동을 비판한다."
    }
  ]
},
    {
  id: "n1-reading-01",
  level: "n1",
  section: "reading",
  title: "N1 논설문 미니 지문",
  time: "14분",
  goal: "주장, 근거, 양보, 결론을 분리한다.",
  passage: "地方の人口減少をめぐって、行政の支援策が議論されている。補助金を増やすのみならず、若者が働き続けられる環境を整えることが不可欠だ。財源の問題はあるものの、対策を先送りすれば地域の衰退を余儀なくされる。",
  questions: [
    {
      id: "q1",
      prompt: "필자가 중요하다고 보는 것은?",
      choices: [
        "보조금 폐지",
        "젊은 사람이 계속 일할 환경 정비",
        "논의 중단",
        "인구 감소 방치"
      ],
      answer: 1,
      explanation: "環境を整えることが不可欠だ가 중심 주장이다."
    },
    {
      id: "q2",
      prompt: "のみならず의 기능은?",
      choices: [
        "조건",
        "부정",
        "첨가",
        "경험"
      ],
      answer: 2,
      explanation: "A뿐만 아니라 B도라는 첨가다."
    },
    {
      id: "q3",
      prompt: "あるものの 뒤의 흐름은?",
      choices: [
        "시간 순서",
        "단순 예시",
        "인사말",
        "양보 뒤의 경고"
      ],
      answer: 3,
      explanation: "재원 문제는 있지만 미루면 쇠퇴한다는 경고다."
    },
    {
      id: "q4",
      prompt: "対策を先送りすれば의 결과는?",
      choices: [
        "지역 쇠퇴를 피하기 어렵다",
        "청년이 늘어난다",
        "재원이 충분해진다",
        "논의가 끝난다"
      ],
      answer: 0,
      explanation: "地域の衰退を余儀なくされる가 결과다."
    }
  ]
},
    {
  id: "n1-listening-01",
  level: "n1",
  section: "listening",
  title: "N1 완곡한 결론 청해",
  time: "7분",
  goal: "표현의 친절함이 아니라 최종 결정을 듣는다.",
  audio: "assets/audio/cp-n1-listening.m4a",
  transcript: "社員: 新しい案ですが、来月から始められそうでしょうか。\n課長: 内容は悪くないんですが、今の人数では少し難しいですね。\n社員: では、今回はどうしましょうか。\n課長: 予算と人員を見直した上で、今回は見送ることにしましょう。",
  questions: [
    {
      id: "q1",
      prompt: "新しい案은 어떻게 되는가?",
      choices: [
        "바로 실시",
        "이번에는 보류",
        "예산 확정",
        "자료 폐기"
      ],
      answer: 1,
      explanation: "見送ることにしましょう는 이번에는 하지 말자는 결정이다."
    },
    {
      id: "q2",
      prompt: "문제가 되는 조건은?",
      choices: [
        "손님의 수",
        "회의실 위치",
        "예산과 인력",
        "자료 제목"
      ],
      answer: 2,
      explanation: "予算と人員を見直した上で라고 말한다."
    },
    {
      id: "q3",
      prompt: "内容は悪くないんですが의 실제 기능은?",
      choices: [
        "강한 칭찬",
        "즉시 승인",
        "주제 전환",
        "완곡한 보류로 넘어가는 완충"
      ],
      answer: 3,
      explanation: "좋게 들리지만 뒤에서 어렵다고 말하며 보류로 이어진다."
    }
  ]
}
  );
}());
