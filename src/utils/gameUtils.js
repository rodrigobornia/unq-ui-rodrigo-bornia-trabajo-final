export const normalizeWord = (word) => word.trim().toLowerCase();

// Quita tildes/diéresis (á -> a, ü -> u) pero conserva la ñ
const stripAccents = (char) =>
  char
    .normalize('NFD')
    .replace(/[\u0300-\u0301\u0308]/g, '')
    .normalize('NFC');

export const getLastLetter = (word) => {
  const clean = normalizeWord(word);
  return clean.slice(-1);
};

export const getFirstLetter = (word) => {
  const clean = normalizeWord(word);
  return clean.slice(0, 1);
};

export const isAlreadyUsed = (word, chain) => {
  const normalized = normalizeWord(word);
  return chain.some((item) => normalizeWord(item) === normalized);
};

export const isValidChain = (previousWord, nextWord) => {
  if (!previousWord) return true;
  const expected = stripAccents(getLastLetter(previousWord));
  const actual = stripAccents(getFirstLetter(nextWord));
  return expected === actual;
};

export const calculateWordScore = (word) => normalizeWord(word).length;