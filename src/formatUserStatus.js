function formatUserStatus(status) {
    switch (status) {
        case 'ACTIVE':
            return 'Active';
        case 'DEACTIVATED':
            return 'Deactivated';
        case 'BANNED':
            return 'Banned';
        case 'INVITED':
            return 'Invited';
        default:
            throw new Error('Unsupported user status: ' + status);
    }
}

export default formatUserStatus;
