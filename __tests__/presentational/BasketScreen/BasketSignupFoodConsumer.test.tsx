import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {
  foodSmallBasketMock,
  foodMediumBasketMock,
  foodLargeBasketMock,
} from '@__mocks__/mockFoodBasket';

import {BasketSignupFoodConsumer} from '@/presentational/BasketScreen/BasketSignupFoodConsumer';

describe('BasketSignupFoodConsumer', () => {
  test('should screen render correctly', () => {
    renderWithThemeProvider(<BasketSignupFoodConsumer />, {
      food: {foodBasket: foodSmallBasketMock},
    });
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<BasketSignupFoodConsumer />);
  });

  test('should render all items small basket', () => {
    const {queryByText} = renderWithThemeProvider(
      <BasketSignupFoodConsumer />,
      {
        food: {foodsBasket: foodSmallBasketMock},
      },
    );

    const spiceItem = queryByText(/temperos/i);
    const vegetableItem = queryByText(/legumes/i);
    const leaveItem = queryByText(/verduras/i);
    const fruitsItem = queryByText(/frutas/i);
    const processedItem = queryByText(/processados/i);

    expect(spiceItem).toBeTruthy();
    expect(vegetableItem).toBeTruthy();
    expect(leaveItem).toBeTruthy();
    expect(fruitsItem).toBeTruthy();
    expect(processedItem).toBeFalsy();
  });

  test('should render all items medium basket', () => {
    const {queryByText} = renderWithThemeProvider(
      <BasketSignupFoodConsumer />,
      {
        food: {foodsBasket: foodMediumBasketMock},
      },
    );

    const spiceItem = queryByText(/temperos/i);
    const vegetableItem = queryByText(/legumes/i);
    const leaveItem = queryByText(/verduras/i);
    const fruitsItem = queryByText(/frutas/i);
    const processedItem = queryByText(/processados/i);

    expect(spiceItem).toBeTruthy();
    expect(vegetableItem).toBeTruthy();
    expect(leaveItem).toBeTruthy();
    expect(fruitsItem).toBeTruthy();
    expect(processedItem).toBeTruthy();
  });

  test('should render all items large basket', () => {
    const {queryByText} = renderWithThemeProvider(
      <BasketSignupFoodConsumer />,
      {
        food: {foodsBasket: foodMediumBasketMock},
      },
    );

    const spiceItem = queryByText(/temperos/i);
    const vegetableItem = queryByText(/legumes/i);
    const leaveItem = queryByText(/verduras/i);
    const fruitsItem = queryByText(/frutas/i);
    const processedItem = queryByText(/processados/i);

    expect(spiceItem).toBeTruthy();
    expect(vegetableItem).toBeTruthy();
    expect(leaveItem).toBeTruthy();
    expect(fruitsItem).toBeTruthy();
    expect(processedItem).toBeTruthy();
  });
});
