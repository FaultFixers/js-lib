const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatLocalDate;
const LocalDate = require('local-date-time').LocalDate;

describe('formatLocalDate', function() {
    function expectResult(input, output) {
        expect(method(input).toString()).to.eq(output);
    }

    it('should format dates', function() {
        expectResult('2018-05-01', '1 May 2018');
        expectResult('2018-05-23', '23 May 2018');
    });
});
