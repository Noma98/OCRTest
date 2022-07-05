import React from 'react';
import { Linking } from 'react-native';

import kakaoIcon from '@/assets/icons/Market/kakao.png';
import phoneIcon from '@/assets/icons/Market/phone.png';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import FlexWrap from '@/components/common/FlexWrap';
import { isAndroid } from '@/utils/check';

function ContactButtons() {
  const onPressKaKao = async () => {
    await Linking.openURL(
      `kakaoplus://plusfriend/${isAndroid() ? 'home' : 'chat'}/_fFgsb`,
    );
  };

  const onPressCenter = async () => {
    await Linking.openURL('tel:0262138011');
  };

  return (
    <FlexWrap style={{ marginTop: 20, marginBottom: 28 }}>
      <ButtonWithIcon
        iconSource={kakaoIcon}
        text="카카오톡 문의"
        iconSize="32px"
        fontSize="16px"
        bgColor="#FAE300"
        textColor="#391B1B"
        style={{ flex: 1, height: 52, marginRight: 15 }}
        gap="4px"
        borderRadius="4px"
        onPress={onPressKaKao}
      />
      <ButtonWithIcon
        iconSource={phoneIcon}
        text="전화 문의"
        iconSize="24px"
        fontSize="16px"
        bgColor="#3A3B3E"
        textColor="white"
        style={{ flex: 1, height: 52 }}
        gap="4px"
        borderRadius="4px"
        onPress={onPressCenter}
      />
    </FlexWrap>
  );
}

export default ContactButtons;
