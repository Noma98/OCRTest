import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';

import addAccount from '@/assets/icons/Market/MyPage/addAccount.png';
import center from '@/assets/icons/Market/MyPage/center.png';
import myAccount from '@/assets/icons/Market/MyPage/myAccount.png';
import myInfo from '@/assets/icons/Market/MyPage/myInfo.png';
import notice from '@/assets/icons/Market/MyPage/notice.png';
import pos from '@/assets/icons/Market/MyPage/pos.png';
import refundRecords from '@/assets/icons/Market/MyPage/refundRecords.png';
import saleRecords from '@/assets/icons/Market/MyPage/saleRecords.png';
import arrowIcon from '@/assets/icons/Market/rightArrow.png';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { IFranchiseeApplicantsStatus } from '@/types/user';

interface ITabItemProps {
  title: string;
  onPress: () => void;
  icon: string;
}
const TabItem = ({ title, onPress, icon }: ITabItemProps) => {
  return (
    <TestListItem underlayColor="#F5F6F7" onPress={onPress}>
      <>
        <ContentWrap>
          <Icon source={icon} />
          <Text text={title} />
        </ContentWrap>
        <ArrowIcon source={arrowIcon} />
      </>
    </TestListItem>
  );
};
const TestListItem = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e5e6e8;
`;
const ContentWrap = styled(FlexWrap)`
  align-items: center;
`;
const Icon = styled.Image`
  height: 28px;
  width: 28px;
  margin-right: 14px;
`;
const ArrowIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

interface IMenuProps {
  franchiseeStatus: IFranchiseeApplicantsStatus;
}
function Menu({ franchiseeStatus }: IMenuProps) {
  const navigation = useNavigation();

  const menuList = [
    ...(franchiseeStatus === 'ACCEPTED'
      ? [
          {
            title: '포스기 연결',
            onPress: () => navigation.navigate('ConnectPos'),
            menuIcon: pos,
          },
          {
            title: '부가세 신고자료',
            onPress: () => navigation.navigate('VatReport'),
            menuIcon: saleRecords,
          },
          {
            title: 'CMS 청구내역',
            onPress: () => navigation.navigate('CMSReport'),
            menuIcon: refundRecords,
          },
        ]
      : []),
    {
      title: '내 정보',
      onPress: () => navigation.navigate('Profile'),
      menuIcon: myInfo,
    },
    ...(franchiseeStatus === 'ACCEPTED'
      ? [
          {
            title: '내 계좌',
            onPress: () => navigation.navigate('Account'),
            menuIcon: myAccount,
          },
          {
            title: '직원 계정 생성',
            onPress: () => navigation.navigate('EmployeeAccount'),
            menuIcon: addAccount,
          },
        ]
      : []),
    {
      title: '공지사항',
      onPress: () => navigation.navigate('Notice'),
      menuIcon: notice,
    },
    {
      title: '고객센터',
      onPress: () => navigation.navigate('CustomerService'),
      menuIcon: center,
    },
  ];

  return (
    <>
      {menuList.map((item, idx) => (
        <TabItem
          key={idx}
          title={item.title}
          icon={item.menuIcon}
          onPress={item.onPress}
        />
      ))}
    </>
  );
}

export default Menu;
