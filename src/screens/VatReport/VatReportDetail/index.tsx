import React, { useRef } from 'react';
import {
  Cell,
  Col,
  Row,
  Table,
  TableWrapper,
} from 'react-native-table-component';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getVatDetailLists } from '@/api/user';
import downloadIcon from '@/assets/icons/VatReport/download.png';
import upIcon from '@/assets/icons/VatReport/scrollUp.png';
import shareIcon from '@/assets/icons/VatReport/share.png';
import BodyWrap from '@/components/common/BodyWrap';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import { IVatReportDetailResponse, IVatReportParams } from '@/types/api/user';
import { VatReportDetailScreenProps } from '@/types/navigation';

const staticData = {
  btns: [
    { text: '문서 다운로드', uri: downloadIcon },
    { text: '문서 공유하기', uri: shareIcon },
  ],
  table1: {
    tableTitle: ['1. 제출자 인적사항'],
    tableColTitle: [`사\n업\n자`],
    tableColSubTitle: [
      '(1) 성명',
      '(2) 사업자등록번호',
      '(3) 상호',
      '(4) 사업장소재지',
      '(5) 거래기간',
      '(6) 면세판매장\n      지정번호',
    ],
  },
  table2: {
    title: ['2. 물품판매 총합계'],
    rowTitle: ['(7) 건수', '(8) 판매금액', '(9) 부가가치세'],
    colTitle: ['구분', '합계'],
  },
  table3: {
    title: ['3. 물품판매 명세'],
    colTitle: [
      '(14) 구매일련번호',
      '(15) 판매일자',
      '(15) 반출승인번호',
      '(19) 환급액',
    ],
    colSubTitle: ['판매금액', '부가가치세'],
  },
};

interface IProps {
  route: VatReportDetailScreenProps['route'];
}

function VatReportDetail({ route }: IProps) {
  const { franchiseeIndex, periodNum } = route.params;
  const scrollRef = useRef();
  const onScrollUp = () => {
    scrollRef?.current?.scrollTo({ y: 0 });
  };

  const { data, isLoading } = useQuery<
    IVatReportDetailResponse,
    IVatReportParams
  >(
    ['data'],
    () => getVatDetailLists({ franchiseeIndex, requestDate: periodNum }),
    { retry: false },
  );

  if (isLoading) {
    return <LoadingView />;
  }
  return (
    <>
      <BodyWrap scrollRef={scrollRef}>
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
        <TextWrap>
          <Text text={`◼︎ `} color="#5F6165" />
          <Text
            text={`외국인관광객 등에 대한 부가가치세 및 개별소비세 특례규정\n시행규칙 [별지 제6호의 2서식]`}
            size="14px"
            color="#5F6165"
            lineHeight={18}
          />
        </TextWrap>
        <Text
          text={`외국인관광객 면세물품\n판매 및 환급실적명세서(갑)`}
          lineHeight={27}
          size="18px"
          center
          margin={[20, 0, 16]}
          weight="600"
        />
        <Text
          text={`(20${periodNum.slice(0, 2)}년 0${periodNum.slice(-1)}기 (월))`}
          center
          margin={[0, 0, 28]}
        />
        <TableContainer>
          <Table
            style={{ width: '101%' }}
            borderStyle={{ borderWidth: 1, borderColor: '#CBCCCE' }}>
            <Row
              data={staticData.table1.tableTitle}
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
                data={staticData.table1.tableColTitle}
                textStyle={{
                  lineHeight: 22,
                  fontSize: 15,
                }}
              />
              <Col
                data={staticData.table1.tableColSubTitle}
                heightArr={[46, 46, 46, 88, 68, 68]}
                textStyle={{ paddingLeft: 14, fontSize: 15, lineHeight: 22 }}
                style={{ flex: 5 }}
              />
              <Col
                data={data?.vatDetailResponsePersonalInfoList}
                heightArr={[46, 46, 46, 88, 68, 68]}
                textStyle={{
                  paddingLeft: 14,
                  lineHeight: 22,
                  fontSize: 15,
                }}
                style={{
                  flex: 5,
                }}
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
                data={staticData.table2.colTitle}
                style={{
                  flex: 1.3,
                }}
                textStyle={{ fontSize: 15 }}
                heightArr={[46, 46]}
              />
              <TableWrapper
                style={{ flexDirection: 'column', flex: 10 }}
                borderStyle={{ borderWidth: 1 }}>
                <Row
                  data={staticData.table2.rowTitle}
                  style={{ height: 46 }}
                  textStyle={{ textAlign: 'center', fontSize: 15 }}
                />
                <TableWrapper style={{ flexDirection: 'row' }}>
                  {data?.vatDetailResponseTotalInfoList?.map(item => (
                    <Cell
                      data={item}
                      style={{ flex: 1, height: 46 }}
                      textStyle={{ textAlign: 'center', fontSize: 15 }}
                    />
                  ))}
                </TableWrapper>
              </TableWrapper>
            </TableWrapper>
          </Table>
        </TableContainer>
        <TableContainer>
          <Row
            data={staticData.table3.title}
            style={{
              height: 46,
              borderTopWidth: 1,
            }}
            textStyle={{ fontSize: 15 }}
          />
          <Table
            style={{
              width: '101%',
            }}
            borderStyle={{
              borderWidth: 1,
              borderColor: '#CBCCCE',
            }}>
            {data?.vatDetailResponseDetailInfoListList?.map((item, index) => (
              <TableWrapper
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                }}>
                <Cell
                  data={[`(13)\n일련\n번호\n\n${index + 1}`]}
                  style={{ height: 298, width: 46 }}
                  textStyle={{ textAlign: 'center', fontSize: 15 }}
                />
                <TableWrapper style={{ flexDirection: 'column', width: 146 }}>
                  <Col
                    data={staticData.table3.colTitle}
                    heightArr={[46, 46, 68, 46]}
                    textStyle={{ paddingLeft: 14, fontSize: 15 }}
                  />
                  <TableWrapper style={{ flexDirection: 'row' }}>
                    <Cell
                      data={`(20)\n금액`}
                      textStyle={{
                        textAlign: 'center',
                        lineHeight: 22,
                        fontSize: 15,
                      }}
                      style={{ height: 92, width: 59 }}
                    />
                    <TableWrapper
                      style={{ flexDirection: 'column', width: 87 }}>
                      <Col
                        data={staticData.table3.colSubTitle}
                        heightArr={[46, 46]}
                        textStyle={{ paddingLeft: 14, fontSize: 15 }}
                      />
                    </TableWrapper>
                  </TableWrapper>
                </TableWrapper>
                <Col
                  data={item}
                  heightArr={[46, 46, 68, 46, 46, 46]}
                  textStyle={{ paddingLeft: 14, fontSize: 15 }}
                />
              </TableWrapper>
            ))}
          </Table>
        </TableContainer>
      </BodyWrap>
      <ButtonWithIcon
        iconSource={upIcon}
        iconSize="50px"
        style={{ position: 'absolute', bottom: 30, right: 20 }}
        onPress={onScrollUp}
      />
    </>
  );
}

const ButtonWrap = styled(FlexWrap)`
  justify-content: center;
  margin: 20px 0 28px;
`;

const TextWrap = styled(FlexWrap)`
  align-items: flex-start;
`;
const TableContainer = styled.View`
  margin-bottom: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export default VatReportDetail;
