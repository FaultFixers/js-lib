const chai = require('chai');
const expect = chai.expect;

const coreColors = require('../dist/test-bundle.js').coreColors;

describe('coreColors', function() {
    it('should have the colors', function() {
        expect(coreColors.blue).to.equal('#4463f7');
        expect(Object.keys(coreColors).length).to.equal(4);
    });
});
