import { createDebugger, type ImportSheetConfig, type Context } from "../index";
import { mockConfig } from "./bootstrap/mockConfig";

export const createMockContext = (
  config?: Partial<ImportSheetConfig>,
): Context => ({
  debug: createDebugger({ enabled: false }),
  verbosity: 0,
  config: mockConfig(config),
});
