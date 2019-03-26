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
};

export default money;
