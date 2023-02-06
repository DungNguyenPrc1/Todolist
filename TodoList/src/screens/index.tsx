import React, {useRef, useEffect, useState, createRef} from 'react';

import {navigationRef} from '@navigations/index';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, AppState} from 'react-native';
import styled from 'styled-components/native';

import Text from '@components/Text';
import VStack from '@components/VerticalStack';
import HStack from '@components/HorizontalStack';
import Spacer from '@components/Spacer';
import i18n from '@locales/index';
import SignInScreen from './SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';

const RootComponent = () => {
  const Stack = createNativeStackNavigator();
  const routeNameRef = useRef<string>();

  // App on foreground handle
  const oldAppState = useRef(AppState.currentState);

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
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootComponent;
