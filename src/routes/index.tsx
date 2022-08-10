import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStack, AppStackParamList} from './stacks/AppStack';
import {Splash} from '@/presentational/SplashScreen/Splash';

export type RoutesParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList> | undefined;
  Splash: undefined;
};

const MainStack = createNativeStackNavigator<RoutesParamList>();

export const Routes = () => (
  <NavigationContainer>
    <MainStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="AppStack" component={AppStack} />
    </MainStack.Navigator>
  </NavigationContainer>
);
