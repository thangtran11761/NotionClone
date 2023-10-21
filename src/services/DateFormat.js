export function dateFormat(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return "" + year + month + day + hours + minutes + seconds;
}

export function spreadDate(date) {
  let year = date?.slice(0, 4);
  let month = date?.slice(4, 6);
  let day = date?.slice(6, 8);

  return `${day}-${month}-${year}`;
}

export const convertStringToDateTime = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(4, 6);
  const day = string.slice(6, 8);
  const hour = string.slice(8, 10);
  const minute = string.slice(10, 12);
  const second = string.slice(12, 14);

  return new Date(year, month - 1, day, hour, minute, second);
};
