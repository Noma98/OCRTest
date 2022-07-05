import React, { useCallback, useState } from 'react';
import { ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import styled, { css } from 'styled-components/native';

import Button from '@/components/common/Button';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import CalendarModal from '@/components/Modal/Calendar';
import { IFilterOptions } from '@/types/refund';
import { getTodayAndLastMonth } from '@/utils/format';

interface IProps {
  isModalVisible: boolean;
  toggleFilter: () => void;
  setFilterOptions: (options: IFilterOptions) => void;
  filterOptions: IFilterOptions;
}

function CancelFilter({
  isModalVisible,
  toggleFilter,
  filterOptions,
  setFilterOptions,
}: IProps) {
  const modalStyle: ViewStyle = {
    width: '100%',
    borderRadius: 14,
  };
  const [formatedToday, oneMonthAgo] = getTodayAndLastMonth();
  const { startDate, endDate, isLatest, isMonthly } = filterOptions;
  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);
  const [isMonth, setIsMonth] = useState(isMonthly);
  const [latest, setLatest] = useState(isLatest);
  const [calendarInfo, setCalendarInfo] = useState({
    type: '',
    defaultDate: '',
    visible: false,
  });

  const togglePeriod = () => {
    setIsMonth(state => !state);
  };
  const closeCalendar = useCallback(() => {
    setCalendarInfo({ ...calendarInfo, visible: false });
  }, []);
  const onClickLeftCalendar = () => {
    setCalendarInfo({
      visible: true,
      type: 'START',
      defaultDate: start,
    });
  };
  const onClickRightCalendar = () => {
    setCalendarInfo({
      visible: true,
      type: 'END',
      defaultDate: end,
    });
  };
  const toggleLatest = () => {
    setLatest(state => !state);
  };
  const onCancel = () => {
    setIsMonth(isMonthly);
    setLatest(isLatest);
    setStart(startDate);
    setEnd(endDate);
    toggleFilter();
  };
  const onSubmit = () => {
    setFilterOptions({
      startDate: isMonth ? oneMonthAgo : start,
      endDate: isMonth ? formatedToday : end,
      isLatest: latest,
      isMonthly: isMonth,
    });
    toggleFilter();
  };
  return (
    <Modal
      animationInTiming={200}
      animationOutTiming={200}
      isVisible={isModalVisible}
      backdropOpacity={0.6}
      style={modalStyle}
      onBackdropPress={onCancel}>
      <Container>
        <TitleWrap>
          <Text text="보기옵션" size="18" lineHeight={26} margin={[20]} />
          <ExitBtn onPress={onCancel}>
            <Icon source={require('/assets/icons/Header/close.png')} />
          </ExitBtn>
        </TitleWrap>
        <DividingLine height="1" color="#E5E6E8" />
        <ContentWrap>
          <Text text="조회기간" margin={[12, 0]} weight={400} />
          <FlexWrap>
            <StyledBtn
              underlayColor="#EDEEEF"
              disabled={isMonth}
              active={isMonth}
              onPress={togglePeriod}>
              <StyledText active={isMonth}>1개월</StyledText>
            </StyledBtn>
            <StyledBtn
              underlayColor="#EDEEEF"
              disabled={!isMonth}
              active={!isMonth}
              onPress={togglePeriod}>
              <StyledText active={!isMonth}>직접입력</StyledText>
            </StyledBtn>
          </FlexWrap>
          {!isMonth && (
            <SelectBox>
              <ButtonWithIcon
                style={{ flex: 1 }}
                iconSize="24px"
                fontSize="15px"
                text={start}
                reverse
                gap="14px"
                onPress={onClickLeftCalendar}
                iconSource={require('/assets/icons/Etc/calendar.png')}
              />
              <Text text=" ~ " size="14px" />
              <ButtonWithIcon
                style={{ flex: 1 }}
                iconSize="24px"
                gap="14px"
                text={end}
                fontSize="15px"
                onPress={onClickRightCalendar}
                reverse
                iconSource={require('/assets/icons/Etc/calendar.png')}
              />
            </SelectBox>
          )}
          <Text text="정렬순" margin={[28, 0, 12]} weight={400} />
          <FlexWrap>
            <StyledBtn
              underlayColor="#EDEEEF"
              disabled={latest}
              active={latest}
              onPress={toggleLatest}>
              <StyledText active={latest}>최신순</StyledText>
            </StyledBtn>
            <StyledBtn
              underlayColor="#EDEEEF"
              disabled={!latest}
              active={!latest}
              onPress={toggleLatest}>
              <StyledText active={!latest}>과거순</StyledText>
            </StyledBtn>
          </FlexWrap>
          <Button title="적용" onPress={onSubmit} active margin="37px 0 35px" />
        </ContentWrap>
        <CalendarModal
          modalVisible={calendarInfo.visible}
          onRequestClose={closeCalendar}
          onSelect={calendarInfo.type === 'START' ? setStart : setEnd}
          prevDate={calendarInfo.defaultDate}
        />
      </Container>
    </Modal>
  );
}
const Container = styled.View`
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 100%;
  background-color: white;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
`;
const TitleWrap = styled(FlexWrap)`
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
`;
const ContentWrap = styled.View`
  padding: 0 20px;
`;
const ExitBtn = styled.TouchableOpacity``;
const Icon = styled.Image`
  height: 18px;
  width: 18px;
`;
const SelectBox = styled(FlexWrap)`
  border: 1px solid #cbccce;
  height: 40px;
  align-items: center;
  margin-top: 8px;
`;
const StyledBtn = styled.TouchableHighlight<{ active: boolean }>`
  height: 40;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  ${props =>
    props.active
      ? css`
          border-color: black;
          background-color: white;
        `
      : css`
          border-color: #cbccce;
          background-color: #f5f6f7;
        `}
`;
const StyledText = styled.Text<{ active: boolean }>`
  font-size: 16;
  color: ${props => (props.active ? 'black' : '#5F6165')};
`;
export default CancelFilter;
