import { format } from 'date-fns/esm';
import React from 'react';
import styled from 'styled-components/native';

import noSalesData from '@/assets/icons/Etc/noSalesData.png';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import Text from '@/components/common/Text';
import Graph from '@/components/SalesStatistics/Graph';
import TableView from '@/components/SalesStatistics/TableView';
import { SalesStatisticsDetailScreenProps } from '@/types/navigation';
import { getRatioAndPercent } from '@/utils/format';

interface IProps {
  route: SalesStatisticsDetailScreenProps['route'];
}
function SalesStatisticsDetail({ route }: IProps) {
  const {
    dateSelector,
    suffix,
    data: {
      saleStatisticsCurrentResponse: curr,
      saleStatisticsPreviousResponse: prev,
    },
    currDate,
  } = route.params;
  const [ratio, percent] = getRatioAndPercent(curr, prev, suffix);
  const noPrev = prev?.totalCount === '0건';
  const tableData = {
    ...(dateSelector === 'MONTH'
      ? {
          prevDate: format(
            new Date(currDate?.getFullYear(), currDate?.getMonth() - 1),
            'yyyy.MM',
          ),
          currDate: format(currDate, 'yyyy.MM'),
        }
      : {
          prevDate: String(currDate?.getFullYear() - 1),
          currDate: format(currDate, 'yyyy'),
        }),
    ...(suffix === '건'
      ? {
          colTitle: ['환급건수', '환급취소건수'],
          prevInfo: [prev?.totalCount, prev?.totalCancel],
          currInfo: [curr?.totalCount, curr?.totalCancel],
        }
      : {
          colTitle: ['총상품금액', '결제금액', '환급액'],
          prevInfo: [
            prev?.totalAmount,
            prev?.totalActualAmount,
            prev?.totalRefund,
          ],
          currInfo: [
            curr?.totalAmount,
            curr?.totalActualAmount,
            curr?.totalRefund,
          ],
        }),
  };
  return (
    <>
      {noPrev ? (
        <BodyWrap>
          <Text
            margin={[20, 0]}
            size="15px"
            text={`${
              dateSelector === 'MONTH' ? '전월' : '전년도'
            } 매출내역이 없습니다.`}
            lineHeight={22}
          />
          <NoDataImage source={noSalesData} />
        </BodyWrap>
      ) : (
        <BodyWrap isPadding={false}>
          <StyledTitle style={{ paddingHorizontal: 20 }}>
            {`${suffix === '건' ? '환급건수는' : '결제금액은'}\n${
              dateSelector === 'MONTH' ? '전월' : '전년'
            } 대비\n`}
            <StyledTitle style={{ color: '#FF5239' }}>
              {Math.abs(Math.round(percent * 100))}%
              {percent < 0 ? ' 감소' : ' 증가'}
            </StyledTitle>
            했습니다.
          </StyledTitle>
          <Graph
            fieldArr={
              suffix === '건'
                ? ['환급건수', '환급취소건수']
                : ['결제금액', '환급액']
            }
            dataArr={{
              prev: {
                info:
                  suffix === '건'
                    ? tableData?.prevInfo
                    : [prev?.totalActualAmount, prev?.totalRefund],
                date: tableData?.prevDate,
              },
              curr: {
                info:
                  suffix === '건'
                    ? tableData?.currInfo
                    : [curr?.totalActualAmount, curr?.totalRefund],
                date: tableData?.currDate,
              },
            }}
            suffix={suffix}
            ratio={ratio}
          />
          <DividingLine height="8px" color="#DDDFE3" />
          <TableView tableData={tableData} />
          {suffix === '원' && (
            <Text
              text="•  총상품금액 = 결제금액 + 환급액"
              margin={[0, 20, 20]}
              size="14px"
              lineHeight={22}
            />
          )}
        </BodyWrap>
      )}
    </>
  );
}

const StyledTitle = styled.Text`
  font-size: 22px;
  margin-top: 20px;
  line-height: 30px;
  font-weight: 500;
`;
const NoDataImage = styled.Image`
  margin-top: 180px;
  height: 240px;
  width: 100%;
  resize-mode: contain;
`;
export default SalesStatisticsDetail;
