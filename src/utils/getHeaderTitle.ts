function getHeaderTitle(route: any) {
  switch (route.name) {
    case 'SalesAnalysis':
      return '매출내역';
    case 'Tpoint':
      return 'T.POINT';
    case 'MyPage':
      return '마이페이지';
  }
}

export default getHeaderTitle;
