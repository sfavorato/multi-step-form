import { useEffect, useState } from "react";

const safeJsonParse = <T = any>(value: string | null, fallback?: T) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const useLocalStorage = <T = any>(
  key: string,
  fallback?: T
): [T, (value: T | ((arg: T) => T)) => void] => {
  const [storageValue, setStorageValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return safeJsonParse<T>(storedValue, fallback);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [storageValue]);

  return [storageValue, setStorageValue];
};
