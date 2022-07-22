import React from 'react';
import styled from 'styled-components/native';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RoutesParamList} from '@/routes';

import Producer from '@/assets/svgs/welcome-producer.svg';
import Consumer from '@/assets/svgs/welcome-consumer.svg';

import Button from '@/components/Button';

type NavProps = NativeStackNavigationProp<RoutesParamList, 'Onboarding'>;

export const ConfirmRegister = () => {
  const user = useReduxSelector(({user}) => user);
  const {navigate} = useNavigation<NavProps>();

  return (
    <StyledContainerScroll
      contentContainerStyle={{alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      {user.auth?.userType === 'producer' ? (
        <StyledProducer testID="welcome-producer" />
      ) : (
        <StyledConsumer testID="welcome-consumer" />
      )}
      <StyledTitle>Cadastro realizado com sucesso!</StyledTitle>
      <StyledSubtitle>
        Valide seu cadastro e aproveite toda a experiência de Cestar e ajudar no
        combate a fome.
      </StyledSubtitle>
      <StyledConfirmButton
        testID="confirm-button"
        title="Começar"
        onPress={() => navigate('Onboarding')}
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