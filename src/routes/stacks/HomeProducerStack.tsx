import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeProducer as HomeProducerScreen} from '@/presentational/HomeScreen/HomeProducer';
import {HomeMyBasketsProducer} from '@/presentational/HomeScreen/HomeMyBasketsProducer';

export type HomeProducerStackParamList = {
  HomeProducer: undefined;
  HomeMyBasketsProducer: undefined;
};

const HomeProducer = createNativeStackNavigator<HomeProducerStackParamList>();

export const HomeProducerStack = () => {
  return (
    <HomeProducer.Navigator
      initialRouteName="HomeProducer"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <HomeProducer.Screen name="HomeProducer" component={HomeProducerScreen} />
      <HomeProducer.Screen
        name="HomeMyBasketsProducer"
        component={HomeMyBasketsProducer}
      />
    </HomeProducer.Navigator>
  );
};
