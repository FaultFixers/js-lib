const chai = require('chai');
const expect = chai.expect;

const hasAnyBillingOrInvoicingPermission = require('../dist/test-bundle.js').hasAnyBillingOrInvoicingPermission;

describe('hasAnyBillingOrInvoicingPermission', function() {
    function expectTrue(...permissions) {
        expect(hasAnyBillingOrInvoicingPermission(permissions)).to.equal(true);
    }

    function expectFalse(...permissions) {
        expect(hasAnyBillingOrInvoicingPermission(permissions)).to.equal(false);
    }

    it('should return true for BILLING_MANAGE_SETTINGS', function() {
        expectTrue('BILLING_MANAGE_SETTINGS');
    });

    it('should return true for BILLING_MANAGE_RATE_CARD', function() {
        expectTrue('BILLING_MANAGE_RATE_CARD');
    });

    it('should return true for BILLING_DRAFT_INVOICES', function() {
        expectTrue('BILLING_DRAFT_INVOICES');
    });

    it('should return true for BILLING_SEND_INVOICES', function() {
        expectTrue('BILLING_SEND_INVOICES');
    });

    it('should return false for other permissions', function() {
        expectFalse('VIEW_ACCOUNTS');
        expectFalse('VIEW_ACCOUNTS', 'UPDATE_ACCOUNTS');
    });
});
