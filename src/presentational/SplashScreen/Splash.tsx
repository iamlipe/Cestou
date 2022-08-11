import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RoutesParamList} from '@/routes';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import Logo from '@/assets/svgs/logo.svg';
import LogoBasket from '@/assets/svgs/logo-basket.svg';

type NavProps = NativeStackNavigationProp<RoutesParamList, 'AppStack'>;

const {width, height} = Dimensions.get('window');

export const Splash = () => {
  const translateYMontainOne = useSharedValue(width * 3);
  const translateYMontainTwo = useSharedValue(width * 2);
  const scaleLogo = useSharedValue(0);
  const {navigate} = useNavigation<NavProps>();

  const animatedMontainOne = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateYMontainOne.value},
        {translateX: -width * 0.2},
      ],
    };
  });

  const animatedMontainTwo = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateYMontainTwo.value},
        {translateX: width * 0.2},
      ],
    };
  });

  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleLogo.value}],
    };
  });

  useLayoutEffect(() => {
    const TIME_ANIMATION = 750;
    const TIME_ANIMATION_LOGO = 500;

    translateYMontainOne.value = withTiming(width * 2, {
      duration: TIME_ANIMATION,
    });

    setTimeout(
      () => (scaleLogo.value = withTiming(1, {duration: TIME_ANIMATION_LOGO})),
      TIME_ANIMATION,
    );

    translateYMontainTwo.value = withTiming(width, {duration: TIME_ANIMATION});

    setTimeout(
      () => navigate('AppStack'),
      TIME_ANIMATION_LOGO + TIME_ANIMATION,
    );
  }, [navigate, scaleLogo, translateYMontainOne, translateYMontainTwo]);

  return (
    <StyledContainer>
      <StyledContainerLogoAnimated style={[animatedLogo]}>
        <StyledLogoBasket />
        <StyledLogo />
      </StyledContainerLogoAnimated>
      <StyledContainerMontainOneAnimated style={[animatedMontainOne]} />
      <StyledContainerMontainTwoAnimated style={[animatedMontainTwo]} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const StyledContainerLogoAnimated = styled(Animated.View)``;

const StyledLogoBasket = styled(LogoBasket)`
  top: ${height * 0.9}px;
  left: ${width * 0.275}px;
  z-index: 1;
`;

const StyledLogo = styled(Logo)`
  top: ${height * 0.9}px;
  left: ${width * 0.275}px;
  z-index: 1;
`;

const StyledContainerMontainOneAnimated = styled(Animated.View)`
  width: ${width * 0.8}px;
  height: ${width * 0.8}px;
  border-radius: ${(width * 0.8) / 2}px;
  background-color: ${({theme}) => theme.colors.PRIMARY_800};
`;

const StyledContainerMontainTwoAnimated = styled(Animated.View)`
  width: ${width * 1.6}px;
  height: ${width * 1.6}px;
  border-radius: ${(width * 1.6) / 2}px;
  background-color: ${({theme}) => theme.colors.PRIMARY_500};
`;
