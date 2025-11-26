// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    registerCommand,
    registerCommandWithTreeNodeUnwrapping,
    registerErrorHandler,
    registerReportIssueCommand,
} from "@microsoft/vscode-azext-utils";
import { commands } from "vscode";
import { remoteSshExtensionId } from "../constants";
import { ext } from "../extensionVariables";
import { openInRemoteSsh } from "./openInRemoteSsh";

export function registerCommands(): void {
    // Suppress "Report an Issue" button for all errors in favor of the command
    registerErrorHandler((c) => (c.errorHandling.suppressReportIssue = true));
    registerCommand(`${ext.prefix}.showOutputChannel`, () => {
        ext.outputChannel.show();
    });
    registerReportIssueCommand(`${ext.prefix}.reportIssue`);

    // Used to show the "Remote - SSH" extension in the marketplace when it's not installed but needed
    registerCommand(
        `${ext.prefix}.showRemoteSshExtension`,
        () =>
            void commands.executeCommand(
                "extension.open",
                remoteSshExtensionId,
            ),
    );

    // The whole point of this: open the selected Arc-enabled machine in a remote SSH window
    registerCommandWithTreeNodeUnwrapping(
        `${ext.prefix}.openInRemoteSsh`,
        openInRemoteSsh,
    );
}
