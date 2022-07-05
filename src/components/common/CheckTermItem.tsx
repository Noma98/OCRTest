import React from 'react';
import styled from 'styled-components/native';

import CheckBox from '@/components/common/CheckBox';
import Text from '@/components/common/Text';
import { arrowBlack } from '@/utils/getImages';
interface IProps {
  onToggleCheck: () => void;
  onGoToTerms: () => void;
  isSelected: boolean;
  title: string;
}
function CheckTermItem({
  onToggleCheck,
  onGoToTerms,
  isSelected,
  title,
}: IProps) {
  return (
    <CheckBoxWrap>
      <Wrap>
        <RowWrapper onPress={onToggleCheck}>
          <CheckBox isSelected={isSelected} />
          <Text marginLeft={8} text={title} />
        </RowWrapper>
      </Wrap>
      <StyledTouchable onPress={onGoToTerms}>
        <Arrow source={arrowBlack} />
      </StyledTouchable>
    </CheckBoxWrap>
  );
}
export default CheckTermItem;

const StyledTouchable = styled.TouchableOpacity`
  padding: 4px;
`;

const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;

const CheckBoxWrap = styled.View`
  margin: 10px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrap = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Arrow = styled.Image`
  width: 24px;
  height: 24px;
`;
