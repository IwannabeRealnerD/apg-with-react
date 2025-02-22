type IsOptional<T, K extends keyof T> = object extends Pick<T, K> ? true : false;

type PartialKeys<T> = {
  [K in keyof T]?: T[K] extends undefined ? T[K] : IsOptional<T, K> extends true ? T[K] : never;
};

export const globalSetDefaultValue = <T extends object>(target: T, asExpected: PartialKeys<T>) => {
  const result = { ...target };
  Object.keys(asExpected).forEach((key) => {
    const typedKey = key as keyof T;
    if (result[typedKey] === undefined) {
      result[typedKey] = asExpected[typedKey] as T[keyof T];
    }
  });
  return result;
};
