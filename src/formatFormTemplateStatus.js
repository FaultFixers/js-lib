function formatFormTemplateStatus(status) {
    switch (status) {
        case 'ACTIVE':
            return 'Active';
        case 'INACTIVE':
            return 'Inactive';
        case 'DELETED':
            return 'Deleted';
        default:
            throw new Error('Unsupported status: ' + status);
    }
}

export default formatFormTemplateStatus;
