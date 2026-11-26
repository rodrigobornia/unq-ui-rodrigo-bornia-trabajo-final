export function GameHeader({ score, timeLeft, hasStarted, requiredLetter }) {
  const isLowTime = hasStarted && timeLeft <= 5;

  return (
    <header className="game-header">
      <div className="stat-card">
        <span className="stat-label">Puntaje</span>
        <strong className="stat-value">{score}</strong>
      </div>

      <div className={`stat-card timer-card ${isLowTime ? 'timer-danger' : ''}`}>
        <span className="stat-label">Tiempo</span>
        <strong className="stat-value">{timeLeft}s</strong>
      </div>

      <div className="stat-card">
        <span className="stat-label">Siguiente letra</span>
        <strong className="stat-value letter-badge">
          {requiredLetter ? requiredLetter.toUpperCase() : 'Libre'}
        </strong>
      </div>
    </header>
  );
}