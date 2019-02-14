const chai = require('chai');
const expect = chai.expect;

const formatUserStatus = require('../dist/test-bundle.js').formatUserStatus;

describe('formatUserStatus', function() {
    it('if should return correct statuses', function() {
        expect(formatUserStatus('ACTIVE')).to.equal('Active');
        expect(formatUserStatus('DEACTIVATED')).to.equal('Deactivated');
        expect(formatUserStatus('INVITED')).to.equal('Invited');
        expect(formatUserStatus('BANNED')).to.equal('Banned');
    });

    it('if should throw if given an unexpected input', function() {
        expect(() => formatUserStatus(null)).to.throw('Unsupported user status: null');
        expect(() => formatUserStatus()).to.throw('Unsupported user status: undefined');
        expect(() => formatUserStatus(1)).to.throw('Unsupported user status: 1');
    });
});
