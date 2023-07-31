import moment from 'moment';
import LANG from '../../language';

export const validateDate = (aDate) => {
  if (!aDate)
    return LANG('BASIC_DATETIME_VALIDATE');
  const year = Number(aDate.split('-')[0]);
  const month = Number(aDate.split('-')[1]);
  const date = Number(aDate.split('-')[2]);
  const isLeap = new Date(year, 1, 29).getMonth() === 1;
  if (year < 1900) return LANG('BASIC_DATETIME_VALIDATE_YEAR_1900');
  if (year > 2200) return LANG('BASIC_DATETIME_VALIDATE_YEAR_2200');
  if (month < 1) return LANG('BASIC_DATETIME_VALIDATE_MONTH');
  if (month > 12) return LANG('BASIC_DATETIME_VALIDATE_MONTH');
  if (date < 1) return LANG('BASIC_DATETIME_VALIDATE_DATE');
  if ((month === 4 || month === 6 || month === 9 || month === 11) && date > 30) return LANG('BASIC_DATETIME_VALIDATE_DATE');
  if (month === 2 && isLeap && date > 29) return LANG('BASIC_DATETIME_VALIDATE_DATE');
  if (month === 2 && !isLeap && date > 28) return LANG('BASIC_DATETIME_VALIDATE_DATE');
  return null;
}

export const getFormattedStringFromDate = (date, format) => {
  if (!date)
    return '';
  return moment(date).format(format)
}
export const convertToString = (date, kind) => {
    let result = '';
    let day = date.getDay();
    switch (day) {
        case 0: result = LANG('BASIC_SUN') + LANG('BASIC_DAY'); break;
        case 1: result = LANG('BASIC_MON') + LANG('BASIC_DAY'); break;
        case 2: result = LANG('BASIC_TUE') + LANG('BASIC_DAY'); break;
        case 3: result = LANG('BASIC_WED') + LANG('BASIC_DAY'); break;
        case 4: result = LANG('BASIC_THU') + LANG('BASIC_DAY'); break;
        case 5: result = LANG('BASIC_FRI') + LANG('BASIC_DAY'); break;
        case 6: result = LANG('BASIC_SAT') + LANG('BASIC_DAY'); break;
        default: break;
    }
    return result;
}

export const defineDaysOfMonth =(aYear, aMonth) => {
    if( aYear < 1900 || aYear > 2500 || aMonth < 1 || aMonth > 12) return 31;
    const isLeap = new Date(aYear, 1, 29).getMonth() === 1;
    const startDay = new Date(Number(aYear), Number(aMonth) - 1, 1).getDay();
    // console.log("month, ", month, "isLeap, ", isLeap, "startDay, ", startDay);
    switch(aMonth) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return {days: 31, startDay: startDay, endDay: (startDay + 30) % 7};
      case 4: case 6: case 9: case 11:
        return {days: 30, startDay: startDay, endDay: (startDay + 29) % 7};
      case 2:
        return {days: isLeap? 29 : 28, startDay: startDay, endDay: isLeap? (startDay + 28) % 7 : (startDay + 27) % 7};
      default:
        break;
    }
  }
  
  export const getWeekNumber = (aDate) => {
    if (aDate === "") return "";
    const year = Number(aDate.split('-')[0]);
    const month = Number(aDate.split('-')[1]);
    const date = Number(aDate.split('-')[2]);
    const days = defineDaysOfMonth(year, month);
    // console.log(days, date);
    if (days.endDay < 3 && days.days - date < 7) return {month: 1, weekNumber: 1,};
    const startDateOfFirstWeek = 1 - days.startDay;
    let weekNumber = Math.floor((date - startDateOfFirstWeek) / 7) + 1;
    // console.log(date, startDateOfFirstWeek);
    if (days.startDay > 3) weekNumber--;
    return {month: 0, weekNumber: weekNumber,};
  }

  export const getFullWeekNumber = (aStart, aWeekNumber) => {
    let year = 0;
    let month = 0;
    let week = 0;
    if (aWeekNumber.month === 0) {
      year = Number(aStart.split('-')[0]);
      month = Number(aStart.split('-')[1]);
      week = Number(aWeekNumber.weekNumber);
    } else {
      if (Number(aStart.split('-')[1]) === 1) {
        year = Number(aStart.split('-')[0]) - 1;
        month = 12;
        week = Number(aWeekNumber.weekNumber);
      } else {
        year = Number(aStart.split('-')[0]);
        month = Number(aStart.split('-')[1]) - 1;
        week = Number(aWeekNumber.weekNumber);
      }
    }
    return { year: year, month: month, week: week,};
  }

  export const isExpired = (aStartDate, aPeriod) => {
    let expired = false;
    if ( aStartDate !== undefined && aPeriod !== undefined && aPeriod !== null ) {
      const today = moment(new Date()).format('YYYY-MM-DD');
      let allowedDate = moment(aStartDate).startOf('day').add(aPeriod, 'days').format('YYYY-MM-DD');
      expired = today > allowedDate ? true : false;
    }
    return expired;
  }