import React from 'react';
import styled from 'styled-components/native';

import CheckBox from '@/components/common/CheckBox';
import { StyledText } from '@/components/common/Text';
import { CalculateBlock, MPB } from '@/utils/common';
import { arrowBlack } from '@/utils/getImages';

interface IStyleProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const Container = styled.View<IStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.marginTop}px;
  margin-right: ${props => props.marginRight}px;
  margin-bottom: ${props => props.marginBottom}px;
  margin-left: ${props => props.marginLeft}px;
`;

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding: 4px;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
`;

interface IProps {
  onPressBox: () => void;
  onPressArrow: () => void;
  isSelected: boolean;
  title: string;
  margin?: [number, number?, number?, number?];
}

function CheckBoxWrap(props: IProps) {
  const { onPressBox, onPressArrow, isSelected, title, margin = [0] } = props;

  const marginProps = CalculateBlock(margin, MPB.Margin);
  const styleProps = {
    ...marginProps,
  };

  return (
    <Container {...styleProps}>
      <Wrap>
        <RowWrapper onPress={onPressBox} activeOpacity={0.3}>
          <CheckBox isSelected={isSelected} />
          <StyledText marginLeft={10}>{title}</StyledText>
        </RowWrapper>
      </Wrap>
      <StyledTouchable onPress={onPressArrow}>
        <Arrow source={arrowBlack} />
      </StyledTouchable>
    </Container>
  );
}

export default CheckBoxWrap;
