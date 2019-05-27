const chai = require('chai');
const expect = chai.expect;

const formatFormTemplateStatus = require('../dist/test-bundle.js').formatFormTemplateStatus;

describe('formatFormTemplateStatus', function() {
    it('should return correct statuses', function() {
        expect(formatFormTemplateStatus('ACTIVE')).to.equal('Active');
        expect(formatFormTemplateStatus('INACTIVE')).to.equal('Inactive');
        expect(formatFormTemplateStatus('DELETED')).to.equal('Deleted');
    });

    it('should throw if given an unexpected input', function() {
        expect(() => formatFormTemplateStatus(null)).to.throw('Unsupported status: null');
        expect(() => formatFormTemplateStatus()).to.throw('Unsupported status: undefined');
        expect(() => formatFormTemplateStatus(1)).to.throw('Unsupported status: 1');
    });
});
