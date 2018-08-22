import {LocalTime} from 'local-date-time';

function formatLocalTime(localTime) {
    localTime = LocalTime.of(localTime);

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();

    if (hours === 24 && minutes === 0) {
        return 'midnight';
    }

    let formattedHours;
    let suffix;
    if (hours === 0) {
        formattedHours = '12';
        suffix = 'am';
    } else if (hours < 12) {
        formattedHours = hours;
        suffix = 'am';
    } else if (hours === 12) {
        formattedHours = 12;
        suffix = 'pm';
    } else {
        formattedHours = hours - 12;
        suffix = 'pm';
    }

    let formattedMinutes;
    if (minutes === 0) {
        formattedMinutes = '00';
    } else if (minutes < 10) {
        formattedMinutes = '0' + minutes;
    } else {
        formattedMinutes = minutes;
    }

    return `${formattedHours}:${formattedMinutes}${suffix}`;
}

export default formatLocalTime;

