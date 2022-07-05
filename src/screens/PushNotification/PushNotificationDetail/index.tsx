import React from 'react';

import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import Text from '@/components/common/Text';
import IndexFive from '@/components/PushNotification/DetailContents/IndexFive';
import IndexThree from '@/components/PushNotification/DetailContents/IndexThree';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { PushNotificationDetailScreenProps } from '@/types/navigation';
import { IUserInfo } from '@/types/user';
import { getTimeFromNow } from '@/utils/format';

interface IProps {
  route: PushNotificationDetailScreenProps['route'];
}
function PushNotificationDetail({ route }: IProps) {
  const { storeName } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const { pushCategory, createdDate } = route.params;
  return (
    <BodyWrap>
      <Text
        text={
          pushCategory === '3'
            ? `${storeName} 점주님, 가맹점 신청이 거절되었어요🥲`
            : '👏 처음 환급이 완료되었습니다! T.POINT가 2주 뒤에 적립될 예정이에요👏'
        }
        size="18px"
        lineHeight={26}
        margin={[20, 0, 8]}
      />
      <Text
        text={getTimeFromNow(createdDate)}
        size="14px"
        margin={[0, 0, 20]}
        color="#9FA1A7"
        lineHeight={22}
      />
      <DividingLine height="1px" color="#EDEEEF" full />
      {pushCategory === '3' && <IndexThree />}
      {pushCategory === '5' && <IndexFive />}
    </BodyWrap>
  );
}

export default PushNotificationDetail;
