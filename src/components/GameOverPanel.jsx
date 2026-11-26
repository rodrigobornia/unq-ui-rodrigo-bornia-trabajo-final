export function GameOverPanel({ score, wordsCount, leaderboard, onRestart }) {
  return (
    <section className="gameover-panel" aria-live="polite">
      <div className="gameover-badge">Partida finalizada</div>
      <h2>¡Se agotó el tiempo!</h2>

      <div className="final-stats">
        <div className="final-stat-box">
          <span>Palabras encadenadas</span>
          <strong>{wordsCount}</strong>
        </div>
        <div className="final-stat-box">
          <span>Puntaje final</span>
          <strong>{score} pts</strong>
        </div>
      </div>

      <button type="button" className="restart-btn" onClick={onRestart}>
        Jugar de nuevo
      </button>

      {leaderboard.length > 0 && (
        <div className="leaderboard-box">
          <h3>Top 10 Mejores Puntajes</h3>
          <ol className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <li key={entry.id} className="leaderboard-item">
                <span className="rank">#{index + 1}</span>
                <span className="entry-score">{entry.score} pts</span>
                <span className="entry-words">{entry.wordsCount} palabras</span>
                <span className="entry-date">{entry.date}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}