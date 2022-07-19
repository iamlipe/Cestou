import React, {ReactNode} from 'react';
import renderer from 'react-test-renderer';
import {theme} from '@/styles';
import {ThemeProvider} from 'styled-components/native';
import {render} from '@testing-library/react-native';

const wraperWithProvider = (children: ReactNode) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const renderWithThemeProvider = (component: ReactNode) => {
  return render(wraperWithProvider(component));
};

export const matchSnapshotWithProvider = (component: ReactNode) => {
  const tree = renderer.create(wraperWithProvider(component)).toJSON();
  expect(tree).toMatchSnapshot();
};
