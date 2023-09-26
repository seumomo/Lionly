function getDateTime(dateTime) {
  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(5, 7);
  let day = dateTime.slice(8, 10);

  let hour = dateTime.slice(11, 13);
  const minute = dateTime.slice(14, 16);

  hour = Number(hour) + 9;

  if (hour > 24) {
    day = Number(day) + 1;
    hour -= 24;
    hour < 10 ? (hour = '0' + hour) : hour;
  }

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export default getDateTime;
