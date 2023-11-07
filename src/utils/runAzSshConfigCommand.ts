// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import { join } from "path";
import { tmpdir } from "os";
import { readFile } from "fs/promises";
import SSHConfig, { parse } from "ssh-config";
import { ext } from "../extensionVariables";
import { ArcEnabledServerModel } from "../ArcEnabledServerItem";
import { execAsync } from "../constants";

// TODO: This needs a whole lot of work. It's just a proof of concept right now.
// Like, check that the Az CLI exists. Maybe don't even use it all if we can
// help it.
export async function runAzSshConfigCommand(server: ArcEnabledServerModel): Promise<SSHConfig> {
    const configFile = join(tmpdir(), `vscode-${ext.prefix}-${server.resourceGroup}-${server.name}.config`);

    const commands = [
        "az", "ssh", "config",
        "--file", configFile, "--overwrite",
        "--resource-group", server.resourceGroup,
        "--name", server.name,
        "--resource-type", "arc_resource_type_placeholder"];

    const { stdout, stderr } = await execAsync(commands.join(" "));
    ext.outputChannel.appendLog(stdout, { resourceName: "az ssh config stdout" });
    ext.outputChannel.appendLog(stderr, { resourceName: "az ssh config stderr" });
    return parse(await readFile(configFile, "utf8"));
}
