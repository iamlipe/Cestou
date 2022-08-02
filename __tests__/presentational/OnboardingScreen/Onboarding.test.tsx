import React from 'react';
import {
  renderWithThemeProvider,
  matchSnapshotWithProvider,
} from '@/config/functions/Testing';

import {Onboarding} from '@/presentational/OnboardingScreen/Onboarding';
import {fireEvent} from '@testing-library/react-native';

describe('Onboarding', () => {
  test('should render screen correctly', () => {
    renderWithThemeProvider(<Onboarding />);
  });

  test('should matches snapshot', () => {
    matchSnapshotWithProvider(<Onboarding />);
  });

  test('should change slide when press next button', () => {
    const {getByText, getByTestId} = renderWithThemeProvider(<Onboarding />);

    const titleSlideOne = getByText(/tire a fome do caminho/i);
    const imageSlideOne = getByTestId('image-onbording-one');
    const buttonNextOne = getByText(/próximo/i);

    expect(titleSlideOne).toBeTruthy();
    expect(imageSlideOne).toBeTruthy();

    fireEvent.press(buttonNextOne);

    const titleSlideTwo = getByText(/agricultura familiar presente/i);
    const imageSlideTwo = getByTestId('image-onbording-two');
    const buttonNextTwo = getByText(/próximo/i);

    expect(titleSlideTwo).toBeTruthy();
    expect(imageSlideTwo).toBeTruthy();

    fireEvent.press(buttonNextTwo);

    const titleSlideThree = getByText(/agricultura familiar presente/i);
    const imageSlideThree = getByTestId('image-onbording-three');

    expect(titleSlideThree).toBeTruthy();
    expect(imageSlideThree).toBeTruthy();
  });

  test('should skip to last slide when press skip button', () => {
    const {getByText, getByTestId} = renderWithThemeProvider(<Onboarding />);

    const buttonSkip = getByText(/pular/i);

    fireEvent.press(buttonSkip);

    const titleSlideThree = getByText(/agricultura familiar presente/i);
    const imageSlideThree = getByTestId('image-onbording-three');

    expect(titleSlideThree).toBeTruthy();
    expect(imageSlideThree).toBeTruthy();
  });
});
