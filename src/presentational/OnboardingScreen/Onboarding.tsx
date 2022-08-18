import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ImageSourcePropType} from 'react-native';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LOGIN} from '@/store/slices/userSlice';
import {useTranslation} from 'react-i18next';

import imgOnboardinOne from '@/assets/images/onboarding-1.png';
import imgOnboardinTwo from '@/assets/images/onboarding-2.png';
import imgOnboardinThree from '@/assets/images/onboarding-3.png';

import Button from '@/components/Button';

interface SlideProps {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
}

type ParamList = {
  params: {
    phoneOrEmail: string;
    password: string;
  };
};

export const Onboarding = () => {
  const {isLoading} = useReduxSelector(state => state.user);
  const {t} = useTranslation();
  const theme = useTheme();
  const dispatch = useReduxDispatch();
  const route = useRoute<RouteProp<ParamList, 'params'>>();

  const slides: SlideProps[] = [
    {
      key: 'one',
      title: t('text.screenOnboarding.titleOnboardingOne'),
      text: t('text.screenOnboarding.textOnboardingOne'),
      image: imgOnboardinOne,
    },
    {
      key: 'two',
      title: t('text.screenOnboarding.titleOnboardingTwo'),
      text: t('text.screenOnboarding.textOnboardingTwo'),
      image: imgOnboardinTwo,
    },
    {
      key: 'three',
      title: t('text.screenOnboarding.titleOnboardingThree'),
      text: t('text.screenOnboarding.textOnboardingThree'),
      image: imgOnboardinThree,
    },
  ];

  const renderSlide = ({item}: {item: SlideProps}) => (
    <StyledContainer key={item.key} showsVerticalScrollIndicator={false}>
      <StyledImage
        testID={`image-onbording-${item.key}`}
        source={item.image}
        resizeMode="stretch"
      />
      <StyledTitle>{item.title}</StyledTitle>
      <StyledText>{item.text}</StyledText>
    </StyledContainer>
  );

  const renderDone = () => (
    <Button
      title={t('button.done')}
      size="small"
      loading={isLoading}
      onPress={() => {
        dispatch(
          LOGIN({
            phoneOrEmail: route.params.phoneOrEmail,
            password: route.params.password,
            remember: ['Lembrar minha senha'],
          }),
        );
      }}
    />
  );

  const renderNext = () => (
    <StyledButtonNext>
      <StyledButtonTextNext>{t('button.next')}</StyledButtonTextNext>
    </StyledButtonNext>
  );

  const renderSkip = () => (
    <StyledButtonSkip>
      <StyledButtonTextSkip>{t('button.skip')}</StyledButtonTextSkip>
    </StyledButtonSkip>
  );

  const renderPrev = () => (
    <StyledButtonPrev>
      <StyledButtonTextPrev>{t('button.prev')}</StyledButtonTextPrev>
    </StyledButtonPrev>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      showPrevButton
      showSkipButton
      activeDotStyle={{
        backgroundColor: theme.colors.PRIMARY_800,
        width: 6,
        height: 6,
      }}
      dotStyle={{
        backgroundColor: theme.colors.PRIMARY_400,
        width: 6,
        height: 6,
      }}
      renderDoneButton={renderDone}
      renderNextButton={renderNext}
      renderPrevButton={renderPrev}
      renderSkipButton={renderSkip}
    />
  );
};

const StyledContainer = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledImage = styled.Image`
  width: 100%;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGER};
  color: ${({theme}) => theme.colors.PRIMARY_800};
  text-align: center;
  margin-top: 72px;
`;

const StyledText = styled.Text`
  width: 90%;
  align-self: center;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.GRAY_900};
  text-align: center;
  margin-top: 24px;
  margin-bottom: 120px;
`;

const StyledButtonNext = styled.View`
  background-color: ${({theme}) => theme.colors.PRIMARY_800};
  border-radius: 5px;
  height: 38px;
  width: 90px;
  justify-content: center;
  align-items: center;
`;

const StyledButtonTextNext = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  color: ${({theme}) => theme.colors.WHITE};
`;

const StyledButtonPrev = styled(StyledButtonNext)`
  background-color: ${({theme}) => theme.colors.WHITE};
`;

const StyledButtonTextPrev = styled(StyledButtonTextNext)`
  color: ${({theme}) => theme.colors.PRIMARY_800};
`;

const StyledButtonSkip = styled(StyledButtonPrev)``;

const StyledButtonTextSkip = styled(StyledButtonTextPrev)``;
