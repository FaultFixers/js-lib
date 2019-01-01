const chai = require('chai');
const expect = chai.expect;

const formatFormInstanceStatus = require('../dist/test-bundle.js').formatFormInstanceStatus;

describe('formatFormInstanceStatus', function() {
    it('if should return correct statuses', function() {
        expect(formatFormInstanceStatus('NEW')).to.equal('New');
        expect(formatFormInstanceStatus('IN_PROGRESS')).to.equal('In progress');
        expect(formatFormInstanceStatus('COMPLETED')).to.equal('Completed');
        expect(formatFormInstanceStatus('DELETED')).to.equal('Deleted');
    });

    it('if should throw if given an unexpected input', function() {
        expect(() => formatFormInstanceStatus(null)).to.throw('Unsupported status: null');
        expect(() => formatFormInstanceStatus()).to.throw('Unsupported status: undefined');
        expect(() => formatFormInstanceStatus(1)).to.throw('Unsupported status: 1');
    });
});
