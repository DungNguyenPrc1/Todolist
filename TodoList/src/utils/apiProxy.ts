import {select, call, put} from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';

import {accessTokenSelector} from '@redux/authentication/reducer';
import * as RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';

// mocking test refresh token
let shouldRefresh = true;
let interval = setInterval(() => {
  shouldRefresh = !shouldRefresh;
}, 100000);

export function* apiCallProxy(...args: any[]): any {
  try {
    // if (shouldRefresh) {
    //   shouldRefresh = false;
    //   throw {
    //     error: 'mocking test refreshtoken',
    //     status: 401,
    //   };
    // }
    const isRefreshingToken: boolean = yield select(
      state => state.authentication?.isRefreshingToken,
    );
    const accessToken: string = yield select(accessTokenSelector);
    // put after function
    // function should accept these arguments: token, orderToken, and so on.
    // position arguments: function, param1, param2, ...
    const argumentsIncludeToken = cloneDeep(args);
    argumentsIncludeToken.splice(1, 0, accessToken);

    if (isRefreshingToken) {
      // Is refreshing token, try again later
      setTimeout(() => {
        return apiCallProxy(...args);
      }, 3000);
    }

    // Call api as normal
    // @ts-ignore
    return yield call(...argumentsIncludeToken);
  } catch (error: any) {
    console.log('API CALL PROXY');
    console.log(error);
    // Error 401 => Should refresh token
    if (error && error?.status && error?.status == 403) {
    }
    throw error;
  }
}

export const downloadPdfFileAPI = async ({
  pdfURL,
  title,
}: {
  pdfURL: string;
  title: string;
}) => {
  const filePath = RNFS.DownloadDirectoryPath + '/' + `${title}.pdf`;

  const configfb = {
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    mime: 'application/pdf',
    title: `${title}.pdf`,
    path: filePath,
  };

  return ReactNativeBlobUtil.config({
    fileCache: true,
    addAndroidDownloads: configfb,
  }).fetch('GET', pdfURL, {});
};
