// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as vscode from "vscode";
import { registerAzureUtilsExtensionVariables } from "@microsoft/vscode-azext-azureutils";
import { IActionContext, callWithTelemetryAndErrorHandling, createAzExtOutputChannel, registerUIExtensionVariables } from "@microsoft/vscode-azext-utils";
import { AzExtResourceType, getAzureResourcesExtensionApi } from "@microsoft/vscode-azureresources-api";
import { ext } from "./extensionVariables";
import { ArcEnabledServersBranchDataProvider } from "./ArcEnabledServersBranchDataProvider";

export async function activate(context: vscode.ExtensionContext): Promise<void> {

    ext.context = context;
    ext.outputChannel = createAzExtOutputChannel(ext.name, ext.prefix);
    context.subscriptions.push(ext.outputChannel);

    registerUIExtensionVariables(ext);
    registerAzureUtilsExtensionVariables(ext);

    await callWithTelemetryAndErrorHandling(`${ext.prefix}.activate`,
        async (activateContext: IActionContext) => {
            activateContext.telemetry.properties.isActivationEvent = "true";

            ext.rgApiV2 = await getAzureResourcesExtensionApi(context, "2.0.0");
            ext.branchDataProvider = new ArcEnabledServersBranchDataProvider();
            ext.rgApiV2.resources.registerAzureResourceBranchDataProvider(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                AzExtResourceType.ArcEnabledServers,
                ext.branchDataProvider);
        });
}

export function deactivate(): void { return; }
