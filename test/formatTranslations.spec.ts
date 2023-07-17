import { describe, it, expect } from "vitest";
import { formatTranslations } from "../src";
import { createMockContext } from "./createMockContext";

describe("format translations", () => {
  it("throws error when translations can't be parsed", () => {
    const result = formatTranslations(
      ["nl", "woord"],
      ["language", "my_translation"],
      createMockContext()
    );

    expect(result).toEqual({
      language: "nl",
      translationsObject: {
        lang: "nl",
        my_translation: "woord",
      },
    });
  });

  it("throws error when translations can't be parsed", () => {
    expect(() => {
      formatTranslations([], ["a"], createMockContext());
    }).toThrow(Error);
  });
});
