import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedConsumerStackParamList} from '../stacks/LoggedConsumerStack';
import {useTranslation} from 'react-i18next';
import {
  ParamListBase,
  TabNavigationState,
  useNavigation,
} from '@react-navigation/native';

type NavPropsProducer = NativeStackNavigationProp<
  LoggedConsumerStackParamList,
  | 'HomeConsumer'
  | 'BasketConsumerStack'
  | 'DonationConsumerStack'
  | 'ProfileConsumer'
>;

interface Props {
  state: TabNavigationState<ParamListBase>;
}

export const ButtonTabConsumer: React.FC<Props> = ({state}) => {
  const {navigate} = useNavigation<NavPropsProducer>();
  const {t} = useTranslation();
  const activeTab = state.routes[state.index].name;
  const theme = useTheme();

  const renderTab = (
    name: string,
    title: string,
    route: keyof LoggedConsumerStackParamList,
    testID: string,
  ) => (
    <StyledButtonInactive onPress={() => navigate(route)}>
      <Icon
        testID={testID}
        name={name}
        size={24}
        color={
          activeTab === route ? theme.colors.PRIMARY_600 : theme.colors.GRAY_700
        }
      />
      {activeTab === route ? (
        <StyledTextActive>{title}</StyledTextActive>
      ) : (
        <StyledTextInactive>{title}</StyledTextInactive>
      )}
    </StyledButtonInactive>
  );

  return (
    <StyledBottonTabContainer>
      <StyledButtonTabRow>
        {renderTab(
          'home',
          t('bottomTab.home'),
          'HomeConsumer',
          'icon-tab-home',
        )}
        {renderTab(
          'shopping-basket',
          t('bottomTab.myBaskets'),
          'BasketConsumerStack',
          'icon-tab-basket',
        )}
        {renderTab(
          'attach-money',
          t('bottomTab.donations'),
          'DonationConsumerStack',
          'icon-tab-donation',
        )}
        {renderTab(
          'person',
          t('bottomTab.profile'),
          'ProfileConsumer',
          'icon-tab-profile',
        )}
      </StyledButtonTabRow>
    </StyledBottonTabContainer>
  );
};

export const StyledBottonTabContainer = styled.SafeAreaView`
  height: 49px;
  background-color: ${({theme}) => theme.colors.GRAY_100};

  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.12);
`;

export const StyledButtonTabRow = styled.View`
  width: 90%;
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
