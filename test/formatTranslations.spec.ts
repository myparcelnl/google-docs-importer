import { describe, it, expect } from "vitest";
import { formatTranslations } from "../src/formatTranslations";
import { mockConfig } from "./bootstrap/mockConfig";

describe("format translations", () => {
  it("throws error when translations can't be parsed", () => {
    const result = formatTranslations(
      ["nl", "woord"],
      ["language", "my_translation"],
      mockConfig()
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
      formatTranslations([], ["a"], mockConfig());
    }).toThrow(Error);
  });
});
