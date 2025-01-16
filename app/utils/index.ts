import { addDays, addYears, format } from 'date-fns';

export const truncateAccount = (
  account: string,
  startCharCount: number,
  endCharCount: number
) => {
  if (account?.length) {
    return (
      account.slice(0, startCharCount) +
      '...' +
      account.slice(account.length - endCharCount, account.length)
    );
  } else return '';
};

export const truncateText = (text: string, charCount: number, ellipsis?: boolean) => {
  const truncatedText = text.slice(0, charCount + 1);

  if (ellipsis && text.length > charCount) return truncatedText + ' ...';

  return truncatedText;
};

export const findRemainingTime = (expiresAt: number): [string | number, string] => {
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
    ? [1, ' day left']
    : differenceInDays === 0
    ? ['-', ' a few hours left']
    : [differenceInDays, ' days left'];
};

export const getTomorrowsDate = () => {
  const nextDay = addDays(new Date(), 1);
  return format(nextDay, 'yyyy-MM-dd');
};

export const getFutureDate = (offset: number, unit: 'days' | 'years' = 'days') => {
  const today = new Date();

  return unit === 'days' ? addDays(today, offset) : addYears(today, offset);
};

export const convertToTimestamp = (dateString: string) => Date.parse(dateString) / 1000;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const splitText = (text: string) =>
  Array.from(text).map((char) => (char === ' ' ? '\u00A0' : char));

export const splitArray = <T>(array: T[], chunks: number) => {
  const chunkSize = Math.round(array.length / chunks);

  return Array.from({ length: chunks }, (_, i) =>
    array.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
};

export const generateIncrementingArray = (length: number) =>
  Array.from({ length }, (_, i) => i + 1);

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
