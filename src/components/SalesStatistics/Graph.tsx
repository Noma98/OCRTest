import React from 'react';
import styled from 'styled-components/native';

import FlexWrap from '@/components/common/FlexWrap';
import BarItems from '@/components/SalesStatistics/BarItems';
import Fields from '@/components/SalesStatistics/Fields';
import { removeLetter } from '@/utils/format';

interface IdataItem {
  info: string[];
  date: string;
}
interface IdataItems {
  prev: IdataItem;
  curr: IdataItem;
}
interface IGraphProps {
  fieldArr: Array<string>;
  dataArr: IdataItems;
  suffix: '건' | '원';
  ratio: number;
}
function Graph({ fieldArr, dataArr: { prev, curr }, ratio }: IGraphProps) {
  const formattedCurrDatas = curr.info.map(item => +removeLetter(item));
  const formatedPrevDatas = prev.info.map(item => +removeLetter(item));

  /*이전 결제(금액/건수)와 현재(금액/건수) 비교하여 큰쪽은 200px 고정, 작은쪽은 큰쪽과의 비율을 계산해 높이 책정. 나머지 환급(액/건수)는 결제(금액/건수)대비 비율을 따져 적절한 높이를 가지도록 구현  */
  const prevValue = ratio < 1 ? 200 : 200 / ratio;
  const prevCancel = (prevValue * formatedPrevDatas[1]) / formatedPrevDatas[0];
  const currValue =
    formattedCurrDatas[0] === 0 ? 0 : ratio < 1 ? 200 * ratio : 200;
  const currCancel =
    formattedCurrDatas[1] === 0
      ? 0
      : (currValue * formattedCurrDatas[1]) / formattedCurrDatas[0];

  return (
    <GraphContainer>
      <Fields fieldArr={fieldArr} />
      <ViewContainer>
        <BarItems data={prev} heightArr={[prevValue, prevCancel]} />
        <BarItems data={curr} heightArr={[currValue, currCancel]} />
      </ViewContainer>
    </GraphContainer>
  );
}
const GraphContainer = styled.View`
  padding: 54px 20px 30px;
`;

const ViewContainer = styled(FlexWrap)`
  margin-top: 50px;
  align-items: flex-end;
`;
export default Graph;
