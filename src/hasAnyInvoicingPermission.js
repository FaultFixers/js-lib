const INVOICE_PERMISSIONS = [
    'BILLING_DRAFT_INVOICES',
    'BILLING_SEND_INVOICES',
];

function hasAnyInvoicingPermission(permissions) {
    if (!permissions) {
        return false;
    }

    for (let i = 0; i < INVOICE_PERMISSIONS.length; i++) {
        if (permissions.indexOf(INVOICE_PERMISSIONS[i]) !== -1) {
            return true;
        }
    }

    return false;
}

export default hasAnyInvoicingPermission;
