import React from 'react';
import styled from 'styled-components/native';

import checkIcon from '@/assets/icons/Etc/checkCircle.png';
import FlexWrap from '@/components/common/FlexWrap';

const Container = styled(FlexWrap)`
  justify-content: center;
  align-items: center;
  background-color: #edeeef;
  margin: 0px -20px;
  padding: 13px 0;
`;
const TextWrap = styled(FlexWrap)`
  align-items: center;
  height: 22px;
`;
const Icon = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;
const StyledText = styled.Text`
  color: #005f83;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
interface IProps {
  nationality: string;
}
function TopCompleteNotice({ nationality }: IProps) {
  return (
    <Container dir="column">
      {nationality !== 'KOR' ? (
        <>
          <TextWrap>
            <Icon source={checkIcon} />
            <StyledText>
              {nationality === 'CHN'
                ? '7%立即办理退税 。\n'
                : nationality === 'JPN'
                ? '7%即時還付処理されました。\n'
                : '7% refund was processed immediately.\n'}
            </StyledText>
          </TextWrap>
          <StyledText>7% 즉시 환급 처리되었습니다.</StyledText>
        </>
      ) : (
        <TextWrap>
          <Icon source={checkIcon} />
          <StyledText>7% 즉시 환급 처리되었습니다.</StyledText>
        </TextWrap>
      )}
    </Container>
  );
}

export default TopCompleteNotice;
