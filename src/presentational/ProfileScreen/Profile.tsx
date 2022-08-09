import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Linking} from 'react-native';
import {LOGOUT} from '@/store/slices/userSlice';
import {useReduxDispatch} from '@/hooks/useReduxDispatch';
import {useReduxSelector} from '@/hooks/useReduxSelector';
import {useGetConsumerBasket} from '@/hooks/useGetConsumerBasket';

import Header from '@/components/Header';
import ButtonRedirect from '@/components/ButtonRedirect';

export const Profile = () => {
  const {basketConsumer} = useGetConsumerBasket();
  const {auth} = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();
  const theme = useTheme();

  function WhatsAppLink() {
    Linking.openURL(
      `https://wa.me/${basketConsumer?.basketProducerID.userID.phone}`,
    );
  }

  return (
    <StyledContainerScroll showsVerticalScrollIndicator={false}>
      <Header title="Perfil" type="profile" welcome={false} />
      <StyledContent>
        <ButtonRedirect title="Meus dados" onPress={() => null} />
        <ButtonRedirect title="Minhas cestas" onPress={() => null} />

        {auth?.userType === 'consumer' &&
          basketConsumer?.basketProducerID.userID.phone && (
            <ButtonRedirect
              title="Contactar produtor"
              onPress={() => WhatsAppLink()}
            />
          )}

        <StyledLogoutButton onPress={() => dispatch(LOGOUT())}>
          <StyledTitleLogoutButton>Sair da conta</StyledTitleLogoutButton>

          <Icon name="logout" size={20} color={theme.colors.GRAY_900} />
        </StyledLogoutButton>
      </StyledContent>
    </StyledContainerScroll>
  );
};

const StyledContainerScroll = styled.ScrollView`
  min-height: 100%;
  background-color: ${({theme}) => theme.colors.BACKGROUND};
`;

const StyledContent = styled.View`
  width: 90%;
  align-self: center;
  padding: 24px 0;
`;

const StyledLogoutButton = styled.TouchableOpacity`
  width: 120px;
  flex-direction: row;
  align-items: center;

  margin-top: 100px;
`;

const StyledTitleLogoutButton = styled.Text`
  margin-right: 10px;
`;
