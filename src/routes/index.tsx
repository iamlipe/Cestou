import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '@/presentational/LoginScreen/Login';
import {Register} from '@/presentational/LoginScreen/Register';
import {ConfirmRegister} from '@/presentational/LoginScreen/ConfirmRegister';
import {Onboarding} from '@/presentational/OnboardingScreen/Onboarding';

export type RoutesParamList = {
  Login: undefined;
  Register: undefined;
  ConfirmRegister: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RoutesParamList>();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ConfirmRegister" component={ConfirmRegister} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  </NavigationContainer>
);
