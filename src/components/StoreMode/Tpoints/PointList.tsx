import React from 'react';
import styled from 'styled-components/native';

import PointItem from '@/components/StoreMode/Tpoints/PointItem';
import { ITpointListResponse } from '@/types/api/store';

const Container = styled.View`
  flex: 1;
  background-color: #f5f6f7;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 20px;
`;

const EmptyNotification = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: #5f6165;
`;

interface IProps {
  tpointList: ITpointListResponse[];
}

function PointList({ tpointList }: IProps) {
  return (
    <Container>
      {tpointList[0].pointInfoList.length === 0 ? (
        <EmptyContainer>
          <EmptyNotification>포인트 적립내역이 없습니다.</EmptyNotification>
          <EmptyNotification>
            T.Point를 적립하고 사용해 보세요.
          </EmptyNotification>
        </EmptyContainer>
      ) : (
        tpointList.map((group, i1) => (
          <React.Fragment key={i1}>
            {group.pointInfoList.map((point, i2) => (
              <PointItem
                key={i2}
                isLast={i2 === group.pointInfoList.length - 1}
                {...point}
              />
            ))}
          </React.Fragment>
        ))
      )}
    </Container>
  );
}

export default PointList;
