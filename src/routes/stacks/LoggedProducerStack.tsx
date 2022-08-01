import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ButtonTabProducer} from '../BottomTab/BottomTabProducer';

// import {HomeProducerTopTab} from '../topTabs/HomeProducerTopTab';
import {HomeProducerStack} from '../stacks/HomeProducerStack';
import {HomeFinancialProducer} from '@/presentational/FinancialScreen/HomeFinancialProducer';
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
      component={HomeFinancialProducer}
    />
    <LoggedProducer.Screen name="ProfileProducer" component={Profile} />
  </LoggedProducer.Navigator>
);
