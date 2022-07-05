import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AppState } from 'react-native';
import styled from 'styled-components/native';

import { updateFranchiseeSettings } from '@/api/user';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import ToggleButton from '@/components/common/ToggleButton';
import ServiceToggle from '@/components/NotificationSettings/ServiceToggle';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { updateUserSetting } from '@/store/modules/user';
import { NotificationSettingsScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';

interface IProps {
  route: NotificationSettingsScreenProps['route'];
}
function NotificationSettings({ route }: IProps) {
  const { isActiveSound, isActiveVibration, franchiseeIndex, employeeIndex } =
    useAppSelector(state => state.user.userInfo) as IUserInfo;
  const pushState = route.params.pushState;
  const [isPushActive, setIsPushActive] = useState(pushState);
  const dispatch = useAppDispatch();

  const onToggleVibrationOrSound = async (type: 'VIBRATION' | 'SOUND') => {
    let result;
    try {
      const { message } = await updateFranchiseeSettings({
        franchiseeIndex,
        employeeIndex,
        name: type === 'VIBRATION' ? 'isActiveVibration' : 'isActiveSound',
        value: type === 'VIBRATION' ? !isActiveVibration : !isActiveSound,
        settingSelector: type === 'VIBRATION' ? 'VIBRATION' : 'SOUND',
      });
      if (message.match('VIBRATION')) {
        dispatch(
          updateUserSetting({
            name: 'isActiveVibration',
            value: !isActiveVibration,
          }),
        );
      } else {
        dispatch(
          updateUserSetting({ name: 'isActiveSound', value: !isActiveSound }),
        );
      }

      result = true;
    } catch {
      result = false;
    }
    return result;
  };
  const getPushPermission = async () => {
    const hasPermission = await messaging().hasPermission();
    setIsPushActive(Boolean(hasPermission));
  };

  useLayoutEffect(() => {
    getPushPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', getPushPermission);
    return () => subscription.remove();
  }, []);

  return (
    <BodyWrap isPadding={false}>
      <DividingLine text="여권 스캔 알림" />
      <ListItem>
        <Text text="소리" />
        <ToggleButton
          onToggleCallback={() => onToggleVibrationOrSound('SOUND')}
          active={isActiveSound}
        />
      </ListItem>
      <ListItem>
        <Text text="진동" />
        <ToggleButton
          onToggleCallback={() => onToggleVibrationOrSound('VIBRATION')}
          active={isActiveVibration}
        />
      </ListItem>
      <DividingLine text="푸시 알림" />
      <ListItem>
        <Text text="서비스 알림" />
        <ServiceToggle active={isPushActive} initialState={pushState} />
      </ListItem>
      <Text
        text="서비스 정책 변경 알림 및 정보성 알림은 위 설정과 무관하게 받을 수 있습니다."
        margin={[16, 20]}
        size="14px"
        lineHeight={22}
        color="#5F6165"
      />
    </BodyWrap>
  );
}

const ListItem = styled(FlexWrap)`
  justify-content: space-between;
  align-items: center;
  height: 56px;
  margin: 0 20px;
  border-bottom-width: 1px;
  border-color: #edeeef;
`;
export default NotificationSettings;
