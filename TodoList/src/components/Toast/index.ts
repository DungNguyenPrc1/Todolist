import Toast from 'react-native-toast-message';

export default {
  success: (text: string) => {
    Toast.show({
      type: 'success',
      text2: typeof text === 'string' && text ? text : 'success',
    });
  },

  error: (text?: any) => {
    Toast.show({
      type: 'error',
      text2: typeof text === 'string' && text ? text : 'error',
    });
  },

  warning: (text: string = '') => {
    Toast.show({
      type: 'info',
      text2: typeof text === 'string' && text ? text : 'Warning',
    });
  },
};
