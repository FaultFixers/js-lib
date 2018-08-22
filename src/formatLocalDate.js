import {LocalDate} from 'local-date-time';

const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function formatLocalDate(localDate, includeYear = true) {
    localDate = LocalDate.of(localDate);
    const date = localDate.getNativeDateLazily();
    let formatted = date.getDate() + ' ' + MONTHS[date.getMonth()];
    if (includeYear) {
        formatted += ' ' + date.getFullYear();
    }
    return formatted;
}

export default formatLocalDate;

