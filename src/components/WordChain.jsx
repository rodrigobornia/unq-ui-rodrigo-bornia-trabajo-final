import { calculateWordScore } from '../utils/gameUtils';

export function WordChain({ chain }) {
  if (chain.length === 0) {
    return (
      <section className="chain-section empty-chain">
        <p>Ingresá tu primera palabra para comenzar la cadena y activar el reloj de 15 segundos.</p>
      </section>
    );
  }

  return (
    <section className="chain-section" aria-label="Cadena de palabras">
      <div className="chain-header">
        <h2>Cadena de palabras ({chain.length})</h2>
      </div>

      <div className="chain-list">
        {chain.map((word, index) => {
          const isLast = index === chain.length - 1;
          const prefix = word.slice(0, -1);
          const lastChar = word.slice(-1);

          return (
            <div key={`${word}-${index}`} className="chain-item-wrapper">
              <div className={`word-chip ${isLast ? 'word-chip-active' : ''}`}>
                <span className="word-text">
                  {prefix}
                  <strong className={isLast ? 'highlight-letter' : ''}>{lastChar}</strong>
                </span>
                <span className="word-points">+{calculateWordScore(word)} pts</span>
              </div>
              {!isLast && <span className="chain-arrow" aria-hidden="true">→</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}