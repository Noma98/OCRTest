import React from 'react';
import styled from 'styled-components/native';

import Text from '@/components/common/Text';

function IndexThree() {
  return (
    <>
      <BoldText text="가맹점 신청이 거절되는 사유">
        <Text
          text={`는 다음과 같습니다.\n1. 허위정보 및 잘못된 정보를 입력하여 신청한 경우\n2. 외국인 관광객 면세판매장 지정증을 업로드하지 않은 경우\n3. 본인확인이 불가능한 경우\n`}></Text>
      </BoldText>
      <BoldText text="구체적인 거절 사유는 고객센터 또는 카카오 플러스친구로 문의해주세요😊" />
      <Text text="고객센터: 02-6213-8011" />
      <Text
        text={`•  운영시간 : 08:30 - 16:30 (토/일요일, 공휴일 휴무)\n•  점심시간 : 12:00 - 13:10\n`}
      />
      <BoldText
        text={`가맹점 신청이 거절되었어도, 다시 신청할 수 있어요😀\n👉가맹점을 다시 신청하는 방법`}
      />
      <Text
        text={`1. KTP 앱에서 [상점 모드 - 마이페이지 - 가맹점 신청 거절 버튼 - 가맹점 재신청 버튼]을 클릭하여 요청해주세요.\n2. KTP 홈페이지의 ‘가맹점 신청’ 메뉴를 통해 요청해주세요.\n3. KTP 이메일(ktp@successmode.co.kr)을 통해 요청해주세요.`}
        style={{ paddingBottom: 30 }}
      />
    </>
  );
}
const BoldText = styled(Text)`
  font-weight: 600;
`;
export default IndexThree;
