const chai = require('chai');
const expect = chai.expect;

const formatAssetStatus = require('../dist/test-bundle.js').formatAssetStatus;

describe('formatAssetStatus', function() {
    it('should return correct statuses', function() {
        expect(formatAssetStatus('IN_USE')).to.equal('In use');
        expect(formatAssetStatus('NOT_IN_USE')).to.equal('Not in use');
        expect(formatAssetStatus('DELETED')).to.equal('Deleted');
    });

    it('should throw if given an unexpected input', function() {
        expect(() => formatAssetStatus(null)).to.throw('Unsupported asset status: null');
        expect(() => formatAssetStatus()).to.throw('Unsupported asset status: undefined');
        expect(() => formatAssetStatus(1)).to.throw('Unsupported asset status: 1');
    });
});
