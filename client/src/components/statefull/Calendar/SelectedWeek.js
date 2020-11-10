/**
 * Function that returns the className for the selected week.
 * @param today Selected day
 * @param week Week to which the selected day belongs
 */
export default function weekSelected (today, week) {
    for (let day of week) {
        if (day.format('YYYYMMDD') === today.format('YYYYMMDD')) {
            return 'weekSelected';
        }
    }
    return 'week'
}
