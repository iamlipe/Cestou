import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeConsumer} from '@/presentational/HomeScreen/HomeConsumer';

export type LoggedConsumerStackParamList = {
  HomeConsumer: undefined;
};

const LoggedConsumer =
  createNativeStackNavigator<LoggedConsumerStackParamList>();

export const LoggedConsumerStack = () => (
  <LoggedConsumer.Navigator screenOptions={{headerShown: false}}>
    <LoggedConsumer.Screen name="HomeConsumer" component={HomeConsumer} />
  </LoggedConsumer.Navigator>
);
