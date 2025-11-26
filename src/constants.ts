// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { exec } from "child_process";
import { homedir } from "os";
import { join } from "path";
import { promisify } from "util";

export const getAzureCLI = "https://aka.ms/GetTheAzureCLI";
export const loginToAzureCLI =
    "https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively";
export const remoteSshExtensionId = "ms-vscode-remote.remote-ssh";
export const sshConfigPath: string = join(homedir(), ".ssh", "config");
export const execAsync = promisify(exec);
