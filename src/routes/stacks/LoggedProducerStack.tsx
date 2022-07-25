import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ButtonTabProducer} from '../BottonTab/BottonTabProducer';

import {HomeProducer} from '@/presentational/HomeScreen/HomeProducer';
import {FinancialProducer} from '@/presentational/FinancialScreen/FinancialProducer';
import {Profile} from '@/presentational/ProfileScreen/Profile';

export type LoggedProducerStackParamList = {
  HomeProducer: undefined;
  FinancialProducer: undefined;
  ProfileProducer: undefined;
};
const TabBar = (props: BottomTabBarProps) => <ButtonTabProducer {...props} />;

const LoggedProducer = createBottomTabNavigator<LoggedProducerStackParamList>();

export const LoggedProducerStack = () => (
  <LoggedProducer.Navigator
    initialRouteName="HomeProducer"
    tabBar={props => TabBar(props)}
    screenOptions={{headerShown: false}}>
    <LoggedProducer.Screen name="HomeProducer" component={HomeProducer} />
    <LoggedProducer.Screen
      name="FinancialProducer"
      component={FinancialProducer}
    />
    <LoggedProducer.Screen name="ProfileProducer" component={Profile} />
  </LoggedProducer.Navigator>
);
