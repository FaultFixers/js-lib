function formatInvoiceStatus(status) {
    switch (status) {
        case 'DRAFT':
            return 'Draft';
        case 'AWAITING_PAYMENT':
            return 'Awaiting payment';
        case 'PAID':
            return 'Paid';
        case 'DELETED':
            return 'Deleted';
        default:
            throw new Error('Unsupported invoice status: ' + status);
    }
}

export default formatInvoiceStatus;
