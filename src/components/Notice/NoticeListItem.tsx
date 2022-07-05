import { format } from 'date-fns';
import React from 'react';
import styled, { css } from 'styled-components/native';

import arrow from '@/assets/icons/Auth/arrowBlack.png';
import noticeIcon from '@/assets/icons/Market/MyPage/notice.png';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { NoticeListType } from '@/types/api/notice';
import { NoticeScreenProps } from '@/types/navigation';

interface IProps {
  data: NoticeListType;
  isFixed?: boolean;
  navigation: NoticeScreenProps['navigation'];
}
function NoticeListItem({ data, isFixed = false, navigation }: IProps) {
  const { title, scheduledDate, noticeIndex } = data;
  const onPress = () => {
    navigation.navigate('NoticeDetail', { noticeIndex });
  };
  return (
    <Container isFixed={isFixed} onPress={onPress} activeOpacity={0.85}>
      <ContentFlexWrap>
        <ItemWrap>
          <TitleWrap>
            {isFixed && <AlertIcon source={noticeIcon} />}
            <Text
              text={`${isFixed ? '[필독]' : ''}${title}`}
              size="18px"
              lineHeight={26}
              weight="500"
            />
          </TitleWrap>
          <Text
            text={format(new Date(scheduledDate), 'yyyy.MM.dd')}
            color="#9FA1A7"
            size="14px"
            lineHeight={22}
          />
        </ItemWrap>
        <ArrowIcon source={arrow} />
      </ContentFlexWrap>
    </Container>
  );
}
const Container = styled.TouchableOpacity<{ isFixed: boolean }>`
  ${props =>
    props.isFixed &&
    css`
      border-left-width: 10px;
      border-left-color: #005f83;
    `}
`;
const ItemWrap = styled.View``;
const ContentFlexWrap = styled(FlexWrap)`
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #edeeef;
`;
const TitleWrap = styled(FlexWrap)`
  align-items: center;
  margin-bottom: 14px;
`;
const AlertIcon = styled.Image`
  height: 28px;
  width: 28px;
  margin-right: 4px;
`;
const ArrowIcon = styled.Image`
  height: 24px;
  width: 24px;
`;
export default NoticeListItem;
