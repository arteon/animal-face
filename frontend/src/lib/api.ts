import { animals } from "@/data/animals";

export interface AnimalMatch {
  id: string;
  name: string;
  emoji: string;
  percentage: number;
}

export interface AnalysisResult {
  topAnimal: string;
  matches: AnimalMatch[];
}

export interface Stats {
  totalAnalyses: number;
  animalCounts: Record<string, number>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

function generateMockResult(): AnalysisResult {
  const shuffled = [...animals].sort(() => Math.random() - 0.5);
  const top = shuffled[0];
  const second = shuffled[1];
  const third = shuffled[2];

  const topPct = Math.floor(Math.random() * 26) + 60;
  const secondPct = Math.floor(Math.random() * 16) + 10;
  const thirdPct = Math.floor(Math.random() * 11) + 5;
  const remaining = 100 - topPct - secondPct - thirdPct;
  const restCount = animals.length - 3;
  const baseRest = Math.floor(remaining / restCount);

  const matches: AnimalMatch[] = [
    { id: top.id, name: top.nameKo, emoji: top.emoji, percentage: topPct },
    { id: second.id, name: second.nameKo, emoji: second.emoji, percentage: secondPct },
    { id: third.id, name: third.nameKo, emoji: third.emoji, percentage: thirdPct },
    ...shuffled.slice(3).map((a, i) => ({
      id: a.id,
      name: a.nameKo,
      emoji: a.emoji,
      percentage: i === restCount - 1 ? remaining - baseRest * (restCount - 1) : baseRest,
    })),
  ];

  return { topAnimal: top.id, matches };
}

function generateMockStats(): Stats {
  const animalCounts: Record<string, number> = {};
  animals.forEach((a) => {
    animalCounts[a.id] = Math.floor(Math.random() * 5000) + 500;
  });
  const totalAnalyses = Object.values(animalCounts).reduce((s, v) => s + v, 0);
  return { totalAnalyses, animalCounts };
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  if (!API_BASE_URL) {
    await delay(3000);
    return generateMockResult();
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<AnalysisResult>;
}

export async function getStats(): Promise<Stats> {
  if (!API_BASE_URL) {
    await delay(500);
    return generateMockStats();
  }

  const res = await fetch(`${API_BASE_URL}/stats`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<Stats>;
}
