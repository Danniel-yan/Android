export default function(datestr) {
  let dateAndTime = datestr.split(' ');

  let dateParts = dateAndTime[0].split('-');
  let timeParts = dateAndTime[1].split(':');

  let date = new Date();

  date.setFullYear(dateParts[0]);
  date.setMonth(dateParts[1] - 1);
  date.setDate(dateParts[2]);

  date.setHours(timeParts[0]);
  date.setMinutes(timeParts[1]);
  date.setSeconds(timeParts[2]);

  return date;
}
