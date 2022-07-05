import React from 'react';
import styled from 'styled-components/native';

import headphoneIcon from '@/assets/icons/Market/headphone.png';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import ContactButtons from '@/components/common/ContactButtons';

function TopInfo() {
  return (
    <Container>
      <Text text="궁금하신 점은 고객센터로 문의해주세요." />
      <FlexWrap style={{ marginVertical: 12 }}>
        <HeadphoneIcon source={headphoneIcon} />
        <Text text="02-6213-8011" size="24" lineHeight={32} />
      </FlexWrap>
      <Text
        text="•  운영시간 : 08:30 - 16:30 (토/일요일, 공휴일 휴무)"
        size="14px"
        lineHeight={22}
      />
      <Text text="•  점심시간 : 12:00 - 13:10" size="14px" lineHeight={22} />
      <ContactButtons />
    </Container>
  );
}
const Container = styled.View`
  margin: 20px 20px 0 20px;
`;
const HeadphoneIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;
export default TopInfo;
