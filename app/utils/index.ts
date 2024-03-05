const truncateAccount = (
  account: string,
  startCharLength: number,
  endCharLength: number
) =>
  account.slice(0, startCharLength) +
  '...' +
  account.slice(account.length - endCharLength, account.length);

export { truncateAccount };
