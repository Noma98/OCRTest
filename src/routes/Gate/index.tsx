import ktpIcon from '@/assets/icons/Etc/ktpIcon.png';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import { navigate } from '@/routes/common/RootNavigation';
import Text from '@/components/common/Text';
import { useCodePush } from '@/components/context/CodepushProvider';
import { useAppSelector } from '@/hooks/useReduxHooks';
import AppNavigation from '@/routes/Main/AppNavigation';
import { isAndroid } from '@/utils/check';
import { playSound } from '@/utils/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Vibration } from 'react-native';
import codePush from 'react-native-code-push';
import DropdownAlert from 'react-native-dropdownalert';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useQueryClient } from 'react-query';
import AuthNavigation from '../Auth/AuthNavigation';

interface IProps {
  firstRenderRef: MutableRefObject<number>;
}
function Gate({ firstRenderRef }: IProps) {
  const queryClient = useQueryClient();
  let dropDownAlertRef = useRef();
  const { userInfo } = useAppSelector(state => state.user);
  const { isAuth } = useAppSelector(state => state.user);

  const [push, setPush] = useState({
    title: '',
    body: '',
    visible: false,
    pushCategory: undefined,
  });

  const onClosePush = useCallback(() => {
    setPush(state => {
      return { ...state, visible: false };
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('💌 알림 도착::::::', remoteMessage);
      const hasPermission = await messaging().hasPermission();
      if (hasPermission) {
        setPush({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          pushCategory: Number(remoteMessage.data.pushCategory),
          visible: true,
        });
        playSound('push_sound.mp3');
        Vibration.vibrate();
      }
      queryClient.invalidateQueries([
        'unreadAlertCount',
        userInfo?.franchiseeIndex,
      ]);
      queryClient.refetchQueries(['pushLists', userInfo?.franchiseeIndex]);
      setTimeout(() => onClosePush(), 5000);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    push.visible &&
      dropDownAlertRef.alertWithType('custom', push.title, push.body);
  }, [push.visible]);

  useEffect(() => {
    firstRenderRef.current = 2;
  }, []);
  const { status } = useCodePush();
  const [isFirst, setIsFirst] = useState<boolean>();

  const fetchIsFirst = useCallback(async () => {
    const keyFirstRender = await AsyncStorage.getItem('keyFirstRender');
    if (!keyFirstRender) {
      setIsFirst(true);
      await AsyncStorage.setItem('keyFirstRender', 'Launched...');
    } else {
      setIsFirst(false);
    }
  }, []);

  useLayoutEffect(() => {
    fetchIsFirst();
  }, [fetchIsFirst]);
  return (
    <>
      {isAuth ? <AppNavigation /> : <AuthNavigation isFirst={isFirst} />}
      {status === codePush.SyncStatus.DOWNLOADING_PACKAGE && (
        <LoadingView isOpacity />
      )}
      <DropdownAlert
        containerStyle={{
          backgroudColor: '#FFFFFF',
        }}
        imageSrc={ktpIcon}
        imageStyle={{
          width: 38,
          height: 38,
          alignSelf: 'center',
          borderRadius: 8,
        }}
        renderTitle={() => (
          <FlexWrap
            style={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text
              text={push.title}
              size="15px"
              lineHeight={18}
              weight="600"
              style={{ flex: 1 }}
            />
            <Text
              text="지금"
              size="12px"
              lineHeight={14}
              color="#3f3f3f7e"
              style={{ paddingLeft: 20 }}
            />
          </FlexWrap>
        )}
        messageStyle={{
          color: '#3f3f3f',
          fontSize: 15,
          lineHeight: 18,
        }}
        activeStatusBarStyle="dark-content"
        inactiveStatusBarStyle="dark-content"
        activeStatusBarBackgroundColor="#ffffff"
        inactiveStatusBarBackgroundColor="#ffffff"
        titleNumOfLines={2}
        messageNumOfLines={2}
        defaultContainer={{
          minHeight: 80,
          shadowColor: 'black',
          shadowRadius: 10,
          shadowOpacity: 0.2,
          backgroundColor: '#f5f6f7',
          elevation: 10,
          marginHorizontal: 10,
          padding: 9,
          borderRadius: 16,
        }}
        endDelta={isAndroid() ? 10 : getStatusBarHeight()}
        closeInterval={5000}
        onTap={() => navigate('PushNotification')}
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </>
  );
}

export default Gate;
