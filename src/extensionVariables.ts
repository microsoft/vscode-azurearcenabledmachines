// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionContext } from "vscode";
import { IAzureUtilsExtensionVariables } from "@microsoft/vscode-azext-azureutils";
import { IAzExtOutputChannel, } from "@microsoft/vscode-azext-utils";
import { AzureResourcesExtensionApi } from "@microsoft/vscode-azureresources-api";
import { ArcEnabledMachinesBranchDataProvider } from "./ArcEnabledMachinesBranchDataProvider";

// This is essentially a singleton class with the extension's `activate` function as the constructor.
export class ExtensionVars implements IAzureUtilsExtensionVariables {
    readonly prefix: string = "azureArcEnabledMachines";
    readonly name: string = "Azure Arc-enabled machines";

    context!: ExtensionContext;
    outputChannel!: IAzExtOutputChannel;
    ignoreBundle = true;
    rgApiV2!: AzureResourcesExtensionApi;
    branchDataProvider!: ArcEnabledMachinesBranchDataProvider;
}

export const ext = new ExtensionVars();
