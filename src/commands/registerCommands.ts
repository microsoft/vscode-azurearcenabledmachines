// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { registerErrorHandler, registerReportIssueCommand } from "@microsoft/vscode-azext-utils";
import { ext } from "../extensionVariables";

export function registerCommands(): void {
    // Suppress "Report an Issue" button for all errors in favor of the command
    registerErrorHandler(c => c.errorHandling.suppressReportIssue = true);
    registerReportIssueCommand(`${ext.prefix}.reportIssue`);
}
