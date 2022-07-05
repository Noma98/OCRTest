import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import arrowBottom from '@/assets/icons/Etc/arrowBottom.png';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

interface IProps {
  scrollToEnd: () => void;
}
function Footer({ scrollToEnd }: IProps) {
  const [active, setActive] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    setActive(state => {
      state ? slideUp() : slideDown();
      return !state;
    });
  };
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  };
  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 162,
      duration: 200,
    }).start(scrollToEnd);
  };
  return (
    <Container>
      <TitleAndContentWrap activeOpacity={1} onPress={onPress}>
        <TitleWrap>
          <Text
            text="석세스모드"
            size="14px"
            weight="500"
            lineHeight={21}
            margin={[20, 20, 20]}
          />
          <ToggleIcon source={arrowBottom} active={active} />
        </TitleWrap>
        <Animated.Text
          style={[
            {
              marginHorizontal: 20,
              marginBottom: active ? 20 : 0,
              color: '#616161',
              lineHeight: 18,
              fontSize: 12,
              height: slideAnim,
            },
          ]}>
          {`대표이사 : 주병천
사업자등록번호 : 239-04-01226
통신판매업 : 안양동안-1226
메일 :  postmaster@successmode.co.kr
팩스번호: 0303-3441-8011
고객센터 : 02-6213-8011
주소 : 경기도 안양시 동안구 시민대로327번길 11-41
호스팅서비스제공자 : 석세스모드
전자금융분쟁처리 Tel : 1600-0987   Fax : 050-6050-0400`}
        </Animated.Text>
      </TitleAndContentWrap>
      <Text
        text="COPYRIGHT Ⓒ 2021 SUCCESSMODE ALL RESERVED"
        color="#616161"
        size="12px"
        margin={[20, 20, 50]}
      />
    </Container>
  );
}
const Container = styled.View`
  background-color: #f5f5f5;
`;
const TitleWrap = styled(FlexWrap)`
  align-items: center;
`;
const TitleAndContentWrap = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-bottom-color: #bdbdbc;
  border-top-color: #dddfe3;
`;
const ToggleIcon = styled.Image<{ active: boolean }>`
  width: 18px;
  height: 18px;
  margin-left: 2px;
  transform: ${props => props.active && 'rotate(180deg)'};
`;
export default Footer;
