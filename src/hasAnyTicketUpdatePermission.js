function hasAnyTicketUpdatePermission(permissions) {
    if (!permissions) {
        return false;
    }

    return permissions.indexOf('UPDATE_TICKETS_PUBLIC_COMMENT') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_STATUS') !== -1;
}

export default hasAnyTicketUpdatePermission;
