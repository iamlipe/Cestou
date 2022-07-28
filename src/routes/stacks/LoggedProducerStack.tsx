import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ButtonTabProducer} from '../BottomTab/BottomTabProducer';

// import {HomeProducerTopTab} from '../topTabs/HomeProducerTopTab';
import {HomeProducerStack} from '../stacks/HomeProducerStack';
import {FinancialProducer} from '@/presentational/FinancialScreen/FinancialProducer';
import {Profile} from '@/presentational/ProfileScreen/Profile';

export type LoggedProducerStackParamList = {
  HomeProducerStack: undefined;
  FinancialProducer: undefined;
  ProfileProducer: undefined;
};
const TabBar = (props: BottomTabBarProps) => (
  <ButtonTabProducer state={props.state} />
);

const LoggedProducer = createBottomTabNavigator<LoggedProducerStackParamList>();

export const LoggedProducerStack = () => (
  <LoggedProducer.Navigator
    initialRouteName="HomeProducerStack"
    tabBar={props => TabBar(props)}
    screenOptions={{headerShown: false}}>
    <LoggedProducer.Screen
      name="HomeProducerStack"
      component={HomeProducerStack}
    />
    <LoggedProducer.Screen
      name="FinancialProducer"
      component={FinancialProducer}
    />
    <LoggedProducer.Screen name="ProfileProducer" component={Profile} />
  </LoggedProducer.Navigator>
);
