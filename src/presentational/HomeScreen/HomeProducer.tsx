import React from 'react';
import styled from 'styled-components/native';

import Header from '@/components/Header';
import Button from '@/components/Button';

export const HomeProducer = () => {
  const renderLargeButton = (title: string) => (
    <StyledContainerLargeButton>
      <StyledTitleLargeButton>{title}</StyledTitleLargeButton>
    </StyledContainerLargeButton>
  );

  return (
    <StyledContainer showsVerticalScrollIndicator={false}>
      <Header />
      <StyledTitle>Minhas cestas</StyledTitle>
      <StyledContainerAboutMyBasket>
        <StyledTitleAboutMyBasket>
          Configure quais os tipos e tamanhos de cesta de alimentos você deseja
          fornecer.
        </StyledTitleAboutMyBasket>

        <ButtonAboutMyBasket title="Minhas cestas" onPress={() => null} />
      </StyledContainerAboutMyBasket>

      <StyledTitle>Minhas finanças</StyledTitle>
      {renderLargeButton('Ver meus rendimentos')}
      {renderLargeButton('Cadastrar chave Pix')}
    </StyledContainer>
  );
};

const StyledContainer = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALL};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin: 24px 5% 16px;
`;

const StyledContainerAboutMyBasket = styled.View`
  width: 90%;
  height: 130px;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.GRAY_100};

  padding: 0 8px;
`;

const StyledTitleAboutMyBasket = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-bottom: 8px;
`;

const ButtonAboutMyBasket = styled(Button)``;

const StyledContainerLargeButton = styled.TouchableOpacity`
  width: 90%;
  height: 100px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.PRIMARY_100};
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.PRIMARY_300};
  margin-bottom: 16px;
`;

const StyledTitleLargeButton = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
`;
