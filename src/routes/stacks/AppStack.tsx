import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useReduxSelector} from '@/hooks/useReduxSelector';

import {AuthStack} from './AuthStack';
import {LoggedProducerStack} from './LoggedProducerStack';
import {LoggedConsumerStack} from './LoggedConsumerStack';

export type AppStackParamList = {
  AuthStack: undefined;
  LoggedProducerStack: undefined;
  LoggedConsumerStack: undefined;
};

const App = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const userReducer = useReduxSelector(({user}) => user);

  return (
    <App.Navigator screenOptions={{headerShown: false}}>
      {!userReducer.auth ? (
        <App.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <>
          {userReducer.auth.userType === 'producer' ? (
            <App.Screen
              name="LoggedProducerStack"
              component={LoggedProducerStack}
            />
          ) : (
            <App.Screen
              name="LoggedProducerStack"
              component={LoggedConsumerStack}
            />
          )}
        </>
      )}
    </App.Navigator>
  );
};
