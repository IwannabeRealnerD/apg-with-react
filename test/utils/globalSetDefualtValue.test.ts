import { describe, test, expect } from "vitest";

import { globalSetDefaultValue } from "@/utils/globalSetDefaultValue";

describe("globalSetDefaultValue", () => {
  test("Set property that targetObj doesn't have", () => {
    type TestObject = { test1?: string; test2: number };
    const testObject: TestObject = { test2: 111 };
    const result = globalSetDefaultValue(testObject, { test1: "hi" });
    expect(result).toEqual({ test1: "hi", test2: 111 });
  });

  test("Doesn't Override existing property in targetObj", () => {
    type TestObject = { test1?: string; test2: number };
    const testObject: TestObject = { test1: "hello", test2: 111 };
    const result = globalSetDefaultValue(testObject, { test1: "hi" });
    expect(result).toEqual({ test1: "hello", test2: 111 });
  });

  test("Add multiple properties to targetObj", () => {
    type TestObject = { test1?: string; test2: number; test3?: boolean };
    const testObject: TestObject = { test2: 111 };
    const result = globalSetDefaultValue(testObject, { test1: "hi", test3: true });
    expect(result).toEqual({ test1: "hi", test2: 111, test3: true });
  });
});
