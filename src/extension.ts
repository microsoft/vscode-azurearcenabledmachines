// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionContext } from "vscode";
import { registerAzureUtilsExtensionVariables } from "@microsoft/vscode-azext-azureutils";
import { type IActionContext, callWithTelemetryAndErrorHandling, createAzExtOutputChannel, registerUIExtensionVariables } from "@microsoft/vscode-azext-utils";
import { AzExtResourceType, getAzureResourcesExtensionApi } from "@microsoft/vscode-azureresources-api";
import { ext } from "./extensionVariables";
import { ArcEnabledMachinesBranchDataProvider } from "./ArcEnabledMachinesBranchDataProvider";
import { registerCommands } from "./commands/registerCommands";

export async function activate(context: ExtensionContext): Promise<void> {
    ext.context = context;
    ext.outputChannel = createAzExtOutputChannel(ext.name, ext.prefix);
    context.subscriptions.push(ext.outputChannel);

    registerUIExtensionVariables(ext);
    registerAzureUtilsExtensionVariables(ext);

    await callWithTelemetryAndErrorHandling(`${ext.prefix}.activate`,
        async (activateContext: IActionContext) => {
            activateContext.telemetry.properties.isActivationEvent = "true";

            registerCommands();

            ext.rgApiV2 = await getAzureResourcesExtensionApi(context, "2.0.0");
            ext.branchDataProvider = new ArcEnabledMachinesBranchDataProvider();
            ext.rgApiV2.resources.registerAzureResourceBranchDataProvider(
                AzExtResourceType.ArcEnabledMachines,
                ext.branchDataProvider);
        });
}

export function deactivate(): void { return; }
