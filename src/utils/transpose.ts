/**
 * @param {Array} array - Array to transpose.
 *
 * @returns {Array}
 */
export const transpose = (array: string[][]): string[][] => {
  if (!array[0] || !array[0].length) {
    return array;
  }

  return array[0].filter(Boolean).map((_, index) => {
    return array.filter(Boolean).map((item) => item[index] as string);
  });
};
