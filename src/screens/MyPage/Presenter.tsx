import React from 'react';

import BodyWrap from '@/components/common/BodyWrap';
import FranchiseeStatusBtn from '@/components/StoreMode/Mypage/FranchiseeStatusBtn';
import Info from '@/components/StoreMode/Mypage/Info';
import Menu from '@/components/StoreMode/Mypage/Menu';
import Name from '@/components/StoreMode/Mypage/Name';
import { IFranchiseeInfoResponse } from '@/types/api/store';

interface IProps {
  info: IFranchiseeInfoResponse;
}

function MyPage({ info }: IProps) {
  return (
    <BodyWrap isPadding={false}>
      <Name info={info} />
      <FranchiseeStatusBtn franchiseeStatus={info.franchiseeStatus} />
      <Info
        totalPoint={info.totalPoint}
        totalSalesAmount={info.totalSalesAmount}
      />
      <Menu franchiseeStatus={info.franchiseeStatus} />
    </BodyWrap>
  );
}

export default MyPage;
