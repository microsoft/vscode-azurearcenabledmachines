import os from "os";
import path	from "path";
import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
	files: "src/test/**/*.test.js",
	// The default user data directory had too many characters for the IPC connection on macOS in CI.
	launchArgs: [ "--profile-temp", "--user-data-dir", path.join(os.tmpdir(), "vscode-user-data") ],
	mocha: {
		ui: "bdd", // describe, it, etc.
		timeout: 60 * 1000 // 10 minutes to allow for debugging
	},
});
