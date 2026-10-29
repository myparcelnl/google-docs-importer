import { vi, describe, it, beforeEach, expect, afterEach } from "vitest";
import { Stream } from "stream";
import { asyncGet } from "./asyncGet";

let stream: Stream;

vi.mock("https", () => ({
  get: vi.fn((_, cb) => {
    cb(Object.assign(stream, { setEncoding: () => null }));
  }),
}));

describe("asyncGet", () => {
  beforeEach(() => {
    stream = new Stream();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles success correctly", async () => {
    expect.assertions(2);
    const promise = asyncGet("url");
    expect(promise).toBeInstanceOf(Promise);
    stream.emit("data", "key,nl_NL,en_GB\n");
    stream.emit("end");

    expect(await promise).toBe("key,nl_NL,en_GB\n");
  });

  it("handles error correctly", async () => {
    expect.assertions(1);
    const promise = asyncGet("url");
    stream.emit("error", new Error("Broken"));

    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});
