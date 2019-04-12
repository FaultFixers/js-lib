const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatTicketUpdateOldDueRange;

describe('formatTicketUpdateOldDueRange()', function() {
    function expectResult(output, update) {
        expect(method(update)).to.eq(output);
    }

    it('should format the old due range if set', function() {
        expectResult('23 May 2019, 5:00pm-6:00pm', {
            oldStartDate: '2019-05-23',
            oldStartTime: '17:00',
            oldEndDate: '2019-05-23',
            oldEndTime: '18:00',
        });
    });

    it('should return a dash if not set', function() {
        expectResult('-', {
        });
    });
});
