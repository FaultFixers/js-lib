const chai = require('chai');
const expect = chai.expect;

const hasAnyBillingPermission = require('../dist/test-bundle.js').hasAnyBillingPermission;

describe('hasAnyBillingPermission', function() {
    function expectTrue(...permissions) {
        expect(hasAnyBillingPermission(permissions)).to.equal(true);
    }

    function expectFalse(...permissions) {
        expect(hasAnyBillingPermission(permissions)).to.equal(false);
    }

    it('if should return true for BILLING_MANAGE_SETTINGS', function() {
        expectTrue('BILLING_MANAGE_SETTINGS');
    });

    it('if should return true for BILLING_MANAGE_RATE_CARD', function() {
        expectTrue('BILLING_MANAGE_RATE_CARD');
    });

    it('if should return true for BILLING_DRAFT_INVOICES', function() {
        expectTrue('BILLING_DRAFT_INVOICES');
    });

    it('if should return true for BILLING_SEND_INVOICES', function() {
        expectTrue('BILLING_SEND_INVOICES');
    });

    it('if should return false for other permissions', function() {
        expectFalse('VIEW_ACCOUNTS');
        expectFalse('VIEW_ACCOUNTS', 'UPDATE_ACCOUNTS');
    });
});
