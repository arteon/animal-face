<div align="center">

# 🐾 Animal Face Test

**Which animal do you look like?**
AI-powered facial analysis that matches your face to one of 12 animal types using MediaPipe's 468-point face mesh.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Face_Mesh-0097A7?style=flat-square)](https://mediapipe.dev/)
[![CI](https://github.com/black4305/animal-face/actions/workflows/ci.yml/badge.svg)](https://github.com/black4305/animal-face/actions/workflows/ci.yml)

<br/>

🐶 · 🐱 · 🦊 · 🐻 · 🐰 · 🦌 · 🐹 · 🐺 · 🐧 · 🦉 · 🐿️ · 🦕

<br/>

**[🎮 Try it Live](https://animal-face.quizlab.io)** · **[🐛 Report Bug](../../issues)** · **[✨ Request Feature](../../issues)**

</div>

---

## ✨ Features

- 🤖 **AI-Powered Analysis** — MediaPipe Face Mesh extracts 468 facial landmarks with precision, computing 10 distinct facial ratios for each upload
- 🐾 **12 Animal Types** — Dog, Cat, Fox, Bear, Rabbit, Deer, Hamster, Wolf, Penguin, Owl, Squirrel, Dinosaur
- 🔒 **Privacy-First** — No images are ever stored; all processing happens in memory and is immediately discarded
- 🌐 **Bilingual** — Korean & English with automatic browser language detection via i18next
- 📱 **Responsive** — Mobile-first design with smooth Framer Motion animations throughout
- 📊 **Statistics** — Live global animal distribution dashboard showing real-time results from all users
- 🔗 **Social Sharing** — Share your result instantly on Twitter, Facebook, or KakaoTalk

---

## 🖼️ Preview

<div align="center">

| Upload | Analysis | Result |
|:---:|:---:|:---:|
| Drag & drop or click to upload your photo | AI analyzes 468 facial landmarks in seconds | See your animal match with detailed breakdown |

</div>

---

## 🎯 How It Works

The entire ML pipeline runs server-side inside an AWS Lambda function. Your image is never written to disk or stored anywhere.

```
1.  Upload photo
         ↓
2.  MediaPipe Face Mesh extracts 468 facial landmarks
         ↓
3.  10 facial ratios calculated from landmark geometry:
    eye_width_ratio  ·  eye_height_ratio  ·  nose_length_ratio  ·  nose_width_ratio
    face_roundness   ·  lip_thickness     ·  jaw_angle          ·  forehead_ratio
    eye_distance_ratio  ·  face_taper
         ↓
4.  Weighted Euclidean distance computed against 12 hand-tuned animal profile vectors
         ↓
5.  Results ranked by similarity percentage — top match + full ranking returned
```

Each animal profile is a carefully calibrated vector of the 10 facial ratio weights above. The closer your face's ratio vector is to an animal's profile vector, the higher your match percentage for that animal.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, shadcn/ui, i18next |
| **Backend** | Python 3.11, AWS Lambda, MediaPipe, NumPy |
| **Database** | PostgreSQL (AWS RDS) |
| **Infrastructure** | AWS Lambda, API Gateway, S3, CloudFront |
| **i18n** | i18next (Korean / English) |

---

## 📁 Project Structure

```
animal-face/
├── frontend/                # React + TypeScript SPA
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # HomePage, StatsPage
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # API client & utilities
│   │   ├── data/            # Animal profile definitions
│   │   └── i18n/            # Translations (ko, en)
│   └── public/              # Static assets
└── backend/                 # Python serverless
    ├── handler.py           # Lambda function entry points
    ├── animal_matcher.py    # Face analysis & matching engine
    ├── db.py                # Database layer (stats)
    └── tests/               # Unit tests
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL (for the stats dashboard)

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL
npm run dev               # → http://localhost:5173
```

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # fill in DB credentials
python -m pytest tests/
```

### Database Setup

```bash
psql -U your_user -d your_db -f schema.sql
```

---

## 🔧 Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the deployed API Gateway endpoint |

### Backend

| Variable | Description |
|---|---|
| `CORS_ORIGIN` | Allowed frontend origin (e.g. `https://animal-face.quizlab.io`) |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default `5432`) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |

---

## 🐾 Animal Profiles

| Emoji | Animal | Personality |
|:---:|---|---|
| 🐶 | **Dog** | Loyal, warm, and endlessly friendly — you make everyone feel welcome |
| 🐱 | **Cat** | Independent, elegant, and quietly confident — you do things on your own terms |
| 🦊 | **Fox** | Clever, quick-witted, and a little mysterious — always one step ahead |
| 🐻 | **Bear** | Calm, dependable, and naturally strong — people instinctively trust you |
| 🐰 | **Rabbit** | Gentle, bright-eyed, and full of energy — your charm is undeniable |
| 🦌 | **Deer** | Graceful, sensitive, and softly expressive — people feel at ease around you |
| 🐹 | **Hamster** | Cheerful, round-faced, and irresistibly cute — you light up any room |
| 🐺 | **Wolf** | Sharp, intense, and quietly powerful — fiercely loyal to those you love |
| 🐧 | **Penguin** | Charming, sociable, and a little formal — you make friends wherever you go |
| 🦉 | **Owl** | Wise, observant, and thoughtfully deliberate — you see what others miss |
| 🐿️ | **Squirrel** | Lively, curious, and always on the move — you never run out of energy |
| 🦕 | **Dinosaur** | Rare, bold, and unmistakably unique — there is truly no one else like you |

---

## 🏗️ Architecture

```
Browser
  │  POST /api/analyze  (multipart image)
  ▼
API Gateway
  │
  ▼
AWS Lambda  (Python 3.11)
  ├── MediaPipe Face Mesh  →  468 landmarks extracted
  ├── 10 facial ratios computed from landmark geometry
  ├── Weighted Euclidean distance vs. 12 animal profile vectors
  └── Ranked similarity scores returned as JSON
        │
        │  (only the result label is written — no image data)
        ▼
    PostgreSQL  (AWS RDS)
        └── Aggregate stats only
```

**Privacy guarantee:** Image bytes are loaded into Lambda memory, processed by MediaPipe, then immediately garbage-collected. No image data is written to disk, a database, a log, or any external service.

---

## 📈 API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/analyze` | Upload a face image; returns ranked animal matches with similarity percentages |
| `GET` | `/api/stats` | Fetch global aggregate statistics (animal distribution, total analyses) |

### `POST /api/analyze`

**Request:** `multipart/form-data` with a `file` field containing the image.

**Response:**

```json
{
  "topAnimal": "fox",
  "matches": [
    { "animal": "fox",    "percentage": 87.3 },
    { "animal": "cat",    "percentage": 72.1 },
    { "animal": "rabbit", "percentage": 58.4 }
  ]
}
```

---

## 🤝 Contributing

Contributions are welcome. To propose a change:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes with a clear, descriptive message
4. Push to your fork and open a Pull Request

For bug reports or feature requests, please open a GitHub Issue first so we can discuss the approach before implementation.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Free to use, modify, and distribute.

---

## 🔗 Links

- **Live Demo:** [animal-face.quizlab.io](https://animal-face.quizlab.io)
- **Organization:** [QuizLab](https://github.com/black4305)

---

<div align="center">

Made with 🐾 by [QuizLab](https://github.com/black4305)

**If this made you smile, please ⭐ star the repo!**

</div>

---

## 🌟 Star History

If you find this project interesting, please consider giving it a star! It helps others discover it.

[![Star History Chart](https://api.star-history.com/svg?repos=black4305/animal-face&type=Date)](https://star-history.com/#black4305/animal-face&Date)

---

## 👥 Contributors

<a href="https://github.com/black4305/animal-face/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=black4305/animal-face" />
</a>

---

---

## 🇰🇷 한국어

### 프로젝트 소개

**Animal Face Test**는 MediaPipe의 468포인트 얼굴 랜드마크를 이용해 사용자의 얼굴을 분석하고, 12가지 동물 유형 중 가장 닮은 동물을 찾아주는 AI 웹 앱입니다. 이미지는 서버 메모리에서만 처리되며 저장되지 않습니다.

**라이브 데모 → [animal-face.quizlab.io](https://animal-face.quizlab.io)**

> 🎮 **[지금 바로 테스트하기 →](https://animal-face.quizlab.io)**

---

### ✨ 주요 기능

- 🤖 **AI 분석** — MediaPipe가 468개의 얼굴 랜드마크를 추출하여 10가지 비율을 계산
- 🐾 **12가지 동물 유형** — 강아지, 고양이, 여우, 곰, 토끼, 사슴, 햄스터, 늑대, 펭귄, 부엉이, 다람쥐, 공룡
- 🔒 **개인정보 보호** — 이미지는 메모리에서만 처리되며 어디에도 저장되지 않음
- 🌐 **한국어 / 영어** — 브라우저 언어 자동 감지 (i18next)
- 📱 **모바일 최적화** — Framer Motion 애니메이션, 반응형 디자인
- 📊 **통계 대시보드** — 전 세계 동물 분포 실시간 확인
- 🔗 **소셜 공유** — 트위터, 페이스북, 카카오톡으로 결과 공유

---

### 🎯 작동 방식

```
1.  사진 업로드
         ↓
2.  MediaPipe로 468개 얼굴 랜드마크 추출
         ↓
3.  10가지 얼굴 비율 계산
    (눈 너비·높이, 코 길이·너비, 얼굴 둥글기, 입술 두께,
     턱 각도, 이마 비율, 눈 간격 비율, 얼굴 테이퍼)
         ↓
4.  12개 동물 프로필과 가중 유클리드 거리 비교
         ↓
5.  유사도 퍼센트 순으로 결과 반환
```

---

### 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| **프론트엔드** | React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, shadcn/ui, i18next |
| **백엔드** | Python 3.11, AWS Lambda, MediaPipe, NumPy |
| **데이터베이스** | PostgreSQL (AWS RDS) |
| **인프라** | AWS Lambda, API Gateway, S3, CloudFront |

---

### 🚀 시작하기

```bash
# 프론트엔드
cd frontend
npm install
cp .env.example .env   # VITE_API_URL 설정
npm run dev            # → http://localhost:5173

# 백엔드
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # DB 자격증명 설정
python -m pytest tests/
```

---

### 🐾 동물 프로필

| 이모지 | 동물 | 성격 |
|:---:|---|---|
| 🐶 | **강아지** | 충성스럽고 따뜻하며 사교적 — 누구에게나 편안함을 줌 |
| 🐱 | **고양이** | 독립적이고 우아하며 자신감 있음 — 자신만의 방식대로 행동 |
| 🦊 | **여우** | 영리하고 기민하며 신비로운 매력 — 항상 한 발 앞서 있음 |
| 🐻 | **곰** | 차분하고 믿음직스러우며 강인함 — 본능적으로 신뢰를 줌 |
| 🐰 | **토끼** | 온화하고 밝은 눈빛에 넘치는 에너지 — 부정할 수 없는 매력 |
| 🦌 | **사슴** | 우아하고 섬세하며 표현이 풍부 — 주변 사람을 편안하게 함 |
| 🐹 | **햄스터** | 발랄하고 둥근 얼굴에 사랑스러움 — 어디서나 분위기를 밝힘 |
| 🐺 | **늑대** | 날카롭고 강렬하며 은은한 카리스마 — 소중한 사람에게 한없이 충직 |
| 🐧 | **펭귄** | 매력적이고 사교적이며 단정한 인상 — 어디서나 친구를 사귐 |
| 🦉 | **부엉이** | 지혜롭고 관찰력이 뛰어나며 신중함 — 남들이 놓치는 것을 포착 |
| 🐿️ | **다람쥐** | 활발하고 호기심 많으며 재빠름 — 에너지가 넘쳐흐름 |
| 🦕 | **공룡** | 희귀하고 대담하며 독보적인 존재감 — 진정 세상에 하나뿐인 존재 |

---

### 🤝 기여하기

버그 제보나 기능 제안은 GitHub Issue를 먼저 열어주세요. 코드 기여는 fork → feature 브랜치 생성 → Pull Request 순서로 진행하면 됩니다. 기존 코드 스타일을 따르고, 새 기능에는 테스트를 추가해 주세요.

---

### 📄 라이선스

[MIT License](LICENSE) — 자유롭게 사용, 수정, 배포할 수 있습니다.
