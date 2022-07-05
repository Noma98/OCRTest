import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';

import AlermIcon from '@/assets/icons/Header/alerm.png';
import AlermActiveIcon from '@/assets/icons/Header/alermActive.png';

interface IStyleProps {
  marginLeft?: number;
  marginRight?: number;
}

const IconWrapper = styled.View<IStyleProps>`
  flex-direction: row;
  align-items: center;
  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft}px;
    `}
  ${props =>
    props.marginRight &&
    css`
      margin-left: ${props.marginRight}px;
    `}
`;

const IconImg = styled(Image)<IStyleProps>`
  width: 24px;
  height: 24px;
  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft}px;
    `}
  ${props =>
    props.marginRight &&
    css`
      margin-right: ${props.marginRight}px;
    `}
`;

// conditioning을 통한 Header title 변경을 진했했는데 useCallback으로 인해
// 에러가 발생하여 useCallback을 사용하는 함수들에게서 useCallback을 제거
export function HomeBtn() {
  const navigation = useNavigation();

  // const handleClick = useCallback(() => {
  //   navigation.reset({ index: 0, routes: [{ name: 'SelectMode' }] });
  // }, [navigation]);

  const handleClick = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SelectMode' }] });
  };

  return (
    <IconWrapper marginRight={20}>
      <TouchableOpacity onPress={handleClick}>
        <IconImg source={require('assets/icons/Header/Home.png')} />
      </TouchableOpacity>
    </IconWrapper>
  );
}
export function SettingBtn() {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate('Setting');
  };
  return (
    <IconWrapper marginRight={20}>
      <TouchableOpacity onPress={handleClick}>
        <IconImg source={require('assets/icons/Header/setting.png')} />
      </TouchableOpacity>
    </IconWrapper>
  );
}
export function AlertBtn(unreadAlertCount: number) {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate('PushNotification');
  };
  return (
    <IconWrapper marginRight={20}>
      <TouchableOpacity onPress={handleClick}>
        <IconImg
          source={unreadAlertCount === 0 ? AlermIcon : AlermActiveIcon}
        />
      </TouchableOpacity>
    </IconWrapper>
  );
}
export function HomeWithSettingBtn() {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SelectMode' }] });
  };
  const handleGoSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <IconWrapper marginRight={20}>
      <TouchableOpacity onPress={handleGoSetting}>
        <IconImg
          source={require('assets/icons/Header/setting.png')}
          marginRight={10}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClick}>
        <IconImg source={require('assets/icons/Header/Home.png')} />
      </TouchableOpacity>
    </IconWrapper>
  );
}
export function HomeWithSalesStatistics() {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SelectMode' }] });
  };
  const handleGoSalesStatistics = () => {
    navigation.navigate('SalesStatistics');
  };

  return (
    <IconWrapper marginRight={20}>
      <TouchableOpacity onPress={handleGoSalesStatistics}>
        <IconImg
          source={require('assets/icons/Header/salesStatistics.png')}
          marginRight={10}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClick}>
        <IconImg source={require('assets/icons/Header/Home.png')} />
      </TouchableOpacity>
    </IconWrapper>
  );
}

export function LeftArrow() {
  return (
    <IconWrapper marginLeft={20}>
      <IconImg source={require('assets/icons/Header/Left.png')} />
    </IconWrapper>
  );
}

export function LeftPoPArrow() {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleClick} style={{ flex: 1 }}>
      <IconWrapper marginLeft={20}>
        <IconImg source={require('assets/icons/Header/Left.png')} />
      </IconWrapper>
    </TouchableOpacity>
  );
}
export function GoToDirectInput() {
  const route = useRoute();
  const navigation = useNavigation();
  const handleClick = () =>
    navigation.navigate('PassportDirectInput', {
      referrer: route?.params?.referrer === 'Approval' ? 'Approval' : 'Cancel',
    });
  return (
    <TouchableOpacity onPress={handleClick}>
      <IconImg marginRight={20} source={require('assets/icons/Etc/edit.png')} />
    </TouchableOpacity>
  );
}
