export default function buildCalendar(value) {
    const startDay = value.clone().startOf('Month').startOf('isoWeek');
    const endDay = value.clone().endOf('Month').endOf('isoWeek');
    const calendar = [];
    const day = startDay.clone().subtract(1, 'day');

    while (day.isBefore(endDay, 'day')) {
        calendar.push(
            Array(7)
                .fill(0)
                .map(() => day.add(1, 'day').clone())
        );
    }
    return calendar;
}
