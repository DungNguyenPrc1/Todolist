import React, {memo, useEffect} from 'react';

import DefaultTheme, {lightColors} from '@assets/theme';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';
import {persistor, store} from './src/store/index';
import RootComponent from './src/screens';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const toastConfigParamDefault: BaseToastProps = {
    text2Style: {
      fontSize: 14,
      lineHeight: 18,
    },
    style: {
      height: 'auto',
      paddingVertical: 5,
      minHeight: 60,
    },
    text2Props: {numberOfLines: 5},
  };
  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        {...toastConfigParamDefault}
        style={[
          toastConfigParamDefault.style,
          {borderLeftColor: lightColors.successColor},
        ]}
      />
    ),
    error: props => (
      <BaseToast
        {...props}
        {...toastConfigParamDefault}
        style={[
          toastConfigParamDefault.style,
          {borderLeftColor: lightColors.wrongColor},
        ]}
      />
    ),
    info: props => (
      <BaseToast
        {...props}
        {...toastConfigParamDefault}
        style={[
          toastConfigParamDefault.style,
          {borderLeftColor: lightColors.warningColor},
        ]}
      />
    ),
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={DefaultTheme}>
          <RootComponent />
          <Toast
            // topOffset={statusBarHeight}
            visibilityTime={2000}
            config={toastConfig}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
