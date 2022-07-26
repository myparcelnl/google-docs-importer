import type { ImportTranslationsConfig } from "./importTranslations";

export function createConfig(
  userConfig: ImportTranslationsConfig
): Required<ImportTranslationsConfig> {
  return {
    languageKey: "lang",
    sheetId: 0,
    outputDir: "translations",
    ...userConfig,
  };
}
