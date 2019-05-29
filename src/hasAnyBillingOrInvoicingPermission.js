const BILLING_PERMISSIONS = [
    'BILLING_MANAGE_SETTINGS',
    'BILLING_MANAGE_RATE_CARD',
    'BILLING_DRAFT_INVOICES',
    'BILLING_SEND_INVOICES',
];

function hasAnyBillingOrInvoicingPermission(permissions) {
    if (!permissions) {
        return false;
    }

    for (let i = 0; i < BILLING_PERMISSIONS.length; i++) {
        if (permissions.indexOf(BILLING_PERMISSIONS[i]) !== -1) {
            return true;
        }
    }

    return false;
}

export default hasAnyBillingOrInvoicingPermission;
