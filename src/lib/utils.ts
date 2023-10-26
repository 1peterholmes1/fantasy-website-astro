
export const stringDate = (d: Date) => {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours() % 12}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}${d.getHours() / 12 >= 1 ? "PM" : "AM"}`;
}

export const parseDate = (rawDate: string) => {
  const ts = Date.parse(rawDate);
  const d = new Date(ts);
  return stringDate(d);
}

export const fetchAndGetBody = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
}
