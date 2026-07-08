(function () {
  var bank = window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  bank.sets.push(
    {
  id: "n2-vocab-01",
  level: "n2",
  section: "vocab",
  title: "N2 기능어와 부사",
  time: "9분",
  goal: "N2 문장 논리를 만드는 기능어와 부사를 구별한다.",
  questions: [
    {
      id: "q1",
      prompt: "おかげで가 자연스러운 문맥은?",
      choices: [
        "강한 금지",
        "나쁜 결과의 원인",
        "좋은 결과의 원인",
        "단순 나열"
      ],
      answer: 2,
      explanation: "좋은 결과에는 おかげで, 나쁜 결과에는 せいで가 자주 온다."
    },
    {
      id: "q2",
      prompt: "にもかかわらず의 기능은?",
      choices: [
        "순서",
        "존경",
        "비교",
        "양보와 역접"
      ],
      answer: 3,
      explanation: "그럼에도 불구하고라는 양보 역접이다."
    },
    {
      id: "q3",
      prompt: "いよいよ의 느낌은?",
      choices: [
        "드디어",
        "대충",
        "몰래",
        "반드시"
      ],
      answer: 0,
      explanation: "기다리던 일이 가까워진 느낌이다."
    },
    {
      id: "q4",
      prompt: "こっそり의 뜻은?",
      choices: [
        "일부러",
        "몰래",
        "오히려",
        "마침내"
      ],
      answer: 1,
      explanation: "こっそり는 몰래라는 의태어성 부사다."
    },
    {
      id: "q5",
      prompt: "ざるを得ない의 뜻은?",
      choices: [
        "하지 않아도 된다",
        "할 리가 없다",
        "하지 않을 수 없다",
        "하기 쉽다"
      ],
      answer: 2,
      explanation: "선택지가 없다는 필연을 나타낸다."
    }
  ]
},
    {
  id: "n2-grammar-01",
  level: "n2",
  section: "grammar",
  title: "N2 유사 문형 판정",
  time: "12분",
  goal: "뜻이 비슷한 N2 문형을 기능 기준으로 고른다.",
  questions: [
    {
      id: "q1",
      prompt: "忙しい ___ 来てくれました. 양보 역접으로 가장 자연스러운 것은?",
      choices: [
        "うちに",
        "にとって",
        "せいで",
        "にもかかわらず"
      ],
      answer: 3,
      explanation: "바쁜데도 와 주었다는 양보 역접이다."
    },
    {
      id: "q2",
      prompt: "学生 ___ この制度は便利です. 관점 표시는?",
      choices: [
        "にとって",
        "せいで",
        "ものの",
        "ざるを得ず"
      ],
      answer: 0,
      explanation: "학생에게 있어서라는 판단 주체다."
    },
    {
      id: "q3",
      prompt: "雨の ___ 試合が中止になりました. 나쁜 결과 원인은?",
      choices: [
        "おかげで",
        "せいで",
        "に対して",
        "うちに"
      ],
      answer: 1,
      explanation: "나쁜 결과는 せいで가 자연스럽다."
    },
    {
      id: "q4",
      prompt: "便利になった ___ 問題も残っています. 가장 자연스러운 문형은?",
      choices: [
        "がち",
        "にとって",
        "ものの",
        "っぽい"
      ],
      answer: 2,
      explanation: "편리해졌지만 문제도 남아 있다는 역접이다."
    },
    {
      id: "q5",
      prompt: "忘れ ___ なので、メモしてください. 경향을 나타내는 것은?",
      choices: [
        "ざる",
        "次第",
        "っぽい",
        "がち"
      ],
      answer: 3,
      explanation: "がち는 좋지 않은 경향에 자주 붙는다."
    }
  ]
},
    {
  id: "n2-reading-01",
  level: "n2",
  section: "reading",
  title: "N2 실전 미니 지문",
  time: "12분",
  goal: "역접, 부분 부정, 결론을 표시한다.",
  passage: "通訳アプリのおかげで、旅行者は店で注文しやすくなった。その一方で、店員が相手の気持ちまで理解できるわけではない。便利になったものの、簡単な日本語で確認する姿勢は必要だ。",
  questions: [
    {
      id: "q1",
      prompt: "필자가 인정하는 긍정적 변화는?",
      choices: [
        "주문이 쉬워졌다",
        "모든 감정을 이해한다",
        "여행이 줄었다",
        "점원이 필요 없다"
      ],
      answer: 0,
      explanation: "注文しやすくなった가 긍정 변화다."
    },
    {
      id: "q2",
      prompt: "できるわけではない의 뜻은?",
      choices: [
        "반드시 할 수 있다",
        "할 수 있는 것은 아니다",
        "할 수밖에 없다",
        "하지 않을 수 없다"
      ],
      answer: 1,
      explanation: "わけではない는 부분 부정이다."
    },
    {
      id: "q3",
      prompt: "필자의 결론은?",
      choices: [
        "점원은 감정을 읽어야 한다",
        "앱만 쓰면 충분하다",
        "쉬운 일본어로 확인하는 태도가 필요하다",
        "주문하지 않는 편이 좋다"
      ],
      answer: 2,
      explanation: "마지막 문장이 결론이다."
    },
    {
      id: "q4",
      prompt: "ものの의 기능은?",
      choices: [
        "존경",
        "목적",
        "경험",
        "역접"
      ],
      answer: 3,
      explanation: "편리해졌지만이라는 흐름을 만든다."
    }
  ]
},
    {
  id: "n2-listening-01",
  level: "n2",
  section: "listening",
  title: "N2 과제이해 청해",
  time: "7분",
  goal: "누가 무엇을 해야 하는지와 이유를 듣는다.",
  audio: "assets/audio/cp-n2-listening.m4a",
  transcript: "店長: 今日は雨にもかかわらず、お客さんが多いですね。\n店員: はい。準備しておいた資料が足りないかもしれません。\n店長: じゃあ、追加で印刷しておいてください。\n店員: わかりました。終わり次第、入口に置きます。",
  questions: [
    {
      id: "q1",
      prompt: "店員이 해야 할 행동은?",
      choices: [
        "자료를 추가 인쇄한다",
        "입구를 닫는다",
        "회의를 취소한다",
        "손님에게 전화한다"
      ],
      answer: 0,
      explanation: "追加で印刷しておいてください라고 지시한다."
    },
    {
      id: "q2",
      prompt: "자료가 부족할 수 있는 이유는?",
      choices: [
        "비가 와서 늦어서",
        "손님이 많아서",
        "프린터가 고장 나서",
        "회의가 끝나서"
      ],
      answer: 1,
      explanation: "お客さんが多いですね가 이유다."
    },
    {
      id: "q3",
      prompt: "終わり次第의 뜻은?",
      choices: [
        "끝나지 않아도",
        "끝나기 전에",
        "끝나는 대로",
        "끝내지 말고"
      ],
      answer: 2,
      explanation: "次第는 그 일이 끝나면 곧바로라는 뜻을 만든다."
    }
  ]
}
  );
}());
