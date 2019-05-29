const chai = require('chai');
const expect = chai.expect;

const hasAnyInvoicingPermission = require('../dist/test-bundle.js').hasAnyInvoicingPermission;

describe('hasAnyInvoicingPermission', function() {
    function expectTrue(...permissions) {
        expect(hasAnyInvoicingPermission(permissions)).to.equal(true);
    }

    function expectFalse(...permissions) {
        expect(hasAnyInvoicingPermission(permissions)).to.equal(false);
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
