const STORAGE_KEY = 'palabras_encadenadas_leaderboard';
const MAX_ENTRIES = 10;

export const getLeaderboard = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveScoreToLeaderboard = ({ score, wordsCount }) => {
  if (score <= 0) return getLeaderboard();

  const current = getLeaderboard();
  const newEntry = {
    id: Date.now(),
    score,
    wordsCount,
    date: new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  };

  const updated = [...current, newEntry]
    .sort((a, b) => b.score - a.score || b.wordsCount - a.wordsCount)
    .slice(0, MAX_ENTRIES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};