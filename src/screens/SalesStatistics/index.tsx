import { AxiosError } from 'axios';
import { format } from 'date-fns/esm';
import React, { useCallback, useState } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getSalesComparison, getSalesStatisticsInfo } from '@/api/store';
import arrowIcon from '@/assets/icons/VatReport/chevron_right_black.png';
import BodyWrap from '@/components/common/BodyWrap';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import CommaWithSuffix from '@/components/common/CommaWithSuffix';
import DividingLine from '@/components/common/DividingLine';
import FlexWrap from '@/components/common/FlexWrap';
import SelectYear from '@/components/common/SelectYear';
import Text from '@/components/common/Text';
import { yearCategoryList } from '@/constants/salesStatistics';
import { useAppSelector } from '@/hooks/useReduxHooks';
import {
  ISalesComparisionResponse,
  ISalesStatisticsResponse,
} from '@/types/api/store';
import { IError, YearType } from '@/types/common';
import { SalesStatisticsScreenProps } from '@/types/navigation';

interface IProps {
  navigation: SalesStatisticsScreenProps['navigation'];
}
function SalesStatistics({ navigation }: IProps) {
  const { franchiseeIndex, signUpDate } = useAppSelector(
    state => state.user.userInfo,
  );
  const [targetDate, setTargetDate] = useState(new Date());
  const [query, setQuery] = useState<'MONTH' | 'YEAR' | 'ALL'>('MONTH');
  const [isPicker, setIsPicker] = useState(false);
  const [suffix, setSuffix] = useState<'원' | '건'>('원');
  const { data } = useQuery<ISalesStatisticsResponse, AxiosError<IError>>(
    ['salesStatisticsInfo', franchiseeIndex, targetDate, query],
    () =>
      getSalesStatisticsInfo({
        franchiseeIndex,
        targetDate: format(targetDate, 'yyyyMM'),
        dateSelector: query,
      }),
    {
      retry: false,
      enabled: Boolean(franchiseeIndex && targetDate),
    },
  );
  const mutation = useMutation<ISalesComparisionResponse, AxiosError<IError>>(
    ['comparisonData'],
    () =>
      getSalesComparison({
        franchiseeIndex,
        dateSelector: query,
        targetDate: format(targetDate, 'yyyyMM'),
      }),
    {
      retry: false,
      onSuccess: info => {
        setIsPicker(false);
        setSuffix(state =>
          navigation.navigate('SalesStatisticsDetail', {
            dateSelector: query,
            suffix: state,
            currDate: targetDate,
            data: info,
          }),
        );
      },
    },
  );
  const onMonthChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || targetDate;
      setIsPicker(false);
      setTargetDate(selectedDate);
    },
    [targetDate, setIsPicker],
  );
  const onYearChange = (value: YearType) => {
    const formatedValue = Number(value.slice(0, 4));
    setTargetDate(new Date(formatedValue, 0)); //임의로 1월 지정
  };
  const onCompareAmounts = () => {
    setSuffix('원');
    mutation.mutate();
  };
  const onCompareCounts = () => {
    setSuffix('건');
    mutation.mutate();
  };
  return (
    <>
      <BodyWrap>
        <ButtonGroup>
          <StyledBtn
            underlayColor="#F5F6F7"
            active={query === 'MONTH'}
            disabled={query === 'MONTH'}
            onPress={() => {
              setQuery('MONTH');
              setTargetDate(new Date());
            }}>
            <StyledText active={query === 'MONTH'}>월간</StyledText>
          </StyledBtn>
          <StyledBtn
            underlayColor="#F5F6F7"
            active={query === 'YEAR'}
            disabled={query === 'YEAR'}
            onPress={() => {
              setQuery('YEAR');
              setTargetDate(new Date());
            }}>
            <StyledText active={query === 'YEAR'}>연간</StyledText>
          </StyledBtn>
          <StyledBtn
            underlayColor="#F5F6F7"
            active={query === 'ALL'}
            disabled={query === 'ALL'}
            onPress={() => setQuery('ALL')}>
            <StyledText active={query === 'ALL'}>전체</StyledText>
          </StyledBtn>
        </ButtonGroup>
        {query === 'MONTH' && (
          <ButtonWithIcon
            onPress={() => setIsPicker(state => !state)}
            borderColor="#CBCCCE"
            reverse
            text={format(targetDate, 'yyyy.MM')}
            btnPadding="8px 14px 8px 8px"
            margin="10px 0 30px"
            fontSize="15px"
            iconSize="24px"
            fontWeight="400"
            justifyContent="space-between"
            iconSource={require('/assets/icons/Etc/calendar.png')}
          />
        )}
        {query === 'YEAR' && (
          <SelectYear<YearType>
            itemList={yearCategoryList}
            category={(targetDate.getFullYear().toString() + '년') as YearType}
            onCategoryChange={onYearChange}
            label=""
          />
        )}
        {query === 'ALL' && (
          <Text
            text={`${format(new Date(signUpDate), 'yyyy.MM.dd')} ~ ${format(
              new Date(),
              'yyyy.MM.dd',
            )}`}
            size="15px"
            margin={[10, 0, 30]}
            style={{
              borderWidth: 1,
              borderColor: '#CBCCCE',
              padding: 8,
              paddingLeft: 14,
            }}
          />
        )}
        <AmountBox>
          <ItemWrap>
            <Text text="총상품금액" />
            <CommaWithSuffix price={data?.totalAmount || '0'} />
          </ItemWrap>
          <ItemWrap>
            <Text text="환급액" />
            <CommaWithSuffix price={data?.totalRefund || '0'} />
          </ItemWrap>
          <ItemWrap>
            <Text text="결제금액" />
            <CommaWithSuffix price={data?.totalActualAmount || '0'} />
          </ItemWrap>
          {query !== 'ALL' && (
            <>
              <DividingLine height="1px" color="#E5E6E8" />
              <ButtonWithIcon
                reverse
                iconSource={arrowIcon}
                onPress={onCompareAmounts}
                iconSize="24px"
                text={`지난${query === 'MONTH' ? '달과' : '해와'} 비교하기`}
                fontSize="16px"
                fontWeight="400"
                btnPadding="14px"
              />
            </>
          )}
        </AmountBox>
        <AmountBox>
          <ItemWrap>
            <Text text="환급건수" />
            <CommaWithSuffix suffix="건" price={data?.totalCount || '0'} />
          </ItemWrap>
          <ItemWrap>
            <Text text="환급취소건수" />
            <CommaWithSuffix suffix="건" price={data?.totalCancel || '0'} />
          </ItemWrap>
          <DividingLine height="1px" color="#E5E6E8" />
          {query !== 'ALL' && (
            <>
              <ButtonWithIcon
                reverse
                iconSource={arrowIcon}
                onPress={onCompareCounts}
                iconSize="24px"
                text={`지난${query === 'MONTH' ? '달과' : '해와'} 비교하기`}
                fontSize="16px"
                fontWeight="400"
                btnPadding="14px"
              />
            </>
          )}
        </AmountBox>
      </BodyWrap>
      {isPicker && query === 'MONTH' && (
        <Wrapper>
          <MonthPicker
            autoTheme={false}
            onChange={onMonthChange}
            value={targetDate}
            cancelButton="취소"
            okButton="확인"
          />
        </Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
`;
const ItemWrap = styled(FlexWrap)`
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 17px;
`;
const ButtonGroup = styled(FlexWrap)`
  padding-top: 20px;
`;
const StyledBtn = styled.TouchableHighlight<{ active: boolean }>`
  background-color: ${props => (props.active ? 'black' : 'white')};
  border-color: ${props => (props.active ? 'black' : '#cbccce')};
  border-width: 1px;
  flex: 1;
`;
const StyledText = styled.Text<{ active: boolean }>`
  font-size: 16px;
  line-height: 40px;
  margin: auto;
  color: ${props => (props.active ? 'white' : 'black')};
`;
const AmountBox = styled.View`
  background-color: #f5f6f7;
  border-width: 1px;
  border-color: #e5e6e8;
  border-radius: 14px;
  margin-bottom: 20px;
  padding-top: 19px;
`;
export default SalesStatistics;
