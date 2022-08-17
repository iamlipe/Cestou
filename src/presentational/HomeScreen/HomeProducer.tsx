import React from 'react';
import styled from 'styled-components/native';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {HomeProducerStackParamList} from '@/routes/stacks/HomeProducerStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from '@/components/Header';
import Button from '@/components/Button';

type NavProps = NativeStackNavigationProp<
  HomeProducerStackParamList,
  'HomeMyBasketsProducer'
>;

export const HomeProducer = () => {
  const {navigate} = useNavigation<NavProps>();

  const renderLargeButton = (title: string) => (
    <StyledContainerLargeButton>
      <StyledTitleLargeButton>{title}</StyledTitleLargeButton>
    </StyledContainerLargeButton>
  );

  return (
    <StyledContainer showsVerticalScrollIndicator={false}>
      <Header />
      <StyledTitle>{t('text.screenHomeProducer.titleSectionOne')}</StyledTitle>
      <StyledContainerAboutMyBasket>
        <StyledTitleAboutMyBasket>
          {t('text.screenHomeProducer.note')}
        </StyledTitleAboutMyBasket>

        <ButtonAboutMyBasket
          title={t('button.myBaskets')}
          onPress={() => navigate('HomeMyBasketsProducer')}
        />
      </StyledContainerAboutMyBasket>

      <StyledTitle>{t('text.screenHomeProducer.titleSectionTwo')}</StyledTitle>
      {renderLargeButton(t('button.myEarnings'))}
      {renderLargeButton(t('button.registerPix'))}
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
