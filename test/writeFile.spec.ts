import { describe, it, expect, beforeEach, afterEach } from "vitest";

import mock from "mock-fs";
import { writeJsonFile } from "../src/writeJsonFile";
import fs from "fs";
import { mockConfig } from "./bootstrap/mockConfig";
import path from "path";

describe("writeFile", () => {
  beforeEach(() => {
    mock({
      "path/to/fake/dir": {},
      "different/dir": {},
      "already/filled/dir": {
        "nl.json": {},
      },
    });
  });

  afterEach(() => mock.restore());

  it("writes file", async () => {
    expect.assertions(1);
    await writeJsonFile(mockConfig({ outputDir: "/path/to/fake/dir" }), "nl", {
      a: "b",
      c: "d",
    });

    const contents = fs
      .readFileSync("/path/to/fake/dir/nl.json")
      .toString("utf-8");

    expect(contents).toMatchInlineSnapshot(`
      "{
        \\"a\\": \\"b\\",
        \\"c\\": \\"d\\"
      }
      "
    `);
  });

  it("overwrites existing files", async () => {
    expect.assertions(1);
    const DIR = "/already/filled/dir";
    await writeJsonFile(mockConfig({ outputDir: DIR }), "nl", {
      a: "b",
      c: "d",
    });

    await writeJsonFile(mockConfig({ outputDir: DIR }), "nl", {
      e: "f",
      g: "h",
    });

    const contents = fs
      .readFileSync(path.resolve(DIR, "nl.json"))
      .toString("utf-8");

    expect(contents).toMatchInlineSnapshot(`
      "{
        \\"e\\": \\"f\\",
        \\"g\\": \\"h\\"
      }
      "
    `);
  });
});
