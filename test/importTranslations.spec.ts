import { vi, describe, it, beforeEach, expect, afterAll } from "vitest";
import fs from "fs";
import mockFs from "mock-fs";
import { Stream } from "stream";
import { importTranslations } from "../src";
import * as asyncGet from "../src/utils/asyncGet";
import { createMockContext } from "./createMockContext";

let stream: Stream;

const getMock = vi.spyOn(asyncGet, "asyncGet");

describe("import", () => {
  beforeEach(() => {
    stream = new Stream();

    mockFs({});

    getMock.mockImplementation(() => Promise.resolve(""));
  });

  afterAll(() => {
    mockFs.restore();
    vi.resetAllMocks();
  });

  it("imports correctly", async () => {
    expect.assertions(3);
    getMock.mockResolvedValue(
      "key,nl_NL,en_GB\nmy_translation,woord,wordasync\n",
    );

    await importTranslations(createMockContext());

    expect(fs.existsSync("/dist")).toBe(true);
    expect(fs.readdirSync("/dist")).toEqual(["en_GB.json", "nl_NL.json"]);

    const file = fs.readFileSync("/dist/nl_NL.json").toString();
    expect(file).toEqual(`{
  "my_translation": "woord",
  "lang": "nl_NL"
}
`);
  });

  it("throws error if sheet data is invalid", async () => {
    expect.assertions(1);
    await expect(() => {
      return importTranslations(createMockContext({ documentId: undefined }));
    }).rejects.toBeInstanceOf(Error);
  });

  it("throws error if fetching sheet was not successful", async () => {
    expect.assertions(1);
    await expect(async () => {
      await importTranslations(createMockContext());
      stream.emit("data", '<html lang="en"></html>');
      stream.emit("end");
    }).rejects.toBeInstanceOf(Error);
  });

  it("throws error if sheet does not contain translations", async () => {
    expect.assertions(1);
    await expect(async () => {
      await importTranslations(createMockContext());
      stream.emit("data", "");
      stream.emit("end");
    }).rejects.toBeInstanceOf(Error);
  });
});
