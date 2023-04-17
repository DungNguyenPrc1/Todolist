import * as NativeConfig from 'react-native-config';

function Config() {
  const configObjc = Object.assign(
    {
      API_URL: '',
    },
    NativeConfig.Config,
  );

  return configObjc;
}

const CONFIG = Config();

export default CONFIG;
