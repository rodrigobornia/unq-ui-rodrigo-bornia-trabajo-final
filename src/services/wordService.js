const API_BASE_URL = 'https://word-api-hmlg.vercel.app/api/validate';

export const validateWordInDictionary = async (word) => {
  const response = await fetch(`${API_BASE_URL}?word=${encodeURIComponent(word)}`);

  if (!response.ok) {
    throw new Error('Error al consultar el diccionario');
  }

  const data = await response.json();
  return Boolean(data.exists);
};