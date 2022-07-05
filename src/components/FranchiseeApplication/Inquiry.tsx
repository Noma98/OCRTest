import React from 'react';
import styled from 'styled-components/native';

import infoBlack from '@/assets/icons/Market/infoBlack.png';
import Text from '@/components/common/Text';
import ContactButtons from '@/components/common/ContactButtons';

function Inquiry() {
  return (
    <Container>
      <TextWrapper>
        <InfoIcon source={infoBlack} />
        <Text text="외국인 관광객 면세판매장 지정증이 없다면?" />
      </TextWrapper>
      <Text
        size="14px"
        lineHeight={22}
        margin={[12, 0, 0]}
        text="카카오톡 또는 유선상으로 문의해주세요. 외국인 관광객 면세판매장을 신청하는 방법 또는 KTP에게 대리신청하는 방법을 안내드립니다."
      />
      <ContactButtons />
    </Container>
  );
}

const Container = styled.View`
  padding: 0 20px;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const InfoIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export default Inquiry;
