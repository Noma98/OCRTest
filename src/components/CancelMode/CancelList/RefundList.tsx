import React from 'react';
import styled from 'styled-components/native';

import RefundItem from '@/components/CancelMode/CancelList/RefundItem';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import { IRefundItem, IRefundItems } from '@/types/refund';

const Conatiner = styled.View`
  flex: 1;
  margin: 0 0 80px;
  padding: 0 20px;
`;

interface RefundListProps {
  refundList: IRefundItems[];
  selected: IRefundItem | null;
  onSelect: (selected: IRefundItem) => void;
}

function RefundList({ refundList, selected, onSelect }: RefundListProps) {
  return (
    <Conatiner>
      {refundList.map(refund => (
        <FlexWrap dir="column">
          <DividingLine
            style={{ borderTopWidth: 1 }}
            version="small"
            text={refund?.date}
          />
          {refund.dataList.map(data => (
            <RefundItem
              key={data.refundIndex}
              refundItem={data}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </FlexWrap>
      ))}
    </Conatiner>
  );
}

export default RefundList;
