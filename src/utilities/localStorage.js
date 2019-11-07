import { useState } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setVal] = useState(() => {
    localStorage.clear();
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  const setValue = (valToStore) => {
    setVal(valToStore);
    localStorage.setItem(key, JSON.stringify(valToStore));
  };

  return [value, setValue];
}
