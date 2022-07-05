import format from 'date-fns/format';
import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
import FlexWrap from '@/components/common/FlexWrap';
import { isAndroid } from '@/utils/check';

const Container = styled(FlexWrap)`
  margin: 20px 0 0;
`;

const InfoWrap = styled(FlexWrap)`
  border-bottom-width: 1px;
  border-bottom-color: black;
  padding: 0 0 16px;
`;
interface OrderInfoProp {
  orderNumber: string;
  createdDate: string;
}

function OrderInfo({ createdDate }: OrderInfoProp) {
  return (
    <Container dir="column">
      <InfoWrap>
        <Text text="판매일시" marginRight={28} color="#5F6165" />
        <Text
          text={format(
            isAndroid()
              ? new Date(createdDate).setHours(
                  new Date(createdDate).getHours() - 9,
                )
              : new Date(createdDate),
            'yyyy. MM. dd HH:mm',
          )}
        />
      </InfoWrap>
    </Container>
  );
}

export default OrderInfo;
