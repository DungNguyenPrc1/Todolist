import axios, {AxiosRequestConfig} from 'axios';

const mainAxios = axios.create({
  baseURL: 'fir-rn-db326-default-rtdb.firebaseio.com',
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
  timeout: 60000,
});
export enum AcceptType {
  json = 'application/json',
  formData = 'multipart/form-data',
  urlencode = 'application/x-www-form-urlencoded',
}
const defaultHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
};

const formHeader = {
  Accept: AcceptType.formData,
  'Content-Type': AcceptType.formData,
};

export class apiClient {
  config: AxiosRequestConfig;
  headers: any;

  constructor(token?: string) {
    const authHeader =
      token && token.length > 0 ? {Authorization: 'Bearer ' + token} : null;
    this.config = {};
    this.headers = {
      ...defaultHeader,
      ...authHeader,
    };
  }

  get = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.get(url, {
      ...this.config,
      params: {
        ...body,
      },
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  post = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  postForm = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...formHeader,
        ...headers,
      },
      ...rest,
    });
  };

  delete = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.delete(url, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      data: {
        ...body,
      },
      ...rest,
    });
  };

  put = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.put(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  patch = (url: string, body?: any, option?: any, baseUrl?: string) => {
    option = option || {};
    const {headers, ...rest} = option;
    if (baseUrl) {
      mainAxios.defaults.baseURL = baseUrl;
    }
    return mainAxios.patch(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };
}
