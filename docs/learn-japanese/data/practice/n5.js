(function () {
  var bank = window.PRACTICE_BANK = window.PRACTICE_BANK || { sets: [] };
  bank.sets.push(
    {
  id: "n5-vocab-01",
  level: "n5",
  section: "vocab",
  title: "N5 문자·어휘 기본 확인",
  time: "8분",
  goal: "히라가나, 가타카나, 기본 한자어를 즉시 읽고 뜻을 고른다.",
  questions: [
    {
      id: "q1",
      prompt: "えき의 한자와 뜻으로 맞는 것은?",
      choices: [
        "駅 / 역",
        "雨 / 비",
        "本 / 책",
        "水 / 물"
      ],
      answer: 0,
      explanation: "駅는 えき, 역이라는 뜻이다."
    },
    {
      id: "q2",
      prompt: "コーヒー에서 ー의 기능은?",
      choices: [
        "탁음을 만든다",
        "앞 소리를 길게 한다",
        "조사를 표시한다",
        "촉음을 만든다"
      ],
      answer: 1,
      explanation: "가타카나 장음 부호 ー는 앞 모음을 길게 읽게 한다."
    },
    {
      id: "q3",
      prompt: "学校의 읽기로 맞는 것은?",
      choices: [
        "がこう",
        "かくせい",
        "がっこう",
        "かっこ"
      ],
      answer: 2,
      explanation: "学校는 작은 っ과 장음 こう가 들어간다."
    },
    {
      id: "q4",
      prompt: "水を飲みます의 水 뜻은?",
      choices: [
        "차",
        "밥",
        "비",
        "물"
      ],
      answer: 3,
      explanation: "水는 みず, 물이다."
    },
    {
      id: "q5",
      prompt: "これはいくらですか가 자연스러운 상황은?",
      choices: [
        "가격을 묻는다",
        "시간을 묻는다",
        "장소를 묻는다",
        "이름을 묻는다"
      ],
      answer: 0,
      explanation: "いくら는 가격이나 수량을 물을 때 쓴다."
    }
  ]
},
    {
  id: "n5-grammar-01",
  level: "n5",
  section: "grammar",
  title: "N5 조사와 ます형",
  time: "10분",
  goal: "기본 조사와 정중체를 문장 안에서 고른다.",
  questions: [
    {
      id: "q1",
      prompt: "私は学生です의 は 역할은?",
      choices: [
        "방향을 표시한다",
        "주제를 세운다",
        "목적어를 표시한다",
        "장소를 표시한다"
      ],
      answer: 1,
      explanation: "は는 문장의 주제를 세우는 조사다."
    },
    {
      id: "q2",
      prompt: "水 ___ 飲みます에 들어갈 조사는?",
      choices: [
        "で",
        "へ",
        "を",
        "に"
      ],
      answer: 2,
      explanation: "を는 동작의 대상, 즉 목적어를 표시한다."
    },
    {
      id: "q3",
      prompt: "図書館 ___ 勉強します에 자연스러운 조사는?",
      choices: [
        "を",
        "と",
        "へ",
        "で"
      ],
      answer: 3,
      explanation: "で는 동작이 일어나는 장소를 표시한다."
    },
    {
      id: "q4",
      prompt: "食べる의 ます형은?",
      choices: [
        "食べます",
        "食べました",
        "食べまする",
        "食べります"
      ],
      answer: 0,
      explanation: "2류 동사는 る를 빼고 ます를 붙인다."
    },
    {
      id: "q5",
      prompt: "これは本ではありません의 뜻은?",
      choices: [
        "책을 읽습니다",
        "이것은 책이 아닙니다",
        "이것은 책입니까",
        "이것은 책입니다"
      ],
      answer: 1,
      explanation: "ではありません은 です의 부정형이다."
    }
  ]
},
    {
  id: "n5-reading-01",
  level: "n5",
  section: "reading",
  title: "N5 짧은 안내문 독해",
  time: "8분",
  goal: "짧은 생활 문장에서 장소, 시간, 행동을 찾는다.",
  passage: "あした、学校で日本語のテストがあります。テストは九時からです。えんぴつと消しゴムを持ってきてください。",
  questions: [
    {
      id: "q1",
      prompt: "테스트는 언제인가?",
      choices: [
        "어제",
        "오늘",
        "내일",
        "모레"
      ],
      answer: 2,
      explanation: "あした는 내일이다."
    },
    {
      id: "q2",
      prompt: "테스트 장소는?",
      choices: [
        "역",
        "도서관",
        "집",
        "학교"
      ],
      answer: 3,
      explanation: "学校で는 학교에서라는 뜻이다."
    },
    {
      id: "q3",
      prompt: "테스트 시작 시간은?",
      choices: [
        "9시",
        "7시",
        "10시",
        "12시"
      ],
      answer: 0,
      explanation: "九時から는 9시부터다."
    },
    {
      id: "q4",
      prompt: "가져가야 하는 것은?",
      choices: [
        "책과 공책",
        "연필과 지우개",
        "우산과 가방",
        "물과 도시락"
      ],
      answer: 1,
      explanation: "えんぴつ와 消しゴム가 필요하다."
    },
    {
      id: "q5",
      prompt: "持ってきてください의 기능은?",
      choices: [
        "금지",
        "경험",
        "부탁",
        "비교"
      ],
      answer: 2,
      explanation: "てください는 요청과 부탁을 만든다."
    }
  ]
},
    {
  id: "n5-listening-01",
  level: "n5",
  section: "listening",
  title: "N5 주문 장면 청해",
  time: "5분",
  goal: "주문 대상, 가격, 감사 표현을 듣는다.",
  audio: "assets/audio/cp-n5-listening.m4a",
  transcript: "店員: いらっしゃいませ。\n客: ラーメンをください。\n店員: はい。五百円です。\n客: ありがとうございます。",
  questions: [
    {
      id: "q1",
      prompt: "손님은 무엇을 주문하는가?",
      choices: [
        "물",
        "책",
        "커피",
        "라멘"
      ],
      answer: 3,
      explanation: "ラーメンをください라고 말한다."
    },
    {
      id: "q2",
      prompt: "가격은 얼마인가?",
      choices: [
        "500엔",
        "800엔",
        "300엔",
        "1000엔"
      ],
      answer: 0,
      explanation: "五百円です는 500엔입니다."
    },
    {
      id: "q3",
      prompt: "ありがとうございます의 기능은?",
      choices: [
        "사과",
        "감사",
        "거절",
        "질문"
      ],
      answer: 1,
      explanation: "ありがとうございます는 고맙습니다라는 감사 표현이다."
    }
  ]
}
  );
}());
