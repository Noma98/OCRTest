import React from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';

import RefundCheckbox from '@/components/CancelMode/CancelList/RefundCheckbox';
import { StyledText } from '@/components/common/Text';
import { IRefundItem } from '@/types/refund';
import { isAndroid } from '@/utils/check';
import { comma } from '@/utils/format';
import format from 'date-fns/format';

const Text = styled(StyledText)<{ type: string }>`
  ${props => {
    switch (props.type) {
      case 'date':
        return css`
          font-size: 14px;
          line-height: 22px;
        `;
      case 'number':
        return css`
          font-size: 16px;
          line-height: 24px;
          margin: 0 0 8px;
        `;
      case 'price':
        return css`
          font-size: 18px;
          line-height: 27px;
          margin-right: 8px;
        `;
      case 'subDate':
        return css`
          font-size: 14px;
          line-height: 22px;
          color: #5f6165;
        `;
    }
  }}
`;

interface RefundItemProps {
  refundItem: IRefundItem;
  selected: IRefundItem | null;
  onSelect: (selected: IRefundItem) => void;
}

function RefundItem({ refundItem, onSelect, selected }: RefundItemProps) {
  const { createdDate, totalRefund, refundIndex, totalAmount } = refundItem;

  return (
    <ItemWrap
      onPress={() => {
        onSelect(refundItem);
      }}>
      <View>
        <Text type="number">상품금액 : {comma(totalAmount)}원</Text>
        <Text type="subDate">
          {format(
            isAndroid()
              ? new Date(createdDate).setHours(
                  new Date(createdDate).getHours() - 9,
                )
              : new Date(createdDate),
            'HH:mm',
          )}
        </Text>
      </View>
      <Wrapper>
        <Text type="price">{comma(totalRefund)}원 환급</Text>
        <RefundCheckbox isSelect={refundIndex === selected?.refundIndex} />
      </Wrapper>
    </ItemWrap>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemWrap = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
  padding: 20px 0px;
  flex-direction: row;
`;
export default RefundItem;
