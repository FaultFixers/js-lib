const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatDueRange;

describe('formatDueRange()', function() {
    function expectResult(output, params) {
        expect(method(params.startDate, params.startTime, params.endDate, params.endTime))
            .to.eq(output);
    }

    function expectToThrow(error, params) {
        expect(() => method(params.startDate, params.startTime, params.endDate, params.endTime))
            .to.throw(error);
    }

    it('given matching dates and no times', function() {
        expectResult('23 May 2019', {
            startDate: '2019-05-23',
            endDate: '2019-05-23',
        });
    });

    it('given matching dates and differing times', function() {
        expectResult('23 May 2019, 9:05am-8:30pm', {
            startDate: '2019-05-23',
            startTime: '09:05',
            endDate: '2019-05-23',
            endTime: '20:30',
        });
    });

    it('given differing dates and differing times', function() {
        expectResult('23 May 2019, 9:05am to 30 May 2019, 8:30pm', {
            startDate: '2019-05-23',
            startTime: '09:05',
            endDate: '2019-05-30',
            endTime: '20:30',
        });
    });

    it('given differing dates and no times', function() {
        expectResult('23 May 2019 to 30 May 2019', {
            startDate: '2019-05-23',
            endDate: '2019-05-30',
        });
    });

    it('should throw when given a start date but no end date', function() {
        expectToThrow('If a start date is given, an end date must also be given', {
            startDate: '2019-05-23',
        });
    });

    it('should throw when given a start date but no end date', function() {
        expectToThrow('If a start time is given, an end time must also be given', {
            startDate: '2019-05-23',
            startTime: '12:00',
            endDate: '2019-05-23',
        });
    });
});
