const chai = require('chai');
const expect = chai.expect;

const formatAssetWarrantyStatus = require('../dist/test-bundle.js').formatAssetWarrantyStatus;

describe('formatAssetWarrantyStatus', function() {
    it('should return correct statuses', function() {
        expect(formatAssetWarrantyStatus('UNKNOWN')).to.equal('Unknown');
        expect(formatAssetWarrantyStatus('NONE')).to.equal('No warranty');
        expect(formatAssetWarrantyStatus('ACTIVE')).to.equal('Active');
        expect(formatAssetWarrantyStatus('EXPIRED')).to.equal('Expired');
    });

    it('should throw if given an unexpected input', function() {
        expect(() => formatAssetWarrantyStatus(null)).to.throw('Unsupported asset warranty status: null');
        expect(() => formatAssetWarrantyStatus()).to.throw('Unsupported asset warranty status: undefined');
        expect(() => formatAssetWarrantyStatus(1)).to.throw('Unsupported asset warranty status: 1');
    });
});
