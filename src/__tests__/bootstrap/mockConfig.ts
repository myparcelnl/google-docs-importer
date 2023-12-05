import type {
  ImportTranslationsConfig,
  ResolvedImportTranslationsConfig,
} from "../../importTranslations";
import { createConfig } from "../../utils";

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
