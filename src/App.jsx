import { useState, useEffect, useRef } from 'react';
import { validateWordInDictionary } from './services/wordService';
import {
  normalizeWord,
  getLastLetter,
  isAlreadyUsed,
  isValidChain,
  calculateWordScore,
} from './utils/gameUtils';
import { getLeaderboard, saveScoreToLeaderboard } from './utils/leaderboardUtils';
import { GameHeader } from './components/GameHeader';
import { WordInputForm } from './components/WordInputForm';
import { WordChain } from './components/WordChain';
import { GameOverPanel } from './components/GameOverPanel';
import './App.css';

const TURN_DURATION = 15;

function App() {
  const [chain, setChain] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TURN_DURATION);
  const [hasStarted, setHasStarted] = useState(false);
  const [turnKey, setTurnKey] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState(() => getLeaderboard());

  const isGameOver = hasStarted && timeLeft === 0;
  const isGameOverRef = useRef(isGameOver);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  const score = chain.reduce((total, word) => total + calculateWordScore(word), 0);
  const lastWord = chain.length > 0 ? chain[chain.length - 1] : null;
  const requiredLetter = lastWord ? getLastLetter(lastWord) : null;

  useEffect(() => {
    if (!hasStarted || timeLeft === 0) return;

    const timerId = setTimeout(() => {
      if (timeLeft === 1) {
        setLeaderboard(saveScoreToLeaderboard({ score, wordsCount: chain.length }));
      }
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [hasStarted, timeLeft, turnKey, score, chain.length]);

  const handleWordSubmit = async (rawWord) => {
    if (isGameOver || isValidating) return false;

    const word = normalizeWord(rawWord);
    if (!word) return false;

    if (isAlreadyUsed(word, chain)) {
      setErrorMessage('La palabra ya fue utilizada.');
      return false;
    }

    if (!isValidChain(lastWord, word)) {
      setErrorMessage('La palabra no respeta la regla de encadenamiento.');
      return false;
    }

    setIsValidating(true);
    setErrorMessage('');

    try {
      const exists = await validateWordInDictionary(word);

      if (isGameOverRef.current) return false;

      if (!exists) {
        setErrorMessage('La palabra no existe.');
        return false;
      }

      setChain((prev) => [...prev, word]);
      setHasStarted(true);
      setTimeLeft(TURN_DURATION);
      setTurnKey((prev) => prev + 1);
      return true;
    } catch {
      setErrorMessage('No se pudo conectar con el diccionario. Intentá nuevamente.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleRestart = () => {
    setChain([]);
    setTimeLeft(TURN_DURATION);
    setHasStarted(false);
    setTurnKey(0);
    setIsValidating(false);
    setErrorMessage('');
  };

  return (
    <main className="app-container">
      <div className="title-block">
        <h1>Palabras Encadenadas</h1>
        <p className="subtitle">
          Encadená palabras válidas en español usando la última letra de la anterior.
        </p>
      </div>

      <GameHeader
        score={score}
        timeLeft={timeLeft}
        hasStarted={hasStarted}
        requiredLetter={requiredLetter}
      />

      {!isGameOver ? (
        <>
          <WordInputForm
            onSubmitWord={handleWordSubmit}
            disabled={isGameOver}
            isValidating={isValidating}
            errorMessage={errorMessage}
            requiredLetter={requiredLetter}
          />
          <WordChain chain={chain} />
        </>
      ) : (
        <>
          <GameOverPanel
            score={score}
            wordsCount={chain.length}
            leaderboard={leaderboard}
            onRestart={handleRestart}
          />
          <WordChain chain={chain} />
        </>
      )}
    </main>
  );
}

export default App;