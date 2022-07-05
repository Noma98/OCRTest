import React from 'react';
import styled from 'styled-components/native';

import CancelMode from '@/assets/icons/SelectMode/CancelMode.png';
import ScanMode from '@/assets/icons/SelectMode/ScanMode.png';
import StoreMode from '@/assets/icons/SelectMode/StoreMode.png';

interface ModeCardProps {
  title: string;
  content: string;
  imageName: string;
  onPress: () => void;
}

function ModeCard({ title, content, onPress, imageName }: ModeCardProps) {
  let source;

  if (imageName === 'ScanMode') {
    source = ScanMode;
  } else if (imageName === 'CancelMode') {
    source = CancelMode;
  } else if (imageName === 'StoreMode') {
    source = StoreMode;
  }

  return (
    <CardWrapper underlayColor="#EDEEEF" onPress={onPress} activeOpacity={1}>
      <>
        <IconWrapper>
          <Icon source={source} />
        </IconWrapper>
        <TextWrapper>
          <Title>{title}</Title>
          <Content>{content}</Content>
        </TextWrapper>
      </>
    </CardWrapper>
  );
}

const CardWrapper = styled.TouchableHighlight`
  flex-direction: row;
  background-color: #f5f6f7;
  border-color: ${props => props.theme.colors.main};
  border-width: 1px;
  border-radius: 4px;
  padding: 24px 14px;
  margin: 10px 0;
  height: 108px;
  &:active {
    background-color: red;
  }
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.main};
  width: 52px;
  height: 52px;
  border-radius: 100px;
  margin-right: 14px;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

const TextWrapper = styled.View`
  flex: 5;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 4px;
`;

const Content = styled.Text`
  font-size: 14px;
  color: #5f6165;
`;
export default ModeCard;
