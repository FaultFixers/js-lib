const chai = require('chai');
const expect = chai.expect;

const getTint = require('../dist/test-bundle.js').getTint;

describe('getTint', function() {
    it('should return a lighter color', function() {
        expect(getTint('#ff0000', 0)).to.equal('#ff0000');
        expect(getTint('#ff0000', 10)).to.equal('#ff1919');
        expect(getTint('#ff0000', 100)).to.equal('#ffffff');
    });
});
