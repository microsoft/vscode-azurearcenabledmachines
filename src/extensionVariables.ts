// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionContext } from "vscode";
import { IAzureUtilsExtensionVariables } from "@microsoft/vscode-azext-azureutils";
import { IAzExtOutputChannel, } from "@microsoft/vscode-azext-utils";
import { AzureResourcesExtensionApi } from "@microsoft/vscode-azureresources-api";
import { ArcEnabledServersBranchDataProvider } from "./ArcEnabledServersBranchDataProvider";

// This is essentially a singleton class with the extension's `activate` function as the constructor.
export class ExtensionVars implements IAzureUtilsExtensionVariables {
    readonly prefix: string = "azureArcEnabledServers";
    readonly name: string = "Azure Arc-enabled Servers";

    context!: ExtensionContext;
    outputChannel!: IAzExtOutputChannel;
    ignoreBundle = true;
    rgApiV2!: AzureResourcesExtensionApi;
    branchDataProvider!: ArcEnabledServersBranchDataProvider;
}

export const ext = new ExtensionVars();
