const chai = require('chai');
const expect = chai.expect;

const getShade = require('../dist/test-bundle.js').getShade;

describe('getShade', function() {
    it('should return a darker color', function() {
        expect(getShade('#ff0000', 0)).to.equal('#ff0000');
        expect(getShade('#ff0000', 10)).to.equal('#e60000');
        expect(getShade('#ff0000', 100)).to.equal('#000000');
    });
});
