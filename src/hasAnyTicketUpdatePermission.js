const TICKET_UPDATE_PERMISSIONS = [
    'UPDATE_TICKETS_PUBLIC_COMMENT',
    'UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT',
    'UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT',
    'UPDATE_TICKETS_STATUS',
    'UPDATE_TICKETS_INTERNAL_ACTION',
    'ASSIGN_TICKETS',
    'DELETE_TICKETS',
];

function hasAnyTicketUpdatePermission(permissions) {
    if (!permissions) {
        return false;
    }

    for (let i = 0; i < TICKET_UPDATE_PERMISSIONS.length; i++) {
        if (permissions.indexOf(TICKET_UPDATE_PERMISSIONS[i]) !== -1) {
            return true;
        }
    }

    return false;
}

export default hasAnyTicketUpdatePermission;
