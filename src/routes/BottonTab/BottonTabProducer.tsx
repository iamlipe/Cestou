import React from 'react';
import {useTheme} from 'styled-components/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoggedProducerStackParamList} from '../stacks/LoggedProducerStack';

// icons
import TabHomeIcon from '@/assets/svgs/tab-home.svg';
import TabFinacial from '@/assets/svgs/tab-financial.svg';
import TabProfileIcon from '@/assets/svgs/tab-profile.svg';

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
    icon: JSX.Element,
    title: string,
    route: keyof LoggedProducerStackParamList,
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
    <StyledBottonTabContainer>
      <StyledButtonTabRow>
        {renderInactiveTab(
          <TabHomeIcon
            testID="icon-tab-home"
            fill={
              activeTab === 'HomeProducer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Início',
          'HomeProducer',
        )}

        {renderInactiveTab(
          <TabFinacial
            testID="icon-tab-financial"
            fill={
              activeTab === 'FinancialProducer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Financeiro',
          'FinancialProducer',
        )}

        {renderInactiveTab(
          <TabProfileIcon
            testID="icon-tab-profile"
            fill={
              activeTab === 'ProfileProducer'
                ? theme.colors.PRIMARY_600
                : theme.colors.GRAY_700
            }
          />,
          'Perfil',
          'ProfileProducer',
        )}
      </StyledButtonTabRow>
    </StyledBottonTabContainer>
  );
};
