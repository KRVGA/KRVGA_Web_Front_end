export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const dateToString = (dateTime) => {
  // return dateString;
  const inputDate = dateTime;
  const date = new Date(inputDate);

  // Get the month, day, and year components
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month since it's zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  // Create the mm/dd/yyyy formatted string
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};
