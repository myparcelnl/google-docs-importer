import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type SpyInstance,
} from "vitest";

import { writeJsonFile } from "../src";
import fs from "fs";
import path from "path";
import { createMockContext } from "./createMockContext";

describe("writeJsonFile", () => {
  let mkdirSpy: SpyInstance;
  let writeFileSpy: SpyInstance;

  beforeEach(() => {
    mkdirSpy = vi.spyOn(fs.promises, "mkdir").mockImplementation(() => {
      return Promise.resolve("");
    });

    writeFileSpy = vi.spyOn(fs.promises, "writeFile").mockImplementation(() => {
      return Promise.resolve();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes file", async () => {
    expect.assertions(2);
    await writeJsonFile(
      "nl",
      {
        a: "b",
        c: "d",
      },
      createMockContext({ outputDir: "/path/to/fake/dir" }),
    );

    expect(mkdirSpy).toHaveBeenCalledWith("/path/to/fake/dir/", {
      recursive: true,
    });
    expect(writeFileSpy).toHaveBeenCalledWith(
      "/path/to/fake/dir/nl.json",
      JSON.stringify({ a: "b", c: "d" }, null, 2) + "\n",
      { encoding: "utf-8" },
    );
  });

  it("overwrites existing files", async () => {
    expect.assertions(1);
    const DIR = "/already/filled/dir";
    await writeJsonFile(
      "nl",
      {
        a: "b",
        c: "d",
      },
      createMockContext({ outputDir: DIR }),
    );

    await writeJsonFile(
      "nl",
      {
        e: "f",
        g: "h",
      },
      createMockContext({ outputDir: DIR }),
    );

    expect(writeFileSpy).toHaveBeenCalledWith(
      path.resolve(DIR, "nl.json"),
      JSON.stringify({ e: "f", g: "h" }, null, 2) + "\n",
      { encoding: "utf-8" },
    );
  });
});
