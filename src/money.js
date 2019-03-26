const VALID_AMOUNT_STRING_FROM_API = /^\d+$/;
const VALID_AMOUNT_STRING_FROM_LOCAL = /^\d+(\.\d{0,2})?$/;

const money = {
    isValidAmountFromApi(amount) {
        if (typeof amount === 'string' && VALID_AMOUNT_STRING_FROM_API.test(amount)) {
            return true;
        } else if (typeof amount === 'number' && amount.toString().indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    },

    convertApiValueToBigDenominator(amount) {
        if (typeof amount === 'string' && VALID_AMOUNT_STRING_FROM_API.test(amount)) {
            return Number(Number(amount) / 100);
        } else if (typeof amount === 'number' && amount.toString().indexOf('.') === -1) {
            if (amount === 0) {
                return 0;
            } else {
                return amount / 100;
            }
        } else {
            throw new Error('Amount given must pass isValidAmountFromApi() but does not: ' + amount);
        }
    },

    isValidLocalAmountToSendToApi(amount) {
        if (typeof amount === 'string' && VALID_AMOUNT_STRING_FROM_LOCAL.test(amount)) {
            return true;
        } else if (typeof amount === 'number') {
            return true;
        } else {
            return false;
        }
    },

    convertLocalBigDenominatorToSendToApi(amount) {
        if (typeof amount === 'string' && VALID_AMOUNT_STRING_FROM_LOCAL.test(amount)) {
            return Math.round(Number(amount) * 100);
        } else if (typeof amount === 'number') {
            return Math.round(amount * 100);
        } else {
            throw new Error('Amount given must pass isValidLocalAmountToSendToApi() but does not: ' + amount);
        }
    },

    /**
     * @param {String} currency For example GBP.
     * @param {Number} amount For example 100 (for 100 pence).
     * @return {String} For example £1. Any trailing '.00' is removed.
     */
    format(currency, amount) {
        if (typeof currency !== 'string' || currency.length !== 3) {
            throw new Error('Currency must be a 3-letter code, but got: ' + currency);
        }
        if (!money.isValidAmountFromApi(amount)) {
            throw new Error('Amount given must pass isValidAmountFromApi() but does not: ' + amount);
        }

        const bigDenominator = money.convertApiValueToBigDenominator(amount).toFixed(2).replace('.00', '');
        switch (currency) {
            case 'GBP':
                return '£' + bigDenominator;
            case 'USD':
                return '$' + bigDenominator;
            case 'EUR':
                return '€' + bigDenominator;
            case 'INR':
                return '₹' + bigDenominator;
            case 'TZS':
                return bigDenominator + ' TSh';
            default:
                throw new Error('Unsupported currency: ' + currency);
        }
    },
};

export default money;
