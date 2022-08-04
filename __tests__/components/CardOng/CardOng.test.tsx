import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import imgOng from '@/assets/images/ong_1.png';
import CardOng from '@/components/CardOng';

describe('CardOng', () => {
  const title = 'ong';
  const image = imgOng;

  test('should render correctly', () => {
    renderWithThemeProvider(<CardOng title={title} image={image} />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<CardOng title={title} image={image} />);
  });

  test('should render title', () => {
    const cardOng = renderWithThemeProvider(
      <CardOng title={title} image={image} />,
    );

    const cardTitle = cardOng.queryByText(title);

    expect(cardTitle).toBeTruthy();
  });

  test('should render image', () => {
    const cardOng = renderWithThemeProvider(
      <CardOng title={title} image={image} />,
    );

    const cardImage = cardOng.queryByTestId('card-ong-image');

    expect(cardImage).toBeTruthy();
  });
});
