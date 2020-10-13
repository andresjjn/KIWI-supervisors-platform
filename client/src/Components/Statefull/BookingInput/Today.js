import Moment from 'moment';


export default function isYesterday(day) {
    const now = Number(Moment().format('YYYYMMDD'));
    const today = Number(day);

    if (today < now) {
        return true;
    } else {
        return false;
    }
};
