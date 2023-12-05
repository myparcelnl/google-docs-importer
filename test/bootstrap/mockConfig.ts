import type {
  ResolvedImportTranslationsConfig,
  ImportTranslationsConfig,
} from "../../src";
import { createConfig } from "../../src";

export function mockConfig(
  config?: Partial<ImportTranslationsConfig>,
): ResolvedImportTranslationsConfig {
  return createConfig({
    // @ts-expect-error todo
    documentId: "abcde",
    sheetId: 1,
    outputDir: "/dist",
    ...config,
  });
}
