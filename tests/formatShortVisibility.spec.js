const chai = require('chai');
const expect = chai.expect;

const formatShortVisibility = require('../dist/test-bundle.js').formatShortVisibility;

describe('formatShortVisibility', function() {
    it('should return correct visibilities', function() {
        expect(formatShortVisibility('PUBLIC')).to.equal('Public');
        expect(formatShortVisibility('PRIVATE_TO_REPORTER')).to.equal('Private');
        expect(formatShortVisibility('INTERNAL_TO_TEAM')).to.equal('Internal');
    });

    it('should throw if given an unexpected input', function() {
        expect(() => formatShortVisibility(null)).to.throw('Unsupported visibility: null');
        expect(() => formatShortVisibility()).to.throw('Unsupported visibility: undefined');
        expect(() => formatShortVisibility(1)).to.throw('Unsupported visibility: 1');
    });
});
