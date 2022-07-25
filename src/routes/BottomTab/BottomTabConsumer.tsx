import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedConsumerStackParamList} from '../stacks/LoggedConsumerStack';

// icons
import TabHomeIcon from '@/assets/svgs/tab-home.svg';
import TabBasketIcon from '@/assets/svgs/tab-basket.svg';
import TabFinacial from '@/assets/svgs/tab-financial.svg';
import TabProfileIcon from '@/assets/svgs/tab-profile.svg';

type NavPropsProducer = NativeStackNavigationProp<
  LoggedConsumerStackParamList,
  'HomeConsumer' | 'BasketConsumer' | 'DonationConsumer' | 'ProfileConsumer'
>;

export const ButtonTabConsumer: React.FC<BottomTabBarProps> = ({state}) => {
  const {navigate} = useNavigation<NavPropsProducer>();
  const activeTab = state.routes[state.index].name;
  const theme = useTheme();

  const renderTab = (
    icon: JSX.Element,
    title: string,
    route: keyof LoggedConsumerStackParamList,
  ) => (
    <StyledButtonInactive onPress={() => navigate(route)}>
      {icon}
      {activeTab === route ? (
        <StyledTextActive>{title}</StyledTextActive>
      ) : (
        <StyledTextInactive>{title}</StyledTextInactive>
      )}
    </StyledButtonInactive>
  );

  return (
    <StyledBottomTabContainer>
      <StyledButtonTabRow>
        {renderTab(
          <TabHomeIcon
            fill={
              activeTab === 'HomeConsumer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Início',
          'HomeConsumer',
        )}

        {renderTab(
          <TabBasketIcon
            fill={
              activeTab === 'BasketConsumer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Minha cesta',
          'BasketConsumer',
        )}

        {renderTab(
          <TabFinacial
            fill={
              activeTab === 'DonationConsumer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Doações',
          'DonationConsumer',
        )}

        {renderTab(
          <TabProfileIcon
            fill={
              activeTab === 'ProfileConsumer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Perfil',
          'ProfileConsumer',
        )}
      </StyledButtonTabRow>
    </StyledBottomTabContainer>
  );
};

export const StyledBottomTabContainer = styled.SafeAreaView`
  height: 49px;
  background-color: ${({theme}) => theme.colors.GRAY_100};

  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.12);
`;

export const StyledButtonTabRow = styled.View`
  width: 85%;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

export const StyledButtonInactive = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
  justify-content: flex-end;
`;

export const StyledTextInactive = styled.Text`
  font-family: ${({theme}) => theme.fonts.REGULAR_SOURCESANSPRO};
  font-size: ${({theme}) => theme.sizing.SMALLEST};
  color: ${({theme}) => theme.colors.GRAY_900};
  margin-top: 5px;
`;

export const StyledTextActive = styled(StyledTextInactive)`
  background-color: ${({theme}) => theme.colors.PRIMARY_100};
  border-radius: 10px;
  padding: 0 10px;
`;
