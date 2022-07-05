import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';
import DividingLine from '@/components/common/DividingLine';
import InfoItem from '@/components/ScanMode/RefundResult/RefundResultInfo/InfoItem';
import CommaWithSuffix from '@/components/common/CommaWithSuffix';
import { comma } from '@/utils/format';
import { Refund } from '@/types/refund';

const StyledDivideLine = styled.View`
  height: 0px;
  border-width: 1px;
  border-color: #5f6165;
  border-style: dashed;
  margin-top: 16px;
`;

interface RefundResultInfoProps {
  refundData: Refund;
  nationality: string;
}

function RefundResultInfo({ refundData, nationality }: RefundResultInfoProps) {
  const { paymentPrice, originPrice, refundPrice } = refundData;
  return (
    <>
      <Text
        size="18px"
        lineHeight={26}
        margin={[20, 0, 4]}
        text={`${
          nationality === 'CHN'
            ? '客户结算金额\n'
            : nationality === 'JPN'
            ? '顧客決済金額\n'
            : nationality !== 'KOR'
            ? 'Customer Payment Amount\n'
            : ''
        }결제금액`}
      />
      <CommaWithSuffix
        price={paymentPrice}
        isBig
        isColored
        suffix={nationality !== 'KOR' ? '₩' : '원'}
      />
      <DividingLine height="2px" color="black" style={{ marginTop: 28 }} />
      <InfoItem
        label={`${
          nationality === 'CHN'
            ? '销售额 / '
            : nationality === 'JPN'
            ? '販売額 / '
            : nationality !== 'KOR'
            ? 'Sales Amount / '
            : ''
        }상품금액`}
        isKOR={nationality === 'KOR'}
        price={comma(originPrice)}
      />
      <InfoItem
        label={`${
          nationality === 'CHN'
            ? '退税额 / '
            : nationality === 'JPN'
            ? '還付額 / '
            : nationality !== 'KOR'
            ? 'Refund Amount / '
            : ''
        }환급액`}
        isKOR={nationality === 'KOR'}
        price={comma(refundPrice)}
      />
      <StyledDivideLine />
      <InfoItem
        labelMarginTop="3"
        label={`${
          nationality === 'CHN'
            ? '客户结算金额 / '
            : nationality === 'JPN'
            ? '顧客決済金額 / '
            : nationality !== 'KOR'
            ? 'Customer Payment Amount\n/ '
            : ''
        }결제금액`}
        price={comma(paymentPrice)}
        isKOR={nationality === 'KOR'}
        style={{ alignItems: 'flex-start' }}
      />
    </>
  );
}

export default RefundResultInfo;
