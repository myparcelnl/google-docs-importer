import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bin.ts", "src/index.ts"],
  format: ["cjs", "esm"],
  tsconfig: "tsconfig.build.json",
});
