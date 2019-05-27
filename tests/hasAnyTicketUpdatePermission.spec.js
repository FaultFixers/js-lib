const chai = require('chai');
const expect = chai.expect;

const hasAnyTicketUpdatePermission = require('../dist/test-bundle.js').hasAnyTicketUpdatePermission;

describe('hasAnyTicketUpdatePermission', function() {
    function expectTrue(...permissions) {
        expect(hasAnyTicketUpdatePermission(permissions)).to.equal(true);
    }

    function expectFalse(...permissions) {
        expect(hasAnyTicketUpdatePermission(permissions)).to.equal(false);
    }

    it('should return true for UPDATE_TICKETS_PUBLIC_COMMENT', function() {
        expectTrue('UPDATE_TICKETS_PUBLIC_COMMENT');
    });

    it('should return true for UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT', function() {
        expectTrue('UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT');
    });

    it('should return true for UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT', function() {
        expectTrue('UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT');
    });

    it('should return true for UPDATE_TICKETS_STATUS', function() {
        expectTrue('UPDATE_TICKETS_STATUS');
    });

    it('should return true for UPDATE_TICKETS_INTERNAL_ACTION', function() {
        expectTrue('UPDATE_TICKETS_INTERNAL_ACTION');
    });

    it('should return true for DELETE_TICKETS', function() {
        expectTrue('DELETE_TICKETS');
    });

    it('should return true for ASSIGN_TICKETS', function() {
        expectTrue('ASSIGN_TICKETS');
    });

    it('should return false for other permissions', function() {
        expectFalse('VIEW_ACCOUNTS');
        expectFalse('VIEW_ACCOUNTS', 'UPDATE_ACCOUNTS');
    });
});
