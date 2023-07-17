import { describe, it, expect, beforeEach, afterEach } from "vitest";

import mock from "mock-fs";
import { writeJsonFile } from "../src";
import fs from "fs";
import path from "path";
import { createMockContext } from "./createMockContext";

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
    await writeJsonFile(
      "nl",
      {
        a: "b",
        c: "d",
      },
      createMockContext({ outputDir: "/path/to/fake/dir" }),
    );

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
