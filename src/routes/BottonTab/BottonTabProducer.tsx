import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'styled-components/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedProducerStackParamList} from '../stacks/LoggedProducerStack';

import {
  StyledBottonTabContainer,
  StyledButtonInactive,
  StyledTextActive,
  StyledTextInactive,
  StyledButtonTabRow,
} from './BottonTabConsumer';

type NavPropsProducer = NativeStackNavigationProp<
  LoggedProducerStackParamList,
  'HomeProducer' | 'FinancialProducer' | 'ProfileProducer'
>;

export const ButtonTabProducer: React.FC<BottomTabBarProps> = ({state}) => {
  const {navigate} = useNavigation<NavPropsProducer>();
  const activeTab = state.routes[state.index].name;
  const theme = useTheme();

  const renderInactiveTab = (
    name: string,
    title: string,
    route: keyof LoggedProducerStackParamList,
  ) => (
    <StyledButtonInactive onPress={() => navigate(route)}>
      <Icon
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
        {renderInactiveTab('home', 'Início', 'HomeProducer')}
        {renderInactiveTab('attach-money', 'Financeiro', 'FinancialProducer')}
        {renderInactiveTab('person', 'Perfil', 'ProfileProducer')}
      </StyledButtonTabRow>
    </StyledBottonTabContainer>
  );
};