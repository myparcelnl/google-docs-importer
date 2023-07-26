import type {
  ResolvedImportTranslationsConfig,
  InputImportTranslationsConfig,
} from "../../src";
import { createConfig } from "../../src";

export function mockConfig(
  config?: InputImportTranslationsConfig,
): ResolvedImportTranslationsConfig {
  return createConfig({
    documentId: "abcde",
    sheetId: 1,
    outputDir: "/dist",
    ...config,
  });
}
