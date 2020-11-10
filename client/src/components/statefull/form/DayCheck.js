import Moment from 'moment';


/**
 * Function that returns true if day is yesterday and true if it is not yesterday
 * @param day day button info.
 */
export default function isYesterday(day) {
    const now = Number(Moment().format('YYYYMMDD'));
    const today = Number(day);

    if (today < now) {
        return true;
    } else {
        return false;
    }
}
