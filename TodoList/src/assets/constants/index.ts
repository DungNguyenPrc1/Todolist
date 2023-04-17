import {Dimensions} from 'react-native';

export enum MaxSize {
  WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height,
}
export enum AuthState {
  AUTHORIZED = 'Authorized',
  UNAUTHORIZED = 'Unauthorized',
  FORCE_UPDATE = 'FORCE_UPDATE',
}
