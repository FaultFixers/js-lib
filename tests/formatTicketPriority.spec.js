const chai = require('chai');
const expect = chai.expect;

const formatTicketPriority = require('../dist/test-bundle.js').formatTicketPriority;

describe('formatTicketPriority', function() {
    it('if should return correct priorities', function() {
        expect(formatTicketPriority('LOW')).to.equal('Low');
        expect(formatTicketPriority('MEDIUM')).to.equal('Medium');
        expect(formatTicketPriority('HIGH')).to.equal('High');
    });

    it('if should throw if given an unexpected input', function() {
        expect(() => formatTicketPriority(null)).to.throw('Unsupported priority: null');
        expect(() => formatTicketPriority()).to.throw('Unsupported priority: undefined');
        expect(() => formatTicketPriority(1)).to.throw('Unsupported priority: 1');
    });
});
