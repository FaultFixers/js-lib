function formatAssetStatus(status) {
    switch (status) {
        case 'IN_USE':
            return 'In use';
        case 'NOT_IN_USE':
            return 'Not in use';
        case 'DELETED':
            return 'Deleted';
        default:
            throw new Error('Unsupported asset status: ' + status);
    }
}

export default formatAssetStatus;
