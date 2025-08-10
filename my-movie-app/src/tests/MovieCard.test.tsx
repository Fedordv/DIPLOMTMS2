import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../../src/components/MovieCard/MovieCard';
import { MemoryRouter } from 'react-router-dom';
import type { Movie } from '../../src/types/types';

const mockMovie: Movie = {
  Title: 'Inception',
  Year: '2010',
  imdbID: 'tt1375666',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg',
};

describe('MovieCard', () => {
  it('отображает название фильма', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} isFavorite={false} onFavoriteToggle={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('вызывает onFavoriteToggle при нажатии на кнопку', () => {
    const toggleMock = jest.fn();

    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} isFavorite={false} onFavoriteToggle={toggleMock} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalledWith('tt1375666');
  });
});
