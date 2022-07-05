import React from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';

const CheckBoxIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

interface CheckBoxProps {
  isSelect: boolean;
}

function RefundCheckbox({ isSelect }: CheckBoxProps) {
  return (
    <FlexWrap dir="column">
      {isSelect ? (
        <CheckBoxIcon
          source={require('assets/icons/RadioButton/RadioActive.png')}
        />
      ) : (
        <CheckBoxIcon
          source={require('assets/icons/RadioButton/RadioNormal.png')}
        />
      )}
    </FlexWrap>
  );
}

export default RefundCheckbox;
