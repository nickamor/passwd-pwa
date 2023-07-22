const range = (start, end) => {
  const r = [];
  for (let i = start; i < end; i++) {
    r.push(i);
  }
  return r;
};

const rand = (max) => Math.floor(Math.random() * max);

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
};

/**
 * @param {string} src
 * @returns
 */
const pickOne = (src) => src.charAt(rand(src.length));

/**
 * @param {string} src
 * @param {number} count
 * @returns
 */
const pickMany = (src, count) =>
  range(0, count).reduce((acc) => acc + pickOne(src), "");

const shuffleStr = (str) => shuffle(str.split("")).join("");

export const passwd = ({
  passwdLength,
  nUpper,
  nNumeric,
  nSpecial,
  specialCharset,
}) =>
  shuffleStr(
    pickMany(
      "abcdefghijklnopqrstuvwxyz",
      passwdLength - nUpper - nNumeric - nSpecial
    ) +
      pickMany("ABCDEFGHIJKLMNOPQRSTUVWXYZ", nUpper) +
      pickMany("0123456789", nNumeric) +
      pickMany(specialCharset, nSpecial)
  );

window["passwd"] = passwd;
