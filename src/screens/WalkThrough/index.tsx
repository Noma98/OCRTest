import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import stepOne from '@/assets/icons/Walkthrough/1.png';
import stepTwo from '@/assets/icons/Walkthrough/2.png';
import stepThree from '@/assets/icons/Walkthrough/3.png';
import stepFour from '@/assets/icons/Walkthrough/4.png';
import Button from '@/components/common/Button';
import FlexWrap from '@/components/common/FlexWrap';
import TopText from '@/components/common/TopText';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { WalkThroughScreenProps } from '@/types/navigation';
import { requestUserPermission } from '@/utils/pushNotification';

const walkthroughArr = [
  {
    title: `즉시환급,\n모바일로 간편하게`,
    sub: `여권을 스캔하고\n상품 금액만 입력하면 환급 완료!`,
    imgSrc: stepOne,
  },
  {
    title: `\n기기 설치 필요없이`,
    sub: `모바일 앱 하나로 쉽고 빠르게\n사후면세점을 운영해보세요`,
    imgSrc: stepTwo,
  },
  {
    title: `\n매출 분석도 한눈에`,
    sub: `매출이 얼마나 증가했는지\n전월, 전년도와 비교해보세요`,
    imgSrc: stepThree,
  },
  {
    title: `\n환급 수수료 걱정 없이`,
    sub: `환급 수수료는 현금화할 수 있는\n포인트로 돌려드려요`,
    imgSrc: stepFour,
  },
];
interface IProps {
  navigation: WalkThroughScreenProps['navigation'];
}
function WalkThrough({ navigation }: IProps) {
  const [step, setStep] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const { firstRender } = useAppSelector(state => state.user);
  console.log('안녕', firstRender);

  const onPress = () => {
    console.log('바이', firstRender);
    navigation.reset({
      index: 1,
      routes: [{ name: 'SignIn' }],
    });
  };
  useEffect(() => {
    requestUserPermission();
  }, []);
  // useEffect(() => {
  //   if (!firstRender) {
  //     console.log('실행은되나요');
  //     console.log(navigation);
  //     navigation.reset({
  //       index: 1,
  //       routes: [{ name: 'SignIn' }],
  //     });
  //   }
  // }, [firstRender]);

  return (
    <>
      <StyledSafeAreaView>
        <CarouselContainer>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX,
                    },
                  },
                },
              ],
              {
                listener: event =>
                  setStep(
                    Math.round(event.nativeEvent.contentOffset.x / windowWidth),
                  ),
              },
            )}
            scrollEventThrottle={1}>
            {walkthroughArr.map(({ title, sub, imgSrc }) => (
              <CarouselItem width={windowWidth}>
                <>
                  <TopText
                    center
                    textFirst={title}
                    textFirstSize="30px"
                    textFirstLineHeight={43}
                    isHighlightFirst
                    textSecond={sub}
                    textSecondSize="18px"
                    textSecondLineHeight={26}
                    gap={12}
                    textSecondStyle={{
                      color: '#3A3B3E',
                      marginBottom: 50,
                    }}
                  />
                  <StyledImg
                    source={imgSrc}
                    width={windowWidth}
                    resizeMode="contain"
                  />
                </>
              </CarouselItem>
            ))}
          </ScrollView>
          <IndicatorsContainer>
            <Indicator active={step === 0} />
            <Indicator active={step === 1} />
            <Indicator active={step === 2} />
            <Indicator active={step === 3} />
          </IndicatorsContainer>
        </CarouselContainer>
      </StyledSafeAreaView>
      <Button
        title="시작하기"
        active
        onPress={onPress}
        margin="0"
        position="bottom fixed"
        isPadding
      />
    </>
  );
}
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  transform: translateY(-52px);
`;
const CarouselContainer = styled.View`
  justify-content: center;
`;

const CarouselItem = styled.View<{ width: number }>`
  width: ${props => props.width}px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;
const StyledImg = styled.Image`
  width: 100%;
  height: 240px;
`;
const IndicatorsContainer = styled(FlexWrap)`
  padding-top: 66px;
  justify-content: center;
`;
const Indicator = styled.View<{ active: boolean }>`
  background-color: ${props => (props.active ? '#005F83' : '#e5e6e8')};
  border-radius: 5px;
  width: 10px;
  height: 10px;
  margin: 0 6px;
`;
export default WalkThrough;
