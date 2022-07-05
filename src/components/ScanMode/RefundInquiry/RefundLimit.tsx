import React from 'react';
import styled from 'styled-components/native';

import CommaWithSuffix from '@/components/common/CommaWithSuffix';
import FlexWrap from '@/components/common/FlexWrap';
import TextCommon from '@/components/common/Text';
import { formatRefundLimit } from '@/utils/format';

const InfoWrwap = styled.View`
  padding: 14px;
  width: 90%;
  background-color: #f5f6f7;
  margin-bottom: 28px;
`;

const Wrapper = styled.View`
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  margin-right: 16px;
`;
const Container = styled(FlexWrap)`
  justify-content: flex-end;
`;
interface IProps {
  limit: string | null;
  name: string;
}

function RefundLimit({ limit, name }: IProps) {
  return (
    <Container>
      <InfoWrwap dir="column">
        <TextCommon text={name} size="18px" lineHeight={26} marginBottom={4} />
        <Wrapper>
          <TextCommon text="고객님 환급한도" />
          <CommaWithSuffix
            size="24px"
            price={formatRefundLimit(limit)}
            isColored
          />
        </Wrapper>
      </InfoWrwap>
    </Container>
  );
}

export default RefundLimit;
