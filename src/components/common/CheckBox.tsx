import React from 'react';
import styled from 'styled-components/native';

import { radio, radioAcitve, terms, termsActive } from '@/utils/getImages';

const StyledImage = styled.Image<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

interface IProps {
  isSelected: boolean;
  size?: number;
  isRadio?: boolean;
}

function CheckBox({ isSelected, size = 24, isRadio = false }: IProps) {
  return isSelected ? (
    <StyledImage source={isRadio ? radioAcitve : termsActive} size={size} />
  ) : (
    <StyledImage source={isRadio ? radio : terms} size={size} />
  );
}

export default CheckBox;
