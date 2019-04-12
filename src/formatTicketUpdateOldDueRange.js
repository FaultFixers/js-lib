import formatDueRange from './formatDueRange';

function formatTicketUpdateOldDueRange(update) {
    return formatDueRange(update.oldStartDate, update.oldStartTime, update.oldEndDate, update.oldEndTime);
}

export default formatTicketUpdateOldDueRange;
