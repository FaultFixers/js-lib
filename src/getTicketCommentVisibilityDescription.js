function getTicketCommentVisibilityDescription(ticket, commentVisibility) {
    if (!ticket || !commentVisibility) {
        return null;
    }

    switch (commentVisibility) {
        case 'PUBLIC':
            return 'Public comment (visible to everyone in the ' + (ticket.location ? 'location' : 'building') + ')';
        case 'PRIVATE_TO_REPORTER':
            if (ticket.reporter) {
                return 'Private comment (visible to ' + (ticket.reporter.name ? ticket.reporter.name : ticket.reporter.email) + ')';
            } else {
                return 'Private comment';
            }
            break;
        default:
            throw new Error('Unsupported comment visibility: ' + commentVisibility);
    }
}

export default getTicketCommentVisibilityDescription;
