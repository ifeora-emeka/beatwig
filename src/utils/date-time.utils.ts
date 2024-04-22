import moment from 'moment-timezone';

export const formatMatchDate = (dateString: string): string => {
    // Parse the input date string using Moment.js
    const date = moment(dateString, 'DD.MM.YYYY');

    // Format the date with the desired output format
    const formattedDate = date.format('Do MMMM YYYY');

    return formattedDate;
};

export const format24HourTime = (timeString: string): string => {
    // Parse the input time string using Moment.js
    const time = moment(timeString, 'HH:mm');

    // Format the time with the desired output format
    const formattedTime = time.format('HH:mmA');

    return formattedTime;
};
