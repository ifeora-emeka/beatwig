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

export const firebaseTimeStamp = ():Timestamp => {
    const now = new Date();
    return new Timestamp(now.getTime() / 1000, now.getMilliseconds() * 1000000);
}
