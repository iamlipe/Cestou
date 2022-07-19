import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '@/presentational/LoginScreen/Login';

export type RoutesParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RoutesParamList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);
