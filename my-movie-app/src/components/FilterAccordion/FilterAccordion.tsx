import { useRef, useState, useEffect } from 'react';

interface FilterAccordionProps {
  onYearChange: (year: string) => void;
  onTypeChange: (type: string) => void;
}

const FilterAccordion = ({ onYearChange, onTypeChange }: FilterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // при открытии фильтра — рассчитать позицию кнопки
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  return (
    <div className="filter-accordion">
      <button
        ref={buttonRef}
        className="accordion-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Фильтры
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div
          className="accordion-content popover"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="filter-group">
            <label>Год:</label>
            <select defaultValue="" onChange={(e) => onYearChange(e.target.value)}>
              <option value="">Все годы</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Тип:</label>
            <select defaultValue="" onChange={(e) => onTypeChange(e.target.value)}>
              <option value="">Все типы</option>
              <option value="movie">Фильмы</option>
              <option value="series">Сериалы</option>
              <option value="episode">Эпизоды</option>
              <option value="game">Игры</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterAccordion;
