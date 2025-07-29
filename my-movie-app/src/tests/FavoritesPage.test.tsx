import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Favorites from '../../src/pages/Favorites/Favorites';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('Favorites Page', () => {
  it('показывает сообщение, если список избранного пуст', () => {
    const store = mockStore({
      favorites: { list: [] },
      movies: { list: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/список избранного пуст/i)).toBeInTheDocument();
  });
});
