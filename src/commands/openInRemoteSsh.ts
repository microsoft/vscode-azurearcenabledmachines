// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "fs/promises";
import { IActionContext } from "@microsoft/vscode-azext-utils";
import { parse } from "ssh-config";
import { commands } from "vscode";
import { ArcEnabledServersResourceModel } from "../ArcEnabledServersBranchDataProvider";
import { pickArcEnabledServer as pickArcEnabledServersResource } from "../utils/pickArcEnabledServer";
import { verifyRemoteSshExtension } from "../utils/verifyRemoteSshExtension";
import { runAzSshConfigCommand } from "../utils/runAzSshConfigCommand";
import { sshConfigPath } from "../constants";

export async function openInRemoteSsh(
    context: IActionContext & { canPickMany?: false },
    node?: ArcEnabledServersResourceModel): Promise<void> {
    // This was either called on a resource or from the command palette, in
    // which case we need to pick one.
    node ??= await pickArcEnabledServersResource(context);
    const server = node.arcEnabledServer;

    // Verify that the Remote - SSH extension is installed and activated.
    await verifyRemoteSshExtension(context);

    // TODO: Here's where it's going to be hacky for a bit until we've come up with a better design!

    // Get the generated SSH config file from the `az ssh config` command for an Arc resource.
    const sshArcConfig = await runAzSshConfigCommand(server);

    // Add it to the user's SSH config file. (So hacky! But don't blame me, I
    // tried to add file support to Remote - SSH.)
    const sshConfig = parse(await readFile(sshConfigPath, "utf8"));
    const combinedConfig = sshConfig.concat(sshArcConfig);
    await writeFile(sshConfigPath, combinedConfig.toString());

    // TODO: Parse the config for the hostname!
    const hostname = "hostname";

    await commands.executeCommand("opensshremotes.openEmptyWindow", { hostname });
}
