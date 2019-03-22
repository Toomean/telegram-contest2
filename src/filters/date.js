
const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMonthDay = (ms) => {
  const date = new Date(ms);
  const month = monthNames[date.getMonth()];
  const dateNum = date.getDate();

  return `${month} ${dateNum}`;
};

export const getWeekdayMonthDay = (ms) => {
  const date = new Date(ms);
  const day = weekDays[date.getDay()];
  const month = monthNames[date.getMonth()];
  const dateNum = date.getDate();

  return `${day}, ${month} ${dateNum}`;
};
