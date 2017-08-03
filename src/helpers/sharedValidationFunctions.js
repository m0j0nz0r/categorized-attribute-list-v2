export const isRangeValid = (min, max) => min <= max;
export const isPrecisionValid = (min, max, n) => (max - min) % n === 0;
