const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatTicketUpdateNewDueRange;

describe('formatTicketUpdateNewDueRange()', function() {
    function expectResult(output, update) {
        expect(method(update)).to.eq(output);
    }

    it('should format the new due range if set', function() {
        expectResult('23 May 2019, 5:00pm-6:00pm', {
            newStartDate: '2019-05-23',
            newStartTime: '17:00',
            newEndDate: '2019-05-23',
            newEndTime: '18:00',
        });
    });

    it('should return a dash if not set', function() {
        expectResult('-', {
        });
    });
});
