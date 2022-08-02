import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ButtonTabProducer} from '../BottomTab/BottomTabProducer';

import {HomeProducerStack} from '../stacks/HomeProducerStack';
import {FinancialProducerStack} from './FinancialProducerStack';
import {Profile} from '@/presentational/ProfileScreen/Profile';

export type LoggedProducerStackParamList = {
  HomeProducerStack: undefined;
  FinancialProducerStack: undefined;
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
      name="FinancialProducerStack"
      component={FinancialProducerStack}
    />
    <LoggedProducer.Screen name="ProfileProducer" component={Profile} />
  </LoggedProducer.Navigator>
);
