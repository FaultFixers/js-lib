const chai = require('chai');
const expect = chai.expect;

const formatInvoiceStatus = require('../dist/test-bundle.js').formatInvoiceStatus;

describe('formatInvoiceStatus', function() {
    it('should return correct statuses', function() {
        expect(formatInvoiceStatus('DRAFT')).to.equal('Draft');
        expect(formatInvoiceStatus('AWAITING_PAYMENT')).to.equal('Awaiting payment');
        expect(formatInvoiceStatus('PAID')).to.equal('Paid');
        expect(formatInvoiceStatus('DELETED')).to.equal('Deleted');
    });

    it('should throw if given an unexpected input', function() {
        expect(() => formatInvoiceStatus(null)).to.throw('Unsupported invoice status: null');
        expect(() => formatInvoiceStatus()).to.throw('Unsupported invoice status: undefined');
        expect(() => formatInvoiceStatus(1)).to.throw('Unsupported invoice status: 1');
    });
});
