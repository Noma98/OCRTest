import format from 'date-fns/format';
import React from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { IRefundItem } from '@/types/refund';
import { isAndroid } from '@/utils/check';
import { comma } from '@/utils/format';

interface IRefundStatusItemProps {
  onPress: (refund: IRefundItem) => void;
  refund: IRefundItem;
}

function RefundStatusItem({ onPress, refund }: IRefundStatusItemProps) {
  const { totalAmount, totalRefund, createdDate } = refund;

  let priceSuffix;
  if (refund.refundStatus === 'APPROVAL') {
    priceSuffix = '환급';
  } else if (refund.refundStatus === 'CANCEL') {
    priceSuffix = '취소';
  } else {
    priceSuffix = '거절';
  }

  return (
    <RefundItemWrap onPress={() => onPress(refund)}>
      <StyledWrap dir="column">
        <Text text={`상품금액 : ${comma(totalAmount)}원`} marginBottom={8} />
        <Text
          size="14px"
          lineHeight={22}
          color="#5F6165"
          text={format(
            isAndroid()
              ? new Date(createdDate).setHours(
                  new Date(createdDate).getHours() - 9,
                )
              : new Date(createdDate),
            'HH:mm',
          )}
        />
      </StyledWrap>
      <Text
        size="18px"
        lineHeight="26"
        weight="500"
        text={`${comma(totalRefund)}원 ${priceSuffix}`}
        color={refund.refundStatus === 'CANCEL' && '#ff5239'}
      />
    </RefundItemWrap>
  );
}
const RefundItemWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0px;
  margin: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
`;
const StyledWrap = styled(FlexWrap)``;
export default RefundStatusItem;
