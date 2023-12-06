import { createConfig } from "../../utils";
import type { ResolvedImportSheetConfig, ImportSheetConfig } from "../../types";

export function mockConfig(
  config?: Partial<ImportSheetConfig>,
): ResolvedImportSheetConfig {
  return createConfig({
    // @ts-expect-error todo
    documentId: "abcde",
    sheetId: 1,
    outputDir: "/dist",
    ...config,
  });
}
