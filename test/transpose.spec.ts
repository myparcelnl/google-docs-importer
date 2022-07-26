import { describe, it, expect } from "vitest";
import { transpose } from "../src/transpose";

describe("transpose", () => {
  it.each([
    {
      input: [
        ["key", "nl_NL", "en_GB"],
        ["my_translation", "Een woord", "A word"],
      ],
      output: [
        ["key", "my_translation"],
        ["nl_NL", "Een woord"],
        ["en_GB", "A word"],
      ],
    },
    {
      input: [[], []],
      output: [[], []],
    },
    {
      input: [],
      output: [],
    },
  ])("transposes arrays of arrays", ({ input, output }) => {
    expect(transpose(input)).toStrictEqual(output);
  });
});
