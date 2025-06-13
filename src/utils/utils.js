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

export const getMembershipType = (membershipItem) => {
  if (
    membershipItem.life_membership_qty > 0 &&
    !membershipItem.is_membership_bundle
  ) {
    return 'Life';
  }
  if (
    membershipItem.is_membership_bundle &&
    membershipItem.life_membership_qty > 0
  ) {
    return 'Life + Spouse';
  }
  if (membershipItem.is_membership_bundle) {
    return 'Annual + Spouse';
  }

  if (
    !membershipItem.is_membership_bundle &&
    membershipItem.annual_membership_qty > 0
  ) {
    return 'Annual';
  }
};

export const exportToCSV = (data, filename) => {
  data.sort((a, b) => new Date(b.UPDATED) - new Date(a.UPDATED));

  const formattedData = data.map((record) => {
    return {
      ...record,
      CREATED: new Date(record.CREATED).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      UPDATED: new Date(record.UPDATED).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    };
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' + convertArrayToCSV(formattedData);
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
};

const convertArrayToCSV = (array) => {
  const header = Object.keys(array[0]).join(',');
  const rows = array.map((obj) => Object.values(obj).join(','));
  return [header, ...rows].join('\n');
};

export function getCompassDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}
