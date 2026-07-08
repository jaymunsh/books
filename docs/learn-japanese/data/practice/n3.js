(function () {
  var bank = window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  bank.sets.push(
    {
  id: "n3-vocab-01",
  level: "n3",
  section: "vocab",
  title: "N3 중급 어휘와 접속 신호",
  time: "8분",
  goal: "중급 독해에서 자주 보이는 접속사와 평가어를 고른다.",
  questions: [
    {
      id: "q1",
      prompt: "つまり의 기능은?",
      choices: [
        "강하게 부정한다",
        "반대로 말한다",
        "예를 든다",
        "앞 내용을 정리한다"
      ],
      answer: 3,
      explanation: "つまり는 즉, 다시 말해라는 정리 신호다."
    },
    {
      id: "q2",
      prompt: "しかし 뒤에서 특히 봐야 할 것은?",
      choices: [
        "필자의 핵심 주장",
        "앞 문장 반복",
        "인사말",
        "숫자 읽기"
      ],
      answer: 0,
      explanation: "역접 뒤에는 주장이나 결론이 오는 경우가 많다."
    },
    {
      id: "q3",
      prompt: "面倒의 뜻으로 가까운 것은?",
      choices: [
        "안전",
        "번거로움",
        "약속",
        "속도"
      ],
      answer: 1,
      explanation: "面倒는 귀찮음, 번거로움이다."
    },
    {
      id: "q4",
      prompt: "適当に答えないでください에서 適当의 느낌은?",
      choices: [
        "정확",
        "친절",
        "대충",
        "고급"
      ],
      answer: 2,
      explanation: "문맥상 대충이라는 부정적 의미다."
    },
    {
      id: "q5",
      prompt: "一方で의 기능은?",
      choices: [
        "감탄",
        "명령",
        "순서",
        "대조"
      ],
      answer: 3,
      explanation: "一方で는 한편으로라는 대조 신호다."
    }
  ]
},
    {
  id: "n3-grammar-01",
  level: "n3",
  section: "grammar",
  title: "N3 수동·추측·부분 부정",
  time: "12분",
  goal: "한국어 직역이 흔들리는 중급 문형을 구별한다.",
  questions: [
    {
      id: "q1",
      prompt: "雨に降られました의 자연스러운 뜻은?",
      choices: [
        "비를 맞아 곤란했다",
        "비를 내렸다",
        "비가 내리게 했다",
        "비를 좋아했다"
      ],
      answer: 0,
      explanation: "피해 수동은 당해서 곤란했다는 뉘앙스를 만든다."
    },
    {
      id: "q2",
      prompt: "彼は学生らしいです의 らしい는?",
      choices: [
        "금지",
        "추정",
        "비교",
        "수동"
      ],
      answer: 1,
      explanation: "학생인 듯하다는 추정이다."
    },
    {
      id: "q3",
      prompt: "嫌いなわけではありません의 뜻은?",
      choices: [
        "싫어해야 한다",
        "반드시 싫다",
        "싫어하는 것은 아니다",
        "싫어하게 했다"
      ],
      answer: 2,
      explanation: "わけではない는 부분 부정이다."
    },
    {
      id: "q4",
      prompt: "忘れてしまいました에서 しまう의 느낌은?",
      choices: [
        "가능",
        "전문",
        "존경",
        "완료와 아쉬움"
      ],
      answer: 3,
      explanation: "てしまう는 해 버렸다는 완료나 아쉬움을 만든다."
    },
    {
      id: "q5",
      prompt: "ドアが開いています의 開く은?",
      choices: [
        "자동사",
        "존경어",
        "겸양어",
        "타동사"
      ],
      answer: 0,
      explanation: "문이 열린 상태는 자동사 開く를 쓴다."
    }
  ]
},
    {
  id: "n3-reading-01",
  level: "n3",
  section: "reading",
  title: "N3 도서관 지문",
  time: "10분",
  goal: "접속사와 지시어를 추적해 결론을 잡는다.",
  passage: "最近、駅前に新しい図書館ができた。便利になった一方で、夜は人が多くて少し騒がしい。しかし、勉強する場所が増えたことは学生にとって大きい。この変化をどう使うかが大切だ。",
  questions: [
    {
      id: "q1",
      prompt: "一方で가 연결하는 내용은?",
      choices: [
        "책과 컴퓨터",
        "편리함과 시끄러움",
        "오늘과 내일",
        "학생과 선생님"
      ],
      answer: 1,
      explanation: "편리해졌지만 밤에는 사람이 많아 시끄럽다는 대조다."
    },
    {
      id: "q2",
      prompt: "しかし 뒤의 핵심 평가는?",
      choices: [
        "도서관은 필요 없다",
        "역 앞은 위험하다",
        "공부 장소가 늘어난 것은 중요하다",
        "밤에는 항상 닫는다"
      ],
      answer: 2,
      explanation: "역접 뒤에서 긍정 평가가 나온다."
    },
    {
      id: "q3",
      prompt: "この変化가 가리키는 것은?",
      choices: [
        "날씨 변화",
        "시험이 끝난 변화",
        "학생 수 감소",
        "새 도서관이 생긴 변화"
      ],
      answer: 3,
      explanation: "앞 문장들의 새 도서관 개관을 받는다."
    },
    {
      id: "q4",
      prompt: "필자의 결론은?",
      choices: [
        "변화를 어떻게 활용할지가 중요하다",
        "밤에만 공부해야 한다",
        "도서관을 피해야 한다",
        "역에서 기다려야 한다"
      ],
      answer: 0,
      explanation: "마지막 문장이 결론이다."
    }
  ]
},
    {
  id: "n3-listening-01",
  level: "n3",
  section: "listening",
  title: "N3 시설 안내 청해",
  time: "6분",
  goal: "시간, 조건, 주의 사항을 듣는다.",
  audio: "assets/audio/cp-n3-listening.m4a",
  transcript: "新しい図書館は、夜八時まで利用できます。コンピューター室を使う場合は、学生証が必要です。周りの人の迷惑にならないように、静かに利用してください。",
  questions: [
    {
      id: "q1",
      prompt: "도서관은 몇 시까지 이용할 수 있는가?",
      choices: [
        "12시",
        "8시",
        "10시",
        "6시"
      ],
      answer: 1,
      explanation: "夜八時まで利用できます라고 했다."
    },
    {
      id: "q2",
      prompt: "학생증이 필요한 곳은?",
      choices: [
        "카페",
        "책장",
        "컴퓨터실",
        "입구"
      ],
      answer: 2,
      explanation: "コンピューター室を使う場合は、学生証が必要です."
    },
    {
      id: "q3",
      prompt: "話者가 강조하는 태도는?",
      choices: [
        "빨리 나가기",
        "역에서 기다리기",
        "책을 사기",
        "조용히 이용하기"
      ],
      answer: 3,
      explanation: "静かに利用してください라고 한다."
    }
  ]
}
  );
}());
