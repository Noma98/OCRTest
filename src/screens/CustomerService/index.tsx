import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';

import scrollUp from '@/assets/icons/VatReport/scrollUp.png';
import DividingLine from '@/components/common/DividingLine';
import FAQ from '@/components/CustomerService/FAQ';
import TopInfo from '@/components/CustomerService/TopInfo';
import ButtonWithIcon from '@/components/common/ButtonWithIcon';
import Footer from '@/components/CustomerService/Footer';

function CustomerService() {
  const scrollRef = useRef();
  const scrollToEnd = useCallback(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, []);
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };
  return (
    <>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        isPadding={false}
        scrollEventThrottle={100}>
        <TopInfo />
        <DividingLine height="8px" />
        <FAQ />
        <Footer scrollToEnd={scrollToEnd} />
      </ScrollView>
      <ButtonWithIcon
        iconSource={scrollUp}
        iconSize="50px"
        style={{ position: 'absolute', bottom: 30, right: 20 }}
        onPress={scrollToTop}
      />
    </>
  );
}
export default CustomerService;
