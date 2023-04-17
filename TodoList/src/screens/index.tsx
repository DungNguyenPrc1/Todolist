import React, {useRef, useEffect, useState, createRef} from 'react';

import {navigationRef} from '@navigations/index';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, AppState} from 'react-native';
import styled from 'styled-components/native';
import {navigationOptions} from '@navigations/index';
import Text from '@components/Text';
import VStack from '@components/VerticalStack';
import HStack from '@components/HorizontalStack';
import Spacer from '@components/Spacer';
import i18n from '@locales/index';
import SignInScreen from './SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import TodoScreen from './TodoScreen';
import {useDispatch} from 'react-redux';
import {launchAppHandler} from '@redux/application/reducer';

const RootComponent = () => {
  const Stack = createNativeStackNavigator();
  const routeNameRef = useRef<string>();
  const dispatch = useDispatch();
  // App on foreground handle
  const oldAppState = useRef(AppState.currentState);
  useEffect(() => {
    // console.log('123lauchApp');
    dispatch(launchAppHandler());
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (
        oldAppState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      oldAppState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return function cleanup() {
      subscription.remove();
    };
    //   }, [dispatch]);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        console.log('App go to inactive|background');
        // TODO:
      }
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    );
  };
  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef?.current?.getCurrentRoute()?.name;
        const routeParams = navigationRef?.current?.getCurrentRoute()?.params;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the tracker
          console.log('currentRouteName: ', currentRouteName);
          if (routeParams) {
            console.log('currentRouteParams: ', routeParams ?? {});
          }
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen name="auth" component={AuthStack} />

        <Stack.Screen name="todo" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootComponent;
