const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').calculateDueRangeInMinutes;

const MINUTES_IN_A_DAY = 1440;

describe('calculateDueRangeInMinutes()', function() {
    function expectMinutes(output, params) {
        expect(method(params.startDate, params.startTime, params.endDate, params.endTime))
            .to.eq(output);
    }

    function expectToThrow(error, params) {
        expect(() => method(params.startDate, params.startTime, params.endDate, params.endTime))
            .to.throw(error);
    }

    it('should return zero if given identical start/end', function() {
        expectMinutes(0, {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-23',
            endTime: '12:00',
        });
    });

    it('should return the correct number of minutes given valid start/end date/times', function() {
        expectMinutes(1, {
            startDate: '2019-05-23',
            startTime: '09:05',
            endDate: '2019-05-23',
            endTime: '09:06',
        });
        expectMinutes(60, {
            startDate: '2019-05-23',
            startTime: '09:05',
            endDate: '2019-05-23',
            endTime: '10:05',
        });
        expectMinutes(120, {
            startDate: '2019-05-23',
            startTime: '09:05',
            endDate: '2019-05-23',
            endTime: '11:05',
        });
        expectMinutes(MINUTES_IN_A_DAY, {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-24',
            endTime: '12:00',
        });
        expectMinutes(MINUTES_IN_A_DAY * 1.5, {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-24',
            endTime: '24:00',
        });
        expectMinutes(MINUTES_IN_A_DAY * 7.5, {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-30',
            endTime: '24:00',
        });
        expectMinutes(MINUTES_IN_A_DAY * 366 + 2, {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2020-05-23',
            endTime: '12:02',
        });
    });

    it('should throw if any argument is not a string', function() {
        expectToThrow('calculateDueRangeInMinutes must be given exactly 4 strings', {
            startDate: '2019-05-23',
            startTime: null,
            endDate: '2019-05-23',
            endTime: null,
        });
    });

    it('should throw if the end is before the start', function() {
        expectToThrow('Start must be before end', {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-23',
            endTime: '11:59',
        });
    });
});
