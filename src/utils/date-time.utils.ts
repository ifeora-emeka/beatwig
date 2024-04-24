import moment from 'moment-timezone';
import { Timestamp } from "@firebase/firestore";

export const formatMatchDate = (dateString: string): string => {
    const date = moment(dateString, 'DD.MM.YYYY');
    return date.format('Do MMMM YYYY');
};

export const format24HourTime = (timeString: string): string => {
    const time = moment(timeString, 'HH:mm');
    return time.format('HH:mmA');
};

export const firebaseTimeStamp = (fromNow?: number): Timestamp => {
    const now = new Date();

    if (typeof fromNow === 'number') {
        now.setDate(now.getDate() + fromNow);
    }

    return new Timestamp(Math.floor(now.getTime() / 1000), now.getMilliseconds() * 1000000);
};