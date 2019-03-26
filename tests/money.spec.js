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

    describe('format', function() {
        function expectResult(currency, amount, output) {
            expect(money.format(currency, amount)).to.eq(output);
        }

        it('should format GBP (British pound sterling)', function() {
            expectResult('GBP', 0, '£0');
            expectResult('GBP', '0', '£0');
            expectResult('GBP', 1, '£0.01');
            expectResult('GBP', '1', '£0.01');
            expectResult('GBP', 50, '£0.50');
            expectResult('GBP', '50', '£0.50');
            expectResult('GBP', 100, '£1');
            expectResult('GBP', '100', '£1');
            expectResult('GBP', 2133, '£21.33');
            expectResult('GBP', '2133', '£21.33');
            expectResult('GBP', 10005, '£100.05');
            expectResult('GBP', '10005', '£100.05');
            expectResult('GBP', 200000, '£2000');
        });

        it('should format USD (US dollars)', function() {
            expectResult('USD', 0, '$0');
            expectResult('USD', '0', '$0');
            expectResult('USD', 1, '$0.01');
            expectResult('USD', '1', '$0.01');
            expectResult('USD', 50, '$0.50');
            expectResult('USD', '50', '$0.50');
            expectResult('USD', 100, '$1');
            expectResult('USD', '100', '$1');
            expectResult('USD', 2133, '$21.33');
            expectResult('USD', '2133', '$21.33');
            expectResult('USD', 10005, '$100.05');
            expectResult('USD', '10005', '$100.05');
            expectResult('USD', 200000, '$2000');
        });

        it('should format EUR (euros)', function() {
            expectResult('EUR', 0, '€0');
            expectResult('EUR', '0', '€0');
            expectResult('EUR', 1, '€0.01');
            expectResult('EUR', '1', '€0.01');
            expectResult('EUR', 50, '€0.50');
            expectResult('EUR', '50', '€0.50');
            expectResult('EUR', 100, '€1');
            expectResult('EUR', '100', '€1');
            expectResult('EUR', 2133, '€21.33');
            expectResult('EUR', '2133', '€21.33');
            expectResult('EUR', 10005, '€100.05');
            expectResult('EUR', '10005', '€100.05');
            expectResult('EUR', 200000, '€2000');
        });

        it('should format INR (Indian rupees)', function() {
            expectResult('INR', 0, '₹0');
            expectResult('INR', '0', '₹0');
            expectResult('INR', 1, '₹0.01');
            expectResult('INR', '1', '₹0.01');
            expectResult('INR', 50, '₹0.50');
            expectResult('INR', '50', '₹0.50');
            expectResult('INR', 100, '₹1');
            expectResult('INR', '100', '₹1');
            expectResult('INR', 2133, '₹21.33');
            expectResult('INR', '2133', '₹21.33');
            expectResult('INR', 10005, '₹100.05');
            expectResult('INR', '10005', '₹100.05');
            expectResult('INR', 200000, '₹2000');
        });

        it('should format TZS (Tanzanian shillings)', function() {
            expectResult('TZS', 0, '0 TSh');
            expectResult('TZS', '0', '0 TSh');
            expectResult('TZS', 1, '0.01 TSh');
            expectResult('TZS', '1', '0.01 TSh');
            expectResult('TZS', 50, '0.50 TSh');
            expectResult('TZS', '50', '0.50 TSh');
            expectResult('TZS', 100, '1 TSh');
            expectResult('TZS', '100', '1 TSh');
            expectResult('TZS', 2133, '21.33 TSh');
            expectResult('TZS', '2133', '21.33 TSh');
            expectResult('TZS', 10005, '100.05 TSh');
            expectResult('TZS', '10005', '100.05 TSh');
            expectResult('TZS', 200000, '2000 TSh');
        });

        it('should throw if given an invalid currency format', function() {
            function expectCurrencyToThrow(currency) {
                expect(() => money.format(currency, 100))
                    .to.throw('Currency must be a 3-letter code, but got: ' + currency);
            }

            expectCurrencyToThrow('AB');
            expectCurrencyToThrow('ABCD');
            expectCurrencyToThrow('10');
            expectCurrencyToThrow(10);
            expectCurrencyToThrow(null);
            expectCurrencyToThrow(undefined);
            expectCurrencyToThrow({});
            expectCurrencyToThrow([]);
            expectCurrencyToThrow(true);
            expectCurrencyToThrow(false);
        });

        it('should throw if given an unsupported currency', function() {
            expect(() => money.format('ZZZ', 100))
                .to.throw('Unsupported currency: ZZZ');
        });

        it('should throw if given an invalid amount', function() {
            function expectAmountToThrow(amount) {
                expect(() => money.format('GBP', amount))
                    .to.throw('Amount given must pass isValidAmountFromApi() but does not: ' + amount);
            }

            expectAmountToThrow('0.123456');
            expectAmountToThrow('12.3412');
            expectAmountToThrow(null);
            expectAmountToThrow(undefined);
            expectAmountToThrow({});
            expectAmountToThrow([]);
            expectAmountToThrow(true);
            expectAmountToThrow(false);
        });
    });
});
