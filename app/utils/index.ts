const truncateAccount = (
  account: string,
  startCharLength: number,
  endCharLength: number
) =>
  account.slice(0, startCharLength) +
  '...' +
  account.slice(account.length - endCharLength, account.length);

const findDaysRemaining = (expiresAt: number) => {
  const today = Number(new Date());
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const expired = Date.now() > expiresAt * 1000;

  // Convert the provided days to milliseconds
  const expirationDate = Number(new Date(expiresAt * 1000));

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = expirationDate - today;

  // Calculate the difference in days
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);

  if (expired) return 'Expired';

  return differenceInDays === 1
    ? '1 day left'
    : differenceInDays === 0
    ? 'A few hours left'
    : differenceInDays + ' days left';
};

export { truncateAccount, findDaysRemaining };
