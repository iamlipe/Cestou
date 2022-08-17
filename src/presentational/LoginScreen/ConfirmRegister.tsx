import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {t} from 'i18next';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/routes/stacks/AuthStack';

import Producer from '@/assets/svgs/welcome-producer.svg';
import Consumer from '@/assets/svgs/welcome-consumer.svg';

import Button from '@/components/Button';

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

type ParamList = {
  params: {
    userType: 'producer' | 'consumer';
    phoneOrEmail: string;
    password: string;
  };
};

export const ConfirmRegister = () => {
  const {navigate, addListener} = useNavigation<NavProps>();
  const route = useRoute<RouteProp<ParamList, 'params'>>();

  useEffect(() => {
    addListener('beforeRemove', event => {
      event.preventDefault();
    });
  });

  return (
    <StyledContainerScroll
      contentContainerStyle={{alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      {route.params.userType === 'producer' ? (
        <StyledProducer testID="welcome-producer" />
      ) : (
        <StyledConsumer testID="welcome-consumer" />
      )}
      <StyledTitle>
        {t('text.screenConfirmRegister.registrationSuccessfully')}
      </StyledTitle>
      <StyledSubtitle>
        {t('text.screenConfirmRegister.validateYourRegistration')}
      </StyledSubtitle>
      <StyledConfirmButton
        testID="confirm-button"
        title={t('button.start')}
        onPress={() =>
          navigate('Onboarding', {
            phoneOrEmail: route.params.phoneOrEmail,
            password: route.params.password,
          })
        }
      />
    </StyledContainerScroll>
  );
};

const StyledContainerScroll = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledProducer = styled(Producer)`
  margin-top: 40px;
`;

const StyledConsumer = styled(Consumer)`
  margin-top: 40px;
`;

const StyledTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.SEMIBOLD_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.LARGER};
  color: ${({theme}) => theme.colors.PRIMARY_800};

  margin-top: 40px;
`;

const StyledSubtitle = styled.Text`
  width: 90%;
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLER};
  text-align: center;
  color: ${({theme}) => theme.colors.GRAY_900};

  margin-top: 40px;
`;

const StyledConfirmButton = styled(Button)`
  margin-top: 40px;
`;
