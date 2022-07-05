import React from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import PriceInfoItem from '@/components/RefundDetail/PriceInfoItem';
import { comma } from '@/utils/format';
import { ReferrerType } from '@/types/navigation';

const PriceInfoWrap = styled(FlexWrap)`
  margin-top: 20px;
  padding-top: 16px;
  background-color: #f5f6f7;
`;

interface PriceInfo {
  point: number;
  totalRefund: string;
  totalAmount: string;
  referrer: ReferrerType;
}

function PriceInfo(props: PriceInfo) {
  const { totalAmount, totalRefund, referrer, point } = props;
  const infos = [
    {
      label: '상품금액',
      price: comma(totalAmount),
    },
    {
      label: '환급액',
      price: comma(totalRefund),
    },
    {
      label: '결제금액',
      price: comma(+totalAmount - +totalRefund),
    },
  ];

  return (
    <PriceInfoWrap dir="column">
      {infos.map(({ label, price }) => (
        <PriceInfoItem key={label} label={label} price={price} />
      ))}
      <PriceInfoItem
        key="결제금액"
        label={`T.POINT ${referrer === 'Cancel' ? '적립취소' : '적립'}금액`}
        price={comma(point)}
        style={{
          borderTopWidth: 1,
          borderTopWidth: 1,
          borderColor: '#E5E6E8',
          paddingTop: 16,
        }}
      />
    </PriceInfoWrap>
  );
}
export default PriceInfo;
