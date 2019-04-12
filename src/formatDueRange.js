import formatLocalDate from './formatLocalDate';
import formatLocalDateTime from './formatLocalDateTime';
import formatLocalTime from './formatLocalTime';

/**
 * @param {String} startDate
 * @param {String} startTime
 * @param {String} endDate
 * @param {String} endTime
 */
function formatDueRange(startDate, startTime, endDate, endTime) {
    if (!startDate) {
        return '-';
    }

    if (!endDate) {
        throw new Error('If a start date is given, an end date must also be given');
    }

    if (startTime && !endTime) {
        throw new Error('If a start time is given, an end time must also be given');
    }

    if (startDate === endDate) {
        if (!startTime) {
            return formatLocalDate(startDate);
        } else {
            return formatLocalDate(startDate) + ', ' + formatLocalTime(startTime) + '-' + formatLocalTime(endTime);
        }
    }

    const start = formatLocalDateTime(startDate, startTime);
    const end = formatLocalDateTime(endDate, endTime);
    return start + ' to ' + end;
}

export default formatDueRange;
