function formatFormInstanceStatus(status) {
    switch (status) {
        case 'NEW':
            return 'New';
        case 'IN_PROGRESS':
            return 'In progress';
        case 'COMPLETED':
            return 'Completed';
        case 'DELETED':
            return 'Deleted';
        default:
            throw new Error('Unsupported status: ' + status);
    }
}

export default formatFormInstanceStatus;
