function getAvailableCommentVisibilities(permissions) {
    if (!permissions) {
        return [];
    }

    let available = [];
    if (permissions.indexOf('UPDATE_TICKETS_PUBLIC_COMMENT') !== -1) {
        available.push('PUBLIC');
    }
    if (permissions.indexOf('UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT') !== -1) {
        available.push('PRIVATE_TO_REPORTER');
    }
    if (permissions.indexOf('UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT') !== -1) {
        available.push('INTERNAL_TO_TEAM');
    }
    return available;
}

export default getAvailableCommentVisibilities;
