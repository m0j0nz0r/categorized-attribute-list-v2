export const isRangeValid = (min, max) => min <= max;
export const isPrecisionValid = (min, max, n) => n > 0 && (max - min) % n === 0;
