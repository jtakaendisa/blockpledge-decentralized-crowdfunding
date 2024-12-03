import { addDays, format } from 'date-fns';

export const truncateAccount = (
  account: string,
  startCharLength: number,
  endCharLength: number
) => {
  if (account?.length) {
    return (
      account.slice(0, startCharLength) +
      '...' +
      account.slice(account.length - endCharLength, account.length)
    );
  } else return '';
};

export const findDaysRemaining = (expiresAt: number) => {
  const today = Number(new Date());
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const expired = Date.now() > expiresAt * 1000;

  // Convert the provided days to milliseconds
  const expirationDate = Number(new Date(expiresAt * 1000));

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = expirationDate - today;

  // Calculate the difference in days
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);

  if (expired) return ['-', 'expired'];

  return differenceInDays === 1
    ? [1, 'day left']
    : differenceInDays === 0
    ? ['-', 'a few hours left']
    : [differenceInDays, ' days left'];
};

export const getTomorrowsDate = () => {
  const nextDay = addDays(new Date(), 1);
  return format(nextDay, 'yyyy-MM-dd');
};

export const convertToTimestamp = (dateString: string) => Date.parse(dateString) / 1000;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
