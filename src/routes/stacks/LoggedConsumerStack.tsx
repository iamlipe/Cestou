import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {ButtonTabConsumer} from '../BottomTab/BottomTabConsumer';

import {HomeConsumer} from '@/presentational/HomeScreen/HomeConsumer';
import {DonationConsumer} from '@/presentational/DonationScreen/DonationConsumer';
import {BasketConsumerStack} from './BasketConsumerStack';
import {Profile} from '@/presentational/ProfileScreen/Profile';

export type LoggedConsumerStackParamList = {
  HomeConsumer: undefined;
  DonationConsumer: undefined;
  BasketConsumerStack: undefined;
  ProfileConsumer: undefined;
};

const TabBar = (props: BottomTabBarProps) => (
  <ButtonTabConsumer state={props.state} />
);

const LoggedConsumer = createBottomTabNavigator<LoggedConsumerStackParamList>();

export const LoggedConsumerStack = () => (
  <LoggedConsumer.Navigator
    initialRouteName="HomeConsumer"
    tabBar={props => TabBar(props)}
    screenOptions={{headerShown: false}}>
    <LoggedConsumer.Screen name="HomeConsumer" component={HomeConsumer} />
    <LoggedConsumer.Screen
      name="DonationConsumer"
      component={DonationConsumer}
    />
    <LoggedConsumer.Screen name="ProfileConsumer" component={Profile} />
    <LoggedConsumer.Screen
      name="BasketConsumerStack"
      component={BasketConsumerStack}
    />
  </LoggedConsumer.Navigator>
);
