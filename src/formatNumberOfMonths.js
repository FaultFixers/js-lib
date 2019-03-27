function formatNumberOfMonths(months) {
    if (typeof months !== 'number') {
        return '-';
    }

    if (months === 0) {
        return 'Zero';
    }

    const years = Math.floor(months / 12);
    const yearsFormatted = years === 1 ? '1 year' : years + ' years';

    const remainingMonths = months - (years * 12);
    const remainingMonthsFormatted = remainingMonths === 1 ? '1 month' : remainingMonths + ' months';

    if (years === 0) {
        return remainingMonthsFormatted;
    } else if (remainingMonths === 0) {
        return yearsFormatted;
    } else {
        return yearsFormatted + ', ' + remainingMonthsFormatted;
    }
}

export default formatNumberOfMonths;
