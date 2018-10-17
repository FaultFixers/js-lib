function formatTicketPriority(priority) {
    switch (priority) {
        case 'LOW':
            return 'Low';
        case 'MEDIUM':
            return 'Medium';
        case 'HIGH':
            return 'High';
        default:
            throw new Error('Unsupported priority: ' + priority);
    }
}

export default formatTicketPriority;
