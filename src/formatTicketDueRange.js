import formatDueRange from './formatDueRange';

function formatTicketDueRange(ticket) {
    if (ticket.isDueSet) {
        return formatDueRange(ticket.startDate, ticket.startTime, ticket.endDate, ticket.endTime);
    } else {
        return '-';
    }
}

export default formatTicketDueRange;
