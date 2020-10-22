export default function weekSelected (today, week) {
    for (let day of week) {
        if (day.format('YYYYMMDD') === today.format('YYYYMMDD')) {
            return 'weekSelected';
        }
    }
    return 'week'
    /* return (week.toString().includes(today.toString())) ? 'weekSelected' : 'week'; */
}
