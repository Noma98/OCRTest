import React from 'react';
import styled from 'styled-components/native';

import PassPortInfo from '@/components/CancelMode/CancelList/PassPortInfo';
import RefundList from '@/components/CancelMode/CancelList/RefundList';
import BodyWrap from '@/components/common/BodyWrap';
import Button from '@/components/common/Button';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import FlexWrap from '@/components/common/FlexWrap';
import LoadingView from '@/components/common/LoadingView';
import CancelFilter from '@/components/Modal/CancelFilter';
import Confirm from '@/components/Modal/Confirm';
import { IFilterOptions, IRefundItem, IRefundItems } from '@/types/refund';

const EmptyListNotification = styled.Text`
  margin-top: 4px;
  padding: 0 20px;
`;
interface IProps {
  modalClose: () => void;
  modalOpen: () => void;
  onConfirm: () => Promise<void>;
  onSelect: (selectedId: IRefundItem) => void;
  toggleFilter: () => void;
  refundList: IRefundItems[];
  selected: IRefundItem | null;
  modalVisible: boolean;
  isLoading: boolean;
  filterVisible: boolean;
  setFilterOptions: (options: IFilterOptions) => void;
  filterOptions: IFilterOptions;
}

function CancelListPresenter({
  modalClose,
  modalOpen,
  onConfirm,
  onSelect,
  toggleFilter,
  refundList,
  selected,
  modalVisible,
  isLoading,
  filterVisible,
  setFilterOptions,
  filterOptions,
}: IProps) {
  const { isLatest, isMonthly } = filterOptions;
  return (
    <>
      <BodyWrap isPadding={false}>
        <PassPortInfo />
        <BtnWrapper>
          <ButtonWithIcon
            fontWeight="400"
            onPress={toggleFilter}
            text={`${isMonthly ? '1개월' : '직접입력'} · ${
              isLatest ? '최신순' : '과거순'
            }`}
            fontSize="16px"
            iconSize="24px"
            gap="4px"
            reverse
            iconSource={require('assets/icons/Etc/arrowBottom.png')}
          />
        </BtnWrapper>

        {refundList.length === 0 ? (
          <EmptyListNotification>
            취소 가능한 환급 내역이 존재하지 않습니다.
          </EmptyListNotification>
        ) : (
          <RefundList
            refundList={refundList}
            selected={selected}
            onSelect={onSelect}
          />
        )}
        <Confirm
          modalVisible={modalVisible}
          onRequestClose={modalClose}
          onConfirm={onConfirm}
          message={`정말 환급을 취소하시겠습니까?\n환급을 취소하려면\n'확인'을 눌러주세요.`}
        />
        {isLoading && <LoadingView isOpacity />}
      </BodyWrap>
      <Button
        title="환급 취소하기"
        position="bottom fixed"
        active={Boolean(selected)}
        onPress={modalOpen}
        margin="0"
        isPadding
      />
      <CancelFilter
        isModalVisible={filterVisible}
        toggleFilter={toggleFilter}
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
      />
    </>
  );
}

const BtnWrapper = styled(FlexWrap)`
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
`;
export default CancelListPresenter;
