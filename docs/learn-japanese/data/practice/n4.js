(function () {
  var bank = window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  bank.sets.push(
    {
  id: "n4-vocab-01",
  level: "n4",
  section: "vocab",
  title: "N4 생활 어휘와 경어 입문",
  time: "8분",
  goal: "약속, 연락, 병원, 기본 경어 어휘를 구별한다.",
  questions: [
    {
      id: "q1",
      prompt: "約束의 뜻은?",
      choices: [
        "약속",
        "연락",
        "병원",
        "회의"
      ],
      answer: 0,
      explanation: "約束는 やくそく, 약속이다."
    },
    {
      id: "q2",
      prompt: "連絡する의 뜻은?",
      choices: [
        "기다리다",
        "연락하다",
        "소개하다",
        "빌리다"
      ],
      answer: 1,
      explanation: "連絡는 연락, する를 붙여 연락하다가 된다."
    },
    {
      id: "q3",
      prompt: "病院의 읽기와 뜻은?",
      choices: [
        "びよういん / 미용실",
        "びんいん / 우체국",
        "びょういん / 병원",
        "びょうき / 병"
      ],
      answer: 2,
      explanation: "病院은 びょういん으로 읽는다."
    },
    {
      id: "q4",
      prompt: "見る의 존경어는?",
      choices: [
        "拝見する",
        "申す",
        "参る",
        "ご覧になる"
      ],
      answer: 3,
      explanation: "ご覧になる는 見る의 존경어다."
    },
    {
      id: "q5",
      prompt: "見る의 겸양어는?",
      choices: [
        "拝見する",
        "ご覧になる",
        "召し上がる",
        "おっしゃる"
      ],
      answer: 0,
      explanation: "拝見する는 내가 보는 행동을 낮추는 겸양어다."
    }
  ]
},
    {
  id: "n4-grammar-01",
  level: "n4",
  section: "grammar",
  title: "N4 보통체와 조건",
  time: "12분",
  goal: "정중체를 보통체로 바꾸고 조건 표현을 구별한다.",
  questions: [
    {
      id: "q1",
      prompt: "行きます의 보통체 과거는?",
      choices: [
        "行く",
        "行った",
        "行きた",
        "行って"
      ],
      answer: 1,
      explanation: "行く의 과거 보통체는 行った이다."
    },
    {
      id: "q2",
      prompt: "静かです의 보통체 현재는?",
      choices: [
        "静かだった",
        "静かい",
        "静かだ",
        "静か"
      ],
      answer: 2,
      explanation: "な형용사 보통체 현재는 だ를 붙인다."
    },
    {
      id: "q3",
      prompt: "駅に着いたら電話してください에서 たら의 기능은?",
      choices: [
        "화제 제시",
        "항상 그렇게 됨",
        "동시 진행",
        "그 일이 일어난 뒤"
      ],
      answer: 3,
      explanation: "도착한 뒤 전화해 달라는 일회성 계기다."
    },
    {
      id: "q4",
      prompt: "春になると花が咲きます에서 と의 느낌은?",
      choices: [
        "자동 결과",
        "부탁",
        "전문",
        "경험"
      ],
      answer: 0,
      explanation: "と는 조건이 되면 자연스럽게 이어지는 결과에 자주 쓴다."
    },
    {
      id: "q5",
      prompt: "友だちが手伝ってくれました에서 이익을 받은 쪽은?",
      choices: [
        "선생님 쪽",
        "말하는 사람 쪽",
        "친구 쪽",
        "모두 아님"
      ],
      answer: 1,
      explanation: "てくれる는 상대 행동이 내 쪽에 이익으로 오는 표현이다."
    }
  ]
},
    {
  id: "n4-reading-01",
  level: "n4",
  section: "reading",
  title: "N4 약속 변경 메시지",
  time: "9분",
  goal: "이유와 최종 약속 시간을 읽는다.",
  passage: "すみません。今日の約束ですが、仕事がまだ終わらないので、二時は少し難しいです。三時なら行けます。駅の前で会いましょう。",
  questions: [
    {
      id: "q1",
      prompt: "왜 2시가 어려운가?",
      choices: [
        "몸이 아파서",
        "역을 몰라서",
        "일이 끝나지 않아서",
        "비가 와서"
      ],
      answer: 2,
      explanation: "仕事がまだ終わらないので가 이유다."
    },
    {
      id: "q2",
      prompt: "가능한 시간은?",
      choices: [
        "1시",
        "2시",
        "취소",
        "3시"
      ],
      answer: 3,
      explanation: "三時なら行けます라고 했다."
    },
    {
      id: "q3",
      prompt: "만나는 장소는?",
      choices: [
        "역 앞",
        "도서관",
        "학교 안",
        "가게 안"
      ],
      answer: 0,
      explanation: "駅の前で会いましょう가 장소다."
    },
    {
      id: "q4",
      prompt: "ので의 기능은?",
      choices: [
        "비교",
        "이유",
        "전문",
        "양보"
      ],
      answer: 1,
      explanation: "ので는 부드러운 이유 제시다."
    }
  ]
},
    {
  id: "n4-listening-01",
  level: "n4",
  section: "listening",
  title: "N4 약속 변경 청해",
  time: "6분",
  goal: "최종 시간과 변경 이유를 듣는다.",
  audio: "assets/audio/cp-n4-listening.m4a",
  transcript: "女: 今日の約束ですが、二時は少し難しいです。\n男: どうしましたか。\n女: 仕事がまだ終わらないんです。\n男: では、三時にしましょう。\n女: ありがとうございます。",
  questions: [
    {
      id: "q1",
      prompt: "약속 시간은 어떻게 바뀌는가?",
      choices: [
        "취소",
        "2시",
        "3시",
        "내일"
      ],
      answer: 2,
      explanation: "三時にしましょう라고 정한다."
    },
    {
      id: "q2",
      prompt: "왜 시간이 바뀌는가?",
      choices: [
        "길을 몰라서",
        "가게가 닫혀서",
        "비가 와서",
        "일이 끝나지 않아서"
      ],
      answer: 3,
      explanation: "仕事がまだ終わらないんです가 이유다."
    },
    {
      id: "q3",
      prompt: "では의 역할은?",
      choices: [
        "앞 상황을 받아 결론을 낸다",
        "강한 금지",
        "과거 경험",
        "비교"
      ],
      answer: 0,
      explanation: "では는 그럼, 그러면의 흐름을 만든다."
    }
  ]
}
  );
}());
