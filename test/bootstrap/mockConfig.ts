import type { ImportTranslationsConfig } from "../../src";
import { createConfig } from "../../src";

export function mockConfig(
  config?: Partial<ImportTranslationsConfig>
): Required<ImportTranslationsConfig> {
  return createConfig({
    documentId: "abcde",
    sheetId: 1,
    outputDir: "/dist",
    ...config,
  });
}
