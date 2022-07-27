import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '@/presentational/LoginScreen/Login';
import {Register} from '@/presentational/LoginScreen/Register';
import {ConfirmRegister} from '@/presentational/LoginScreen/ConfirmRegister';
import {Onboarding} from '@/presentational/OnboardingScreen/Onboarding';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ConfirmRegister: {
    phoneOrEmail: string;
    password: string;
    userType: 'producer' | 'consumer';
  };
  Onboarding: {
    phoneOrEmail: string;
    password: string;
  };
};

const Auth = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Auth.Navigator screenOptions={{headerShown: false}}>
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Register" component={Register} />
    <Auth.Screen name="ConfirmRegister" component={ConfirmRegister} />
    <Auth.Screen name="Onboarding" component={Onboarding} />
  </Auth.Navigator>
);
