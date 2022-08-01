import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'styled-components/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  TabNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedProducerStackParamList} from '../stacks/LoggedProducerStack';

import {
  StyledBottonTabContainer,
  StyledButtonInactive,
  StyledTextActive,
  StyledTextInactive,
  StyledButtonTabRow,
} from './BottomTabConsumer';

type NavPropsProducer = NativeStackNavigationProp<
  LoggedProducerStackParamList,
  'HomeProducerStack' | 'FinancialProducerStack' | 'ProfileProducer'
>;

interface Props {
  state: TabNavigationState<ParamListBase>;
}

export const ButtonTabProducer: React.FC<Props> = ({state}) => {
  const {navigate} = useNavigation<NavPropsProducer>();
  const activeTab = state.routes[state.index].name;
  const theme = useTheme();

  const renderTab = (
    name: string,
    title: string,
    route: keyof LoggedProducerStackParamList,
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
        {renderTab('home', 'Início', 'HomeProducerStack', 'icon-tab-home')}
        {renderTab(
          'attach-money',
          'Financeiro',
          'FinancialProducerStack',
          'icon-tab-financial',
        )}
        {renderTab('person', 'Perfil', 'ProfileProducer', 'icon-tab-profile')}
      </StyledButtonTabRow>
    </StyledBottonTabContainer>
  );
};
