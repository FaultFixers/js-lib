const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatNumberOfMonths;

describe('formatNumberOfMonths', function() {
    function expectResult(input, output) {
        expect(method(input)).to.eq(output);
    }

    it('should format valid inputs as months and years', function() {
        expectResult(0, 'Zero');
        expectResult(1, '1 month');
        expectResult(2, '2 months');
        expectResult(11, '11 months');
        expectResult(12, '1 year');
        expectResult(13, '1 year, 1 month');
        expectResult(14, '1 year, 2 months');
        expectResult(23, '1 year, 11 months');
        expectResult(24, '2 years');
        expectResult(25, '2 years, 1 month');
        expectResult(26, '2 years, 2 months');
        expectResult(123, '10 years, 3 months');
    });

    it('should return a dash for invalid inputs', function() {
        expectResult(null, '-');
        expectResult(undefined, '-');
        expectResult({}, '-');
        expectResult([], '-');
        expectResult('foobar', '-');
        expectResult(false, '-');
        expectResult(true, '-');
    });
});
