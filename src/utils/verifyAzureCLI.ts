// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IActionContext } from "@microsoft/vscode-azext-utils";
import type { ExecException } from "child_process";
import { execAsync, getAzureCLI, loginToAzureCLI } from "../constants";
import { ext } from "../extensionVariables";

export async function verifyAzureCLI(context: IActionContext): Promise<void> {
    try {
        const { stdout, stderr } = await execAsync("az --version");
        ext.outputChannel.appendLog(stdout, {
            resourceName: "az --version stdout",
        });
        ext.outputChannel.appendLog(stderr, {
            resourceName: "az --version stderr",
        });
    } catch (error) {
        ext.outputChannel.appendLog((error as ExecException).message, {
            resourceName: "az --version error",
        });
        void context.ui.showWarningMessage(
            `You must have the [Azure CLI](${getAzureCLI}) installed to perform this operation.`,
            { learnMoreLink: getAzureCLI },
        );
        context.errorHandling.suppressDisplay = true;
        throw new Error("Azure CLI is not installed.");
    }

    try {
        const { stdout, stderr } = await execAsync("az account show");
        ext.outputChannel.appendLog(stdout, {
            resourceName: "az account show",
        });
        ext.outputChannel.appendLog(stderr, {
            resourceName: "az account show",
        });
    } catch (error) {
        ext.outputChannel.appendLog((error as ExecException).message, {
            resourceName: "az account show error",
        });
        void context.ui.showWarningMessage(
            "You must log in to the Azure CLI with `az login` in the [Terminal](command:workbench.action.terminal.new) to perform this operation.",
            { learnMoreLink: loginToAzureCLI },
        );
        context.errorHandling.suppressDisplay = true;
        throw new Error("Azure CLI is not logged in.");
    }
}
