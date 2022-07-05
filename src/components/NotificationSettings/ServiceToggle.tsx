import React, { useEffect, useRef } from 'react';
import { Animated, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';

import { isAndroid } from '@/utils/check';

interface IProps {
  active: boolean;
  initialState: boolean;
}
function ServiceToggle({ active, initialState }: IProps) {
  const animRef = useRef(new Animated.Value(initialState ? 27 : 0)).current;

  const onPress = async () => {
    Alert.alert(
      'KTP',
      `푸시 알림에 대한 ${
        active
          ? '권한 사용이 허용된 상태입니다. 기능 사용을 원하지 않는 경우'
          : '권한 사용이 거부된 상태입니다. 기능 사용을 원하실 경우'
      } ${
        !isAndroid()
          ? '설정 > KTP에서'
          : '설정 > 애플리케이션 관리자에서 해당 앱의'
      } 알림을 ${active ? '비활성화' : '활성화'}해 주세요.`,
      [
        {
          text: '닫기',
          style: 'cancel',
        },
        {
          text: '설정으로 이동',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
  };
  useEffect(() => {
    if (active) {
      Animated.timing(animRef, {
        duration: 300,
        toValue: 27,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animRef, {
        duration: 300,
        toValue: -1,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);
  return (
    <Container activeOpacity={0.85} active={active} onPress={onPress}>
      <Animated.View
        style={{
          height: 28,
          width: 28,
          borderRadius: 14,
          backgroundColor: 'white',
          transform: [
            {
              translateX: animRef,
            },
          ],
        }}
      />
    </Container>
  );
}
const Container = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 60px;
  background-color: ${props => (props.active ? '#005F83' : '#cbccce')};
  border: 2px solid ${props => (props.active ? '#005F83' : '#cbccce')};
  border-radius: 16px;
`;
export default ServiceToggle;
