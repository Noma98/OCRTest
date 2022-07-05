import messaging from '@react-native-firebase/messaging';
import React, { useCallback } from 'react';
import { Linking, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useMutation } from 'react-query';
import styled, { css } from 'styled-components/native';

import { signOut } from '@/api/user';
import rightArrow from '@/assets/icons/Market/rightArrow.png';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import AsyncStorageService from '@/models/asyncStorageService';
import { signOutSuccess } from '@/store/modules/user';
import { ISignInResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { SettingScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { isAndroid } from '@/utils/check';
import { getScreenSize } from '@/utils/common';

interface IProps {
  navigation: SettingScreenProps['navigation'];
}

function Setting({ navigation }: IProps) {
  const dispatch = useAppDispatch();
  const mutation = useMutation<number, IError, ISignInResponse>(
    payload => signOut(payload),
    { retry: false },
  );
  const { userSelector } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );

  const onSignOut = useCallback(async () => {
    const existedUserInfo =
      await AsyncStorageService.getService().getStorageTokenInfo();
    if (existedUserInfo) {
      mutation.mutate(existedUserInfo);
    }
    dispatch(signOutSuccess());
  }, [dispatch, mutation]);

  const onUpdatePassword = useCallback(
    () => navigation.navigate('EnterCurrentPwd'),
    [navigation],
  );
  const onNavitateToPersonalTerm = useCallback(
    () => navigation.navigate('Terms', { type: 'PERSONAL_TYPE' }),
    [navigation],
  );
  const onNavitateToServiseTerm = useCallback(
    () => navigation.navigate('Terms', { type: 'SERVICE_TYPE' }),
    [navigation],
  );
  const onNavitateToCMSTerm = useCallback(
    () => navigation.navigate('Terms', { type: 'CMS_TYPE' }),
    [navigation],
  );
  const onNavitateToPointTerm = useCallback(
    () => navigation.navigate('Terms', { type: 'POINT_TYPE' }),
    [navigation],
  );
  const onPressVersionInfo = useCallback(() => {
    const GOOGLE_PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.successmode.ktp'; //
    const APPLE_APP_STORE_LINK =
      'https://apps.apple.com/kr/app/ktp/id1566544989';
    Linking.openURL(
      isAndroid() ? GOOGLE_PLAY_STORE_LINK : APPLE_APP_STORE_LINK,
    );
  }, []);
  const onNavigationToNotificationSettings = useCallback(async () => {
    const hasPermission = await messaging().hasPermission();
    navigation.navigate('NotificationSettings', {
      pushState: Boolean(hasPermission),
    });
  }, [navigation]);

  const titles = [
    ...(userSelector === 'FRANCHISEE'
      ? [
          { title: '알림 설정', onPress: onNavigationToNotificationSettings },
          {
            title: '비밀번호 변경',
            onPress: onUpdatePassword,
            borderBottom: true,
          },
          {
            title: '개인정보 이용/수집 동의',
            onPress: onNavitateToPersonalTerm,
          },
          { title: '서비스 이용약관', onPress: onNavitateToServiseTerm },
          { title: 'CMS 출금 동의', onPress: onNavitateToCMSTerm },
          {
            title: 'T.POINT 이용약관',
            onPress: onNavitateToPointTerm,
            borderBottom: true,
          },
        ]
      : []),
    {
      title: '앱 사용방법 다운로드',
      onPress: () => {
        Linking.openURL('https://ktaxpay.com/faq');
      },
    },
    { title: '버전정보', onPress: onPressVersionInfo },
    { title: '로그아웃', onPress: onSignOut },
  ];
  return (
    <BodyWrap isPadding={false}>
      <Menu>
        <DividingLine height="8px" color="#EDEEEF" />
        {titles.map(({ title, onPress, borderBottom }, idx) => {
          return title !== '버전정보' ? (
            <View key={idx}>
              <ListItem activeOpacity={1} onPress={onPress}>
                <ItemWrap>
                  <Text text={title} />
                  <Icon source={rightArrow} />
                </ItemWrap>
              </ListItem>
              {borderBottom && <DividingLine height="8px" color="#EDEEEF" />}
            </View>
          ) : (
            <ListItem key={idx} activeOpacity={1} onPress={onPress}>
              <ItemWrap>
                <Text text={title} />
                <Text
                  text={`ver. ${DeviceInfo.getVersion()}`}
                  color="#005F83"
                />
              </ItemWrap>
            </ListItem>
          );
        })}
      </Menu>
    </BodyWrap>
  );
}

const Menu = styled.View`
  flex: 1;
  padding-bottom: 100px;
  ${getScreenSize().height < 700 &&
  css`
    padding-bottom: 100px;
  `}
`;

const ListItem = styled.TouchableOpacity`
  margin: 0 20px;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #edeeef;
`;
const ItemWrap = styled(FlexWrap)`
  justify-content: space-between;
`;
const Icon = styled.Image`
  width: 24px;
  height: 24px;
  padding: 4px;
`;
export default Setting;
