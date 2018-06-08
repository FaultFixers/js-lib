function formatShortVisibility(visibility) {
    switch (visibility) {
        case 'PUBLIC':
            return 'Public';
        case 'PRIVATE_TO_REPORTER':
            return 'Private';
        case 'INTERNAL_TO_TEAM':
            return 'Internal';
        default:
            throw new Error('Unsupported visibility: ' + visibility);
    }
}

export default formatShortVisibility;
