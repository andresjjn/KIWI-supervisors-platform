import { calendarFormat } from "moment";

export default function buildCalendar(value) {
    //Reference for first day of the month (square draw)
    const startDay = value.clone().startOf('month').startOf('week');
    //Reference for the last day of the month (square draw)
    const endDay = value.clone().endOf('month').endOf('week');

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