export const globalOmit = <T extends object>(targetObj: T, ...keys: (keyof T)[]) => {
  if (typeof targetObj === "object" && targetObj !== null) {
    return Object.keys(targetObj).reduce((_result, _currentKey) => {
      const result = _result;
      const currentKey = _currentKey as keyof T;
      if (!keys.includes(currentKey)) {
        result[currentKey] = targetObj[currentKey];
      }
      return result;
    }, {} as Partial<T>);
  }
  return null;
};
