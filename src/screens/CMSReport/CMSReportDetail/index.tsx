import React from 'react';
import { Col, Row, Table, TableWrapper } from 'react-native-table-component';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getCMSReportDetail } from '@/api/user';
import downloadIcon from '@/assets/icons/VatReport/download.png';
import shareIcon from '@/assets/icons/VatReport/share.png';
import BodyWrap from '@/components/common/BodyWrap';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import {
  IGetCMSReportDetailPayload,
  IGetCMSReportDetailResponse,
} from '@/types/api/user';
import { CMSReportDetailScreenProps } from '@/types/navigation';

const staticData = {
  btns: [
    { text: '문서 다운로드', uri: downloadIcon },
    { text: '문서 공유하기', uri: shareIcon },
  ],
  table1: {
    title: ['1. 수납기관 정보 및 요금 종류'],
    rowTitles: [
      '수납기관명',
      '대표자',
      '사업자등록번호',
      '사업장소재지',
      '수납 요금종류',
    ],
    contents: [
      '석세스모드',
      '주병천',
      '239-04-01226',
      '경기도 안양시 동안구 시민대로 327번길 11-41 3층 15호 (관양동)',
      '환급수수료',
    ],
  },
  table2: {
    title: ['2. 환급수수료 청구내역'],
    rowTitles: ['환급건수', '판매금액', '부가가치세', '환급수수료(청구액)'],
  },
  table3: {
    title: ['3. 납부자 인적사항'],
    rowTitles: [
      '납부자명',
      '출금 은행',
      '출금 계좌번호',
      '자동이체 출금일',
      '청구액',
    ],
  },
};

interface IProps {
  route: CMSReportDetailScreenProps['route'];
}

function CMSReportDetail({ route }: IProps) {
  const { franchiseeIndex, periodNum } = route.params;
  const { data, isLoading } = useQuery<
    IGetCMSReportDetailResponse,
    IGetCMSReportDetailPayload
  >(
    ['data'],
    () => getCMSReportDetail({ franchiseeIndex, requestDate: periodNum }),
    { retry: false },
  );
  if (isLoading) {
    return <LoadingView />;
  }
  return (
    <BodyWrap>
      <ButtonWrap>
        {staticData.btns.map((btn, idx) => (
          <ButtonWithIcon
            text={btn.text}
            btnPadding="13px 19px"
            iconSource={btn.uri}
            iconSize="24px"
            borderColor="#CBCCCE"
            borderRadius="4px"
            gap="8px"
            style={{ flex: 1 }}
            margin={idx === 0 ? '0 11px 0 0' : '0'}
          />
        ))}
      </ButtonWrap>
      <Text
        text={`CMS 자동이체 청구내역서`}
        lineHeight={28}
        size="20"
        center
        weight="500"
      />
      <Text
        text={`(20${periodNum.slice(0, 2)}년 ${periodNum.slice(2, 4)}월)`}
        center
        margin={[10, 0, 0]}
      />

      <TableContainer>
        <Table
          style={{
            width: '101%',
          }}
          borderStyle={{
            borderWidth: 1,
            borderColor: '#CBCCCE',
          }}>
          <Row
            data={staticData.table1.title}
            style={{
              height: 46,
              borderWidth: 1,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
            textStyle={{ fontSize: 15 }}
          />
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Col
              data={staticData.table1.rowTitles}
              heightArr={[46, 46, 46, 68, 46]}
              style={{ flex: 3 }}
              textStyle={{ fontSize: 15 }}
            />
            <Col
              data={staticData.table1.contents}
              heightArr={[46, 46, 46, 68, 46]}
              style={{ flex: 7 }}
              textStyle={{ paddingLeft: 12, fontSize: 15, lineHeight: 22 }}
            />
          </TableWrapper>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table
          style={{
            width: '101%',
          }}
          borderStyle={{
            borderWidth: 1,
            borderColor: '#CBCCCE',
          }}>
          <Row
            data={staticData.table2.title}
            style={{
              height: 46,
              borderWidth: 1,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
            textStyle={{ fontSize: 15 }}
          />
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Col
              data={staticData.table2.rowTitles}
              heightArr={[46, 46, 46, 46]}
              style={{ flex: 4 }}
              textStyle={{ fontSize: 15 }}
            />

            <Col
              data={data?.commissionInfoList}
              heightArr={[46, 46, 46, 46]}
              style={{ flex: 6 }}
              textStyle={{ paddingLeft: 12, fontSize: 15 }}
            />
          </TableWrapper>
        </Table>
      </TableContainer>
      <Text
        text="•  환급수수료는 부가가치세의 30%입니다."
        margin={[10, 0, 0]}
      />
      <TableContainer>
        <Table
          style={{
            width: '101%',
            marginBottom: 30,
          }}
          borderStyle={{
            borderWidth: 1,
            borderColor: '#CBCCCE',
          }}>
          <Row
            data={staticData.table3.title}
            style={{
              height: 46,
              borderWidth: 1,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
            textStyle={{ fontSize: 15 }}
          />
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Col
              data={staticData.table3.rowTitles}
              heightArr={[46, 46, 46, 46, 46]}
              style={{ flex: 3 }}
              textStyle={{ fontSize: 15 }}
            />
            <Col
              data={data?.customerInfoList}
              heightArr={[46, 46, 46, 46, 46]}
              style={{ flex: 7 }}
              textStyle={{ paddingLeft: 12, fontSize: 15 }}
            />
          </TableWrapper>
        </Table>
      </TableContainer>
    </BodyWrap>
  );
}

const ButtonWrap = styled(FlexWrap)`
  justify-content: center;
  margin: 20px 0 28px 0;
`;

const TableContainer = styled.View`
  margin-top: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export default CMSReportDetail;
