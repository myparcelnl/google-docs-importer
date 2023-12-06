import { describe, it, expect } from "vitest";
import { formatRecords } from "./index";
import { createMockContext } from "./__tests__/createMockContext";

describe("formatRecords", () => {
  it("throws error when records can't be parsed", () => {
    const result = formatRecords(
      ["nl", "woord"],
      ["language", "my_translation"],
      createMockContext(),
    );

    expect(result).toEqual({
      key: "nl",
      records: {
        lang: "nl",
        my_translation: "woord",
      },
    });
  });

  it("throws error when records are empty", () => {
    expect(() => {
      formatRecords([], ["a"], createMockContext());
    }).toThrow(Error);
  });

  it("adds a prefix to the keys", () => {
    const result = formatRecords(
      ["nl", "woord"],
      ["language", "my_translation"],
      createMockContext({ prefix: "sp_" }),
    );

    expect(result).toEqual({
      key: "nl",
      records: {
        lang: "nl",
        sp_my_translation: "woord",
      },
    });
  });
});
