export interface AnimalInfo {
  id: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  descriptionKo: string;
  descriptionEn: string;
  celebritiesKo: string[];
  celebritiesEn: string[];
  color: string;
}

export const animals: AnimalInfo[] = [
  {
    id: "dog",
    nameKo: "강아지상",
    nameEn: "Dog",
    emoji: "🐶",
    descriptionKo:
      "누구에게나 친근하고 밝은 에너지를 가진 당신! 사람들을 편안하게 만드는 천부적인 능력이 있어요. 충성스럽고 헌신적인 성격 덕분에 주변에 항상 든든한 인기쟁이입니다.",
    descriptionEn:
      "You radiate warm, friendly energy that puts everyone at ease! You have a natural gift for making people feel comfortable. Your loyal and devoted personality makes you a beloved presence in any group.",
    celebritiesKo: ["아이유", "박보검", "유재석"],
    celebritiesEn: ["Ryan Reynolds", "Jennifer Aniston", "Tom Hanks"],
    color: "#F59E0B",
  },
  {
    id: "cat",
    nameKo: "고양이상",
    nameEn: "Cat",
    emoji: "🐱",
    descriptionKo:
      "독립적이고 신비로운 매력의 소유자! 좋아하는 사람에게는 한없이 다정하지만, 처음엔 쉽게 마음을 열지 않는 도도한 타입이에요. 예리한 감각과 우아한 분위기가 매력 포인트입니다.",
    descriptionEn:
      "Independent and mysteriously charming! You're endlessly affectionate to those you love but take time to open up to new people. Your sharp instincts and graceful presence make you irresistibly intriguing.",
    celebritiesKo: ["전지현", "공유", "이나은"],
    celebritiesEn: ["Zendaya", "Timothée Chalamet", "Angelina Jolie"],
    color: "#8B5CF6",
  },
  {
    id: "fox",
    nameKo: "여우상",
    nameEn: "Fox",
    emoji: "🦊",
    descriptionKo:
      "영리하고 매력적인 당신은 어느 상황에서도 빛을 발해요! 재치 있는 말솜씨와 센스로 분위기를 주도하는 타입. 겉으로는 쿨해 보이지만 사실 감수성이 풍부한 로맨티스트입니다.",
    descriptionEn:
      "Clever and magnetic, you shine in any situation! You lead the atmosphere with your witty words and sharp sense of style. Though you appear cool on the outside, you're actually a deeply sensitive romantic.",
    celebritiesKo: ["수지", "차은우", "아이린"],
    celebritiesEn: ["Scarlett Johansson", "Chris Evans", "Megan Fox"],
    color: "#EF4444",
  },
  {
    id: "bear",
    nameKo: "곰상",
    nameEn: "Bear",
    emoji: "🐻",
    descriptionKo:
      "듬직하고 포근한 느낌의 당신! 겉보기엔 강해 보이지만 내면은 누구보다 따뜻하고 섬세해요. 믿음직스러운 성격 덕분에 사람들이 고민을 털어놓고 싶어지는 타입입니다.",
    descriptionEn:
      "Sturdy and warm, you give off the most comforting vibes! Though you appear strong on the outside, your heart is warmer and more tender than anyone knows. People naturally want to confide in your reliable, trustworthy nature.",
    celebritiesKo: ["마동석", "손예진", "강하늘"],
    celebritiesEn: ["Dwayne Johnson", "Sandra Bullock", "Chris Hemsworth"],
    color: "#92400E",
  },
  {
    id: "rabbit",
    nameKo: "토끼상",
    nameEn: "Rabbit",
    emoji: "🐰",
    descriptionKo:
      "사랑스럽고 순수한 매력이 넘치는 당신! 빠릿빠릿한 행동력과 호기심으로 항상 새로운 것을 탐색해요. 겉모습은 귀엽지만 의외로 강한 멘탈과 고집이 있는 반전 매력의 소유자입니다.",
    descriptionEn:
      "You overflow with adorable, pure charm! Your quick reflexes and boundless curiosity keep you always exploring something new. Cute on the outside, but with a surprisingly resilient spirit and stubborn streak that catches everyone off guard.",
    celebritiesKo: ["김태리", "박지훈", "장원영"],
    celebritiesEn: ["Ariana Grande", "Harry Styles", "Selena Gomez"],
    color: "#EC4899",
  },
  {
    id: "deer",
    nameKo: "사슴상",
    nameEn: "Deer",
    emoji: "🦌",
    descriptionKo:
      "맑고 청순한 아름다움을 지닌 당신은 누구에게나 호감을 줘요. 섬세한 감수성과 예술적 감각이 뛰어나며, 자연과 음악, 문학을 사랑하는 감성파입니다. 처음엔 수줍어 보이지만 친해지면 엉뚱하고 귀여운 면이 있어요.",
    descriptionEn:
      "Your clear, innocent beauty wins over everyone you meet. You have exceptional sensitivity and artistic flair, and you're a true romantic who loves nature, music, and literature. Shy at first, but unexpectedly quirky and adorable once comfortable.",
    celebritiesKo: ["박신혜", "송중기", "나연"],
    celebritiesEn: ["Taylor Swift", "Shawn Mendes", "Emma Watson"],
    color: "#10B981",
  },
  {
    id: "hamster",
    nameKo: "햄스터상",
    nameEn: "Hamster",
    emoji: "🐹",
    descriptionKo:
      "통통하고 귀여운 볼살처럼 보기만 해도 기분이 좋아지는 당신! 열심히 사는 성실한 타입으로, 작은 것에도 행복을 느끼는 긍정 에너지가 넘쳐요. 좋아하는 것에 집착하는 귀여운 면모도 있답니다.",
    descriptionEn:
      "Just looking at your chubby cheeked cuteness makes everyone smile! You're a hardworking, diligent type who finds happiness in the smallest things. Your overflowing positive energy and adorable obsessions over things you love are irresistible.",
    celebritiesKo: ["레드벨벳 웬디", "NCT 지성", "트와이스 쯔위"],
    celebritiesEn: ["Billie Eilish", "Jung Kook", "Olivia Rodrigo"],
    color: "#F97316",
  },
  {
    id: "wolf",
    nameKo: "늑대상",
    nameEn: "Wolf",
    emoji: "🐺",
    descriptionKo:
      "카리스마 넘치고 강렬한 눈빛의 소유자! 자신만의 세계가 뚜렷하고 소신이 강한 타입이에요. 무리를 이끄는 리더십이 있지만, 자신이 선택한 소수와는 깊고 진한 유대를 형성합니다.",
    descriptionEn:
      "You have charisma and an intense gaze that commands attention! You have a strong, distinct worldview and unshakeable convictions. A natural leader of the pack, you form deep, meaningful bonds with the select few you truly let in.",
    celebritiesKo: ["송강호", "정해인", "김고은"],
    celebritiesEn: ["Keanu Reeves", "Cate Blanchett", "Oscar Isaac"],
    color: "#6B7280",
  },
  {
    id: "penguin",
    nameKo: "펭귄상",
    nameEn: "Penguin",
    emoji: "🐧",
    descriptionKo:
      "귀엽고 유머러스한 당신! 어디서나 분위기 메이커 역할을 톡톡히 하죠. 겉보기엔 코믹해 보여도 내면은 굉장히 성실하고 책임감이 강한 타입이에요. 한 번 좋아하면 끝까지 가는 일편단심입니다.",
    descriptionEn:
      "Cute and hilariously funny, you're the life of any party! Though you seem comedic on the outside, inside you're incredibly diligent and responsible. Once you commit to someone or something, your devotion knows no bounds.",
    celebritiesKo: ["박명수", "김신영", "황정음"],
    celebritiesEn: ["Kevin Hart", "Rebel Wilson", "Jack Black"],
    color: "#1D4ED8",
  },
  {
    id: "owl",
    nameKo: "올빼미상",
    nameEn: "Owl",
    emoji: "🦉",
    descriptionKo:
      "깊은 눈빛과 지적인 분위기를 가진 당신은 한 번 보면 잊혀지지 않아요. 관찰력과 통찰력이 뛰어나며, 말보다는 행동으로 자신을 표현해요. 밤에 더 활발해지는 올빼미형 인간이에요.",
    descriptionEn:
      "Your deep gaze and intellectual aura make you unforgettable. With remarkable observation skills and sharp insight, you express yourself through actions more than words. You truly come alive at night, a quintessential night owl.",
    celebritiesKo: ["류준열", "김다미", "최우식"],
    celebritiesEn: ["Benedict Cumberbatch", "Natalie Portman", "Joaquin Phoenix"],
    color: "#7C3AED",
  },
  {
    id: "squirrel",
    nameKo: "다람쥐상",
    nameEn: "Squirrel",
    emoji: "🐿️",
    descriptionKo:
      "에너지 넘치고 활동적인 당신! 항상 바쁘게 움직이며 다양한 일에 관심을 갖는 타입이에요. 준비성이 철저하고 알뜰한 면모도 있어요. 귀여운 외모에 깜짝 놀랄 만큼 빠른 두뇌 회전이 매력 포인트입니다.",
    descriptionEn:
      "Energetic and always on the move, you're interested in everything! You're remarkably prepared and resourceful. Your cute appearance paired with a surprisingly quick-thinking mind is your ultimate charm point.",
    celebritiesKo: ["엑소 찬열", "오마이걸 효정", "스트레이키즈 리노"],
    celebritiesEn: ["Zooey Deschanel", "Michael B. Jordan", "Florence Pugh"],
    color: "#D97706",
  },
  {
    id: "dinosaur",
    nameKo: "공룡상",
    nameEn: "Dinosaur",
    emoji: "🦕",
    descriptionKo:
      "개성 넘치고 존재감 하나만큼은 압도적인 당신! 트렌드에 흔들리지 않는 자신만의 독특한 스타일이 있어요. 처음엔 낯설게 느껴질 수 있지만, 알수록 빠져드는 중독성 있는 매력의 소유자입니다.",
    descriptionEn:
      "Uniquely individual, your presence is simply overwhelming! You have a distinctive style all your own that never bows to trends. You might seem unusual at first, but the more people get to know you, the more addictively charming you become.",
    celebritiesKo: ["이수현", "G-Dragon", "현아"],
    celebritiesEn: ["Lady Gaga", "Kanye West", "Björk"],
    color: "#059669",
  },
];
