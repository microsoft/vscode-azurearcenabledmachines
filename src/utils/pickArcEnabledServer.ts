// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IActionContext, QuickPickAzureResourceStep, QuickPickAzureSubscriptionStep, QuickPickGroupStep, runQuickPickWizard } from "@microsoft/vscode-azext-utils";
import { AzExtResourceType } from "@microsoft/vscode-azureresources-api";
import { ext } from "../extensionVariables";
import { ArcEnabledServerItem } from "../ArcEnabledServerItem";

export async function pickArcEnabledServer(context: IActionContext): Promise<ArcEnabledServerItem> {
    const treeDataProvider = ext.rgApiV2.resources.azureResourceTreeDataProvider;
    const types = [AzExtResourceType.ArcEnabledServers];
    const promptSteps = [
        new QuickPickAzureSubscriptionStep(treeDataProvider),
        new QuickPickGroupStep(treeDataProvider, { groupType: types }),
        new QuickPickAzureResourceStep(
            treeDataProvider,
            { resourceTypes: types, skipIfOne: false },
            { placeHolder: "Pick an Arc-enabled Server" }),
    ];

    return await runQuickPickWizard(context, { promptSteps, title: "Pick an Arc-enabled Server" });
}
