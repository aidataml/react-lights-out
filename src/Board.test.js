import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  test('renders the board', () => {
    render(<Board nrows={5} ncols={5} chanceLightStartsOn={0} />);
  });

  test('shows winning message', () => {
    const { getByText } = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0} />);
    expect(getByText('You Won the Game!')).toBeInTheDocument();
  });
});