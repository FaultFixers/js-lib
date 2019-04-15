import {combineIntoZonedDate} from 'local-date-time';

/**
 * @param {String} startDate A string like '2015-05-23'.
 * @param {String} startTime A string like '12:30'.
 * @param {String} endDate A string like '2015-05-24'.
 * @param {String} endTime A string like '23:00'.
 * @return {Number} The number of minutes that the range spans.
 * @throws if any argument is not a string.
 * @throws if the given start if before the given end.
 */
function calculateDueRangeInMinutes(startDate, startTime, endDate, endTime) {
    function describeArguments() {
        return `got: startDate=${startDate}, startTime=${startTime}, endDate=${endDate}, endTime=${endTime}`;
    }

    if (typeof startDate !== 'string' || typeof startTime !== 'string' || typeof endDate !== 'string' || typeof endTime !== 'string') {
        throw new Error('calculateDueRangeInMinutes must be given exactly 4 strings; ' + describeArguments());
    }

    const zonedStart = combineIntoZonedDate(startDate, startTime).getTime();
    const zonedEnd = combineIntoZonedDate(endDate, endTime).getTime();

    if (zonedStart === zonedEnd) {
        return 0;
    } else if (zonedEnd < zonedStart) {
        throw new Error('Start must be before end; ' + describeArguments());
    } else {
        const milliseconds = zonedEnd - zonedStart;
        return milliseconds / 1000 / 60;
    }
}

export default calculateDueRangeInMinutes;
