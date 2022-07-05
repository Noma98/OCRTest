import { Alert } from 'react-native';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import NetInfo from '@react-native-community/netinfo';

import AsyncStorageService from '@/models/asyncStorageService';
import store from '@/store';
import { signOutSuccess } from '@/store/modules/user';

const asyncStorage = AsyncStorageService.getService();

const onFullfilled = (response: AxiosResponse<any>) => {
  return response;
};
const onRejected = async (error: AxiosError<any>) => {
  console.log('=========== onRejected ==========');
  console.error('error request:', error.request);
  console.error('error response:', error.response);
  console.error('error config:', error.config);
  console.error('error isAxiosError:', error.isAxiosError);
  console.error('error message:', error.message);
  console.error('error code:', error.code);
  console.log(error.response?.data);

  const originRequest = error.config;
  const existedUserInfo = await asyncStorage.getStorageTokenInfo();

  // #1 FORCE_REFRESH: AT는 만료됐지만 RT는 살아있는 상황
  if (error.response?.data.code === 'A0002' && !originRequest._retry) {
    originRequest._retry = true;

    if (existedUserInfo) {
      const { accessToken, refreshToken, franchiseeIndex, userSelector } =
        existedUserInfo;

      console.log('========= error log ========');
      console.log('franchiseeIndex : ', franchiseeIndex);
      console.log('expired Token : ', accessToken);
      console.log('using refresh Token : ', refreshToken);
      console.log('============================');

      return axios
        .patch('http://54.180.13.73:50921/refresh', {
          franchiseeIndex,
          refreshToken,
          userSelector,
        })
        .then(response => {
          console.log('Refresh Request Response');
          console.log('new accessToken : ', response.data.accessToken);

          // new AccessToken 설정
          asyncStorage.setStorageTokenInfo(response.data);
          axios.defaults.headers.common.Authorization =
            response.data.accessToken;
          return axios(originRequest);
        })
        .catch((axiosError: AxiosError) => {
          // #2 FORCE_REFRESH: AT, RT 모두 만료된 상황
          // #3 없는 가맹점 번호로 API 요청했을 경우
          // #4 이유 모를 상황 (헨들링 할 수 없는 오류이기 때문에 강제 로그아웃)

          axios.delete<void>('http://211.238.124.178:50921/sign-out', {
            data: existedUserInfo,
          });
          store.dispatch(signOutSuccess());
          return Promise.reject(error);
        });
    }

    // #5 AsyncStorage에 저장된 AT, RT 토큰이 없는 상황
    store.dispatch(signOutSuccess());
    return Promise.reject(error);
  }
  if (error.response?.data.code === 'A0003' && !originRequest._retry) {
    if (existedUserInfo) {
      // #2 FORCE_REFRESH: AT, RT 모두 만료된 상황
      axios.delete<void>('http://211.238.124.178:50921/sign-out', {
        data: existedUserInfo,
      });
    }
    // #5 AsyncStorage에 저장된 AT, RT 토큰이 없는 상황
    store.dispatch(signOutSuccess());
    return Promise.reject(error);
  }
  if (error.message === 'Network Error') {
    NetInfo.fetch().then(state => {
      state.isConnected &&
        Alert.alert(
          'KTP',
          `서버 요청에 실패했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)`,
          [{ text: '확인' }],
        );
    });
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use(async existedConfig => {
    const existedUserInfo = await asyncStorage.getStorageTokenInfo();
    const token = existedUserInfo?.accessToken;

    if (token) {
      existedConfig.headers.Authorization = token;
    }

    return existedConfig;
  });

  axiosInstance.interceptors.response.use(onFullfilled, onRejected);

  return axiosInstance;
};

export default initialization;
