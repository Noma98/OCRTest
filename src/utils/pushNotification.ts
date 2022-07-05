import { Alert, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { navigate } from '@/routes/common/RootNavigation';
import { isAndroid } from '@/utils/check';

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  return fcmToken;
};
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    Alert.alert(
      'KTP',
      `푸쉬 알림에 대한 권한 사용을 거부하였습니다. 기능 사용을 원하실 경우 ${
        !isAndroid()
          ? '설정 > KTP에서'
          : '설정 > 애플리케이션 관리자에서 해당 앱의'
      } 알림 권한을 허용해 주세요.`,
      [
        {
          text: '닫기',
          style: 'cancel',
        },
        {
          text: '설정으로 이동',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  }
};
export const getPushCallback = (
  pushCategory: string,
  createdDate: string,
  noticeIndex?: number,
) => {
  switch (Number(pushCategory)) {
    case 1:
      return () => navigate('FranchiseeApplication');
    case 2:
      return () => navigate('StoreMode', { screen: 'MyPage' });
    case 3:
    case 5:
      return () =>
        navigate('PushNotificationDetail', { pushCategory, createdDate });
    case 4:
      return () => navigate('FranchiseeReApplication');
    case 7:
    case 13:
    case 14:
      return () => navigate('PushNotification');
    case 8:
      return () => navigate('StoreMode', { screen: 'Tpoint' });
    case 9:
    case 10:
      return () => navigate('SalesStatistics');
    case 11:
      return () => navigate('VatReport');
    case 12:
      return () => navigate('CMSReport');
    case 15:
      return () => {
        noticeIndex !== 0 && navigate('NoticeDetail', { noticeIndex });
      };
  }
};
export const subscribeTopic = () => {};
