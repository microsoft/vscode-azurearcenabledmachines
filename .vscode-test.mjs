import os from "os";
import path	from "path";
import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
	files: "src/test/**/*.test.ts",
	// It may break CI but we'll know sooner rather than later
	version: "insiders",
	// The default user data directory had too many characters for the IPC connection on macOS in CI.
	launchArgs: [ "--profile-temp", "--user-data-dir", path.join(os.tmpdir(), "vscode-user-data") ],
    mocha: {
        ui: "bdd", // describe, it, etc.
        require: ["esbuild-register"], // transpile TypeScript on-the-fly
        slow: 2 * 1000, // 2 seconds for slow test
        timeout: 2 * 60 * 1000, // 2 minutes to allow for debugging
    },
});
