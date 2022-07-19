import React from 'react';
import styled from 'styled-components/native';

export const Login = () => {
  return (
    <StyledContainer>
      <StyledTitle>Login</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.SafeAreaView``;

const StyledTitle = styled.Text`
  font-size: ${({theme}) => theme.sizing.LARGE};
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
`;
