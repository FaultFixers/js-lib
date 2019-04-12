import formatDueRange from './formatDueRange';

function formatTicketUpdateNewDueRange(update) {
    return formatDueRange(update.newStartDate, update.newStartTime, update.newEndDate, update.newEndTime);
}

export default formatTicketUpdateNewDueRange;
