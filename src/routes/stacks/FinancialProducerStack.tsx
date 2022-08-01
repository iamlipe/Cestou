import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeFinancialProducer} from '@/presentational/FinancialScreen/HomeFinancialProducer';
import {RegisterPixFinancialProducer} from '@/presentational/FinancialScreen/RegisterPixFinancialProducer';

export type FinancialProducerStackParamList = {
  HomeFinancialProducer: undefined;
  RegisterPixFinancialProducer: undefined;
};

const FinancialProducer =
  createNativeStackNavigator<FinancialProducerStackParamList>();

export const FinancialProducerStack = () => {
  return (
    <FinancialProducer.Navigator
      initialRouteName="HomeFinancialProducer"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <FinancialProducer.Screen
        name="HomeFinancialProducer"
        component={HomeFinancialProducer}
      />
      <FinancialProducer.Screen
        name="RegisterPixFinancialProducer"
        component={RegisterPixFinancialProducer}
      />
    </FinancialProducer.Navigator>
  );
};
