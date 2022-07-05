import React from 'react';
import styled from 'styled-components/native';

import LabledInput from '@/components/ScanMode/PurchaseInfo/LabledInput';
import TextCommon from '@/components/common/Text';
import { comma } from '@/utils/format';
import { Refund } from '@/types/refund';

interface IInputStyleProps {
  size: number;
}
interface PurchaseInfoFormProps {
  onChange: (data: any) => void;
  refundData: Refund;
}

function PurchaseInfoForm({ onChange, refundData }: PurchaseInfoFormProps) {
  const { originPrice, paymentPrice, refundPrice } = refundData;
  return (
    <Container>
      <TextCommon text="상품금액" margin={[0, 0, 16]} />
      <InputWrapper>
        <StyledInput
          placeholderTextColor="#9FA1A7"
          placeholder="상품금액을 입력하세요"
          textAlign="right"
          size={15}
          value={comma(
            originPrice ? (isNaN(+originPrice) ? '' : originPrice) : '',
          )}
          onChange={onChange}
          keyboardType="number-pad"
          returnKeyType="done"
          returnKeyLabel="완료"
        />
        <TextCommon text="원" margin={[0, 0, 0, 16]} />
      </InputWrapper>
      <Notification>
        <TextCommon
          text="1회 최소 30,000원, 최대 500,000원 미만"
          size="15px"
          line-height="22px"
          marginBottom={8}
        />
        <TextCommon
          text="₩1 대한민국 = $0.00090"
          size="15px"
          color="#9fa1a7"
          line-height="22px"
        />
      </Notification>
      <LabledInput label="환급액" value={refundPrice} editable={false} />
      <LabledInput label="결제금액" value={paymentPrice} editable={false} />
    </Container>
  );
}
const Container = styled.View`
  margin: 0 0 40px;
`;

const Notification = styled.View`
  margin: 0 0 10px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 0 10px;
`;

const StyledInput = styled.TextInput<IInputStyleProps>`
  border: 1px solid #cbccce;
  font-size: ${props => props.size}px;
  padding: 14px;
  border-radius: 4px;
  flex-grow: 1;
`;
export default PurchaseInfoForm;
