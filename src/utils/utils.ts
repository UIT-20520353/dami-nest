import { useState } from 'react';
import { IUser } from '~/types';

export function getStyles(percent: number | string): string {
  if (percent == 0) return 'w-0';
  return `w-[${percent}%]`;
}

export const useSessionStorage = (keyName: string, defaultValue: IUser | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error('useSessionStorage: ', err);
      return defaultValue;
    }
  });
  const setValue = (newValue: IUser | null) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error('useSessionStorage: ', err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const useLocalStorage = (keyName: string, defaultValue: IUser | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error('useLocalStorage: ', err);
      return defaultValue;
    }
  });
  const setValue = (newValue: IUser | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error('useLocalStorage: ', err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
