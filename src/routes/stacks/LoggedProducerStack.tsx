import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeProducer} from '@/presentational/HomeScreen/HomeProducer';

export type LoggedProducerStackParamList = {
  HomeProducer: undefined;
};

const LoggedProducer =
  createNativeStackNavigator<LoggedProducerStackParamList>();

export const LoggedProducerStack = () => (
  <LoggedProducer.Navigator screenOptions={{headerShown: false}}>
    <LoggedProducer.Screen name="HomeProducer" component={HomeProducer} />
  </LoggedProducer.Navigator>
);
