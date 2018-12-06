function hasAnyTicketUpdatePermission(permissions) {
    if (!permissions) {
        return false;
    }

    return permissions.indexOf('UPDATE_TICKETS_PUBLIC_COMMENT') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_STATUS') !== -1 ||
        permissions.indexOf('UPDATE_TICKETS_INTERNAL_ACTION') !== -1 ||
        permissions.indexOf('ASSIGN_TICKETS') !== -1 ||
        permissions.indexOf('DELETE_TICKETS') !== -1;
}

export default hasAnyTicketUpdatePermission;
