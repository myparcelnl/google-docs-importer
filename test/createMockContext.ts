import type { ImportTranslationsConfig, Context } from "../src";
import { createDebugger } from "../src";
import { mockConfig } from "./bootstrap/mockConfig";

export const createMockContext = (
  config?: Partial<ImportTranslationsConfig>,
): Context => ({
  debug: createDebugger({ enabled: false }),
  verbosity: 0,
  config: mockConfig(config),
});
