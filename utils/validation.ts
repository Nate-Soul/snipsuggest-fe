export const isEmpty = (value: string | number | any[] | null | undefined): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return false;
};

export const isValidLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const isPhone = (value: string): boolean => {
  return /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value);
};

export const isValidParam = (queryParam: unknown): queryParam is string => {
    return typeof queryParam === 'string' && queryParam.trim() !== '';
};