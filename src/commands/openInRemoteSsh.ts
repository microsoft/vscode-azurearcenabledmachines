// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "fs/promises";
import { IActionContext } from "@microsoft/vscode-azext-utils";
import { parse } from "ssh-config";
import { ProgressLocation, commands, window } from "vscode";
import { pickArcEnabledMachine } from "../utils/pickArcEnabledMachine";
import { verifyRemoteSshExtension } from "../utils/verifyRemoteSshExtension";
import { runAzSshConfigCommand } from "../utils/runAzSshConfigCommand";
import { sshConfigPath } from "../constants";
import { ArcEnabledMachineItem } from "../ArcEnabledMachineItem";
import { verifyAzureCLI } from "../utils/verifyAzureCLI";

export async function openInRemoteSsh(
    context: IActionContext & { canPickMany?: false },
    node?: ArcEnabledMachineItem): Promise<void> {
    // This was either called on a resource or from the command palette, in
    // which case we need to pick one.
    node ??= await pickArcEnabledMachine(context);

    await window.withProgress(
        {
            location: ProgressLocation.Notification,
            title: `Setting up SSH for Azure Arc-enabled machine ${node.arcEnabledMachine.name}...`,
            cancellable: true,
        },
        async (_progress, _token) => {
            // NOTE: It is definitely defined by the ??= operation above.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await openInRemoteSshInternal(context, node!);
        });
}

async function openInRemoteSshInternal(context: IActionContext, node: ArcEnabledMachineItem): Promise<void> {
    // Verify that the Azure CLI and Remote - SSH extension are installed.
    await verifyAzureCLI(context);
    await verifyRemoteSshExtension(context);

    // Get the generated SSH config from the `az ssh config` command for an Arc resource.
    const sshArcConfig = await runAzSshConfigCommand(node);

    // Add it to the user's SSH config file. (So hacky! But don't blame me, I
    // tried to add file support to Remote - SSH.)
    const sshConfig = parse(await readFile(sshConfigPath, "utf8"));

    // Remove any stale config.
    if (sshConfig.find({ Host: node.sshHostName })) {
        sshConfig.remove({ Host: node.sshHostName });
    }

    const combinedConfig = sshConfig.concat(sshArcConfig);
    await writeFile(sshConfigPath, combinedConfig.toString());

    const host = node.sshHostName; // No idea why I have to extract this first.
    await commands.executeCommand("opensshremotes.openEmptyWindow", { host });
}
