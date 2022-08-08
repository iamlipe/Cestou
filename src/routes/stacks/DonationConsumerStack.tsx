import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeDonationConsumer} from '@/presentational/DonationScreen/HomeDonationConsumer';
import {ConfirmDonations} from '@/presentational/DonationScreen/ConfirmDonation';

export type DonationConsumerStackParamList = {
  HomeDonationConsumer: undefined;
  ConfirmDonations: undefined;
};

const DonationConsumer =
  createNativeStackNavigator<DonationConsumerStackParamList>();

export const DonationConsumerStack = () => {
  return (
    <DonationConsumer.Navigator
      initialRouteName="HomeDonationConsumer"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <DonationConsumer.Screen
        name="HomeDonationConsumer"
        component={HomeDonationConsumer}
      />
      <DonationConsumer.Screen
        name="ConfirmDonations"
        component={ConfirmDonations}
      />
    </DonationConsumer.Navigator>
  );
};
