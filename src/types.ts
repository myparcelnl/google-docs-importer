import type { ImportTranslationsConfig } from "./importTranslations";
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

export interface Context {
  config: Required<ImportTranslationsConfig>;
  debug: Debugger;
  verbosity: number;
}
