function getTicketCommentVisibilityDescription(ticket, commentVisibility) {
    if (!ticket || !commentVisibility) {
        return null;
    }

    switch (commentVisibility) {
        case 'PUBLIC':
            return 'Public comment (visible to everyone)';
        case 'PRIVATE_TO_REPORTER':
            if (ticket.reporter) {
                return 'Private comment (visible to ' + (ticket.reporter.name ? ticket.reporter.name : ticket.reporter.email) + ' only)';
            } else {
                return 'Private comment';
            }
            break;
        case 'INTERNAL_TO_TEAM':
            return 'Internal comment (visible to your team only)';
        default:
            throw new Error('Unsupported comment visibility: ' + commentVisibility);
    }
}

export default getTicketCommentVisibilityDescription;
