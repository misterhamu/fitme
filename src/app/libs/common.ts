export const getDateFormat = (date: Date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
  return formattedDate;
};

export const border = [
  "border-red-200 border-r-red-500",
  "border-orange-200 border-r-orange-500",
  "border-green-200 border-r-green-500",
  "border-yellow-200 border-r-yellow-500",
  "border-blue-200 border-r-blue-500",
];
