import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import radioActive from '@/assets/icons/RadioButton/RadioActive.png';
import radioNormal from '@/assets/icons/RadioButton/RadioNormal.png';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

const Container = styled.View`
  padding: 0 20px;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
`;

const RequiredDot = styled.Text`
  color: #ff5239;
  margin-left: 2px;
`;

const Label = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: 400;
  color: black;
  margin: 0 0 12px;
`;

const RadioContainer = styled.View`
  flex-direction: row;
  margin: 0 0 50px;
`;

const RadioWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const RadioIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 0 10px 0 0;
`;

interface IProps {
  onSubmit: () => void;
  isButtonActive: boolean;
  isTaxRefundShop: boolean;
  onPressRadio: (value: boolean) => void;
}

function RadioCheckForm(props: IProps) {
  const { isButtonActive, isTaxRefundShop, onSubmit, onPressRadio } = props;

  const onPressRadioFalse = () => {
    onPressRadio(false);
  };
  const onPressRadioTrue = () => {
    onPressRadio(true);
  };

  return (
    <Container>
      <LabelWrapper>
        <Label>외국인 관광객 면세판매장 가입 여부</Label>
        <RequiredDot>*</RequiredDot>
      </LabelWrapper>
      <RadioContainer>
        <RadioWrapper>
          <TouchableOpacity onPress={onPressRadioFalse}>
            <RadioIcon source={!isTaxRefundShop ? radioActive : radioNormal} />
          </TouchableOpacity>
          <Text text="미가입" />
        </RadioWrapper>
        <RadioWrapper>
          <TouchableOpacity onPress={onPressRadioTrue}>
            <RadioIcon source={isTaxRefundShop ? radioActive : radioNormal} />
          </TouchableOpacity>
          <Text text="가입" />
        </RadioWrapper>
      </RadioContainer>
      <Button
        active={isButtonActive}
        title="완료"
        onPress={onSubmit}
        margin={isIphoneX() ? '0' : '0 0 20px'}
      />
    </Container>
  );
}

export default RadioCheckForm;
