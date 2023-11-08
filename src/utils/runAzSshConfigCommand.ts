// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, rm } from "fs/promises";
import SSHConfig, { parse } from "ssh-config";
import { ext } from "../extensionVariables";
import { ArcEnabledServerItem } from "../ArcEnabledServerItem";
import { execAsync } from "../constants";

// TODO: This needs a whole lot of work. It's just a proof of concept right now.
// Like, check that the Az CLI exists and is logged in. Maybe don't even use it
// all if we can help it.
export async function runAzSshConfigCommand(serverItem: ArcEnabledServerItem): Promise<SSHConfig> {
    // Delete any previously created configuration and key files.
    // TODO: Delete these when our session ends too?
    await rm(serverItem.sshConfigFile, { force: true });
    await rm(serverItem.sshConfigFolder, { force: true, recursive: true });

    const command = [
        "az", "ssh", "config",
        "--file", serverItem.sshConfigFile,
        "--subscription", serverItem.subscription.subscriptionId,
        "--resource-group", serverItem.arcEnabledServer.resourceGroup,
        "--name", serverItem.arcEnabledServer.name,
        // Hopefully not necessary but we can't answer prompts. Unfortunately
        // this doesn't stop it from prompting to overwrite the generated RSA
        // keys, hence the above.
        "--yes", "--overwrite",
        // This is a secret type that works regardless of the actual type of the
        // Arc-enabled server.
        "--resource-type", "arc_resource_type_placeholder"].join(" ");

    const { stdout, stderr } = await execAsync(command);
    ext.outputChannel.appendLog(stdout, { resourceName: "az ssh config stdout" });
    ext.outputChannel.appendLog(stderr, { resourceName: "az ssh config stderr" });
    const config = await readFile(serverItem.sshConfigFile, "utf8");
    return parse(config);
}
