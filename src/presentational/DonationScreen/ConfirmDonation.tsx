import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Coins from '@/assets/svgs/coins.svg';
import Button from '@/components/Button';

import {StyledContainerScroll, StyledContent} from './HomeDonationConsumer';

import Header from '@/components/Header';

export const ConfirmDonations = () => {
  const {goBack} = useNavigation();
  const {t} = useTranslation();

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title={t('text.confirmDonation.headerTitle')} welcome={false} />
      <StyledContent>
        <StyledIconCoins />
        <StyledTitle>{t('text.confirmDonation.title')}</StyledTitle>
        <StyledText>{t('text.confirmDonation.message')}</StyledText>
        <StyledConfirmButton title={t('button.donateAgain')} onPress={goBack} />
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
