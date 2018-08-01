const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').getShortUserDescription;

describe('getShortUserDescription', function() {
    it('should return name if name and email present', function() {
        const user = {
            name: 'Bob',
            email: 'bob@example.test',
        };
        expect(method(user)).to.equal('Bob');
    });

    it('should return name if name is present without email', function() {
        const user = {
            name: 'Bob',
        };
        expect(method(user)).to.equal('Bob');
    });

    it('should return email if email is present without name', function() {
        const user = {
            name: '',
            email: 'bob@example.test',
        };
        expect(method(user)).to.equal('bob@example.test');
    });

    it('should have a fallback if neither name/email are present', function() {
        const user = {
            name: '',
            email: '',
        };
        expect(method(user)).to.equal('name/email unknown');
    });

    it('should return "-" if not given an object', function() {
        expect(method('')).to.equal('-');
        expect(method(' ')).to.equal('-');
        expect(method()).to.equal('-');
        expect(method(null)).to.equal('-');
        expect(method(false)).to.equal('-');
    });
});
