import { useState, useRef, useEffect } from 'react';

export function WordInputForm({ onSubmitWord, disabled, isValidating, errorMessage, requiredLetter }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && !isValidating) {
      inputRef.current?.focus();
    }
  }, [disabled, isValidating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled || isValidating) return;

    const wasAccepted = await onSubmitWord(inputValue);
    if (wasAccepted) {
      setInputValue('');
    }
  };

  const placeholder = requiredLetter
    ? `Escribí una palabra que empiece con "${requiredLetter.toUpperCase()}"...`
    : 'Escribí cualquier palabra para iniciar...';

  return (
    <section className="input-section">
      <form className="word-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="word-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || isValidating}
          autoComplete="off"
          aria-label="Ingresar palabra"
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={disabled || isValidating || !inputValue.trim()}
        >
          {isValidating ? 'Validando...' : 'Enviar'}
        </button>
      </form>

      {errorMessage && (
        <p className="error-banner" role="alert">
          {errorMessage}
        </p>
      )}
    </section>
  );
}