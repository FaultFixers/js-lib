const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatTicketDueRange;

describe('formatTicketDueRange()', function() {
    function expectResult(output, ticket) {
        expect(method(ticket)).to.eq(output);
    }

    it('should format the due range if set', function() {
        expectResult('23 May 2019, 5:00pm-6:00pm', {
            isDueSet: true,
            startDate: '2019-05-23',
            startTime: '17:00',
            endDate: '2019-05-23',
            endTime: '18:00',
        });
    });

    it('should return a dash if not set', function() {
        expectResult('-', {
            isDueSet: false,
        });
    });
});
