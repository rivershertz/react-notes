import {useEffect, useState} from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) {
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
