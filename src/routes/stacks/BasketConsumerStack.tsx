import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BasketSignupPlanConsumer} from '@/presentational/BasketScreen/BasketSignupPlanConsumer';
import {BasketSignupFoodConsumer} from '@/presentational/BasketScreen/BasketSignupFoodConsumer';
import {BasketSignupPaymentConsumer} from '@/presentational/BasketScreen/BasketSignupPaymentConsumer';

export type BasketConsumerStackParamList = {
  BasketSignupPlanConsumer: undefined;
  BasketSignupFoodConsumer: undefined;
  BasketSignupPaymentConsumer: undefined;
};

const BasketConsumer =
  createNativeStackNavigator<BasketConsumerStackParamList>();

export const BasketConsumerStack = () => {
  return (
    <BasketConsumer.Navigator
      initialRouteName="BasketSignupPlanConsumer"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <BasketConsumer.Screen
        name="BasketSignupPlanConsumer"
        component={BasketSignupPlanConsumer}
      />
      <BasketConsumer.Screen
        name="BasketSignupFoodConsumer"
        component={BasketSignupFoodConsumer}
      />
      <BasketConsumer.Screen
        name="BasketSignupPaymentConsumer"
        component={BasketSignupPaymentConsumer}
      />
    </BasketConsumer.Navigator>
  );
};
