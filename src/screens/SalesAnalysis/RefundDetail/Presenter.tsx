import React from 'react';

import BodyWrap from '@/components/common/BodyWrap';
import OrderInfo from '@/components/RefundDetail/OrderInfo';
import PriceInfo from '@/components/RefundDetail/PriceInfo';
import { ReferrerType } from '@/types/navigation';
import { IRefundDetail } from '@/types/refund';

interface IProps {
  refundDetail: IRefundDetail;
  referrer: ReferrerType;
}

function RefundDetailPresenter({ refundDetail, referrer }: IProps) {
  const { createdDate, totalAmount, orderNumber, totalRefund } = refundDetail;

  const point = Math.floor((+totalAmount / 11) * 0.3);

  return (
    <BodyWrap>
      <OrderInfo createdDate={createdDate} orderNumber={orderNumber} />
      <PriceInfo
        point={point}
        totalAmount={totalAmount}
        totalRefund={totalRefund}
        referrer={referrer}
      />
    </BodyWrap>
  );
}

export default RefundDetailPresenter;
