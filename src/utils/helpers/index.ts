export const formattedNumber = (amount: number) => {
  return `₱${new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

export const isStringEmpty = (value: string) => {
  return value.length === 0;
};

export const getCurrentDateAtMidnightUTC = () => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return now;
};

export const getMinimumDateAtMidnightUTC = () => {
  const now = new Date('1900-01-31');
  now.setUTCHours(0, 0, 0, 0);
  return now;
};

export const isValidDateString = (dateStr: string) => /^(\d{2})\/(\d{2})\/(\d{4})$/.test(dateStr);
