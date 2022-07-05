import React from 'react';
import styled from 'styled-components/native';
import format from 'date-fns/format';

import RefundStatusItem from '@/components/StoreMode/SalesAnalysis/RefundStatusItem';
import DividingLine from '@/components/common/DividingLine';
import { IRefundItem } from '@/types/refund';
import { isAndroid } from '@/utils/check';

interface RefundSatusProps {
  onPress: (refund: IRefundItem) => void;
  refundList: IRefundItem[];
  saleDate: string;
}

function RefundStatus({ onPress, refundList, saleDate }: RefundSatusProps) {
  return (
    <Container>
      <DividingLine
        text={format(
          isAndroid()
            ? new Date(saleDate).setHours(new Date(saleDate).getHours() - 9)
            : new Date(saleDate),
          'yyyy. MM. dd',
        )}
      />
      {refundList.map(refund => (
        <RefundStatusItem
          key={refund.refundIndex}
          onPress={onPress}
          refund={refund}
        />
      ))}
    </Container>
  );
}

const Container = styled.View``;
export default RefundStatus;
