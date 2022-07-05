import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import Button from '@/components/common/Button';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

const ButtonGroupWrap = styled(FlexWrap)`
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  background-color: white;
`;

interface IProps {
  onPressLeft: () => void;
  onPressRight: () => void;
  textLeft: string;
  textRight: string;
  isLeftActive?: boolean;
  isRightActive?: boolean;
}
function ButtonGroup({
  onPressLeft,
  onPressRight,
  textLeft,
  textRight,
  isLeftActive = true,
  isRightActive = true,
}: IProps) {
  return (
    <ButtonGroupWrap>
      <Button
        title={textLeft}
        active={isLeftActive}
        onPress={onPressLeft}
        style={{ flex: 1, marginRight: 10 }}
      />
      <BlueButton
        onPress={onPressRight}
        underlayColor="rgba(149, 196, 214, 0.5)">
        <Text
          text={textRight}
          size="18px"
          lineHeight={26}
          color="#005F83"
          weight="500"
        />
      </BlueButton>
    </ButtonGroupWrap>
  );
}
const BlueButton = styled.TouchableHighlight`
  background-color: rgba(149, 196, 214, 0.3);
  border: 1px solid #005f83;
  flex: 1;
  height: 52px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin: ${isIphoneX() ? '30px 0' : '20px 0'};
`;

export default ButtonGroup;
