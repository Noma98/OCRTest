import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';

function IndexFive() {
  return (
    <>
      <BoldText>👉T.POINT란?</BoldText>
      <Text text={`T.POINT는 현금화할 수 있는 KTP 포인트입니다.\nKTP 앱의 `}>
        <BoldText>
          [상점모드 - T.POINT]{' '}
          <Text
            text={`메뉴에서 ‘T.POINT 출금하기'버튼을 누르면, 포인트를 출금할 수 있습니다.\n`}
          />
        </BoldText>
      </Text>
      <BoldText>👉T.POINT 적립시기</BoldText>
      <Text
        text={`KTP 앱에서 환급한 후 14일 이내에 취소되지 않으면, T.POINT가 적립됩니다.\n예시)\n5월 1일 KTP 앱에서 환급하고 5월 14일까지 환급을 취소하지 않으면, 5월 15일에 T.POINT가 적립됩니다.\n`}
      />
      <BoldText>👉T.POINT 유효기간</BoldText>
      <Text
        text={`T.POINT의 유효기간은 ‘적립월’로부터 5년이고, 유효기간이 경과된 해당 월의 1일에 소멸됩니다.\n예시) 2022년 5월 14일에 적립한 T.POINT는 ‘적립월’인 5월로부터 5년 뒤인 2027년 5월 1일에 소멸됩니다.`}
        style={{ paddingBottom: 30 }}
      />
    </>
  );
}
const BoldText = styled(Text)`
  font-weight: 600;
`;
export default IndexFive;
