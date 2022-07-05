import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';

const LabelWrapper = styled.View`
  flex-direction: row;
  margin: 0 0 14px;
`;

const RequiredDot = styled.Text`
  color: #ff5239;
  margin-left: 2px;
`;

const Label = styled.Text`
  color: gray;
  font-size: 14px;
  font-weight: 400;
  color: black;
`;

interface IProps {
  title: string;
}

function RequiredLabel({ title }: IProps) {
  return (
    <LabelWrapper>
      <Text text={title} />
      <RequiredDot>*</RequiredDot>
    </LabelWrapper>
  );
}

export default RequiredLabel;
