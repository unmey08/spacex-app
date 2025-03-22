export const generateRandomString = (numOfCharacters: number) => {
  const alphaNumericChars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let result: string = "";
  for (let i = numOfCharacters; i > 0; --i)
    result +=
      alphaNumericChars[Math.floor(Math.random() * alphaNumericChars.length)];
  return result;
};
