import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';

import BodyWrap from '@/components/common/BodyWrap';
import Button from '@/components/common/Button';
import OrderInfo from '@/components/RefundDetail/OrderInfo';
import PriceInfo from '@/components/RefundDetail/PriceInfo';
import { ReferrerType } from '@/types/navigation';
import { IRefundDetail } from '@/types/refund';

interface IProps {
  onPress: () => void;
  cancelDetail: IRefundDetail;
  referrer: ReferrerType;
}

function CancelResultPresenter({ onPress, cancelDetail, referrer }: IProps) {
  const { createdDate, totalAmount, orderNumber, totalRefund } = cancelDetail;

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
      <Button
        title="확인"
        active={true}
        position="bottom fixed"
        onPress={onPress}
        margin={isIphoneX() ? '-30px 0' : ' 0'}
        backgroundColor="#3A3B3E"
        color="white"
        borderColor="#3A3B3E"
      />
    </BodyWrap>
  );
}

export default CancelResultPresenter;
