import type { ImportTranslationsConfig } from "../../src/importTranslations";
import { createConfig } from "../../src/createConfig";

export function mockConfig(
  config?: Partial<ImportTranslationsConfig>
): Required<ImportTranslationsConfig> {
  return createConfig({
    documentId: "abcde",
    sheetId: 1,
    outputDir: "dist",
    ...config,
  });
}
