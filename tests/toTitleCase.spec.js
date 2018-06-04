const chai = require('chai');
const expect = chai.expect;

const toTitleCase = require('../dist/test-bundle.js').toTitleCase;

describe('toTitleCase', function() {
    it('should transform the first letter in every word', function() {
        expect(toTitleCase('an hour ago')).to.equal('An Hour Ago');
        expect(toTitleCase('2 minutes ago')).to.equal('2 Minutes Ago');
    })

    it('should return null if given null/undefined', function() {
        expect(toTitleCase(null)).to.equal(null);
        expect(toTitleCase(undefined)).to.equal(null);
    });

    it('should throw if given a non-string', function() {
        expect(() => toTitleCase(2)).to.throw('Given a non-string: 2');
        expect(() => toTitleCase({})).to.throw('Given a non-string: [object Object]');
    });
});
