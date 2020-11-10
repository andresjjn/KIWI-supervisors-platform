/**
 * Function that sort the hours list.
 * @param hours Hours to be sorted.
 */
export default function sortHours(hours) {
    const length = hours.length;
    for (let j = 0; j < length; j++) {
        hours.sort((a, b) => {
            if (a.hour > b.hour) {
                return 1;
            } else if (a.hour < b.hour) {
                return -1;
            }
            return 0;
        });
    }
}
