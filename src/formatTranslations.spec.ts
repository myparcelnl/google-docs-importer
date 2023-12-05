import { describe, it, expect } from "vitest";
import { formatTranslations } from "./index";
import { createMockContext } from "./__tests__/createMockContext";

describe("formatTranslations", () => {
  it("throws error when translations can't be parsed", () => {
    const result = formatTranslations(
      ["nl", "woord"],
      ["language", "my_translation"],
      createMockContext(),
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
