import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native';
import styled from 'styled-components/native';

import TextCommon from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';
import { comma } from '@/utils/format';
interface LabeldInputProps extends TextInputProps {
  label: string;
  value: string | undefined;
  handleInputChange?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => void;
  isRefundPrice?: boolean;
}

function LabledInput({
  label,
  value,
  handleInputChange,
  ...textInputAttributes
}: LabeldInputProps) {
  return (
    <InputWrap>
      <TextWrapper>
        <TextCommon text={label} />
      </TextWrapper>
      <StyledInput
        {...textInputAttributes}
        value={comma(value ? (isNaN(+value) ? '' : value) : '')}
        onChange={handleInputChange}
        placeholder="0"
        placeholderTextColor="#000"
        keyboardType="number-pad"
      />
      <TextCommon text="원" margin={[4, 0, 0, 4]} />
    </InputWrap>
  );
}
const StyledInput = styled.TextInput`
  flex: 1;
  text-align: right;
  color: black;
  font-size: 22px;
  font-weight: 500;
  margin-right: 4px;
`;

const InputWrap = styled(FlexWrap)`
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
  margin-bottom: 8px;
  padding: 16px 0px;
  align-items: center;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
export default LabledInput;
