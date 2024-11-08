"use client"
import { useState } from 'react';
import { nprogress } from 'next-transition-bar';

export const useProgress = <T>(promise: () => Promise<T>) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  const execute = async () => {
    nprogress.start();
    setError(undefined);
    try {
      const result = await promise();
      setData(result);
      return [undefined, result] as [undefined, T];
    } catch (error) {
      setError(error as Error);
      return [error as Error, undefined];
    } finally {
      nprogress.done();
    }
  };

  return { error, data, execute };
};

