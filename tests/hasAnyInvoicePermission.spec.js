const chai = require('chai');
const expect = chai.expect;

const hasAnyInvoicePermission = require('../dist/test-bundle.js').hasAnyInvoicePermission;

describe('hasAnyInvoicePermission', function() {
    function expectTrue(...permissions) {
        expect(hasAnyInvoicePermission(permissions)).to.equal(true);
    }

    function expectFalse(...permissions) {
        expect(hasAnyInvoicePermission(permissions)).to.equal(false);
    }

    it('should return true for BILLING_DRAFT_INVOICES', function() {
        expectTrue('BILLING_DRAFT_INVOICES');
    });

    it('should return true for BILLING_SEND_INVOICES', function() {
        expectTrue('BILLING_SEND_INVOICES');
    });

    it('should return false for other permissions', function() {
        expectFalse('BILLING_MANAGE_SETTINGS');
        expectFalse('BILLING_MANAGE_RATE_CARD');
        expectFalse('VIEW_ACCOUNTS');
        expectFalse('VIEW_ACCOUNTS', 'UPDATE_ACCOUNTS');
    });
});
