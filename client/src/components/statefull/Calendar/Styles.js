function isSelected(day, value) {
    return value.isSame(day, 'day');
}

export function beforeToday(day) {
    return day.isBefore(new Date(), 'day');
}

function isToday(day) {
    return day.isSame(new Date(), 'day');
}

export default function dayStyles(day, value) {
    const ret = (beforeToday(day) && isSelected(day, value)) ? 'before selected' :
                (beforeToday(day)) ? 'before' :
                (isSelected(day, value)) ? 'selected' :
                (isToday(day)) ? 'today' : '';
    return ret;
}
