function formatAssetWarrantyStatus(status) {
    switch (status) {
        case 'UNKNOWN':
            return 'Unknown';
        case 'NONE':
            return 'No warranty';
        case 'ACTIVE':
            return 'Active';
        case 'EXPIRED':
            return 'Expired';
        default:
            throw new Error('Unsupported asset warranty status: ' + status);
    }
}

export default formatAssetWarrantyStatus;
