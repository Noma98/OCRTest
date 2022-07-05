import { PermissionsAndroid, Platform } from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

type PermissionResponseType = 'DISABLED' | 'ACCEPTED' | 'REQUIRED' | 'LINKING';

interface ICheckResponse {
  type: PermissionResponseType;
  message?: string;
}

export const checkCameraPermissions = async (): Promise<ICheckResponse> => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 23) {
      // Marshmallow or newer
      const permissionResponseType = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return permissionResponseType
        ? { type: 'ACCEPTED' }
        : { type: 'REQUIRED' };
    } else {
      return {
        type: 'DISABLED',
        message: '카메라 기능을 사용할 수 없는 기기입니다.',
      };
    }
  } else {
    const result = await check(PERMISSIONS.IOS.CAMERA);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return {
          type: 'DISABLED',
          message: '카메라 기능을 지원하지 않는 기기입니다.',
        };
      case RESULTS.GRANTED:
        return { type: 'ACCEPTED' };
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
        return { type: 'LINKING' };
      case RESULTS.DENIED:
        return { type: 'REQUIRED' };
    }
  }
};

export const requestCameraPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android Camera Permission has been granted.');
        return Promise.resolve();
      } else {
        console.log('Android Camera Permission has been denied.');
        return Promise.reject({
          type: 'LINKING',
        });
      }
    } catch (err) {
      return Promise.reject(err);
    }
  } else {
    try {
      const status = await request(PERMISSIONS.IOS.CAMERA);
      if (status !== RESULTS.GRANTED) {
        return Promise.reject({
          type: 'LINKING',
        });
      } else {
        return Promise.resolve();
      }
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
};

export const requestCameraPermissionsIfNeeded = async () => {
  const { type, message } = await checkCameraPermissions();
  if (type === 'REQUIRED') {
    return requestCameraPermissions();
  } else if (type === 'ACCEPTED') {
    return Promise.resolve();
  } else {
    return Promise.reject({
      type,
      message,
    });
  }
};
