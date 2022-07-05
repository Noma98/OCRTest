class ErrorController {
  constructor() {}

  checkIsRefundError(message: string) {
    return message.includes(':');
  }

  getRefundAlertMessage(message: string) {
    const [errorCode, caseMessage, divisionCode] = message.split(':');

    if (divisionCode === 'E0011' || divisionCode === 'E0012') {
      return '오류가 발생했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)';
    }
    if (divisionCode === 'E0013') {
      switch (errorCode) {
        case '0047':
          return '판매일이 고객의 최초 입국일보다\n이전 날짜입니다.';
        case '0048':
          return '입국정보가 없는 고객입니다.';
        case '0049':
          return '이미 출국한 고객입니다.';
        case '2001':
          return '즉시환급 통합 한도가 초과되었습니다.';
        case '2002':
          return '즉시환급 건당 한도가 초과되었습니다.\n(1회 최대 500,000원 미만)';
        case '2003':
        case '2004':
        case '2005':
        case '2006':
        case '2007':
          return `선별검사 대상자입니다.\n(에러코드 ${errorCode}번)`;
        case '2008':
          return '즉시환급한도원장에 등록된\n여권번호가 아닙니다.';
        case '2009':
          return '기존 한도원장이 초기화되지\n않았습니다(미출국자)';
        case '2010':
          return '한도원장과 거래내역이\n일치하지 않습니다.';
        case '2011':
          return '이미 승인된 건입니다.';
        case '2099':
          return '즉시환급 서비스가 일시중지 상태입니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)';
        case '3006':
          return '이전 입국시 환급완료된 건으로,\n환급취소가 불가능합니다.';
        case '4005':
        case '4006':
        case '4007':
        case '4008':
        case '4009':
          return `외국인 관광객이 아닙니다.\n(에러코드 ${errorCode}번)`;
        case '4001':
        case '4003':
          return caseMessage;
        default:
          return '오류가 발생했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)';
      }
    }
  }
}

export default ErrorController;
