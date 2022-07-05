import React from 'react';
import styled, { css } from 'styled-components/native';

interface IProps {
  size: string;
  padding?: string;
  onPress: () => void;
  imgUrl: string;
}

function IconButton({ size, padding, onPress, imgUrl }: IProps) {
  return (
    <StyledBtn padding={padding} onPress={onPress}>
      <Icon source={imgUrl} size={size} />
    </StyledBtn>
  );
}
const StyledBtn = styled.TouchableOpacity<{ padding?: string }>`
  ${props =>
    props.padding &&
    css`
      padding: props.padding;
    `};
`;

const Icon = styled.Image<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
`;
export default IconButton;
