import { describe, expect, test } from "vitest";

import { globalOmit } from "@/utils/globalOmit";

describe("globalOmit", () => {
  test("should omit specified keys from the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = globalOmit(obj, "a", "c");
    expect(result).toEqual({ b: 2 });
  });

  test("should return the same object if no keys are specified", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = globalOmit(obj);
    expect(result).toEqual(obj);
  });

  test("should return an empty object if all keys are specified", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = globalOmit(obj, "a", "b", "c");
    expect(result).toEqual({});
  });
});
