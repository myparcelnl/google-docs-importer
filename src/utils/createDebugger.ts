import debugConstructor from "debug";
import packageJson from "../../package.json";
import type { DebugConfig } from "../types";

export const createDebugger = (debugConfig: DebugConfig) => {
  const debug = debugConstructor(
    packageJson.name +
      (debugConfig.namespace ? `:${debugConfig.namespace}` : ""),
  );

  debug.enabled = debugConfig.enabled ?? false;

  return debug;
};
