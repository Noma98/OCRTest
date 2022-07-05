import { useEffect, useMemo, useState } from 'react';

import { formatNum } from '@/utils/common';

function useToday() {
  const [dateInfo, setDateInfo] = useState({
    date: '',
    daysOfWeek: '',
    time: '',
    isAm: '',
  });

  const days = useMemo(
    () => [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    [],
  );

  useEffect(() => {
    const today = new Date();
    const daysOfWeek = days[today.getDay()];

    setDateInfo(prevState => {
      return {
        ...prevState,
        daysOfWeek,
        date: `${today.getFullYear()}.${formatNum(
          today.getMonth() + 1,
        )}.${formatNum(today.getDate())}`,
        time: `${formatNum(today.getHours())}:${formatNum(today.getMinutes())}`,
        isAm: today.getHours() <= 12 ? 'AM' : 'PM',
      };
    });
  }, [days]);

  return { ...dateInfo };
}

export default useToday;
