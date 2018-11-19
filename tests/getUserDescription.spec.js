const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').getUserDescription;

describe('getUserDescription', function() {
    it('should return name, email and phone if all present', function() {
        const user = {
            name: 'Bob',
            email: 'bob@example.test',
            phoneNumber: '+44123',
        };
        expect(method(user)).to.equal('Bob (bob@example.test, phone +44123)');
    });

    it('should return name and email if both present', function() {
        const user = {
            name: 'Bob',
            email: 'bob@example.test',
        };
        expect(method(user)).to.equal('Bob (bob@example.test)');
    });

    it('should return name and phone number if both present', function() {
        const user = {
            name: 'Bob',
            phoneNumber: '+44123',
        };
        expect(method(user)).to.equal('Bob (phone +44123)');
    });

    it('should return email and phone number if both present', function() {
        const user = {
            email: 'bob@example.test',
            phoneNumber: '+44123',
        };
        expect(method(user)).to.equal('bob@example.test (phone +44123)');
    });

    it('should return email if only that is present', function() {
        const user = {
            email: 'bob@example.test',
        };
        expect(method(user)).to.equal('bob@example.test');
    });

    it('should return name if only that is present', function() {
        const user = {
            name: 'Bob',
        };
        expect(method(user)).to.equal('Bob');
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
