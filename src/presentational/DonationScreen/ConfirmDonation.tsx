import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import Coins from '@/assets/svgs/coins.svg';
import Button from '@/components/Button';

import {StyledContainerScroll, StyledContent} from './HomeDonationConsumer';

import Header from '@/components/Header';

export const ConfirmDonations = () => {
  const {goBack} = useNavigation();

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Assinatura" welcome={false} />
      <StyledContent>
        <StyledIconCoins />
        <StyledTitle>Doação realizada com sucesso!</StyledTitle>
        <StyledText>
          Você acabou de ajudar uma instituição que atua no combate à fome,
          doando Horticoins que serão convertidos na compra de alimentos direto
          com nossos produtores locais parceiros.
        </StyledText>

        <StyledConfirmButton title="Doar novamente" onPress={goBack} />
      </StyledContent>
    </StyledContainerScroll>
  );
};

const StyledIconCoins = styled(Coins)`
  align-self: center;
  margin-bottom: 24px;
`;

const StyledText = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};

  text-align: center;
  margin-bottom: 32px;
`;

const StyledTitle = styled(StyledText)`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGER};
  color: ${({theme}) => theme.colors.PRIMARY_800};
`;

const StyledConfirmButton = styled(Button)``;
