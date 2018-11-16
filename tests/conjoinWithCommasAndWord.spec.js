const chai = require('chai');
const expect = chai.expect;

const conjoinWithCommasAndWord = require('../dist/test-bundle.js').conjoinWithCommasAndWord;

describe('conjoinWithCommasAndWord', function() {
    it('should not conjoin arrays with one item', function() {
        expect(conjoinWithCommasAndWord(['Apple'], 'and')).to.equal('Apple');
    });

    it('should conjoin arrays with two items', function() {
        expect(conjoinWithCommasAndWord(['Apple', 'Banana'], 'and')).to.equal('Apple and Banana');
    });

    it('should conjoin arrays with three items', function() {
        expect(conjoinWithCommasAndWord(['Apple', 'Banana', 'Carrot'], 'and')).to.equal('Apple, Banana and Carrot');
    });
});
