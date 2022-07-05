import React from 'react';
import styled from 'styled-components/native';

import { StyledTouchableOpacity } from '@/components/common/Button';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';

const ExtendButton = styled(StyledTouchableOpacity)``;
const ExtendWrapLeft = styled(FlexWrap)`
  flex: 1;
  margin-right: 5px;
`;
const ExtendWrapRight = styled(FlexWrap)`
  flex: 1;
  margin-left: 5px;
`;
const ButtonGroupWrap = styled(FlexWrap)``;

interface IConditionButtonProps {
  title: string;
  onClick: () => void;
  isExtend: boolean;
}

function ConditionButton({ isExtend, onClick, title }: IConditionButtonProps) {
  return isExtend ? (
    <ExtendButton
      active={true}
      backgroundColor="rgba(149, 196, 214, 0.3)"
      borderColor="#005F83"
      onPress={onClick}>
      <Text
        color="#005F83"
        weight="500"
        lineHeight={26}
        size="18px"
        text={title}
      />
    </ExtendButton>
  ) : (
    <StyledTouchableOpacity active={true} onPress={onClick}>
      <Text color="white" weight="500" text={title} />
    </StyledTouchableOpacity>
  );
}

interface IProps {
  isLeftExtend?: boolean;
  isRightExtend?: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
  leftBtnTitle: string;
  rightBtnTitle: string;
}

function TwoButton({
  isLeftExtend = false,
  isRightExtend = false,
  onLeftClick,
  onRightClick,
  leftBtnTitle,
  rightBtnTitle,
}: IProps) {
  return (
    <ButtonGroupWrap>
      <ExtendWrapLeft dir="column">
        <ConditionButton
          isExtend={isLeftExtend}
          onClick={onLeftClick}
          title={leftBtnTitle}
        />
      </ExtendWrapLeft>
      <ExtendWrapRight dir="column">
        <ConditionButton
          isExtend={isRightExtend}
          onClick={onRightClick}
          title={rightBtnTitle}
        />
      </ExtendWrapRight>
    </ButtonGroupWrap>
  );
}

export default TwoButton;
