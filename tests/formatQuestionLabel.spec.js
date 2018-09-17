const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').formatQuestionLabel;

describe('formatQuestionLabel', function() {
    it('should append a colon by default', function() {
        expect(method('Choose A Thing')).to.equal('Choose A Thing:');
    });

    it('should not append a colon if the question ends with a question mark', function() {
        expect(method('Are You Human?')).to.equal('Are You Human?');
    });

    it('should not append a colon if the question ends with a colon already', function() {
        expect(method('Choose A Thing:')).to.equal('Choose A Thing:');
    });
});
