const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatLocalTime;
const LocalTime = require('local-date-time').LocalTime;

describe('formatLocalTime', function() {
    function expectResult(input, output) {
        expect(method(input).toString()).to.eq(output);
    }

    it('should format 00:00 as 12:00am', function() {
        expectResult('00:00', '12:00am');
    });

    it('should format 12:00 as 12:00pm', function() {
        expectResult('12:00', '12:00pm');
    });

    it('should format 24:00 as midnight', function() {
        expectResult('24:00', 'midnight');
    });

    it('should format other morning times', function() {
        expectResult('00:05', '12:05am');
        expectResult('00:30', '12:30am');
        expectResult('10:05', '10:05am');
        expectResult('10:30', '10:30am');
    });

    it('should format other afternoon times', function() {
        expectResult('12:05', '12:05pm');
        expectResult('12:30', '12:30pm');
        expectResult('18:05', '6:05pm');
        expectResult('18:30', '6:30pm');
    });
});
