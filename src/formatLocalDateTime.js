import {LocalDate, LocalTime} from 'local-date-time';
import formatLocalDate from './formatLocalDate.js';
import formatLocalTime from './formatLocalTime.js';

function formatLocalDateTime(localDate, localTime, includeYear = true) {
    const formattedDate = formatLocalDate(localDate, includeYear);

    if (localTime) {
        const formattedTime = formatLocalTime(localTime);
        return `${formattedDate}, ${formattedTime}`;
    } else {
        return formattedDate;
    }
}

export default formatLocalDateTime;

