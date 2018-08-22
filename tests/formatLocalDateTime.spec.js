const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatLocalDateTime;
const LocalDate = require('local-date-time').LocalDate;
const LocalTime = require('local-date-time').LocalTime;

describe('formatLocalDateTime', function() {
    function expectResult(date, time, output) {
        expect(method(date, time).toString()).to.eq(output);
    }

    it('should format dates', function() {
        expectResult('2018-05-01', '12:05', '1 May 2018, 12:05pm');
        expectResult('2018-05-23', undefined, '23 May 2018');
        expectResult('2018-05-23', null, '23 May 2018');
    });
});
