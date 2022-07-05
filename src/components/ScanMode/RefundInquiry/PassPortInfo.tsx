import React from 'react';
import styled from 'styled-components/native';

import PassportInfoItem from '@/components/ScanMode/RefundInquiry/PassportInfoItem';
import FlexWrap from '@/components/common/FlexWrap';
import { IPassportInfo } from '@/types/passport';

const PassPortInfoWrap = styled(FlexWrap)`
  flex: 1;
  padding: 0 20px;
`;

interface passportInfoProps {
  passportInfo: IPassportInfo;
}

function PassPortInfo({ passportInfo }: passportInfoProps) {
  const { nationality, firstName, lastName } = passportInfo;

  const infos = [
    {
      label: '국적',
      content: nationality,
    },
    {
      label: '여권번호',
      content: '*******',
    },
    {
      label: '성(영문)',
      content: firstName,
    },
    {
      label: '이름(영문)',
      content: lastName,
    },
  ];

  return (
    <PassPortInfoWrap dir="column">
      {infos.map(({ label, content }) => (
        <PassportInfoItem key={label} label={label} content={content} />
      ))}
    </PassPortInfoWrap>
  );
}

export default PassPortInfo;
