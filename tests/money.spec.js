const chai = require('chai');
const expect = chai.expect;

const money = require('../dist/test-bundle.js').money;

describe('money', function() {
    describe('isValidAmountFromApi', function() {
        function expectResult(input, output) {
            expect(money.isValidAmountFromApi(input)).to.eq(output);
        }

        it('should return true for a string of numbers', function() {
            expectResult('0', true);
            expectResult('1234', true);
        });

        it('should return true for an integer', function() {
            expectResult(0, true);
            expectResult(1234, true);
        });

        it('should return false for a string containing a decimal', function() {
            expectResult('0.1', false);
            expectResult('12.34', false);
        });

        it('should return false for a decimal', function() {
            expectResult(0.1, false);
            expectResult(12.34, false);
        });

        it('should return false for other unsupported inputs', function() {
            expectResult(null, false);
            expectResult(undefined, false);
            expectResult({}, false);
            expectResult([], false);
            expectResult(true, false);
            expectResult(false, false);
        });
    });

    describe('convertApiValueToBigDenominator', function() {
        function expectResult(input, output) {
            expect(money.convertApiValueToBigDenominator(input)).to.eq(output);
        }

        function expectToThrow(input) {
            expect(() => money.convertApiValueToBigDenominator(input))
                .to.throw('Amount given must pass isValidAmountFromApi() but does not: ' + input);
        }

        it('should convert a string of numbers', function() {
            expectResult('0', 0);
            expectResult('100', 1);
            expectResult('1234', 12.34);
        });

        it('should convert an integer', function() {
            expectResult(0, 0);
            expectResult(100, 1);
            expectResult(1234, 12.34);
        });

        it('should throw if given invalid input', function() {
            expectToThrow('0.1');
            expectToThrow('12.34');
            expectToThrow(0.1);
            expectToThrow(12.34);
            expectToThrow(null);
            expectToThrow(undefined);
            expectToThrow({});
            expectToThrow([]);
            expectToThrow(true);
            expectToThrow(false);
        });
    });

    describe('isValidLocalAmountToSendToApi', function() {
        function expectResult(input, output) {
            expect(money.isValidLocalAmountToSendToApi(input)).to.eq(output);
        }

        it('should return true for a string of numbers with up to 2 decimal places', function() {
            expectResult('0', true);
            expectResult('1234', true);
            expectResult('1234.0', true);
            expectResult('1234.1', true);
            expectResult('1234.00', true);
            expectResult('1234.12', true);
        });

        it('should return true for an integer', function() {
            expectResult(1234, true);
            expectResult(0, true);
        });

        it('should return true for a decimal', function() {
            expectResult(0, true);
            expectResult(1234, true);
            expectResult(1234.0, true);
            expectResult(1234.1, true);
            expectResult(1234.00, true);
            expectResult(1234.12, true);
            expectResult(1234.666666667, true);
        });

        it('should return false for a string with more than 3 decimal places', function() {
            expectResult('0.111', false);
            expectResult('12.345678', false);
        });

        it('should return false for other unsupported inputs', function() {
            expectResult(null, false);
            expectResult(undefined, false);
            expectResult({}, false);
            expectResult([], false);
            expectResult(true, false);
            expectResult(false, false);
        });
    });

    describe('convertLocalBigDenominatorToSendToApi', function() {
        function expectResult(input, output) {
            expect(money.convertLocalBigDenominatorToSendToApi(input)).to.eq(output);
        }

        function expectToThrow(input) {
            expect(() => money.convertLocalBigDenominatorToSendToApi(input))
                .to.throw('Amount given must pass isValidLocalAmountToSendToApi() but does not: ' + input);
        }

        it('should convert a string of numbers with up to 2 decimal places', function() {
            expectResult('0', 0);
            expectResult('0.00', 0);
            expectResult('1', 100);
            expectResult('1.23', 123);
            expectResult('1234.5', 123450);
            expectResult('1234.50', 123450);
        });

        it('should convert an integer', function() {
            expectResult(0, 0);
            expectResult(1, 100);
            expectResult(12.34, 1234);
        });

        it('should convert an decimal', function() {
            expectResult(0.0, 0);
            expectResult(1.23, 123);
            expectResult(21.66667, 2167);
        });

        it('should throw if given invalid input', function() {
            expectToThrow('0.123456');
            expectToThrow('12.3412');
            expectToThrow(null);
            expectToThrow(undefined);
            expectToThrow({});
            expectToThrow([]);
            expectToThrow(true);
            expectToThrow(false);
        });
    });
});
