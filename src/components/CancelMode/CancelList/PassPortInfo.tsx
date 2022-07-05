import React from 'react';
import styled from 'styled-components/native';

import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import { StyledText } from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';

const Container = styled(FlexWrap)`
  margin: 0 0 28px;
`;

const StyledWrap = styled(FlexWrap)`
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
  padding: 16px 0px;
  margin: 0 20px;
`;

const LabelText = styled(StyledText)`
  flex: 1;
  color: #5f6165;
`;

const InfoText = styled(StyledText)`
  flex: 3;
`;

// TODO: passport info data
function PassPortInfo() {
  const { nationality, firstName, lastName } = useAppSelector(
    state => state.refund.passportInfo,
  );
  return (
    <Container dir="column">
      <DividingLine height="42" text="고객 여권정보" color="#EDEEEF" />
      <StyledWrap>
        <LabelText>국적</LabelText>
        <InfoText>{nationality}</InfoText>
      </StyledWrap>
      <StyledWrap>
        <LabelText>여권번호</LabelText>
        <InfoText>********</InfoText>
      </StyledWrap>
      <StyledWrap>
        <LabelText>이름(영문)</LabelText>
        <InfoText>
          {lastName}
          {firstName}
        </InfoText>
      </StyledWrap>
    </Container>
  );
}

export default PassPortInfo;
