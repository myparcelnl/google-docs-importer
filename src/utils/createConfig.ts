import type {
  ResolvedImportSheetConfig,
  InputImportSheetConfig,
} from "../types";

export function createConfig(
  userConfig: InputImportSheetConfig,
): ResolvedImportSheetConfig {
  return {
    columnKey: "lang",
    sheetId: 0,
    outputDir: "translations",
    prefix: "",
    ...userConfig,
  };
}
