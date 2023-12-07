import type { Debugger } from "debug";

export enum VerbosityLevel {
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
}

export interface DebugConfig {
  enabled: boolean;
  namespace?: string;
}

export interface InputImportSheetConfig extends ImportSheetConfig {
  documentId: string;
}

export interface ImportSheetConfig {
  documentId?: string | undefined;
  columnKey?: string;
  outputDir?: string;
  prefix?: string;
  filenamePrefix?: string;
  sheetId?: number | string;
}

export type ResolvedImportSheetConfig = Required<ImportSheetConfig>;
export type ResolvedRecords = {
  key: string;
  records: Record<string, string>;
};

export interface Context {
  config: ResolvedImportSheetConfig;
  debug: Debugger;
  verbosity: number;
}
